<template>
  <div>
    <div class="TaiwanTitle justify-between font-bold py-4 bg-gray-200 px-4">
      <div
        class="header flex flex-col items-center md:flex-row md:justify-between"
      >
        <h4 class="md:inline-block ml-3 mb-2 ld:mb-6">
          數據來源來自於衛福部疾管署，與1922所公佈數據可能有些不一樣，還是以1922公佈數據為主
        </h4>
        <h4
          class="
            text-center
            font-bold
            mb-6
            mt-4
            md:mt-0 md:text-right md:pr-8 md:inline-block
          "
        >
          更新時間: {{ timeCode }}
        </h4>
      </div>
      <div
        class="
          info
          text-center
          md:text-left md:flex
          justify-between
          px-4
          md:px-2
        "
      >
        <h2 class="mb-6 md:mb-0">
          <span class="pb-1 font-bold text-3xl border-b-4 border-yellow-500"
            >台灣各地區總確診人數</span
          >
        </h2>
        <div class="totalPlus sm:flex justify-evenly sm:mt-0">
          <h2
            class="mt-6 sm:mt-0 mb-2 ld:mb-0 font-bold text-3xl lg:pr-6 md:mr-6"
          >
            境外人數+
            <span class="text-red-500 text-4xl"> {{ foreignPlus }}</span>
          </h2>
          <h2 class="mt-6 sm:mt-0 font-bold text-3xl ld:pr-6">
            本土人數+
            <span class="text-red-500 text-4xl"> {{ TaiwanPlus }}</span>
          </h2>
        </div>
      </div>
    </div>

    <div
      class="
        section
        grid grid-cols-1
        sm:grid-cols-2
        ld:grid-cols-3
        xl:grid-cols-4
        gap-x-20 gap-y-10
        bg-gray-200
        px-8
        pb-8
      "
    >
      <div
        class="
          countryCard
          mt-10
          border-2 border-black
          rounded-3xl
          text-center
          opacity-80
        "
        v-for="(item, i) in data"
        :key="i"
      >
        <h2
          class="
            countryTitle
            text-xl
            border-b-2 border-black
            bg-green-300
            font-bold
            rounded-full
            py-2
          "
          :class="{ plusColor: plusData[i] }"
        >
          {{ item.a03 }}
        </h2>
        <!-- 有增加確診人數 title就會變顏色 -->

        <div class="peopleNum justify-center">
          <h2 class="text-5xl text-blue-700 my-12 font-bold opacity-100">
            {{ item.a06 }}
          </h2>
          <h3
            class="
              plusNum
              font-bold
              text-3xl
              ld:ml-0 ld:text-4xl
              text-red-700
              font-mono
              mt-6
              pt-2
            "
            v-if="plusData[i]"
          >
            +{{ plusData[i] }}
          </h3>
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
      timeCode: "", // 更新的時間
      plusData: [], // 新增確診人數的Data (含境外移入 做title變色 跟 新增人數數量的提示)
      TaiwanPlusData: [], // 本土確診人數的Data (未含境外移入 做本土reduce 總和計算)
      TaiwanPlus: 0, // 本土確診人數的總和
      foreignPlus: 0, // 境外確診人數的總和
    }
  },
  methods: {
    async getCovidCountry() {
      try {
        const self = this
        const limited = "全部縣市"

        const res = await this.$axios.$get(
          `http://localhost:3000/api/covidCountry?limited=${limited}`
        )
        // const res = await this.$axios.$get(`http://localhost:3000/api/covidCountry?limited=${limited}`) // 本地端
        // `https://info-covid19-project.herokuapp.com/api/covidCountry?limited=${limited}` // deploy
        const filterAry = res.data.filter(item => {
          //抓取縣市全區總人數
          return item.a04 == "全區"
        })
        let dateTime = new Date() // 抓更新的時間
        dateTime = dateTime.setDate(dateTime.getDate() - 2) // 官方公佈的資料裡，當天的資訊還沒更新完全，最近最完整的資料是前兩天的，故抓前天的資料
        self.timeCode = new Date(dateTime).toLocaleDateString()
        const forData = []
        filterAry.forEach(item => {
          return forData.push(item.a03) // 抓取縣市名稱 之後要做比對過濾用
        })
        const setAry = [...new Set(forData)] // 轉陣列
        const findData = []
        setAry.forEach(item => {
          let found = filterAry.find(element => {
            const filterTime = new Date(element.a02).toLocaleDateString()
            return element.a03 == item && filterTime == self.timeCode // 比對縣市抓出最近的一筆資料
          })
          findData.push(found)
        })
        self.data = findData
        self.data.map(element => {
          const filterTime = new Date(element.a02).toLocaleDateString()
          if (filterTime == self.timeCode) {
            // 抓取增加的人數 (為右下角紅色新增人數的數字)
            self.plusData.push(element.a05)
          } else {
            self.plusData.push(0)
          }
        })

        self.data.map(element => {
          // 去掉境外移入 拿到本土人數
          const filterTime = new Date(element.a02).toLocaleDateString()
          if (filterTime == self.timeCode && element.a03 !== "境外移入") {
            self.TaiwanPlusData.push(element.a05)
          } else if (element.a03 == "境外移入") {
            self.foreignPlus = element.a05 // 抓取境外移入人數
          } else {
            self.TaiwanPlusData.push(0)
          }
        })

        self.TaiwanPlus = self.TaiwanPlusData.reduce((acc, cur) => {
          // 本土確診人數總和
          return parseInt(acc) + parseInt(cur)
        })

        // debug
        // console.log('data:', self.data)
        // console.log('timeCode:', self.timeCode)
        // console.log('plus:', self.plusData)
        // console.log('TaiwanPlusTotal:', self.TaiwanPlusData)
        // console.log('TaiwanPlus:', self.TaiwanPlus)
        // console.log('foreignPlus:', self.foreignPlus)
      } catch (error) {
        console.log("error: ", error)
      }

      // const api = ''
    },
  },
  created() {
    this.getCovidCountry()
  },
}
</script>

<style lang="scss">
button {
  border: 3px solid black;
}
.peopleNum {
  position: relative;
}
.plusNum {
  // 增加人數 數字的位置
  position: absolute;
  right: 7%;
  top: 45%;
}
.plusColor {
  // 有增加確診人數  就會變顏色
  background: #ff2d2d;
}
.countryCard {
  background-image: url(../../assets/Person-city.jpg);
  background-size: cover;
  background-position: center center;
}
</style>
