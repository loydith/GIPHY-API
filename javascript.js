// Start with jquery
$(document).ready(function() {
    var listOfActresses = [
      "Jennifer-Lawrence", 
      "Scarlett-Johansson", 
      "Julia Roberts", 
      "Amy-Adams", 
      "Emma-Stone",
      "Anne-Hathaway", 
      "Sandra-Bullock", 
      "Jessica-Alba", 
      "Jennifer Aniston", 
      "Sofia Vergara"
    ];
// Set up the array using methods
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
    }
//   Make click on the button <div> actresses-button </div> 
    $(document).on("click", ".actresses-button", function() {
      $("#actresses").empty();
      $(".actresses-button").removeClass("active");
      $(this).addClass("active");
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=ZuR8BIISnwOvVtnnL38mxEFItX9EFShF&limit=10";
  //call the ajax
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) { //make function response
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var actressDiv = $("<div class=\"actress-item\">");
                actressDiv.append(actressImg);
                $("#actresses").append(actressDiv);

            var addRating = results[i].rating;
            var p = $("<p>").text("Rating: " + addRating);
                actressDiv.append(p);

            var gifs = results[i].images.fixed_height.url;
            var yet = results[i].images.fixed_height_still.url;
            var actressImg = $("<img>");
                actressImg.attr("src", yet);
                actressImg.attr("data-still", yet);
                actressImg.attr("data-animate", gifs);
                actressImg.attr("data-state", "still");
                actressImg.addClass("actress-image");
            
          }
        });
    });
  
    $(document).on("click", ".actress-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#sumbitActress").on("click", function(event) {
      event.preventDefault();
      var addActress = $("input").eq(0).val();
      if (addActress.length > 2) {
        listOfActresses.push(addActress);
      }
  
      populateButtons(listOfActresses, "actresses-button", "#actresses-buttons");
  
    });
  
    populateButtons(listOfActresses, "actresses-button", "#actresses-buttons");
  });