<template>
        <div class="reservation">
        <div class="reservation-title">
          <p v-if="isCheckedRoute()">御予約のお申込み</p>
          <p v-else>変更内容(全て入力して下さい)</p>
        </div>
        <form action="" @submit.prevent="transitionCheckReservation()">
          <label for="date">御予約日</label>
          <input type="date" class="input-date" v-model="date"/>
          <label for="time">御予約時間</label>
          <input type="search" class="input-time" list="time-list" v-model="time" placeholder="お選び下さい"/>
            <datalist id="time-list">
              <option value=17:00></option>
              <option value=17:30></option>
              <option value=18:00></option>
              <option value=18:30></option>
              <option value=19:00></option>
              <option value=19:30></option>
              <option value=20:00></option>
              <option value=20:30></option>
              <option value=21:00></option>
            </datalist>
          <label for="number">御来店人数</label>
          <input type="search" class="input-number" list="num-list" v-model="user_num" placeholder="お選び下さい" required/>
          <datalist id="num-list">
              <option value=1></option>
              <option value=2></option>
              <option value=3></option>
              <option value=4></option>
              <option value=5></option>
              <option value=6></option>
              <option value=7></option>
              <option value=8></option>
              <option value=9></option>
              <option value=10></option>
            </datalist>
        </form>
        <div class="reservation-infomation">
          <table>
            <tr>
              <th>店舗名</th>
              <td v-if="isCheckedRoute()">{{restaurantInfomation.name}}</td>
              <td v-else>{{updateInfomation.restaurant.name}}</td>
            </tr>
            <tr>
              <th>予約日(date)</th>
              <td>{{this.date}}</td>
            </tr>
            <tr>
              <th>お時間(time)</th>
              <td>{{this.time}}</td>
            </tr>
            <tr>
              <th>御来店人数(number)</th>
              <td>{{this.user_num}}名様</td>
            </tr>
          </table>
        </div>
        <div class="parent-button">
          <button @click="transitionCheckReservation" v-if="isCheckedRoute()">予約確認へ</button>
          <div v-else>
          <button @click="transitionCheckReservation">予約変更</button>
          <button @click="$emit('closeUpdateModalToChild')" class="not-update-button">変更しない</button>
          </div>
        </div>
      </div>
</template>

<script>
import axios from "axios"
export default {  
  props:["updateInfomation","restaurantInfomation"],
  data(){
    return{
      date:"",
      time:"",
      user_num:""
    }
  },
  methods:{
    transitionCheckReservation(){
      if(this.date === ""||
         this.time === ""||
         this.user_num === ""
      ){
        alert("未選択の項目があります")
      }else if(this.$route.name ==="RestaurantDetail"){
      this.$router.push({name:'CheckReservation',params:{id:this.$route.params.id},query:{name:this.restaurantInfomation.name,area:this.restaurantInfomation.area.area,date:this.date,time:this.time,user_num:this.user_num}})
      }else{
        this.UpdateReservation()
      }
    },
    isCheckedRoute(){
      if(this.$route.name === "RestaurantDetail"){
        return true
      }else{
        return false
      }
    },
    async UpdateReservation(){
      axios.put("https://floating-shelf-94821.herokuapp.com/api/v1/users/" +this.$store.state.user_id +"/reservations",{
        id : this.updateInfomation.id,
        new_date : this.date,
        new_time : this.time,
        new_num_users : this.user_num        
      })
      .then(response =>{
        console.log(response.data);
        this.$router.go({
          path:this.$router.currentRoute.path,
          force:true
        });
      })
      .catch(error=>{
        alert("予約内容を更新できませんでした");
        console.log(error);
        this.$router.go({
          path:this.$router.currentRoute.path,
          force:true
        });
      })
    }
  }
}
</script>

<style scoped>
.reservation{
  width:45%;
  margin-right:10px;
  margin-left:20px;
  background-color: #0fb3ff;
  border-radius: 10px;
}
.reservation-title{
  height: 50px;
  width: 100%;
  margin-bottom:20px;
  background-color: #5867EC;
  text-align: center;
  border-radius: 10px 10px 0px 0px;
  text-shadow:0.5px 0.5px 0.5px black;
}
.reservation p{
  font-size:20px;
  font-weight: bold;
  color:aliceblue;
  line-height: 50px;
  margin-left:10px;
  text-shadow:0.5px 0.5px 0.5px black;
}
.reservation label{
  display: block;
  margin-left: 10px;
  margin-top:15px;
  margin-bottom:8px;
  font-size: 15px;
  font-weight: bold;
}
.reservation input{
  display: block;
  margin-left:10px;
  border:none;
  border-radius: 5px;
  background-color: aliceblue;
}
.input-date{
  width:30%;
}
.input-time,
.input-number{
  width:80%;
}
.reservation-infomation{
  background-color: aliceblue;
  color:#3f3f3f;
  width: 80.5%;
  margin-top:30px;
  margin-left: 10px;
  border-radius: 5px;
}
table {
  width: 100%;
}
table tr{
  border-bottom: 1px solid #5867EC;
  height:37px;
}
table tr:last-child{
  border-bottom: none;
}

table td {
  font-weight: bold;
  padding:10px;
}
table th {
  font-weight: bold;
  padding-left:10px;
  text-align: left;
  width:200px;
  color:#5867EC;
  line-height: 37px;
}
.parent-button{
  width:100%;
  text-align: center;
}
button{
  height:40px;
  width:100px;
  margin-top:30px;
  margin-bottom:30px;
  border-radius:10px;
  background-color: #5867EC;
  color:#ffff;
  font-weight: bold;
  text-shadow:0.5px 0.5px 0.5px black;
  cursor: pointer;
}
.not-update-button{
  margin-left:15px;
}
</style>