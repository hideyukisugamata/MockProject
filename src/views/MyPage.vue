<template>
  <div id="mypage">
    <CancelReservation :cancelData="cancelReservation" v-show="isCheckedCancel" @closeModal="closeModal()"/>

    <div class="flex">
      <Rese/>
      <Logout/>
    </div>
    <h1 class="user-name">{{this.userInfomation.user_name}}さん</h1>
    <div class="flex-contents">
      <div class="showReservation" v-if="isCheckedReservation">
        <div class="check-reservation">
          <p class="check-reservation-title">予約状況（全{{this.reservationInfomation.length}}件)</p>
            <div class="check-reservation-cards-div">
              <div class="check-reservation-cards" v-for="(value,index) in reservationInfomation" :key="index">
                <div class="cards-number">
                  <p class="reservation-number">予約{{index + 1}}</p>
                  <p class="cancel-reservation" @click="showModalWindow(value)">この予約をキャンセル</p>
                </div>
                <table class="cards-table">
                  <tr>
                    <th>Restaurant</th>
                    <td>：{{value.restaurant.name}}</td>
                  </tr>
                  <tr>
                    <th>日にち(Date)</th>
                    <td>：{{value.date}}</td>
                  </tr>
                  <tr>
                    <th>時間(Time)</th>
                    <td>：{{value.time}}</td>
                  </tr>
                  <tr>
                    <th>人数(Number)</th>
                    <td>：{{value.num_users}}</td>
                  </tr>
                </table>
              </div>
          </div>
        </div>
      </div>
      <div class="no-reservation" v-else>
        <p>予約情報はありません。</p>
      </div>
      <div class="check-favorites">
        <p>お気に入り店舗一覧</p>
        <RestaurantCard @getRestaurantsData="getRestaurantsInfomation"></RestaurantCard>
      </div>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese"
import Logout from "../components/Logout"
import CancelReservation from "../components/CancelReservation"
import RestaurantCard from "../components/RestaurantsCard"
import axios from "axios"
export default{
  components:{
    Rese,
    Logout,
    CancelReservation,
    RestaurantCard
  },
  data(){
    return{
      user_id : this.$store.state.user_id,
      reservationInfomation:[],
      isCheckedCancel:false,
      cancelReservation:[],
      showRestaurantCard : true,
      restaurantsInfomation : [],
      isCheckedReservation : [],
      favoriteRestaurants:[],
      userInfomation:[]
    }
  },
  methods:{
    async getReservation(){
      const getReservation = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/users/" + this.user_id + "/reservations");
      console.log(getReservation);
      if(getReservation.data.data.length === 0){
        this.isCheckedReservation = false
      }else{
      this.isCheckedReservation = true
      this.reservationInfomation = getReservation.data.data;
      console.log(this.reservationInfomation[0]);
      }
    },
    showModalWindow(value){
      this.isCheckedCancel = true;
      this.cancelReservation = value;
    },
    closeModal(){
      this.isCheckedCancel = false;
    },
    getRestaurantsInfomation(restaurantsInfo){
      this.restaurantsInfomation = restaurantsInfo;
      console.log(this.restaurantsInfomation);
    },
    async getFavoriteRestaurants(){
      const getFavoriteRestaurants = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/users/" + this.user_id + "/favorites");
      this.favoriteRestaurants = getFavoriteRestaurants.data.data;
      console.log(this.favoriteRestaurants);
    },
    async getUserInfomation(){
      const getUserInfomation = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/users/" + this.user_id);
      this.userInfomation = getUserInfomation.data.data;
      console.log(this.userInfomation);
    }
  },
  created(){
    this.getUserInfomation();
    this.getReservation();
    this.getFavoriteRestaurants();

  },
}
</script>

<style scoped>
#mypage{
  width:80%;
  margin:auto;
  background-color: #3f3f3f; 
}
.header{
  margin-left:0px;
}
.flex{
  display: flex;
}
#logout{
  margin-top:25px;
}
.user-name{
  font-size:25px;
  font-weight: bold;
  color: aliceblue;
  margin-left:10px;
  text-shadow:0.5px 0.5px 0.5px #5867EC;
}
.flex-contents{
  display: flex;
}
.check-reservation{
  margin-left:20px;
  width:50%;
}
.no-reservation{
  margin-left:20px;
  width:50%;
}
.no-reservation P{
  font-size:20px;
  font-weight: bold;
  color: aliceblue;
  margin-top:30px;
}
.check-reservation-title{
  font-size:20px;
  font-weight: bold;
  color: aliceblue;
  margin-top:30px;
}
.check-reservation-cards-div{
  margin-left:20px;
  margin-right:10px;
  flex-wrap: wrap;
}
.check-reservation-cards{
  background-color: aliceblue;
  height:200px;
  width: 480px;
  margin-top:20px;
  border-radius: 10px;
}
.cards-number{
  height: 40px;
  width: 100%;
  background-color: #5867EC;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  margin-bottom:5px;
}
.cancel-reservation{
  padding-right:10px;
  color: aliceblue;
  font-size: 12px;
  line-height: 40px;
  text-decoration-line: underline;
  cursor: pointer;
}
.cards-table{
  margin-left:10px;
  width:90%;
}
.reservation-number{
  padding-left:20px;
  text-decoration-line: underline;
  font-weight: bold;
  color: aliceblue;
  line-height: 40px;
}
.tr,th,td{
  padding:10px;
}
tr{
  border-bottom: 1px solid #5867EC;
}
.check-favorites{
  width: 50%;
}
.check-favorites p{
  font-size:20px;
  font-weight: bold;
  color: aliceblue;
  margin-top:30px;
}

</style>