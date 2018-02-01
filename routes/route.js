const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/all', (req, res) => {
  res.json("sup"); //input your articles from New York Times in here with a cheerio web scraper...
});


router.get("/save", (req, res) => {
	res.render('save') // this route will pull all the data from mongo DB
})

router.post('/save', (req, res) => {
	//This is where you'll take the article and save it to mongo db and post to the saved page
})

module.exports = router;