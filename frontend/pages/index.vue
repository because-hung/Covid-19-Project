<template>
  <div class="content bg-gray-200 pb-16">
    <loading :active.sync="isLoading"></loading>
    <h4 class="font-bold text-center sm:text-right pt-6 px-4 mr-6 ld:mr-10">
      時間: {{ this.todayTime }}
    </h4>
    <div class="gobalTitle flex justify-center sm:justify-start px-8 py-4">
      <h2
        class="
          border-b-4 border-red-700
          font-bold
          text-3xl
          md:text-4xl
          py-4
          px-2
        "
      >
        全球疫情狀況
      </h2>
    </div>
    <div
      class="
        gobalCardGroup
        grid grid-rows-1 grid-cols-1
        sm:grid-cols-2
        ld:grid-cols-4
        gap-x-20 gap-y-10
        ld:gap-y-0
        p-8
      "
    >
      <div class="card border-2 bg-white p-8 font-bold">
        <h2 class="text-2xl text-center md:text-left">
          {{ this.gobalData.todayCases }}
        </h2>
        <h4
          class="
            text-xl
            border-t-2 border-blue-500
            mt-4
            pt-2
            text-center
            md:text-right
          "
        >
          全球今日確診人數
        </h4>
      </div>
      <div class="card border-2 bg-white p-8 font-bold">
        <h2 class="text-2xl text-center md:text-left">
          {{ this.gobalData.todayDeaths }}
        </h2>
        <h4
          class="
            text-xl
            border-t-2 border-blue-500
            mt-4
            pt-2
            text-center
            md:text-right
          "
        >
          全球今日死亡人數
        </h4>
      </div>
      <div class="card border-2 bg-white p-8 font-bold">
        <h2 class="text-2xl text-center md:text-left">
          {{ this.gobalData.cases }}
        </h2>
        <h4
          class="
            text-xl
            border-t-2 border-blue-500
            mt-4
            pt-2
            text-center
            md:text-right
          "
        >
          全球累積確診案例
        </h4>
      </div>
      <div class="card border-2 bg-white p-8 font-bold">
        <h2 class="text-2xl text-center md:text-left">
          {{ this.gobalData.deaths }}
        </h2>
        <h4
          class="
            text-xl
            border-t-2 border-blue-500
            mt-4
            pt-2
            text-center
            md:text-right
          "
        >
          全球累積死亡案例
        </h4>
      </div>
    </div>
    <div class="TaiwanTitle flex px-8 py-4">
      <h2
        class="
          border-b-4 border-red-700
          font-bold
          text-3xl
          md:text-4xl
          py-4
          px-2
        "
      >
        臺灣疫情狀況
      </h2>
      <div
        class="TWflag ml-6 px-11 mt-4"
        :style="{ backgroundImage: `url(${this.TWflag})` }"
      ></div>
    </div>
    <div
      class="
        TaiwanCardGroup
        grid grid-rows-1 grid-cols-1
        sm:grid-cols-2
        ld:grid-cols-4
        gap-x-20 gap-y-10
        ld:gap-y-0
        p-8
      "
    >
      <div class="card border-2 bg-white p-8 font-bold">
        <h2 class="text-2xl text-center md:text-left">
          {{ this.TWData.todayCases }}
        </h2>
        <h4
          class="
            text-xl
            border-t-2 border-blue-500
            mt-4
            pt-2
            text-center
            md:text-right
          "
        >
          臺灣今日確診人數
        </h4>
        <h4 class="text-xl pt-2 text-center md:text-right">
          (若為 0 表示還沒更新)
        </h4>
      </div>
      <div class="card border-2 bg-white p-8 font-bold">
        <h2 class="text-2xl text-center md:text-left">
          {{ this.TWData.todayDeaths }}
        </h2>
        <h4
          class="
            text-xl
            border-t-2 border-blue-500
            mt-4
            pt-2
            text-center
            md:text-right
          "
        >
          臺灣今日死亡人數
        </h4>
        <h4 class="text-xl pt-2 text-center md:text-right">
          (若為 0 表示還沒更新)
        </h4>
      </div>
      <div class="card border-2 bg-white p-8 font-bold">
        <h2 class="text-2xl text-center md:text-left">
          {{ this.TWData.cases }}
        </h2>
        <h4
          class="
            text-xl
            border-t-2 border-blue-500
            mt-4
            pt-2
            text-center
            md:text-right
          "
        >
          臺灣累積確診案例
        </h4>
      </div>
      <div class="card border-2 bg-white p-8 font-bold">
        <h2 class="text-2xl text-center md:text-left">
          {{ this.TWData.deaths }}
        </h2>
        <h4
          class="
            text-xl
            border-t-2 border-blue-500
            mt-4
            pt-2
            text-center
            md:text-right
          "
        >
          臺灣累積死亡案例
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gobalData: [], // 全世界數據
      TWData: [], // 台灣數據
      todayTime: "", // 現在時間
      TWflag: "", // 台灣國旗
      isLoading: false
    }
  },
  methods: {
    async getGobalData() {
      this.isLoading = true;
      try {
        const self = this
        const res = await this.$axios.$get(
          "https://disease.sh/v3/covid-19/all"
        )
        self.gobalData = res
      } catch (error) {
        console.log("error: ", error)
      }
      this.isLoading = false;
    },
    async getTWData() {
      this.isLoading = true;
      try {
        const self = this
        const res = await this.$axios.$get(
          "https://disease.sh/v3/covid-19/countries/TW"
        )
        self.TWData = res
        self.TWflag = res.countryInfo.flag
      } catch (error) {
        console.log("error: ", error)
      }
      this.isLoading = false;
    },
    getTime() {
      // 抓現在的時間
      const self = this
      const timeNow = Date.now()
      self.todayTime = new Date(timeNow)
    },
  },
  created() {
    this.getGobalData()
    this.getTWData()
    this.getTime()
  },
}
</script>
<style lang="scss">
.TWflag {
  background-size: cover;
}
.gobalTitle {
  word-break: keep-all;
}
</style>
