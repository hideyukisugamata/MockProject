<template>
  <div id="Header">
    <div class="flex">
      <p v-show="isCheckedPath()">{{this.$store.state.user_name}}さん</p>
      <button @click="transitionMyPage" v-show="isCheckedPath()">マイページへ</button>
      <button @click="Logout">ログアウト</button>
    </div>
  </div>
</template>

<script>
export default{
  methods:{
    isCheckedPath(){
      if(this.$route.name === 'MyPage'){
        return false
      }else{
        return true
      }
    },
    Logout(){
      this.$store.dispatch("logout");
    },
    transitionMyPage(){
      this.$router.push('/MyPage');
    }
  },
  created(){
    this.isCheckedPath();
  }
}
</script>

<style scoped>
#Header{
  margin-left: auto;
  width:400px;
}
.flex{
  display:flex;
}
#Header button{
  margin-top: 10px;
  margin-right: 10px;
  margin-left: auto;
  height:20px;
  width: 100px;
  line-height: 10px;
  font-size:10px;
  font-weight: bold;
  background-color: #5867EC;
  color: aliceblue;
  cursor: pointer;
  border:none;
  border-radius: 10px;
}
#Header p{
  font-size:18px;
  font-weight: bold;
  color: aliceblue;
  margin-top: 10px;
  margin-right: 20px;
  margin-left: auto;
  text-decoration-line: underline;
}
</style>