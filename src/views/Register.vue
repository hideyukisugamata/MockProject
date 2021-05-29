<template>
  <div id="register">
    <Rese/>
    <div class="register-card">
      <div class="title">
        <p>会員登録(Registration)</p>
      </div>
      <form class="form" method="post" @submit.prevent="sendContact()">
        <div class="inputform">
          <div class="icon1"></div>
          <input class="input" type="text" placeholder="Name" name="name" v-model="name"/>
        </div>
        <div class="inputform">
          <div class="icon2"></div>
          <input class="input" type="email" placeholder="emailアドレス" name="email" pattern="^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$" v-model="email"/>
        </div>
        <div class="inputform">
          <div class="icon3"></div>
          <input class="input" type="text" placeholder="Password(半角英数字のみ)" pattern="^[0-9A-Za-z]+$" name="password" v-model="password" v-if="showpassword"/>
          <input class="input" type="password" placeholder="Password(半角英数字のみ)" pattern="^[0-9A-Za-z]+$" name="password" v-model="password" v-else/>
          <div class="toggle-flex">
            <toggle-button color="#5867EC" width=40 v-model="showpassword"></toggle-button>
            <p>表示</p>
          </div>
        </div>
        <div class="inputform">
          <div class="icon3"></div>
          <input class="input" type="text" placeholder="Password(再確認用)" pattern="^[0-9A-Za-z]+$" name="re-password" v-model="repassword" v-if="showrepassword"/>
          <input class="input" type="password" placeholder="Password(再確認用)" pattern="^[0-9A-Za-z]+$" name="re-password" v-model="repassword" v-else/>
          <div class="toggle-flex">
            <toggle-button color="#5867EC" width=40 v-model="showrepassword"></toggle-button>
            <p>表示</p>
          </div>
        </div>
        <button type="submit" class="button">新規登録</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import Rese from "../components/Rese"
import axios from "axios"
export default{
  components:{
    Rese
  },
  data(){
    return{
      name:"",
      email:"",
      password:"",
      repassword:"",
      showpassword:false,
      showrepassword:false,
    };
  },
  methods:{
    sendContact(){
      if(
        this.name==""||
        this.email==""||
        this.password==""||
        this.repassword==""
      ){
        alert("未入力の項目があります")
      }else if(this.password != this.repassword)
      {
        alert("パスワードが一致していません")
      }else{
        axios
          .post('https://floating-shelf-94821.herokuapp.com/api/v1/register',
          {
            name:this.name,
            email:this.email,
            password:this.password
          })
          .then(response=>{
            console.log(response);
            if(response.data.data.email === this.email){
              this.$router.replace("/thanks");
            }
          })
          .catch(error=>{
            alert("すでに登録されているメールアドレスです");
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.register-card{
  height:350px;
  width:566.3px;
  background-color: aliceblue;
  margin:0 auto;
  margin-top:80px;
  border-radius: 20px;
  text-align: center;
}
.title{
  height: 50px;
  border-radius: 20px 20px 0 0;
  background-color: #5867EC;
  margin-bottom:20px;
  text-shadow:0.5px 0.5px 0.5px black;
  font-weight: bold;
}
.title p{
  font-size:20px;
  line-height: 50px;
  text-decoration: underline;
  color: azure;
}
.inputform{
  height: 40px;
  margin-top:20px;
  display: flex;
}
.icon1{
  width:25px;
  height: 25px;
  margin-right:5px;
  background: url(../assets/person.svg) no-repeat;
  background-position: center;
  margin-left:120px;
}
.icon2{
  width:25px;
  height: 25px;
  margin-right:5px;
  background: url(../assets/mail.svg) no-repeat;
  background-position: center;
  margin-left:120px;
}
.icon3{
  width:25px;
  height: 25px;
  margin-right:5px;
  background: url(../assets/password.svg) no-repeat;
  background-position: center;
  margin-left:120px;
}
.icon4{
  width:25px;
  height: 25px;
  margin-right:5px;
  background: url(../assets/tel-old.svg) no-repeat;
  background-position: center;
  margin-left:120px;
}
.input{
  height: 20px;
  width: 300px;
  background-color: aliceblue;
  outline: none;
  border:none;
  border-bottom: 1px solid black;
}
.checkinput{
  height: 20px;
  width: 20px;
  background-color: azure;
}
.toggle-flex{
  height: 20px;
  width: 100px;
  display: flex;
  align-items: center;
}
.toggle-flex p{
  margin-left: 10px;
  margin-bottom:3px;
  color: #757575;
}
button{
  height:40px;
  width:100px;
  margin-top:5px;
  border-radius:10px;
  background-color: #5867EC;
  color:#ffff;
  font-weight: bold;
  text-shadow:0.5px 0.5px 0.5px black;
  cursor: pointer;
}
</style>