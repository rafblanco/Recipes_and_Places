$(document).ready(function () {
    //Dropdown function
    $(".dropdown-trigger").dropdown();

    // Restaurant search
    $("#search-btn").on("click", function(event){
        event.preventDefault();
        searching();
    });

    var cuisine = "";
    var dropbtn = false;

    $(".cuisine-btn").on("click",function(){
        cuisine = this.id;
        dropbtn = true;
        searching();
    });

    function searching() {
        
        $("#place-display").empty();
        zomatoCall();
    };



    function zomatoCall() {
        //  Stores input text
        var userInput = "";
        if (dropbtn === true){
            userInput = cuisine;
            dropbtn = false; 
        } else {
            userInput = $("#input-text").val().trim();
        }
            
        var queryURL = "https://developers.zomato.com/api/v2.1/search?apikey=1acc25ae50354b28a222fa9c8753f32c&q=" + userInput;

        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data from the AJAX request comes back
            .then(function (response) {
                for (var i = 0; i <= 8; i++) {

                    //console.log(response.restaurants[i].name);
                    //console.log(response);
                    var costRange = response.restaurants[i].restaurant.price_range;
                    var restEvent = response.restaurants[i].restaurant.events_url;
                    var name = response.restaurants[i].restaurant.name;
                    var rating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
                    var address = response.restaurants[i].restaurant.location.address;
                    
                    if (costRange === 1) {
                        costRange = "$";
                    } else if (costRange === 2) {
                        costRange = "$$";
                    } else if (costRange === 3) {
                        costRange = "$$$";
                    } else if (costRange === 4) {
                        costRange = "$$$$";
                    }

                    $("#place-display").append(name + "<br>");
                    $("#place-display").append("<a href=" + restEvent + ">more info" + "</a>" + "<br>");
                    $("#place-display").append("Cost Range: " + costRange + "<br>");
                    var loc = JSON.stringify("Location:  " + address + "<br>");
                    $("#place-display").append(loc.replace(/\"/g, ""));
                    $("#place-display").append("Rating: " + rating + "<br><br>");
                    $("#place-display").append("<hr>");
                    $("#place-display").css("background-color", "rgba(255, 255, 255, 0.123)");
                }

            });
    };

});