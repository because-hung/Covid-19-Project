<template>
  <div>
    <h2>Taiwan Country</h2>
<div class="section grid grid-rows-1 grid-cols-4 gap-20">
  <div class="
  CountryCard
  "  
  v-for="(item, i) in data"
  :key="i"
  >
    <h2>{{item.a03}}</h2>
     <h2>{{item.a06}}</h2>

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
        for(let i=0;i<filterAry.length;i++){
            forData.push(filterAry[i].a03)  
        }
        const SetAry = [...new Set(forData)]
      console.log('data', SetAry)
      const findData = []
for(let i=0;i<SetAry.length;i++){
let found = filterAry.find(element => element.a03 == SetAry[i] );
findData.push(found);
}
self.data = findData
console.log('data:', self.data)
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

<style>
button{
  border: 3px solid black;
}
</style>
