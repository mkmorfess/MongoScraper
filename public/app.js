$(document).ready(function(){


	

	$("#scraper").on("click", function(){

		$("#news").empty();

		$.get("/all").done(function(data){
			console.log(data)
			for (var i = 0; i < data.length; i++) {

				var newStory = $("<div>")
				newStory.addClass("container text-left newsList")
				$("#news").append(newStory)

				var newImage = $("<img>")
				newImage.attr("src", data[i].image)
				newImage.addClass("picImage")
				newStory.append(newImage)

				var newDiv = $("<h4>")
				newDiv.append(data[i].title)
				newStory.append(newDiv)


				var newSummary = $("<p>")
				newSummary.text(data[i].summary)
				newStory.append(newSummary)

				var newLink = $("<a>")
				newLink.addClass("row")
				newLink.attr("href", data[i].link)
				newLink.attr("target", "_blank")
				newLink.append("Read More Here")
				newStory.append(newLink)

				var newButton = $("<button>")
				newButton.addClass("save btn-warning")
				newButton.text("Save This Article")
				newStory.append(newButton)
			}
		})

	})

	$(document).on("click", ".save", function(){

		var data = {
			saveThisHeader: $(this).siblings("h4").text(),
			saveThisLink: $(this).siblings("a").attr("href"),
			saveThisSummary: $(this).siblings("p").text(),
			saveThisImage: $(this).siblings("img").attr("src")
		}
		
		$.ajax({
			url: "/save",
			type: "POST",
			data: data
		}).done(function(response){
			console.log("All done, here is your response: " + response)

			if (response === "Article Already In Database") {
				alert("Article Already In Your Saved Articles")
			} else {
				alert("Article Saved")
			}
		})


	})



	$.get("/save", function(data){
		// console.log(data)
	})


	$(document).on("click", ".delete", function(){

		var data = {
			thisId: $(this).parent("div").attr("data-id")
		}
		
		$.ajax({
			url: "/save/" + data.thisId,
			type: "DELETE"
		}).done(function(response){
			// console.log("All done, here is your response: " + response)
			location.reload();
		})


	})

	$(document).on("click", "#submit", function(event){
		event.preventDefault();

		var newComment = {
			comment: $(this).siblings("textarea").val().trim(),
			id: $(this).parent("form").attr("data-id")
		}
		console.log(newComment.comment)
		console.log(newComment.id)

		$(this).siblings("textarea").val("")

		$.ajax({
			url: "/save/comment",
			type: "POST",
			data: newComment
		}).done(function(response){
			console.log(response)	
		})




	})





})


