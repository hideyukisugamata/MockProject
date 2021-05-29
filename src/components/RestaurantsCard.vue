<template>
  <div class="flex-card">
    <div class="restaurantsCard" v-for="(value,index) in isCheckedShow" :key="index">
      <img :src="value.image_url" alt="" class="restaurants-img">
      <h1>{{value.name}}</h1>
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
      if(this.$route.name==="MyPage"){
        this.sendRestaurantsInfomation()
      }
    },
    async putFavorite(index){
      const putFavorite = await axios.put("https://floating-shelf-94821.herokuapp.com/api/v1/users/"+ this.user_id + "/favorites",{
        restaurant_id : this.restaurantsInfo[index].id
      });
      const isPutFavorite = this.restaurantsInfo[index].favorites.push(this.user_id);
      console.log(this.restaurantsInfo[index].favorites);
      console.log(putFavorite);
      console.log(isPutFavorite);
    },
    async deleteFavorite(index){
      const deleteFavorite = await axios.request({
      method: 'delete',
      url: ["https://floating-shelf-94821.herokuapp.com/api/v1/users/"+ this.user_id + "/favorites"],
      data: { restaurant_id:  this.restaurantsInfo[index].id}
      });
      console.log(deleteFavorite);
      const isDeleteFavorite = this.restaurantsInfo[index].favorites.splice(0,1);
      console.log(isDeleteFavorite);
    },
    transitionDetail(index){
      this.$router.push({name:"RestaurantDetail",params:{id:this.restaurantsInfo[index].id}});
    },
    isCheckedFavorite(index){
      if(this.restaurantsInfo[index].favorites.length ===1){
        return true
      }else{
        return false
      }
    },
    sendRestaurantsInfomation(){
      this.$emit("getRestaurantsData",this.restaurantsInfo);
    }
  },
  computed:{
    isCheckedShow:function(){
       if(this.$route.name === 'MyPage'){
         return this.restaurantsInfo.filter(function(value){
           return value.favorites.length === 1
         })
       }else{
         return this.restaurantsInfo
       }
    }
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
  margin:5px;
}
.flex-card{
  width:100%;
  display: flex;
  flex-wrap:wrap;
  justify-content: space-around;
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