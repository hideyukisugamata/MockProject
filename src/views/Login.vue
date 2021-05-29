<template>
  <div id="app">
    <Rese/>
    <div class="login-card">
      <div class="title">
        <p>ログイン(Login)</p>
      </div>
        <form class="form" method="post" @submit.prevent="sendContact()">
          <div class="inputform">
            <div class="icon2"></div>
            <input class="input" type="email" placeholder="Email" name="email" v-model="email"/>
          </div>
          <div class="inputform">
            <div class="icon3"></div>
            <input class="input" type="password" name="password" placeholder="Password(半角英数字のみ)" pattern="^[0-9A-Za-z]+$"  v-model="password"/>
          </div>
          <button type="submit" class="button" @click="sendLogin">ログイン</button>
      </form>
    </div>   
  </div>
</template>

<script>
import Rese from "../components/Rese"
export default{
  components:{
    Rese
  },
  data(){
    return{
      email:"",
      password:""
    };
  },
  methods:{
    sendContact(){
      if(
        this.email==""||
        this.password==""
      ){
        alert("未入力の項目があります")
      }
    },
    sendLogin(){
      this.$store.dispatch("login",{
        email:this.email,
        password:this.password
      });
    }
  }
};
</script>

<style scoped>
.login-card{
  height:300px;
  width:485.4px;
  background-color: aliceblue;
  margin:0 auto;
  margin-top:80px;
  border-radius: 20px;
  text-align: center;
}
.title{
  height: 50px;
  border-radius: 20px;
}
.title p{
  font-size:20px;
  font-weight: bold;
  line-height: 50px;
  text-decoration: underline;
  background-color: #5867EC;
  border-radius: 20px 20px 0 0;
  color:azure;
  text-shadow:0.5px 0.5px 0.5px black;
}
.form{
  margin-top:40px;
}
.inputform{
  height: 40px;
  margin-top:30px;
  display: flex;
}
.icon2{
  width:25px;
  height: 25px;
  margin-right:5px;
  background: url(../assets/mail.svg) no-repeat;
  background-position: center;
  margin-left:80px;
}
.icon3{
  width:25px;
  height: 25px;
  margin-right:5px;
  background: url(../assets/password.svg) no-repeat;
  background-position: center;
  margin-left:80px;
}
.input{
  height: 20px;
  width: 300px;
  background-color: aliceblue;
  outline: none;
  border:none;
  border-bottom: 1px solid black;
}
button{
  height:40px;
  width:100px;
  margin-top:30px;
  border-radius:10px;
  background-color: #5867EC;
  color:#ffff;
  font-weight: bold;
  text-shadow:0.5px 0.5px 0.5px black;
  cursor: pointer;
}
</style>