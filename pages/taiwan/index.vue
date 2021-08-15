<template>
  <div>
    <h2>Taiwan Country</h2>
  </div>
</template>

<script>
// import axios from 'axios'
// import res from '../api/Covid.json'
export default {
    data() {
        return {
            data: [],
            deta: []
        }
    },
  methods: {
    async getCovidCountry () {
      try {
        const self = this
        const limited = '全部縣市'
        // const limited = '台中市'
        const res = await this.$axios.$get(`https://blooming-basin-20592.herokuapp.com/api/covidCountry?limited=${limited}`)
        const filteredData = res.data.filter(item => {
          return item.a04 == '全區'
        })
       const dataAry = Array.from(filteredData)
        console.log("data: ", Array.isArray(dataAry))
        const filterData = []
        for(let i=0;i<=dataAry.length;i++){
          if(filterData.includes(dataAry[i].a03) )
          {}else{
            return filterData.push(dataAry[i])
          }
        }
        self.deta = filterData
      console.log('data', self.deta)
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
