const express = require('express')
const fetch = require('node-fetch');
const router = express.Router()

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express()
router.use((req, res, next) =>{
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/covidVaccine',(req, res) =>{
  const url = encodeURI('https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=2001')
  fetch(url)
  .then(response => response.json())
  .then(json => {
    res.status(200).json({ success: true, data: json})
  })
  .catch(err => {
    res.status(500).json({ success: false, data: []})
  })
})


router.get('/covidCountry', async (req, res) =>{

  const url = encodeURI('https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5002&limited=全部縣市')
  fetch(url)
  .then(response => response.json())
  .then(json => {
    res.status(200).json({ success: true, data: json})
  })
  .catch(err => {
    res.status(500).json({ success: false, data: []})
  })
})

module.exports = {
  path: '/api',
  handler: router
}