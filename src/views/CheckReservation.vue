<template>
  <div id="check-reservation">
    <div class="flex">
      <Rese/>
      <Logout/>
    </div>
    <div class="check-reservation-card">
      <div class="check-reservation-title">
        <p>予約内容ご確認</p>
      </div>
      <div class="check-reservation">
         <table>
            <tr>
              <th>お名前</th>
              <td>{{this.$store.state.user_name}}様</td>
            <tr>
              <th>店舗名</th>
              <td>{{this.restaurantInfomation.name}}<span>({{this.restaurantInfomation.area.area}})</span></td>
            </tr>
            <tr>
              <th>予約日(date)</th>
              <td>{{this.reserved_date}}</td>
            </tr>
            <tr>
              <th>お時間(time)</th>
              <td>{{this.reserved_time}}</td>
            </tr>
            <tr>
              <th>御来店人数(number)</th>
              <td>{{this.reserved_user_num}}名様</td>
            </tr>
          </table>
      </div>
      <div class="parent-button">
        <button @click="postReservation" class="post-button">予約する</button>
        <button @click="backReservation" class="back-button">戻る</button>
      </div>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese"
import Logout from "../components/Logout"
import axios from "axios"

export default{
components:{
  Rese,
  Logout
},
data(){
  return{
    user_id : this.$store.state.user_id,
    restaurant_id : this.$route.params.id,
    restaurantInfomation:[],
    reserved_date : this.$route.query.date,
    reserved_time : this.$route.query.time,
    reserved_user_num : this.$route.query.user_num
  }
},
methods:{
    async getRestaurantInfomation(){
      const getRestaurantInfomation = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/restaurants/" + this.restaurant_id);
      this.restaurantInfomation = getRestaurantInfomation.data.data;
      console.log(getRestaurantInfomation.data.data);
    },
    async postReservation(){
      axios.post("https://floating-shelf-94821.herokuapp.com/api/v1/users/" + this.user_id + "/reservations",{
        user_id : this.user_id,
        restaurant_id : this.restaurant_id,
        date : this.reserved_date,
        time : this.reserved_time,
        num_users : this.reserved_user_num
      })
      .then(response=>{
        console.log(response.data);
        this.$router.push({name:'Reserved'});
      })
      .catch(error=>{
        alert("予約内容を確認して下さい");
        console.log(error);
        this.$router.push({name:'RestaurantDetail',params:{id:this.restaurant_id}})
      })
    },
    backReservation(){
      this.$router.push({name:'RestaurantDetail',params:{id:this.restaurant_id}});
    }
},
created(){
  this.getRestaurantInfomation(),
  this.getUserInfomation()
}
}

</script>

<style scoped>
.flex{
  display: flex;
}
#Header{
  margin-right:150px;
  margin-top:20px;
}
.check-reservation-card{
  height:320px;
  width:485.4px;
  background-color: aliceblue;
  margin:0 auto;
  margin-top:80px;
  border-radius: 20px;
  text-align: center;
}
.check-reservation-title{
  height: 50px;
  border-radius: 20px 20px 0 0;
  background-color: #5867EC;
  margin-bottom:10px;
  text-shadow:0.5px 0.5px 0.5px black;
  font-weight: bold;
}
.check-reservation-title p{
  font-size: 20px;
  line-height: 50px;
  color:aliceblue;
  text-shadow:0.5px 0.5px 0.5px black;
  font-weight: bold;
}
table {
  width: 100%;
}
table tr{
  border-bottom: 1px solid #5867EC;
  height:37px;
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
table span{
  padding-left:10px;
  font-size: 12px;
}
.parent-button{
  width:100%;
  text-align: center;
  display: flex;
  justify-content: space-around;
}
.post-button{
  height:40px;
  width:100px;
  margin-top:15px;
  margin-bottom: 15px;
  border-radius:10px;
  background-color: #5867EC;
  color:#ffff;
  font-size: 18px;
  font-weight: bold;
  text-shadow:0.5px 0.5px 0.5px black;
  cursor: pointer;
}
.back-button{
  height:40px;
  width:100px;
  margin-top:15px;
  margin-bottom: 15px;
  border-radius:10px;
  background-color: #5867EC;
  color:#0000;
  font-size: 18px;
  font-weight: bold;
  text-shadow:0.5px 0.5px 0.5px black;
  cursor: pointer;
}
</style>