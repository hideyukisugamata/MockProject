<template>
  <div class="home">
     <Logout/>
     <div class="flex-header">
      <Rese/>
      <form class="search-box">
        <input type="search" name="area" list="area-list" placeholder="All area" v-model="searchAreaData">
        <datalist id="area-list">
          <option value="東京都"></option>
          <option value="大阪府"></option>
          <option value="福岡県"></option>
        </datalist>
         <input type="search" name="genre" list="genre-list" placeholder="All genre" v-model="searchGenreData">
        <datalist id="genre-list">
          <option value="寿司"></option>
          <option value="焼肉"></option>
          <option value="居酒屋"></option>
          <option value="イタリアン"></option>
          <option value="ラーメン"></option>
        </datalist>
        <div class="search-text">
          <input type="search" name="text" placeholder="Search..Name" v-model="searchTextData">
        </div>
      </form>
     </div>
     <RestaurantsCard :searchArea="searchAreaData" :searchGenre="searchGenreData" :searchText="searchTextData"></RestaurantsCard>
  </div>
</template>

<script>
import RestaurantsCard from "../components/RestaurantsCard"
import Rese from "../components/Rese"
import Logout from "../components/Logout"
export default {
  components:{
    RestaurantsCard,
    Rese,
    Logout
  },
  data(){
    return{
      searchAreaData:"",
      searchGenreData:"",
      searchTextData:""
    }
  }
}
</script>

<style scoped>
.home{
  width:80%;
  margin: auto;
  background-color: #3f3f3f;
}
.header{
  margin-left:0px;
  margin-top:10px;
}
.flex-header{
  display: flex;
  justify-content: space-between;
}
#logout{
  margin-bottom:5px;
}
.search-box{
  height: 40px;
  width:auto;
  margin-top:10px;
  background-color: azure;
  box-shadow: 4px 4px 4px gray;
}
.search-box input{
  height: 30px;
  width:120px;
  border:none;
  margin-top:5px;
  padding-left: 10px;
  background-color: azure;
  border-right: 1px solid gray;
  outline: none;
}
.search-text{
  display:inline-block;
  position: relative;
  width:300px;  
}
.search-text::before{
  content:"";
  width:16px;
  height:16px;
  background: url(../assets/searchgrass.svg) no-repeat;
  background-position: center;
  background-size:contain;
  display: inline-block;
  position: absolute;
  top:12px;
  left:5px;
}
.search-text input{
  padding:3px 0 3px 2ew;
  padding-left: 25px;
  border-right:none;
  width:100%;
}
</style>