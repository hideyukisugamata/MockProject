<template>
  <div id="app">
    <div class="flex">
      <Rese/>
      <Logout/>
    </div>
    <div class="reserved-card">
      <div class="reserved-title">
        <p>ご予約 完了いたしました</p>
      </div>
      <p class="reserved-message">ご予約ありがとうございます。</p>
      <h1>ご来店を心よりお待ちしております。</h1>
      <button @click="transitionIndex">店舗一覧に戻る</button>
    </div>
  </div>
</template>

<script>
import Rese from "../components/Rese";
import Logout from "../components/Logout"
export default{
  components:{
    Rese,
    Logout
  },
  methods:{
    transitionIndex(){
      this.$router.replace('/')
    }
  }
};
</script>


<style scoped>
.reserved-card{
  height:300px;
  width:485.4px;
  background-color: aliceblue;
  margin:0 auto;
  margin-top:80px;
  border-radius: 20px;
  text-align: center;
}
.flex{
  display: flex;
}
#Header{
  margin-right:150px;
  margin-top:20px;
}
.reserved-title{
  height: 50px;
  border-radius: 20px 20px 0 0;
  background-color: #5867EC;
  margin-bottom:20px;
  text-shadow:0.5px 0.5px 0.5px black;
  font-weight: bold;
}
.reserved-title p{
  font-size: 20px;
  line-height: 50px;
  color:aliceblue;
  text-shadow:0.5px 0.5px 0.5px black;
  font-weight: bold;
}
.reserved-message{
  margin-top: 30px;
  font-size: 20px;
  line-height: 50px;
}
.reserved-card h1{
  font-size:20px;
  font-weight: normal;
  padding:10px;
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