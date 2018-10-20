$("#search-btn").on("click", function(event) {
        event.preventDefault();
    $("#place-display").empty();
      // Storing our giphy API URL for a random cat image
      var userInput = $("#user-input").val().trim();
      var queryURL = "https://developers.zomato.com/api/v2.1/search?apikey=1acc25ae50354b28a222fa9c8753f32c&q=" + userInput;

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
         .then(function(response) {
              for(var i = 0; i <= 8; i++) {
               
               console.log(response.restaurants[i].name);
               console.log(response);
               var costRange = response.restaurants[i].restaurant.price_range;
               var restEvent = response.restaurants[i].restaurant.events_url;
               var name = response.restaurants[i].restaurant.name;
               var rating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
               var address = response.restaurants[i].restaurant.location.address;
               if(costRange === 1) {
                   costRange = "$";
               } else if(costRange === 2) {
                   costRange = "$$";
               }else if(costRange === 3) {
                   costRange = "$$$";
               } else if(costRange === 4) {
                   costRange = "$$$$";
               }

               $("#place-display").append(response.restaurants[i].restaurant.name + "<br>");
               $("#place-display").append("<a href=" + restEvent + ">more info" + "</a>" + "<br>"); 
               $("#place-display").append( "Cost Range: " +costRange  + "<br>");            
               var loc = JSON.stringify("Location:  " + address + "<br>");
               $("#place-display").append(loc.replace(/\"/g, ""));
               $("#place-display").append("Rating: " + rating + "<br><br>" );
              }
        // Saving the image_original_url property
        //  var imageUrl = response.data.image_original_url;

          // Creating and storing an image tag
         // var catImage = $("<img>");

          // Setting the catImage src attribute to imageUrl
          //catImage.attr("src", imageUrl);
         // catImage.attr("alt", "cat image");

          // Prepending the catImage to the images div
         // $("#images").prepend(catImage);
        });
    });