<template>
  <div id="app">
    <Rese/>
    <div class="thanks-card">
      <div class="logout-title">
      <p class="logout-first-message">ログアウトしました</p>
      </div>
      <p class="logout-second-message"><span>予約サービスRese</span>を<br>ご利用頂き、誠にありがとうございました。</p>
      <p class="logout-third-message">またお会いできることを楽しみにしております。</p>
      <button @click="transitionLogin">ログイン画面へ</button>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese";
export default{
  components:{
    Rese
  },
  methods:{
    transitionLogin(){
      this.$router.push('Login');
    }
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
}
.logout-title{
  height: 50px;
  border-radius: 20px 20px 0 0;
  background-color: #5867EC;
  margin-bottom:20px;
}
.logout-first-message{
  color: aliceblue;
  line-height: 50px;
  font-size:30px;
  font-weight: bold;
  text-shadow:0.5px 0.5px 0.5px black
}
.logout-second-message span{
  font-size: 25px;
  font-weight: bold;
  color:#5867EC;
  text-shadow:0.5px 0.5px 0.5px black
}
.logout-second-message{
  padding-top:10px;
  line-height: 30px;
}
.logout-third-message{
  padding-top:30px;
}
button{
  height:40px;
  margin-top:30px;
  border-radius:10px;
  background-color: #5867EC;
  color:#ffff;
  font-weight: bold;
  text-shadow:0.5px 0.5px 0.5px black;
  cursor: pointer;
}
</style>