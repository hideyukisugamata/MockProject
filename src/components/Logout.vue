<template>
  <div id="logout">
    <button @click="Logout">ログアウト</button>
  </div>
</template>

<script>
export default{
methods:{
  Logout(){
    this.$store.dispatch("logout");
  }
}
}
</script>

<style scoped>
#logout{
  margin-left: auto;
  width:80px;
}
#logout button{
  margin-top: 10px;
  margin-right: 10px;
  height:20px;
  line-height: 10px;
  font-size:10px;
  font-weight: bold;
  background-color: #5867EC;
  color: aliceblue;
  cursor: pointer;
  border:none;
  border-radius: 10px;
}
</style>