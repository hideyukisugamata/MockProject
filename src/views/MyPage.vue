<template>
  <div>
    <div id="mypage">
      <CancelReservation :cancelData="cancelReservation" v-show="isCheckedCancel" @closeModal="closeModal()"/>
      <UpdateReservation v-show="isCheckedUpdate" :updateInfomation="updateInfomation" @closeUpdateModalToParent="closeUpdateModal()"/>
      <div class="flex">
        <Rese/>
        <Logout/>
      </div>
      <h1 class="user-name">{{this.$store.state.user_name}}さん</h1>
      <div class="flex-contents">
        <div class="showReservation" v-if="isCheckedReservation">
          <div class="check-reservation">
            <p class="check-reservation-title">予約状況（全{{this.reservationInfomation.length}}件)</p>
              <div class="check-reservation-cards-div">
                <div class="check-reservation-cards" v-for="(value,index) in reservationInfomation" :key="index">
                  <div class="cards-number">
                    <p class="reservation-number">予約{{index + 1}}</p>
                    <p class="update-reservation" @click="updateReservation(value)">この予約を変更する</p>
                    <p class="cancel-reservation" @click="showModalWindow(value)">この予約をキャンセル</p>
                  </div>
                  <table class="cards-table">
                    <tr>
                      <th>Restaurant</th>
                      <td class="restaurant-name" @click="transitionRestaurant(index)">：<span>{{value.restaurant.name}}</span></td>
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
        <div class="check-favorite" v-if="isCheckedFavoriteInfomation">
          <p>お気に入り店舗一覧</p>
          <div class="restaurant-card">
            <RestaurantCard></RestaurantCard>
          </div>
        </div>
        <div class="no-favorite" v-else>
          <p>お気に入り登録はありません</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese"
import Logout from "../components/Logout"
import CancelReservation from "../components/CancelReservation"
import RestaurantCard from "../components/RestaurantsCard"
import UpdateReservation from "../components/UpdateReservation"
import axios from "axios"
export default{
  components:{
    Rese,
    Logout,
    CancelReservation,
    RestaurantCard,
    UpdateReservation
  },
  data(){
    return{
      user_id : this.$store.state.user_id,
      reservationInfomation:[
        {restaurant:{
          name:""
        }}
      ],
      isCheckedCancel:false,
      cancelReservation:[],
      showRestaurantCard : true,
      isCheckedReservation : [],
      isCheckedFavoriteInfomation:[],
      isCheckedUpdate: false,
      updateInfomation:[],
    }
  },
  methods:{
    async getReservation(){
      const getReservation = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/users/" + this.user_id + "/reservations");
      if(getReservation.data.data.length === 0){
        this.isCheckedReservation = false
      }else{
      this.isCheckedReservation = true
      this.reservationInfomation = getReservation.data.data;
      console.log(this.reservationInfomation);
      }
    },
    updateReservation(value){
      this.isCheckedUpdate = true;
      this.updateInfomation = value;
    },
    showModalWindow(value){
      this.isCheckedCancel = true;
      this.cancelReservation = value;
    },
    closeModal(){
      this.isCheckedCancel = false;
    },
    closeUpdateModal(){
      this.isCheckedUpdate = false;
    },
    async getFavoriteInfomation(){
      const getFavoriteInfomation = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/users/" + this.user_id + "/favorites");
      if(getFavoriteInfomation.data.data.length === 0){
        this.isCheckedFavoriteInfomation = false
      }else{
        this.isCheckedFavoriteInfomation = true
      }
    },
    transitionRestaurant(index){
      this.$router.push({name:'RestaurantDetail',params:{id:this.reservationInfomation[index].restaurant_id}});
    }
  },
  created(){
    this.getReservation();
    this.getFavoriteInfomation();
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
#Header{
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
.update-reservation{
  color: aliceblue;
  font-size: 12px;
  line-height: 40px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-left: 100px;
}
.cards-table{
  margin-left:10px;
  width:90%;
}
.reservation-number{
  padding-left:20px;
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
.restaurant-name span{
  cursor: pointer;
  text-decoration-line: underline;
  color: #5867EC; 
}
.restaurant-card{
  width: 100%;
  margin-top:15px;
  margin-left:30px;
}
.check-favorite,
.no-favorite{
  width: 50%;
  margin-left:10px;
}
.check-favorite p,
.no-favorite p{
  font-size:20px;
  font-weight: bold;
  color: aliceblue;
  margin-top:30px;
}

</style>