<template>
  <div class="header" @click="transitionHome">
  </div>
</template>

<script>
export default {
  methods:{
    transitionHome(){
      this.$router.push({name:'Home'})
    }
  }
}
</script>

<style scoped>
.header{
  width: 160px;
  height: 40px;
  margin: 30px;
  margin-left: 170px;
  background: url(../assets/Group2.png) no-repeat;
  background-size: contain;
  cursor: pointer;
}
</style>
