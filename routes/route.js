const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request');
const mongojs = require("mongojs");

var databaseUrl = "mongoScraper";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/all', (req, res) => {
  request('http://www.nytimes.com/pages/todayspaper/index.html?action=Click&module=HPMiniNav&region=TopBar&WT.nav=page&contentCollection=TodaysPaper&pgtype=Homepage', function (error, response, html) {
  if (!error && response.statusCode == 200) {
  	var $ = cheerio.load(html);
  	var results = [];
  	$("div.story").children("h3").children("a").each(function(i, element) {
  		

  		var title = $(element).text();
  		

    	var link = $(element).attr("href");

    	var summary = $(element).parent().parent("div.story").children("p.summary").text()

    	var image = $(element).parent().parent("div.story").children(".thumbnail").children("a").children("img").attr("src")

    	results.push({
      		title: title,
      		summary: summary,
      		link: link,
      		image: image
    	});
  	})
    res.send(results)
  }
});
});


router.get("/save", (req, res) => {
	db.articles.find({}).sort({_id: -1}, function(err, data){
		var newData = {
			saved: data
		}
		if (err) {
      		console.log(err);
    	}
    	else {
      		res.render('save', newData)
    	}
	})
	
})

router.post('/save', (req, res) => {
	db.articles.insert({
		title: req.body.saveThisHeader,
		link: req.body.saveThisLink, 
		summary: req.body.saveThisSummary, 
		image: req.body.saveThisImage
	}, function(err, data){

		if (err) {
      		console.log(err);
    	}
    	else {
      		res.json(data);
    	}
	})
})


router.delete('/save/:id', (req, res) => {
	console.log(req.params.id)
	db.articles.remove({_id: db.ObjectId(req.params.id)}, function(err, data){

		if (err) {
      		console.log(err);
    	}
    	else {
      		res.json(data)
    	}
	})
})

module.exports = router;