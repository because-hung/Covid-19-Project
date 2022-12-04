const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var db = require('../db')


router.get('/covidVaccine', (req, res) => { //要資料到後端  後端在吐到前端
  const url = encodeURI('https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=2006')
  fetch(url)
    .then(response => response.json())
    .then(json => {
      res.status(200).json({
        success: true,
        data: json
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        data: []
      })
    })
})

router.get('/covidVaccineAll', (req, res) => {
  const url = encodeURI('https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=2004')
  fetch(url)
    .then(response => response.json())
    .then(json => {
      res.status(200).json({
        success: true,
        data: json
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        data: []
      })
    })
})

router.get('/covidCountry', async (req, res) => {
  const DEFAULT_LIMIT = '全部縣市'
  const limited = req.query.limited || DEFAULT_LIMIT

  const url = encodeURI(`https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5002&limited=${limited}`)
  fetch(url)
    .then(response => response.json())
    .then(json => {
      res.status(200).json({
        success: true,
        data: json
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        data: []
      })
    })
})

router.get('/covidDailyInfo', async (req, res) => {
  db.getConnection((err, connection) => {
    console.log('connection: ', connection);
    if (err) throw err

    console.log(connection.threadId)

    connection.query(`select a02 as date, a03 as country, a05 as today_count, a06 as total from covid.Items where a02 = (select Max(a02) FROM covid.Items) and a04 = '全區';`, function (error, rows, fields) {
      if (error) throw error;
      // console.log(rows);
      // console.log('fields: ', fields);
      // console.log('The solution is: ', rows[0]);
      const newRows = rows.map(row => {
        row.today_count = parseInt(row.today_count)
        row.total = parseInt(row.total)
        return row
      })
      connection.release()
      try {
        res.json({
          status: 200,
          items: newRows
        });
      } catch (error) {
        console.error(error)
        res.json({
          status: 500,
          items: []
        });
      }
    });
  })
})


module.exports = router;