<template>
  <div>
    <div class="Taiwntitle justify-between font-bold py-4 bg-gray-200 px-4">
       <h4 class="text-center md:text-right md:pr-10 font-bold mb-6">更新時間: {{ timecode }}</h4>
       
      <div class="info text-center md:text-left md:flex justify-between px-4 md:px-8">
        <h2 class="mb-6 md:mb-0"><span  class=" pb-1 font-bold text-3xl border-b-4 border-yellow-500">台灣各地區總確診人數</span></h2>
        <div class="totalplus   sm:flex justify-evenly  sm:mt-0">
        <h2 class="mt-6  sm:mt-0 mb-2 ld:mb-0  font-bold text-3xl ld:pr-6">境外人數+ <span class="text-red-500 text-5xl"> {{foreignPlus}}</span></h2>
        <h2 class="mt-6 sm:mt-0 font-bold text-3xl ld:pr-6">本土人數+ <span class="text-red-500 text-5xl"> {{TaiwanPlus}}</span></h2>
  
</div>  
</div>
   
    </div>

<div class="section grid grid-cols-1 sm:grid-cols-2 ld:grid-cols-3 lg:grid-cols-4 gap-x-20 gap-y-10 bg-gray-200  px-8 pb-8">
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
    :class="{ 'plusColor': plusData[i]}"
    >{{item.a03}}</h2> <!--有增加確診人數 title就會變顏色-->
    
    <div class="peopleNum justify-center">
    <h2 class="Num text-5xl text-blue-700 my-4 font-bold opacity-100 ">{{item.a06}}</h2>
     <h3  class="plusNum font-bold text-3xl ld:ml-0 ld:text-4xl text-red-700 font-mono" v-if="plusData[i]">+{{plusData[i]}}</h3>
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
            timecode:'', //更新的時間
            plusData:[],  //新增確診人數的Data (含境外移入 做title變色 跟 新增人數數量的提示)
            TaiwanplusData:[],  //本土確診人數的Data (未含境外移入 做本土reduce 總和計算)
            TaiwanPlus: 0, //本土確診人數的總和
            foreignPlus: 0
        }
    },
  methods: {
    async getCovidCountry () {
      try {
        const self = this
        const limited = '全部縣市'
        // const limited = '台中市'
        const res = await this.$axios.$get(`https://git.heroku.com/project-covid-info.herokuapp.com/api/covidCountry?limited=${limited}`)
        // const res = await this.$axios.$get(`http://localhost:3000/api/covidCountry?limited=${limited}`)
        const filterAry = res.data.filter(item => {  //抓取縣市全區總人數
          return item.a04 == '全區' 
        })
       const dataAry = Array.from(filterAry) //物件轉陣列
        console.log("data: ", dataAry)
        const forData = []

       filterAry.forEach((item)=>{
         return forData.push(item.a03) // 抓取縣市名稱 之後要做比對過濾用
       })
        const SetAry = [...new Set(forData)]  //轉陣列
      const findData = []
for(let i=0;i<SetAry.length;i++){
let found = filterAry.find(element => element.a03 == SetAry[i] ); // 比對過濾  抓出最近的一筆資料
findData.push(found);
}
// findData.shift();
self.data = findData;
self.timecode = findData[0].a02 //抓更新的時間
self.data.map((element) => { 
  if (element.a02 == self.timecode ){  //抓取增加的人數 (為右下角紅色新增人數的數字)
  self.plusData.push(element.a05)
  }
  else{
      self.plusData.push(0)
  }
})

self.data.map((element) => {   //去掉境外移入 拿到本土人數
  if (element.a02 == self.timecode && element.a03 !== '境外移入' ){ 
  self.TaiwanplusData.push(element.a05)
  }else if(element.a03 == '境外移入'){
  self.foreignPlus = element.a05  //抓取 境外移入人數
  }
  else{
      self.TaiwanplusData.push(0)
  }
})

self.TaiwanPlus = self.TaiwanplusData.reduce((acc, cur)=>{ //本土確診人數總和
  return parseInt(acc) + parseInt(cur)
})
console.log('data:', self.data)
console.log('timecode:', self.timecode)
console.log('plus:', self.plusData)
console.log('TaiwanPlusTotal:', self.TaiwanplusData)
console.log('TaiwanPlus:', self.TaiwanPlus)
console.log('foreignPlus:', self.foreignPlus)
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
.plusNum{  //增加人數 數字的位置
position:absolute;
right: 7%;
top: 45%;
}
.plusColor{  //有增加確診人數  就會變顏色
  background: #FF2D2D;
}
.CountryCard{
     background-image: url(../../assets/country02.jpg);
     background-size: cover;
     background-position: center center;
}

</style>
