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
          <p class="restaurant-name">{{this.restaurantInfomation.name}}</p>
          <p class="restaurant-review" @click="transitionReview" v-if="isCheckedReview">このお店の口コミを編集する</p>
          <p class="restaurant-review" @click="transitionReview" v-else>このお店の口コミを投稿</p>
        </div>
        <img :src="this.restaurantInfomation.image_url" class="restaurant-image">
        <div class="restaurantInfo-flex">
          <p>#{{this.restaurantInfomation.area.area}}</p>
          <p>#{{this.restaurantInfomation.genre.genre}}</p>
        </div>
        <p class="restaurant-comment">{{this.restaurantInfomation.comment}}</p>
      </div>
      <Reservationform :restaurantInfomation="restaurantInfomation"/>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese";
import Logout from "../components/Logout";
import Reservationform from "../components/ReservationForm";
import axios from "axios";
export default{
  components:{
    Rese,
    Logout,
    Reservationform
  },
  data(){
    return{
      restaurantInfomation:{name:"",area:"",genre:""},
      reviewInfomation:{},
      isCheckedReview : false
    }
  },
  methods:{
    async getRestaurant(){
      const GetRestaurantInfomation = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/restaurants/" + this.$route.params.id + '?users_id=' + this.$store.state.user_id);
      this.restaurantInfomation = GetRestaurantInfomation.data.data;
      if(this.restaurantInfomation.reviews.length >= 1){
        this.isCheckedReview = true
      }
    },
    transitionhome(){
      this.$router.push({name:"Home"})
    },
    transitionReview(){
      this.$router.push({name:'Review',params:this.$route.params.id})
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
.restaurant-name{
  font-size:50px;
  font-weight: bold;
  margin-left:30px;
  color: aliceblue;
}
.restaurant-review{
  font-size:15px;
  font-weight: bold;
  color: #5867EC;
  margin-top:30px;
  margin-left:auto;
  margin-right: 10px;
  cursor: pointer;
  text-decoration-line: underline;
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

</style>