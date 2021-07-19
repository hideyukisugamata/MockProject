<template>
  <div id="app">
    <Rese/>
    <div class="thanks-card">
      <p>会員登録ありがとうございます</p>
      <button @click="transitionLogin">ログイン画面へ</button>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese";
export default{
  components:{
    Rese,
  },
  methods:{
    transitionLogin(){
      this.$router.replace('/login');
    },
  }
};
</script>


<style scoped>
.thanks-card{
  height:300px;
  width:485.4px;
  background-color: aliceblue;
  margin:0 auto;
  margin-top:80px;
  border-radius: 20px;
  text-align: center;
}
.thanks-card p{
  font-size: 20px;
  padding-top:90px;
}
button{
  height:40px;
  width:120px;
  margin-top:30px;
  border-radius:10px;
  background-color: #5867EC;
  color:#ffff;
  font-weight: bold;
  text-shadow:0.5px 0.5px 0.5px black;
  cursor: pointer;
}
</style>