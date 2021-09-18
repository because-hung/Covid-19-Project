<template>
  <div>
    <div class="Taiwntitle flex justify-between font-bold mt-8 mb-10">
      <div class="info flex justify-between ">
   <h2 class="ml-2 pb-1 font-bold text-3xl border-b-4 border-yellow-500">台灣各地區總確診人數</h2>
      <h2 class="ml-28  font-bold text-3xl ">本土人數+ <span class="text-red-500 text-5xl"> {{total}}</span></h2>
      </div>
    <span class="mr-2 mt-4 font-bold ">更新時間: {{ timecode }}</span>
    </div>

<div class="section grid grid-rows-1 grid-cols-4 gap-20">
  <div class="
  CountryCard
  mt-10
  border-2 
  border-black
  rounded-3xl
  text-center
  bg-gray-200
  opacity-80
 
  "  
  v-for="(item, i) in data"
  :key="i"
  >
    <h2 class=" CountryTitle text-xl border-b-2 border-black bg-yellow-300 font-bold  rounded-full  py-2 "
    :class="{ 'plusColor': addData[i]}"
    >{{item.a03}}</h2>
    
    <div class="peopleNum justify-center">
    <h2 class="text-5xl text-blue-700 py-4 font-bold opacity-100 ">{{item.a06}}</h2>
     <h3  class="plusNum font-bold text-4xl text-red-700 font-mono" v-if="addData[i]">+{{addData[i]}}</h3>
     </div>

  </div>
  </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import res from '../api/Covid.json'
export default {
    data() {
        return {
            data: [],
            timecode:'',
            addData:[],
            total: 0
        }
    },
  methods: {
    async getCovidCountry () {
      try {
        const self = this
        const limited = '全部縣市'
        // const limited = '台中市'
        // const res = await this.$axios.$get(`https://blooming-basin-20592.herokuapp.com/api/covidCountry?limited=${limited}`)
        const res = await this.$axios.$get(`http://localhost:3000/api/covidCountry?limited=${limited}`)
        const filterAry = res.data.filter(item => {
          return item.a04 == '全區'
        })
       const dataAry = Array.from(filterAry)
        console.log("data: ", dataAry)
        const forData = []

       filterAry.forEach((item)=>{
         return forData.push(item.a03)
       })
        // for(let i=0;i<filterAry.length;i++){
        //     forData.push(filterAry[i].a03)    //change
        // }
        const SetAry = [...new Set(forData)]
      const findData = []
for(let i=0;i<SetAry.length;i++){
let found = filterAry.find(element => element.a03 == SetAry[i] );
findData.push(found);
}
findData.shift();
self.data = findData;
self.timecode = findData[0].a02
self.data.map((element) => {
  if (element.a02 == self.timecode ){
  self.addData.push(element.a05)
  }
  else{
      self.addData.push(0)
  }
})
self.total = self.addData.reduce((acc, cur)=>{
  return parseInt(acc) + parseInt(cur)
})
console.log('data:', self.data)
console.log('timecode:', self.timecode)
console.log('plus:', self.addData)
console.log('total:', self.total)
      } catch (error) {
        console.log('error: ', error)
      }
     
      // const api = ''
    },
  },
  created () {
    this.getCovidCountry()
  }
}
</script>

<style>
button{
  border: 3px solid black;
}
.peopleNum{
  position: relative;
}
.plusNum{
position:absolute;
right: 8%;
top: 45%;
}
.plusColor{
  background: #FF2D2D;
}
</style>
