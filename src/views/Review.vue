<template>
  <div id="review">
    <div class="header-flex">
      <Rese/>
      <Logout/>
    </div>
    <div class="restaurant-content">
      <img src="../assets/back.png" class="sendback-image" @click="transitionDetail">
      <p>{{RestaurantInfomation.name}}<span>{{RestaurantInfomation.area.area}}</span><span>{{RestaurantInfomation.genre.genre}}</span></p>
      <star-rating class="star" v-model="updateRating" :star-size="40" :border-width="4" border-color="#d8d8d8" :rounded-corners="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" v-if="updateReview"></star-rating>
      <star-rating class="star" v-model="rating" :star-size="40" :border-width="4" border-color="#d8d8d8" :rounded-corners="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" v-else></star-rating>
    </div>
    <div class="input-section" v-if="updateReview">
      <form action="" @submit.prevent="postReview()">
        <input type="text" class="review-title" placeholder="口コミのタイトルを入れて下さい(30文字以内)" v-model="ReviewInfomation.title"/>
        <textarea class="review-body" placeholder="口コミの本文を入れてください(1000文字以内)" rows="20" cols="50" v-model="ReviewInfomation.comment"></textarea>
      </form>
    </div>
    <div class="input-section" v-else>
      <form action="" @submit.prevent="postReview()">
        <input type="text" class="review-title" placeholder="口コミのタイトルを入れて下さい(30文字以内)" v-model="title"/>
        <textarea class="review-body" placeholder="口コミの本文を入れてください(1000文字以内)" rows="20" cols="50" v-model="comment"></textarea>
      </form>
    </div>
    <div class="bottom-section">
      <p>訪問日:</p>
      <input type="date" class="calendar" v-model="ReviewInfomation.date" @submit.prevent="postReview()" v-if="updateReview">
      <input type="date" class="calendar" v-model="date" @submit.prevent="postReview()" v-else>
      <button @click="putReview" v-if="updateReview">修正する</button>
      <button @click="deleteReview" v-if="updateReview">削除する</button>
      <button @click="postReview" v-else>投稿する</button>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese.vue"
import Logout from "../components/Logout.vue"
import StarRating from "vue-star-rating"
import axios from "axios"
export default{
  data(){
    return{
      rating:1,
      updateRating : 0,
      RestaurantInfomation:{area:"",genre:"",name:""},
      user_id : this.$store.state.user_id,
      title : "",
      comment : "",
      date : "",
      updateReview : false,
      ReviewInfomation:{},
    }
  },
  components:{
    Rese,
    Logout,
    StarRating
  },
  methods:{
    transitionDetail(){
      this.$router.push({name:'RestaurantDetail',params:this.$route.params.id})
    },
    async getRestaurantInfomation(){
      const getRestaurantInfomation = await axios.get(`https://floating-shelf-94821.herokuapp.com/api/v1/restaurants/${this.$route.params.id}?users_id=${this.user_id}`);
      this.RestaurantInfomation = getRestaurantInfomation.data.data;
      if(this.RestaurantInfomation.reviews.length >=1){
        this.updateReview = true,
        this.ReviewInfomation = this.RestaurantInfomation.reviews[0],
        this.updateRating = this.ReviewInfomation.star
      }
    },
    async postReview(){
      if(
        this.title === ""||
        this.comment === ""||
        this.date === ""
      ){
        alert("未入力の項目があります")
      }else{
        axios.post('https://floating-shelf-94821.herokuapp.com/api/v1/users/' + this.user_id + '/review',{
          restaurant_id : this.$route.params.id,
          date : this.date,
          star : this.rating,
          title : this.title,
          comment : this.comment
        })
        .then(response =>{
          console.log(response.data);
          alert("口コミを投稿しました");
          this.$router.push({name:'RestaurantDetail',params:this.$route.params.id});
        })
        .catch(error=>{
          console.log(error);
          alert("投稿できませんでした");
        })
      }
    },
    async putReview(){
      if(
        this.ReviewInfomation.title === ""||
        this.ReviewInfomation.comment === ""||
        this.ReviewInfomation.date === ""
      ){
        alert("未入力の項目があります")
      }else{
        axios.put('https://floating-shelf-94821.herokuapp.com/api/v1/users/' + this.user_id + '/review',{
          review_id : this.ReviewInfomation.id,
          restaurant_id : this.$route.params.id,
          date : this.ReviewInfomation.date,
          star : this.updateRating,
          title : this.ReviewInfomation.title,
          comment : this.ReviewInfomation.comment
        })
        .then(response =>{
          console.log(response.data);
          alert("口コミを修正しました");
          this.$router.push({name:'RestaurantDetail',params:this.$route.params.id});
        })
        .catch(error=>{
          console.log(error);
          alert("修正できませんでした");
        })
      }
    },
    async deleteReview(){
      axios.request({
        method:'delete',
        url:[`https://floating-shelf-94821.herokuapp.com/api/v1/users/${this.user_id}/review`],
        data:{restaurant_id : this.$route.params.id}
      })
      .then(response=>{
        alert('口コミを削除しました');
        this.$router.push({name:'RestaurantDetail',params:this.$route.params.id});
        console.log(response);
      })
      .catch(error=>{
        alert('削除できませんでした');
        console.log(error);
      })
    }
  },
  created(){
    this.getRestaurantInfomation()
  }
}
</script>

<style scoped>
#review{
  width:80%;
  margin: auto;
}
.header{
  margin-left:0px;
}
#Header{
  margin-top:25px;
}
.header-flex{
  display: flex;
}
.restaurant-content{
  display: flex;
  align-items: center;
  margin-left:20px;
}
.sendback-image{
  width:50px;
  height: 50px;
  cursor: pointer;
  border-radius: 10px;
}
.restaurant-content p{
  font-size: 40px;
  font-weight: bold;
  color: aliceblue;
  margin-left: 20px;
}
.restaurant-content span{
  font-size:20px;
  font-weight: bold;
  color: aliceblue;
  margin-left: 10px;
}
.star{
  margin-left:100px;
}
.review-title,
.review-body{
  display: block;
}
.review-title{
  width: 90%;
  height: 30px;
  padding:10px;
  margin: 20px auto 0px;
  font-size: 20px;
  border-radius: 10px;
}
.review-title:focus{
  outline: none;
  background-color: aliceblue;
}
.review-body{
  width: 90%;
  height: 300px;
  margin: 20px auto 0px;
  padding:10px;
  font-size:15px;
  border-radius: 10px;
}
.review-body:focus{
  outline: none;
  background-color: aliceblue;
}
.bottom-section{
  width: 90%;
  display: flex;
  margin-top:20px;
  align-items: center;
  margin:auto;
}
.bottom-section p{
  font-size:20px;
  font-weight: bold;
  color:aliceblue;
  margin-top:auto;
  margin-bottom: 3px;
}
.calendar{
  margin-top:auto;
  background-color: aliceblue;
  margin-left:10px;
  border-radius: 10px;
}
button{
  width:100px;
  height: 50px;
  margin-top:30px;
  margin-left:auto;
  display: block;
  border-radius: 10px;
  background-color: #5867EC;
  font-size:20px;
  font-weight: bold;
  color:#ffff;
  text-shadow:0.5px 0.5px 0.5px black;
  cursor: pointer;
}
</style>