<template>
  <div class="container mx-auto pt-5 bg-gray-200">
      <h4 class="text-center sm:text-right sm:pr-10 font-bold mb-2">更新時間: {{ todayTimecode }}</h4>
    <div class="Vaccinetitle bg-gray-200 text-center sm:text-left sm:flex sm:justify-between font-bold pt-4 mb-8 px-4 ld:px-8">
      <h2 class=" mb-8 sm:mb-0 px-4"><span class="pb-1 font-bold text-3xl border-b-4 border-blue-500">疫苗累積接種人數</span></h2>
    <div class="text-bold text-2xl sm:flex items-center "><fa :icon="['fas', 'syringe']" /> 疫苗覆蓋率<p class="text-5xl text-blue-500 ml-3">{{(totalShot / 23451837 *100 ).toFixed(2)}} <span class="text-3xl">%</span></p></div>
    
    
    </div>
    <div class="section AllVaccine text-center grid grid-rows-1 grid-cols-1 sm:grid-cols-2 ld:grid-cols-4  gap-x-10 gap-y-20 pb-6 px-6 justify-end">
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
    <div class="title bg-gray-200 text-right pt-4 pr-8 font-bold">
      <h2>(滑鼠滑到想看的地區上 即可跑出地區相關資訊)</h2>
      <h2>更新時間: {{ timecode }}</h2>
    </div>
    <div
      class="content grid grid-rows-1 grid-cols-1 sm:grid-cols-2 ld:grid-cols-4 gap-12 ld:gap-20 py-8 px-10 ld:px-16 bg-gray-200"
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
          <!-- <li class="mb-2 font-medium">
            <fa :icon="['fas', 'syringe']" /> 累計配送量 (劑): {{ item.a07 }}劑
            <div class="categories">
              <h6>az: {{ item.a13 }}劑</h6>
              <h6>moderna: {{ item.a19 }}劑</h6>
            </div>
          </li>
          <li class="mb-2 font-medium">
            <fa :icon="['fas', 'syringe']" /> 剩餘量 (劑): {{ item.a08 }}劑
            <div class="categories">
              <h6>az: {{ item.a14 }}劑</h6>
              <h6>moderna: {{ item.a20 }}劑</h6>
            </div>
          </li> -->
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
</template>

<script>
// import axios from 'axios'
// import res from '../api/Covid.json'
export default {
  data() {
    return {
      data: [],
      timecode: "",
      Alldata: [],
      todayTimecode: "",
      totalShot: 0,
      screenWidth: 0
    }
  },
  methods: {
    async getCovidVaccine() {
      try {
        const self = this
        // const res = await this.$axios.$get(
        //   "https://blooming-basin-20592.herokuapp.com/api/covidVaccine"
        // )
        const res = await this.$axios.$get("http://localhost:3000/api/covidVaccine")
        self.timecode = res.data[0].a01
        console.log("time: ", self.timecode)
        const filteredData = res.data.filter(item => {
          return item.a01 == self.timecode
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
        const res = await this.$axios.$get("http://localhost:3000/api/covidVaccineAll")
        console.log("Alldata: ", res)
        const popData = res.data
        self.todayTimecode = popData.pop().a02
        console.log('today:', self.todayTimecode)
         const filteredAllData = res.data.filter(item => {
          return item.a02 == self.todayTimecode
        })
        self.Alldata = filteredAllData
        for(let i=0;i<self.Alldata.length;i++)
        {
        self.totalShot = self.totalShot + parseInt(self.Alldata[i].a04)
        }
          console.log('self.totalShot:', self.totalShot)
        console.log('filterDone', self.Alldata)
      } catch (error) {
        console.log("error: ", error)
      }
    },
    getMobileScreen() {
      this.screenWidth = screen.width
      console.log("screenWidth:", this.screenWidth)
    }
  },
  created() {
    this.getCovidVaccine()
    this.getCovidVaccineAll()
   
  },
  mounted() {
 this.getMobileScreen()
  }
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
.VaccineCard:hover {
   background-image: none;
  background-color: white;
  transition: 0.3s ease;
  .CoverPage {
    display: none;
  }
  .VaccineList {
    z-index: 2;
    transform: translate(-30px, -30px);
    transition: 0.5s ease;
    border: 3px skyblue solid;
   
  }
}


</style>
