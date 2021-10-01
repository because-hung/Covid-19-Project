<template>
  <div>
    <div class="Taiwntitle justify-between font-bold py-4 bg-gray-200 px-4">
       <h4 class="text-center md:text-right md:pr-10 font-bold mb-6">更新時間: {{ timecode }}</h4>
       
      <div class="info text-center md:text-left md:flex justify-between px-4 md:px-8">
        <h2 class="mb-6 md:mb-0"><span  class=" pb-1 font-bold text-3xl border-b-4 border-yellow-500">台灣各地區總確診人數</span></h2>
        <div class="totalplus   sm:flex justify-evenly  sm:mt-0">
        <h2 class="mt-6  sm:mt-0 mb-2 ld:mb-0  font-bold text-3xl ld:pr-6">境外人數+ <span class="text-red-500 text-5xl"> {{addData[0]}}</span></h2>
        <h2 class="mt-6 sm:mt-0 font-bold text-3xl ld:pr-6">本土人數+ <span class="text-red-500 text-5xl"> {{total}}</span></h2>
  
</div>  
</div>
   
    </div>

<div class="section grid grid-cols-1 sm:grid-cols-2 ld:grid-cols-4 gap-x-20 gap-y-10 bg-gray-200  px-8 pb-8">
  <div class="
  CountryCard
  mt-10
  border-2 
  border-black
  rounded-3xl
  text-center
  opacity-80
 
  "  
  v-for="(item, i) in data"
  :key="i"
  >
    <h2 class=" CountryTitle text-xl border-b-2 border-black bg-green-300 font-bold  rounded-full  py-2 "
    :class="{ 'plusColor': addData[i]}"
    >{{item.a03}}</h2>
    
    <div class="peopleNum justify-center">
    <h2 class="Num text-5xl text-blue-700 my-4 font-bold opacity-100 ">{{item.a06}}</h2>
     <h3  class="plusNum font-bold text-3xl ld:ml-0 ld:text-4xl text-red-700 font-mono" v-if="addData[i]">+{{addData[i]}}</h3>
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
            plusData:[],
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
        const SetAry = [...new Set(forData)]
      const findData = []
for(let i=0;i<SetAry.length;i++){
let found = filterAry.find(element => element.a03 == SetAry[i] );
findData.push(found);
}
// findData.shift();
self.data = findData;
self.timecode = findData[0].a02
self.data.map((element) => {
  if (element.a02 == self.timecode ){
  self.addData.push(element.a05)
  self.plusData.push(element.a05)
  }
  else{
      self.addData.push(0)
      self.plusData.push(0)
  }
})
self.plusData.shift()
self.total = self.plusData.reduce((acc, cur)=>{
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

<style lang="scss">
button{
  border: 3px solid black;
}
.peopleNum{
  position: relative;
}
.plusNum{
position:absolute;
right: 7%;
top: 45%;
}
.plusColor{
  background: #FF2D2D;
}
.CountryCard{
     background-image: url(../../assets/country02.jpg);
     background-size: cover;
     background-position: center center;
}

</style>
