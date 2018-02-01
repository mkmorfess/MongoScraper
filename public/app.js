$(document).ready(function(){


	

	$("#scraper").on("click", function(){

		$.get("/all").done(function(data){
			console.log(data)
		})

	})





})


