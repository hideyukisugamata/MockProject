<template>
  <div>
    <div class="modalWindow-back">
        <div class="modalWindow-canceled" v-if="isChecked">
          <h1>予約をキャンセルしました</h1>
          <p @click="transitionMyPege">マイページへ戻る</p>
        </div>
        <div class="modalWindow-check" v-else>
          <p>こちらの予約をキャンセルしますか？</p>
          <div class="cancel-card">
            <table class="cancel-table">
              <tr>
                <th>Restaurant:</th>
                <td>{{cancelData.restaurant.name}}</td>
              </tr>
              <tr>
                <th>日にち(Date):</th>
                <td>{{cancelData.date}}</td>
              </tr>
              <tr>
                <th>時間(Time):</th>
                <td>{{cancelData.time}}</td>
              </tr>
              <tr>
                <th>人数(Number):</th>
                <td>{{cancelData.num_users}}</td>
              </tr>
            </table>
          </div>
          <button class="not-cancel-button" @click="$emit('closeModal')">キャンセルしない</button>
          <button class="cancel-button" @click="cancelReservation">予約をキャンセルする</button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"
export default{
  props:['cancelData'],
  data(){
    return{
      user_id : this.$store.state.user_id,
      isChecked:false
    }
  },
  methods:{
    async cancelReservation(){
      await axios.request({
        method: 'delete',
        url: ["https://floating-shelf-94821.herokuapp.com/api/v1/users/"+ this.user_id + "/reservations"],
        data:{id : this.cancelData.id}
      })
      .then(response=>{
        console.log(response.data);
        this.isChecked = true;
      })
      .catch(error=>{
        alert("キャンセルできませんでした");
        console.log(error);
        this.$router.push('MyPage');
      })
    },
    transitionMyPege(){
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true,
      });      
    }
  }
}
</script>


<style scoped>
.modalWindow-back{
  z-index: 1;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  display: flex;
}
.modalWindow-check{
  z-index: 10;
  width: 50%;
  height: 70%;
  background-color:rgba(255,255,255,0.9);
  text-align: center;
  border-radius: 10px;
}
.modalWindow-check p{
  padding-top: 20px;
  padding-bottom:20px;
  font-size: 20px;
  font-weight:bold;
  color:#5867EC;
}
.cancel-card{
  width:80%;
  margin:auto;
}
.cancel-table{
  width:90%;
}
tr,th,td{
  padding:10px;
}
tr{
  border-bottom: 1px solid #5867EC;
}
th{
  padding-left:0px;
}
.not-cancel-button{
  margin:40px auto;
  height: 50px;
  width:200px;
  border-radius: 10px;
  background-color: #5867EC;
  color:azure;
  font-weight: bold;
  cursor: pointer;
  display: block;
}
.cancel-button{
  height: 50px;
  width:200px;
  border-radius: 10px;
  background-color: #5867EC;
  color:azure;
  font-weight: bold;
  cursor: pointer;
  display:block;
  margin: auto;
}
.modalWindow-canceled{
  z-index: 10;
  width: 50%;
  height: 20%;
  background-color:rgba(255,255,255,0.9);
  text-align: center;
  border-radius: 10px;
}
.modalWindow-canceled h1{
  margin-top:20px;
}
.modalWindow-canceled p{
  padding-top:30px;
  cursor: pointer;
  color: #5867EC;
  text-decoration: underline;
}
</style>