<template>
  <div class="container mx-auto pt-5 bg-gray-200">
    <loading :active.sync="isLoading"></loading>
    <h4 class="text-center ld:text-right ld:pr-10 font-bold">
      更新時間: {{ percentTimeCode }}
    </h4>
    <div
      class="
        vaccineTitle
        bg-gray-200
        text-center
        sm:text-left sm:flex sm:justify-between
        font-bold
        mb-6
        px-4
        ld:px-8
      "
    >
      <h2 class="my-6 sm:mb-0 px-4 self-center">
        <span class="pb-1 font-bold text-3xl border-b-4 border-blue-500"
          >疫苗累積接種人數</span
        >
      </h2>
      <!-- 計算疫苗覆蓋率 -->
      <div class="text-bold text-2xl md:flex items-center mt-6">
        <fa :icon="['fas', 'syringe']" /> 疫苗覆蓋率:
        <div class="shotGroup ml-4 md:mt-0 mt-5">
          <p class="text-3xl text-blue-500 mx-3 mt-3 md:mt-0">
            第一劑:
            <span class="text-4xl text-red-500"
              >{{ totalShotPercent.a04 }} %</span
            >
          </p>
          <p class="text-3xl text-blue-500 mx-3 mt-3 md:mt-0">
            第二劑:
            <span class="text-4xl text-red-500"
              >{{ totalShotPercent.a05 }} %</span
            >
          </p>
           <p class="text-3xl text-blue-500 mx-3 mt-3 md:mt-0">
            第三劑:
            <span class="text-4xl text-red-500"
              >{{ totalShotPercent.a07 }} %</span
            >
          </p>
        </div>
      </div>
    </div>
    <div
      class="
        section
        allVaccine
        text-center
        grid grid-rows-1 grid-cols-1
        sm:grid-cols-2
        ld:grid-cols-4
        gap-x-10 gap-y-12
        sm:gap-y-20
        p-6
        justify-end
      "
    >
      <div
        class="allVaccineCard text-center shadow-md border-t-2 border-gray-300"
        v-for="(item, i) in totalShotData"
        :key="i"
      >
        <h2 class="text-bold text-xl mt-4 wordBreak">
          <fa :icon="['fas', 'syringe']" /> {{ item.a03 }}
        </h2>
        <h4 class="text-4xl text-yellow-500 mt-6 mb-4">
          {{ item.a06 }} <span class="text-3xl">人</span>
        </h4>
      </div>
    </div>

    <!-- pc layout 電腦版型 -->
    <div class="section pcLayout hidden sm:block">
      <div class="title text-center ld:text-right py-4 mr-8 font-bold">
        <h2>滑鼠滑到想看的地區上即可跑出資訊</h2>
        <h2>(使用平板的話 請手指到想看的地區上長按)</h2>
        <h2>更新時間: {{ cityTimeCode }}</h2>
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
          py-10
          px-10
          ld:px-16
          bg-gray-200
        "
      >
        <div
          class="
            vaccineCard
            border-2 border-dashed border-black
            bg-black
            text-black
            flex flex-col
          "
          v-for="(item, i) in cityData"
          :key="i"
        >
          <h2
            class="my-14 py-8 coverPage text-5xl text-white font-bold mx-auto"
          >
            {{ item.a02 }}
          </h2>
          <ul class="vaccineList bg-white p-8 md:px-12 lg:px-8">
            <li class="text-4xl font-bold mb-10">縣市: {{ item.a02 }}</li>
            <li class="my-2 font-medium text-xl">
              <div><fa :icon="['fas', 'syringe']" /> 第一劑</div>
              <div class="inline-block">
                疫苗覆蓋率:
                <strong class="text-red-600 text-2xl">{{ item.a04 }}%</strong>
              </div>
            </li>
            <li class="my-2 mt-4 font-medium text-xl">
              <div><fa :icon="['fas', 'syringe']" /> 第二劑</div>
              <div class="inline-block">
                疫苗覆蓋率:
                <strong class="text-red-600 text-2xl">{{ item.a05 }}%</strong>
              </div>
            </li>
             <li class="my-2 mt-4 font-medium text-xl">
              <div><fa :icon="['fas', 'syringe']" /> 第三劑</div>
              <div class="inline-block">
                疫苗覆蓋率:
                <strong class="text-red-600 text-2xl">{{ item.a07 }}%</strong>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- mobile layout 手機板型 -->

    <div class="section mobileLayout sm:hidden">
      <div class="text-center py-4 font-bold">
        <h2>更新時間: {{ cityTimeCode }}</h2>
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
          v-for="(item, i) in cityData"
          :key="i"
        >
          <ul class="moblieVaccineList p-8 blur">
            <li class="text-4xl font-bold mb-10">縣市: {{ item.a02 }}</li>
            <li class="my-2 font-medium text-xl">
              <fa :icon="['fas', 'syringe']" /> 第一劑
              <div class="inline-block">
                疫苗覆蓋率:
                <strong class="text-2xl ml-1">{{ item.a04 }}%</strong>
              </div>
            </li>
            <li class="my-2 mt-4 font-medium text-xl">
              <fa :icon="['fas', 'syringe']" /> 第二劑
              <div class="inline-block">
                疫苗覆蓋率:
                <strong class="text-2xl ml-1">{{ item.a05 }}%</strong>
              </div>
            </li>
            <li class="my-2 mt-4 font-medium text-xl">
              <fa :icon="['fas', 'syringe']" /> 第三劑
              <div class="inline-block">
                疫苗覆蓋率:
                <strong class="text-2xl ml-1">{{ item.a07 }}%</strong>
              </div>
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
      cityData: [], // 各縣市疫苗覆蓋率
      cityTimeCode: "", // 縣市疫苗情況更新的時間
      totalShotData: [], // 疫苗總施打人數
      percentTimeCode: "", // 疫苗覆蓋率更新的時間
      totalShotPercent: [], // 總覆蓋率
      isLoading: false
    }
  },
  methods: {
    async getCovidVaccine() {
      this.isLoading = true;
      try {
        const self = this
        const res = await this.$axios.$get(
          "https://covid-project.onrender.com/api/covidVaccine"
        )
        //  const res = await this.$axios.$get("http://localhost:3000/api/covidVaccine")  // 本地端
        // "https://covid-project.onrender.com/api/covidVaccine" // deploy
        const lengthOfData = res.data.length - 1
        self.cityTimeCode = res.data[lengthOfData].a01 // 抓取最近的更新時間
        const vaccineData = res.data.filter(item => {
          return item.a01 === self.cityTimeCode && item.a03 === "總計" // 抓取最近的所有資料
        })
        self.cityData = vaccineData
        self.totalShotPercent = vaccineData.reverse().pop()
      } catch (error) {
        console.log("error: ", error)
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 1000)
      
    },
    async getCovidVaccineAll() {
      this.isLoading = true;
      try {
        const self = this
        // const res = await this.$axios.$get("http://localhost:3000/api/covidVaccineAll") // 本地端
        // "https://covid-project.onrender.com/api/covidVaccineAll" // deploy
        const res = await this.$axios.$get(
          "https://covid-project.onrender.com/api/covidVaccineAll"
        )
        const popData = res.data
        self.percentTimeCode = popData.pop().a02 // 抓取最近更新的時間
        const filteredTotalShotData = res.data.filter(item => {
          return item.a02 === self.percentTimeCode // 抓取最近的一筆資料
        })
        self.totalShotData = filteredTotalShotData
      } catch (error) {
        console.log("error: ", error)
      }
        setTimeout(() => {
        this.isLoading = false;
      }, 1000)
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
.coverPage {
  writing-mode: vertical-lr;
}
.vaccineList {
  position: absolute;
  z-index: -1;
}
.vaccineCard {
  background-image: url(../../assets/Vaccine-city.jpg);
  background-size: cover;
  background-position: center center;
}
.vaccineCard:hover {
  // hover 的時候  會有效果
  background-image: none;
  background-color: white;
  transition: 0.3s ease;
  .coverPage {
    display: none;
  }
  .vaccineList {
    // hover 的時候  會橫移一個區塊顯示資訊
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
  backdrop-filter: blur(2px); // 毛玻璃特效
}
.wordBreak {
  word-break: break-all;
}
</style>
