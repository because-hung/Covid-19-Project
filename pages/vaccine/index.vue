<template>
  <div class="container mx-auto">
    <div class="content border-2 border-red-300 grid grid-rows-1 grid-cols-4 gap-20 py-16 px-8">
      <div class="VaccineCard border-2 border-blue-300 bg-white p-4" v-for="(item, i) in data" :key="i">
         123
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

<style>
button {
  border: 3px solid black;
}
</style>
