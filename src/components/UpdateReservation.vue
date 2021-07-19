<template>
  <div>
    <div class="modal-window">
      <div class="reservation-region">
        <div class="reservation-card">
          <div class="reservation-card-header">
            <p>変更前の予約内容</p>
          </div>
          <table class="reservation-table">
            <tr>
              <th>Restaurant:</th>
              <td>{{updateInfomation.restaurant.name}}</td>
            </tr>
            <tr>
              <th>日にち(Date):</th>
              <td>{{updateInfomation.date}}</td>
            </tr>
            <tr>
              <th>時間(Time):</th>
              <td>{{updateInfomation.time}}</td>
            </tr>
            <tr>
              <th>人数(Number):</th>
              <td>{{updateInfomation.num_users}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="Reservation-form">
        <ReservationForm :updateInfomation="updateInfomation" @closeUpdateModalToChild="$emit('closeUpdateModalToParent')"/>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationForm from "../components/ReservationForm"
export default {
  props:["updateInfomation"],
  components:{
    ReservationForm
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped>
.modal-window{
  z-index: 1;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}
.reservation-region{
  width: 50%;
  height:50%;
}
.reservation-card{
  width: 400px;
  margin:auto;
  border-radius: 10px;
  background-color: aliceblue;
}
.reservation-card-header{
  height: 30px;
  background-color: #5867EC;
  text-align: center;
  border-radius: 10px 10px 0 0;
}
.reservation-card-header p{
  font-size: 18px;
  font-weight: bold;
  color: aliceblue;
  line-height: 30px;
}
.reservation-table{
  width: 90%;
  margin:auto;
}
table th,td{
  padding:20px;
}
table tr{
  border-bottom: 1px solid #5867EC;
}
.reservation-form{
  width: 50%;
  background-color: black;
}
.reservation{
  width: 500px;
  margin-right: 0;
  margin-left: 0;
}
</style>