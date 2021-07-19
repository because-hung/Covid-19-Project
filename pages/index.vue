<template>
 <div>
   <button class="m-16" @click="getCovidCountry">get getCovidCountry 全部縣市</button>
   <button class="m-16" @click="getCovidVaccine">get getCovidVaccine 各縣市疫苗接種率</button>
 </div>
</template>

<script>
export default {
  methods: {
    async getCovidCountry () {
      try {
        const res = await this.$axios.$get('http://localhost:3000/api/covidCountry')
        console.log('res: ', res);
      } catch (error) {
        console.log('error: ', error)
      }
      // const api = ''
    },
    async getCovidVaccine () {
            try {
        const res = await this.$axios.$get('http://localhost:3000/api/covidVaccine')
        console.log('res: ', res);
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}
</script>

<style>
button{
  border: 3px solid black;
}
</style>