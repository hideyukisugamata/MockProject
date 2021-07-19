<template>
  <div class="flex-card">
    <div class="restaurantsCard" v-for="(value,index) in isCheckedShow" :key="index">
      <img :src="value.image_url" alt="" class="restaurants-img">
        <div class="flex">
          <h1>{{value.name}}</h1>
          <img src="../assets/Reserved.png" alt="" class="reserved-img" v-if="isCheckedReservation(index)" @click="transitionMyPage">
        </div>
        <div class="flex-category">
          <p>#{{value.area.area}}</p>
          <p>#{{value.genre.genre}}</p>
        </div>
      <div class="flex-icon">
        <button class="detail" @click="transitionDetail(index)">店舗ページへ</button>
        <div class="heart-img-red" @click="deleteFavorite(index)" v-if="isCheckedFavorite(index)"></div>
        <div class="heart-img-gray" @click="putFavorite(index)" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default{
  props:["searchArea","searchGenre","searchText"],
  data(){
    return{
      restaurantsInfo:[],
      user_id : this.$store.state.user_id,
    }
  },
  methods:{
    async getRestaurants(){
      const restaurantsinfo = await axios.get("https://floating-shelf-94821.herokuapp.com/api/v1/restaurants" +"?users_id=" + this.user_id);
      this.restaurantsInfo = restaurantsinfo.data.data;
    },
    async putFavorite(index){
      const putFavorite = await axios.put("https://floating-shelf-94821.herokuapp.com/api/v1/users/"+ this.user_id + "/favorites",{
        restaurant_id : this.isCheckedShow[index].id
      });
      const isPutFavorite = this.isCheckedShow[index].favorites.push(this.user_id);
      console.log(putFavorite);
      console.log(isPutFavorite);
    },
    async deleteFavorite(index){
      const deleteFavorite = await axios.request({
      method: 'delete',
      url: ["https://floating-shelf-94821.herokuapp.com/api/v1/users/"+ this.user_id + "/favorites"],
      data: { restaurant_id:  this.isCheckedShow[index].id}
      });
      console.log(deleteFavorite);
      const isDeleteFavorite = this.isCheckedShow[index].favorites.splice(0,1);
      console.log(isDeleteFavorite);
    },
    transitionDetail(index){
      this.$router.push({name:"RestaurantDetail",params:{id:this.isCheckedShow[index].id}});
    },
    isCheckedFavorite(index){
      if(this.isCheckedShow[index].favorites.length ===1){
        return true
      }else{
        return false
      }
    },
    isCheckedReservation(index){
      if(this.isCheckedShow[index].reservations.length !==0){
        return true
      }else{
        return false
      }
    },
    transitionMyPage(){
        this.$router.push('/mypage');
    }
  },
  computed:{
    isCheckedShow:function(){
       if(this.$route.name === 'MyPage'){
         return this.restaurantsInfo.filter(function(value){
           return value.favorites.length === 1
         })
       }else if(this.$route.name === 'Home'){
         const restaurantsArray= [];
         for(const i in this.restaurantsInfo){
           const restaurant = this.restaurantsInfo[i];
           if(restaurant.area.area.indexOf(this.searchArea)!==-1 
           &&
           restaurant.genre.genre.indexOf(this.searchGenre)!==-1 
           &&
           restaurant.name.indexOf(this.searchText)!==-1
           ){
             restaurantsArray.push(restaurant);
            }
         }
         return restaurantsArray;
       }else{
         return this.restaurantsInfo
       }
    },
  },
  created(){
    this.getRestaurants();
  }
}
</script>


<style scoped>
.restaurantsCard{
  height: 250px;
  width: 250px;
  box-shadow: 4px 4px 4px gray;
  background-color: aliceblue;
  margin:5px 5px 5px 40px;
}
.flex-card{
  width:100%;
  display: flex;
  flex-wrap:wrap;
}
.flex{
  display: flex;
}
.restaurants-img{
  height: 50%;
  width: 100%;
  background-size: contain;
  background-position: center;
}
.restaurantsCard h1{
  font-size:20px;
  font-weight: bold;
  margin-top:10px;
  margin-left:10px;
}
.reserved-img{
  margin-left:auto;
  margin-right:30px;
  margin-top:10px;
  height: 25%;
  width: 40%;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}
.flex-category,
.flex-icon{
  display: flex;
}
.flex-category p{
  padding-top:10px;
  padding-left:20px;
  padding-bottom: 10px;
  font-size: 14px;
}
.flex-icon{
  height:30px;
  justify-content: space-around;
  margin-top: 5px;
}
.detail{
  height: 35px;
  width:100px;
  border-radius: 10px;
  background-color: #5867EC;
  color:azure;
  font-weight: bold;
  cursor: pointer;
}
.heart-img-gray{
  width: 30px;
  height: 30px;
  margin-bottom:10px;
  background:url(../assets/heartgray.png) no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}
.heart-img-red{
  width: 30px;
  height: 30px;
  margin-bottom:10px;
  background:url(../assets/heartred.png) no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}

</style>