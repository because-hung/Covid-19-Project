<template>
  <div class="container mx-auto">
 <h2 class="bg-gray-200 text-right pt-4 pr-8 font-bold">更新時間: {{ timecode }}</h2>
    <div class="content grid grid-rows-1 grid-cols-4 gap-20 py-8 px-8 bg-gray-200">
      <div class="VaccineCard border-2 border-dashed border-black bg-white text-black" v-for="(item, i) in data" :key="i">
        <h2 class="p-4 CoverPage">{{ item.a02 }}</h2>
         <ul class="VaccineList bg-white p-4">
           <li class="text-2xl font-medium mb-4">縣市: {{ item.a02 }}</li>
           <li class="mb-2 font-medium">
                   <fa
                        :icon="['fas', 'syringe']"
                       
                    />
             累積接種人次: {{ item.a05 }}人
             <div >
                <h6 class="categories">az: {{ item.a11 }}人</h6>
                <h6 class="categories"> moderna: {{ item.a17 }}人</h6>
             </div>
           </li>
           <li class="mb-2 font-medium">
              <fa
                        :icon="['fas', 'syringe']"
                       
                    /> 疫苗覆蓋率 (%): {{ item.a06 }}%
             <div class="categories">
                <h6>az: {{ item.a12 }}%</h6>
                <h6> moderna: {{ item.a18 }}%</h6>
             </div>
           </li>
           <li class="mb-2 font-medium">
              <fa
                        :icon="['fas', 'syringe']"
                       
                    /> 累計配送量 (劑): {{ item.a07 }}劑
             <div class="categories">
                <h6>az: {{ item.a13 }}劑</h6>
                <h6> moderna: {{ item.a19 }}劑</h6>
             </div>
           </li>
           <li class="mb-2 font-medium">
              <fa
                        :icon="['fas', 'syringe']"
                       
                    /> 剩餘量 (劑): {{ item.a08 }}劑
             <div class="categories">
                <h6>az: {{ item.a14 }}劑</h6>
                <h6> moderna: {{ item.a20 }}劑</h6>
             </div>
           </li>
           <li>
              <fa
                        :icon="['fas', 'syringe']"
                       
                    /> 剩餘量 (%): {{ item.a09 }}%
               <div class="categories">
                <h6>az: {{ item.a15 }}%</h6>
                <h6> moderna: {{ item.a21 }}%</h6>
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
    }
  },
  methods: {
    async getCovidVaccine() {
      try {
        const self = this
        const res = await this.$axios.$get(
          "http://localhost:3000/api/covidVaccine"
        )
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
  },
  created() {
    this.getCovidVaccine()
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
.CoverPage{
  writing-mode: vertical-lr;
}
.VaccineList{
  display: none;
}
.VaccineCard:hover{
  .CoverPage{
    display: none;
  }
.VaccineList{
transform: translate(-40px, -40px);
transition: 0.25s ease;
border: 3px skyblue solid;
display: block;
}
}

</style>
