<template>
    <div class="bgImg flex">
        <div class="container mx-auto rounded-lg mt-6 mb-16">
            <div class="topSection">
                <div class="topbanner pt-2 bg-gray-300 flex">
                    <div class="colorball flex items-center">
                        <button
                            class="ball bg-red-400 rounded-full w-6 h-6 ml-2"
                        ></button>
                        <button
                            class="ball bg-yellow-300 rounded-full w-6 h-6 ml-2"
                        ></button>
                        <button
                            class="ball bg-green-400 rounded-full w-6 h-6 ml-2"
                        ></button>
                    </div>
                    <div class="tabs ml-4 text-2xl font-bold flex">
                        <div class="bg-white py-4 px-16 rounded-t-xl mx-2">
                            Global
                        </div>
                        <div class="bg-white py-4 px-16 rounded-t-xl">
                            Taiwan
                        </div>
                    </div>
                </div>
                <div
                    class="arrow flex justify-around items-center py-2 bg-white"
                >
                    <fa
                        :icon="['fas', 'arrow-left']"
                        class="text-gray-400 text-2xl"
                    />
                    <fa
                        :icon="['fas', 'arrow-right']"
                        class="text-gray-400 text-2xl"
                    />
                    <div
                        class="bg-gray-300 w-11/12 rounded-full py-4"
                    >
                    </div>
                </div>
                <hr />
            </div>
            <div class="content bg-gray-100 pb-16">
                <div class="GobalTitle flex justify-between px-8 py-4">
                    <h2
                        class="
                            border-b-4 border-red-700
                            font-bold
                            text-4xl
                            py-4
                            px-2
                        "
                    >
                        全球疫情狀況
                    </h2>
                    <h4 class="font-medium">時間: {{ this.Time }}</h4>
                </div>
                <div
                    class="
                        GobalCardGroup
                        grid grid-rows-1 grid-cols-4
                        gap-x-20
                        p-8
                    "
                >
                    <div class="card border-2 bg-white p-8 font-bold">
                        <h2 class="text-2xl">
                            {{ this.gobalData.todayCases }}
                        </h2>
                        <h4
                            class="
                                text-xl
                                border-t-2 border-blue-500
                                mt-4
                                pt-2
                                text-right
                            "
                        >
                            全球今日確診人數
                        </h4>
                    </div>
                    <div class="card border-2 bg-white p-8 font-bold">
                        <h2 class="text-2xl">
                            {{ this.gobalData.todayDeaths }}
                        </h2>
                        <h4
                            class="
                                text-xl
                                border-t-2 border-blue-500
                                mt-4
                                pt-2
                                text-right
                            "
                        >
                            全球今日死亡人數
                        </h4>
                    </div>
                    <div class="card border-2 bg-white p-8 font-bold">
                        <h2 class="text-2xl">{{ this.gobalData.cases }}</h2>
                        <h4
                            class="
                                text-xl
                                border-t-2 border-blue-500
                                mt-4
                                pt-2
                                text-right
                            "
                        >
                            全球累積確診案例
                        </h4>
                    </div>
                    <div class="card border-2 bg-white p-8 font-bold">
                        <h2 class="text-2xl">{{ this.gobalData.deaths }}</h2>
                        <h4
                            class="
                                text-xl
                                border-t-2 border-blue-500
                                mt-4
                                pt-2
                                text-right
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
                            text-4xl
                            py-4
                            px-2
                        "
                    >
                        臺灣疫情狀況
                    </h2>
                    <div class="TWflag ml-6 px-11 mt-4" :style="{ backgroundImage: `url(${this.TWflag})` }">
                    </div>
                </div>
                <div
                    class="
                        TaiwanCardGroup
                        grid grid-rows-1 grid-cols-4
                        gap-x-20
                        p-8
                    "
                >
                    <div class="card border-2 bg-white p-8 font-bold">
                        <h2 class="text-2xl">
                            {{ this.twData.todayCases }}
                        </h2>
                        <h4
                            class="
                                text-xl
                                border-t-2 border-blue-500
                                mt-4
                                pt-2
                                text-right
                            "
                        >
                            臺灣今日確診人數
                        </h4>
                    </div>
                    <div class="card border-2 bg-white p-8 font-bold">
                        <h2 class="text-2xl">
                            {{ this.twData.todayDeaths }}
                        </h2>
                        <h4
                            class="
                                text-xl
                                border-t-2 border-blue-500
                                mt-4
                                pt-2
                                text-right
                            "
                        >
                            臺灣今日死亡人數
                        </h4>
                    </div>
                    <div class="card border-2 bg-white p-8 font-bold">
                        <h2 class="text-2xl">{{ this.twData.cases }}</h2>
                        <h4
                            class="
                                text-xl
                                border-t-2 border-blue-500
                                mt-4
                                pt-2
                                text-right
                            "
                        >
                            臺灣累積確診案例
                        </h4>
                    </div>
                    <div class="card border-2 bg-white p-8 font-bold">
                        <h2 class="text-2xl">{{ this.twData.deaths }}</h2>
                        <h4
                            class="
                                text-xl
                                border-t-2 border-blue-500
                                mt-4
                                pt-2
                                text-right
                            "
                        >
                            臺灣累積死亡案例
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            gobalData: [],
            twData: [],
            Time: '',
            TWflag: ''
        }
    },
    methods: {
        async getGobalData() {
            try {
                const self = this
                const res = await this.$axios.$get(
                    "https://corona.lmao.ninja/v3/covid-19/all"
                )
                self.gobalData = res
                console.log("gobalData: ", self.gobalData)
            } catch (error) {
                console.log("error: ", error)
            }
        },
        async getTWData() {
            try {
                const self = this
                const res = await this.$axios.$get(
                    "https://corona.lmao.ninja/v2/countries/TW?fbclid=IwAR2JF5QVCwmjbNJM4QVIuk8gTFgRK4MlYa1uDyHDZ1ctzgvSOJXkhjJGpCo"
                )
                self.twData = res
                self.TWflag = res.countryInfo.flag
                console.log("twData: ", self.twData)
            } catch (error) {
                console.log("error: ", error)
            }
        },
        getTime() {
            const self = this
            const timeNow = Date.now()
            self.Time = new Date(timeNow)
        },
    },
    created() {
        this.getGobalData()
        this.getTWData()
        this.getTime()
    },
}
</script>
<style>
.bgImg {
    background-image: url(../assets/background.jpg);
}
.TWflag{
    background-size: contain;
}
</style>
