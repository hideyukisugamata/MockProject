<template>
  <div class="RestaurantDetail">
    <div class="header-flex">
      <Rese/>
      <Logout/>
    </div>
    <div class="content-flex">
      <div class ="restaurant-detail">
        <div class="flex-title">
          <img src="../assets/back.png" class="sendback-image" @click="transitionhome()">
          <p>{{this.restaurantInfomation.name}}</p>
        </div>
        <img :src="this.restaurantInfomation.image_url" class="restaurant-image">
        <div class="restaurantInfo-flex">
          <p>#{{this.restaurantInfomation.area.area}}</p>
          <p>#{{this.restaurantInfomation.genre.genre}}</p>
        </div>
        <p class="restaurant-comment">{{this.restaurantInfomation.comment}}</p>
      </div>
      <div class="reservation">
        <div class="reservation-title">
          <p>御予約のお申込み</p>
        </div>
        <form action="" @submit.prevent="transitionCheckReservation()">
          <label for="date">御予約日</label>
          <input type="date" class="input-date" v-model="date" required/>
          <label for="time">御予約時間</label>
          <input type="search" class="input-time" list="time-list" v-model="time" placeholder="お選び下さい" required/>
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
              <td>{{this.restaurantInfomation.name}}</td>
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
          <button @click="transitionCheckReservation">予約確認へ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese";
import Logout from "../components/Logout";
import axios from "axios";
export default{
  components:{
    Rese,
    Logout
  },
  data(){
    return{
      restaurantInfomation:[],
      date:"",
      time:"",
      user_num:""
    }
  },
  methods:{
    async getRestaurant(){
      const GetRestaurantInfomation = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/restaurants/" + this.$route.params.id);
      this.restaurantInfomation = GetRestaurantInfomation.data.data;
      console.log(this.restaurantInfomation);
    },
    transitionhome(){
      this.$router.push({name:"Home"})
    },
    transitionCheckReservation(){
      if(this.date === ""||
         this.time === ""||
         this.user_num === ""
      ){
        alert("未選択の項目があります")
      }else{
      this.$router.push({name:'CheckReservation',params:{id:this.$route.params.id},query:{date:this.date,time:this.time,user_num:this.user_num}})
      }
    }
  },
  created(){
    this.getRestaurant()
  }
}

</script>

<style scoped>
.RestaurantDetail{
  width:80%;
  margin:auto;
  background-color: #3f3f3f;
}
.header{
  margin-left:0px;
}
.header-flex{
  display: flex;
}
#Header{
  margin-top:25px;
}
.content-flex{
  display:flex;
}
.restaurant-detail{
  margin-left:20px;
  width:50%;
}
.flex-title{
  display: flex;
}
.sendback-image{
  width:50px;
  cursor: pointer;
  border-radius: 10px;
}
.flex-title p{
  font-size:50px;
  font-weight: bold;
  margin-left:30px;
  width:100%;
  color: aliceblue;
}
.restaurant-image{
  width:100%;
  height:300px;
  margin-top:20px;
}
.restaurantInfo-flex{
  display: flex;
  margin-top:20px;
}
.restaurantInfo-flex p{
  margin-left:20px;
  font-size:15px;
  font-weight:bold;
  color:aliceblue;
}
.restaurant-comment{
  margin-top:20px;
  margin-left:20px;
  font-size:20px;
  color: aliceblue;
}
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
</style>