<template>
  <div class="container mx-auto pt-5 bg-gray-200">
    <h4 class="text-center sm:text-right sm:pr-10 font-bold mb-2">
      更新時間: {{ percentTimecode }}
    </h4>
    <div
      class="
        Vaccinetitle
        bg-gray-200
        text-center
        sm:text-left sm:flex sm:justify-between
        font-bold
        pt-4
        mb-8
        px-4
        ld:px-8
      "
    >
      <h2 class="mb-8 sm:mb-0 px-4">
        <span class="pb-1 font-bold text-3xl border-b-4 border-blue-500"
          >疫苗累積接種人數</span
        >
      </h2>
      <!--計算疫苗覆蓋率-->
      <div class="text-bold text-2xl sm:flex items-center">
        <fa :icon="['fas', 'syringe']" /> 疫苗覆蓋率
        <p class="text-5xl text-blue-500 ml-3">
          {{ ((totalShot / 23430948) * 100).toFixed(2) }}
          <span class="text-3xl">%</span>
        </p>
      </div>
    </div>
    <div
      class="
        section
        AllVaccine
        text-center
        grid grid-rows-1 grid-cols-1
        sm:grid-cols-2
        ld:grid-cols-4
        gap-x-10 gap-y-12
        sm:gap-y-20
        pb-6
        px-6
        justify-end
      "
    >
      <div
        class="AllVaccineCard text-center shadow-md border-t-2 border-gray-300 "
        v-for="(item, i) in Alldata"
        :key="i"
      >
        <h2 class="text-bold text-xl mt-4 wordBreak" >
          <fa :icon="['fas', 'syringe']"  /> {{ item.a03 }}
        </h2>
        <h4 class="text-4xl text-yellow-500 mt-6 mb-4 ">
          {{ item.a06 }} <span class="text-3xl">人</span>
        </h4>
      </div>
    </div>

    <!--pc layout  電腦版型-->
    <div class="section pcLayout hidden sm:block">
      <div class="title text-right py-4 mr-8 font-bold">
        <h2>(滑鼠滑到想看的地區上 即可跑出地區相關資訊)</h2>
        <h2>更新時間: {{ cityTimecode }}</h2>
      </div>
      <div
        class="
          content
          grid grid-rows-1 grid-cols-1
          sm:grid-cols-2
          ld:grid-cols-3
          xl:grid-cols-4
          gap-12
          ld:gap-20
          py-8
          px-10
          ld:px-16
          bg-gray-200
        "
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
            class="my-14 py-4 CoverPage text-5xl text-white font-bold mx-auto"
          >
            {{ item.a02 }}
          </h2>
          <ul class="VaccineList bg-white p-8 ">
        <li class="text-4xl font-bold mb-10">縣市: {{ item.a02 }}</li>
            <li class="my-2 font-medium text-xl"><div >
            <fa :icon="['fas', 'syringe']" /> 第一劑
            </div>
          <div class="inline-block"> 疫苗覆蓋率: <strong class="text-red-600 text-2xl">{{ item.a04 }}%</strong></div>
            </li>
             <li class="my-2 mt-4 font-medium text-xl"><div >
            <fa :icon="['fas', 'syringe']" /> 第二劑
            </div>
          <div class="inline-block"> 疫苗覆蓋率: <strong class="text-red-600 text-2xl">{{ item.a05 }}%</strong></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--mobile layout  手機板型-->

    <div class="section mobileLayout sm:hidden">
         <div class="text-center py-4 font-bold">
        <h2>更新時間: {{ cityTimecode }}</h2>
      </div>
      <div
        class="
          content
          grid grid-rows-1 grid-cols-1
          sm:grid-cols-2
          ld:grid-cols-4
          gap-12
          ld:gap-20
          py-8
          px-10
          ld:px-16
          bg-gray-200
        "
      >
        <div
          class="
            moblieVaccineCard
            border-2 border-solid border-blue-700
            text-white
            font-bold
          "
          v-for="(item, i) in data"
          :key="i"
        >
          <ul class="moblieVaccineList p-8 blur">
            <li class="text-4xl font-bold mb-10">縣市: {{ item.a02 }}</li>
            <li class="my-2 font-medium text-xl"><div class="div">
            <fa :icon="['fas', 'syringe']" /> 第一劑
            </div>
          <div class="inline-block"> 疫苗覆蓋率: <strong class="text-2xl ml-1">{{ item.a04 }}%</strong></div>
            </li>
             <li class="my-2 mt-4 font-medium text-xl"><div class="div">
            <fa :icon="['fas', 'syringe']" /> 第二劑
            </div>
          <div class="inline-block"> 疫苗覆蓋率: <strong class="text-2xl ml-1">{{ item.a05 }}%</strong></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      cityTimecode: "", //縣市疫苗情況  更新的時間
      Alldata: [],
      percentTimecode: "", //疫苗覆蓋率  更新的時間
      totalShot: 0,
    }
  },
  methods: {
    async getCovidVaccine() {
      try {
        const self = this
        const res = await this.$axios.$get(
          "https://info-covid19-project.herokuapp.com/api/covidVaccine"
        )
        // const res = await this.$axios.$get("http://localhost:3000/api/covidVaccine")  //本地端
        self.cityTimecode = res.data[0].a01
        // console.log("time: ", self.cityTimecode) //抓取 最近的更新時間
        const filteredData = res.data.filter(item => {
          return item.a01 == self.cityTimecode && item.a03 == '總計' //抓取 最近的所有資料
        })
        self.data = filteredData
        // console.log("data: ", self.data) 
      } catch (error) {
        console.log("error: ", error)
      }
    },
    async getCovidVaccineAll() {
      try {
        const self = this
        // const res = await this.$axios.$get("http://localhost:3000/api/covidVaccineAll") //本地端
         const res = await this.$axios.$get(
          "https://info-covid19-project.herokuapp.com/api/covidVaccineAll"
         )
        //  console.log("Alldata: ", res)
        const popData = res.data
        self.percentTimecode = popData.pop().a02 //抓取 最近更新的時間
        // console.log('today:', self.percentTimecode)
        const filteredAllData = res.data.filter(item => {
          return item.a02 == self.percentTimecode //抓取 最近的一筆資料
        })
        self.Alldata = filteredAllData
        for (let i = 0; i < self.Alldata.length; i++) {
          self.totalShot = self.totalShot + parseInt(self.Alldata[i].a04) //加總疫苗總數量 要計算疫苗覆蓋率
        }
        //   console.log('self.totalShot:', self.totalShot)
        // console.log('filterDone', self.Alldata)
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
.VaccineCard {
  background-image: url(../../assets/Vaccine-city.jpg);
  background-size: cover;
  background-position: center center;
}
.VaccineCard:hover {
  //hover 的時候  會有效果
  background-image: none;
  background-color: white;
  transition: 0.3s ease;
  .CoverPage {
    display: none;
  }
  .VaccineList {
    //hover 的時候  會橫移一個區塊顯示資訊
    z-index: 2;
    position: absolute;
    transform: translate(-35px, -30px);
    transition: 0.5s ease;
    border: 3px skyblue solid;
  }
}
.moblieVaccineCard {
  background-image: url(../../assets/mobile-city.jpg);
  background-size: cover;
}
.blur {
  backdrop-filter: blur(2px); //毛玻璃特效
}
.wordBreak{
  word-break:break-all;
}
</style>
