<template>
  <div class="container mx-auto pt-5 bg-gray-200">
      <h4 class="text-center sm:text-right sm:pr-10 font-bold mb-2">更新時間: {{ percentTimecode }}</h4>
    <div class="Vaccinetitle bg-gray-200 text-center sm:text-left sm:flex sm:justify-between font-bold pt-4 mb-8 px-4 ld:px-8">
      <h2 class=" mb-8 sm:mb-0 px-4"><span class="pb-1 font-bold text-3xl border-b-4 border-blue-500">疫苗累積接種人數</span></h2>
       <!--計算疫苗覆蓋率-->
    <div class="text-bold text-2xl sm:flex items-center "><fa :icon="['fas', 'syringe']" /> 疫苗覆蓋率<p class="text-5xl text-blue-500 ml-3">{{(totalShot / 23430948 *100 ).toFixed(2)}} <span class="text-3xl">%</span></p></div>
   
    
    </div>
    <div class="section AllVaccine text-center grid grid-rows-1 grid-cols-1 sm:grid-cols-2 ld:grid-cols-4  gap-x-10 gap-y-12 sm:gap-y-20 pb-6 px-6 justify-end">
      <div class="
      AllVaccineCard
      text-center
      shadow-md
      border-t-2
      border-gray-300
      "
        v-for="(item, i) in Alldata"
        :key="i"
      >
     <h2 class="text-bold text-xl mt-4"><fa :icon="['fas', 'syringe']" /> {{item.a03}} </h2>
     <h4 class="text-5xl text-yellow-500 mt-6 mb-4">{{item.a06}} <span class="text-3xl">人</span></h4>
     
      </div>
     
      
    </div>

    <!--pc layout  電腦版型-->
    <div class="section pcLayout hidden sm:block">
    <div class="title bg-gray-200 text-right py-4 pr-8 font-bold">
      <h2>(滑鼠滑到想看的地區上 即可跑出地區相關資訊)</h2>
      <h2>更新時間: {{ countyTimecode }}</h2>
    </div>
    <div
      class="content grid grid-rows-1 grid-cols-1 sm:grid-cols-2  ld:grid-cols-3 lg:grid-cols-4  gap-12 ld:gap-20 py-8 px-10 ld:px-16 bg-gray-200"
    >
      <div
        class="
          VaccineCard
          border-2 border-dashed border-black
          bg-black
          text-black
          flex flex-col
        "
        v-for="(item, i) in data"
        :key="i"
      >
        <h2
          class="
            my-20
            py-4
            CoverPage
            text-5xl
            text-white
            font-bold
            mx-auto
          "
        >
          {{ item.a02 }}
        </h2>
        <ul class="VaccineList bg-white p-8">
          <li class="text-2xl font-medium mb-4">縣市: {{ item.a02 }}</li>
          <li class="mb-2 font-medium">
            <fa :icon="['fas', 'syringe']" />
            累積接種人次: {{ item.a05 }}人
            <div>
              <h6 class="categories">az: {{ item.a11 }}人</h6>
              <h6 class="categories">moderna: {{ item.a17 }}人</h6>
            </div>
          </li>
          <li class="mb-2 font-medium">
            <fa :icon="['fas', 'syringe']" /> 疫苗覆蓋率 (%): {{ item.a06 }}%
            <div class="categories">
              <h6>az: {{ item.a12 }}%</h6>
              <h6>moderna: {{ item.a18 }}%</h6>
            </div>
          </li>
          <li>
            <fa :icon="['fas', 'syringe']" /> 剩餘量 (%): {{ item.a09 }}%
            <div class="categories">
              <h6>az: {{ item.a15 }}%</h6>
              <h6>moderna: {{ item.a21 }}%</h6>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </div>
    <!--mobile layout  手機板型-->

     <div class="section mobileLayout sm:hidden">

    <div
      class="content grid grid-rows-1 grid-cols-1 sm:grid-cols-2 ld:grid-cols-4 gap-12 ld:gap-20 py-8 px-10 ld:px-16 bg-gray-200"
    >
      <div
        class="
          moblieVaccineCard
          border-2 border-solid border-blue-700
          text-white
 
        "
        v-for="(item, i) in data"
        :key="i"
      >
     
        <ul class="moblieVaccineList p-8 blur">
          <li class="text-4xl font-bold mb-4">縣市: {{ item.a02 }}</li>
          <li class="mb-2 font-medium">
            <fa :icon="['fas', 'syringe']" />
            累積接種人次: {{ item.a05 }}人
            <div>
              <h6 class="categories">az: {{ item.a11 }}人</h6>
              <h6 class="categories">moderna: {{ item.a17 }}人</h6>
            </div>
          </li>
          <li class="mb-2 font-medium">
            <fa :icon="['fas', 'syringe']" /> 疫苗覆蓋率 (%): {{ item.a06 }}%
            <div class="categories">
              <h6>az: {{ item.a12 }}%</h6>
              <h6>moderna: {{ item.a18 }}%</h6>
            </div>
          </li>
          <li>
            <fa :icon="['fas', 'syringe']" /> 剩餘量 (%): {{ item.a09 }}%
            <div class="categories">
              <h6>az: {{ item.a15 }}%</h6>
              <h6>moderna: {{ item.a21 }}%</h6>
            </div>
          </li>
        </ul>
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
      countyTimecode: "",  //縣市疫苗情況  更新的時間
      Alldata: [],
      percentTimecode: "",  //疫苗覆蓋率  更新的時間
      totalShot: 0,
    }
  },
  methods: {
    async getCovidVaccine() {
      try {
        const self = this
        const res = await this.$axios.$get(
          "https://git.heroku.com/info-covid19-project.herokuapp.com/api/covidVaccine")
        // const res = await this.$axios.$get("http://localhost:3000/api/covidVaccine")
        self.countyTimecode = res.data[0].a01
        console.log("time: ", self.countyTimecode) //抓取 最近的更新時間
        const filteredData = res.data.filter(item => { 
          return item.a01 == self.countyTimecode  //抓取 最近的一筆資料
        })
        self.data = filteredData
        console.log("data: ", self.data)
      } catch (error) {
        console.log("error: ", error)
      }
    },
    async getCovidVaccineAll() {
      try {
        const self = this
        // const res = await this.$axios.$get(
        //   "https://blooming-basin-20592.herokuapp.com/api/covidVaccine"
        // )
        // const res = await this.$axios.$get("http://localhost:3000/api/covidVaccineAll")
       const res = await this.$axios.$get(
          "https://git.heroku.com/info-covid19-project.herokuapp.com/api/covidVaccineAll")
       console.log("Alldata: ", res)
        const popData = res.data
        self.percentTimecode = popData.pop().a02 //抓取 最近更新的時間
        console.log('today:', self.percentTimecode)
         const filteredAllData = res.data.filter(item => {
          return item.a02 == self.percentTimecode   //抓取 最近的一筆資料
        })
        self.Alldata = filteredAllData
        for(let i=0;i<self.Alldata.length;i++)
        {
        self.totalShot = self.totalShot + parseInt(self.Alldata[i].a04) //加總疫苗總數量 要計算疫苗覆蓋率
        }
          console.log('self.totalShot:', self.totalShot)
        console.log('filterDone', self.Alldata)
      } catch (error) {
        console.log("error: ", error)
      }
    },
  },
  created() {
    this.getCovidVaccine()
    this.getCovidVaccineAll()
   
  },
}
</script>

<style lang="scss">
button {
  border: 3px solid black;
}
.categories {
  text-indent: 25px;
}
.CoverPage {
  writing-mode: vertical-lr;
}
.VaccineList {
  position: absolute;
  z-index: -1;
}
.VaccineCard{
background-image: url(../../assets/country03.jpg);
     background-size: cover;
     background-position: center center;
}
.VaccineCard:hover {  //hover 的時候  會有效果
   background-image: none;
  background-color: white;
  transition: 0.3s ease;
  .CoverPage {
    display: none;
  }
  .VaccineList {  //hover 的時候  會橫移一個區塊顯示資訊
    z-index: 2;
    transform: translate(-30px, -30px);
    transition: 0.5s ease;
    border: 3px skyblue solid;
   
  }
}
.moblieVaccineCard{
  background-image: url(../../assets/country01.jpg);
     background-size: contain;
   

}
.blur{
 backdrop-filter: blur(2px);  //毛玻璃特效
}

</style>
