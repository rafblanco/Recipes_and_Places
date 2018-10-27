
$(document).ready(function(){

  function buildQuery() {
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&";
    var queryParams = {};
    queryParams.number = 10;
    queryParams.tags = "";
    if (dropbtn === true) {
      queryParams.tags = cuisine;
      dropbtn = false;
    } else {
      queryParams.tags = $("#input-text").val().trim();
    }
    return queryURL + $.param(queryParams);
  }

  function clear() {
    $("#recipe-display").empty();
    $("#intro-view").empty();
    $(".nav-wrapper").removeClass("brown darken-3");
    showBG();
  }
  var cuisine = "";
  var dropbtn = false;

  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    APIcall();
  });

  $(".cuisine-btn").on("click", function () {

    cuisine = this.id;
    dropbtn = true;
    APIcall();
  });

  function APIcall() {
    $("#recipe-display").empty();
    clear();

    var queryURL = buildQuery();

    $.ajax({
      url: queryURL,
      method: "GET",
      headers: {
        'X-Mashape-Key': "SE4MEobpHSmshiuMloSUR72qzcVkp14gABbjsnORUZgwncf1ug"
        // 'Accept: application/json' 
      }
    }).then(updatePage)
  }

  function updatePage(recipeData) {
    console.log(recipeData);

    for (var i = 0; i <= 9; i++) {

      var recipeList = $("<div>");

      var recipeCount = i + 1;

      // Appends name of recipe
      var nameOfRecipe = recipeData.recipes[i].title;
      var recipeListItem = $("<h4>").append("<span>" + recipeCount + ".</span>" + "<strong> " + nameOfRecipe + "</strong>");
      recipeList.append(recipeListItem);
      // Appends image
      var imageRec = recipeData.recipes[i].image;
      var imageP = $("<img>");
      imageP.attr("src", imageRec);
      imageP.css("height", "200px", "width", "300px");
      recipeList.append(imageP);

      // Appends ingredients
      var ingredientArray = recipeData.recipes[i].extendedIngredients;
      for (var j = 0; j < ingredientArray.length; j++) {
        var ingredientList = $("<div>");
        var eachIngredient = ingredientArray[j].original;

        var ingredients = $("<p>").append(eachIngredient);
        ingredientList.append(ingredients);
        recipeList.append(ingredientList);
      }

      //Appends recipe instructions
      var instruction = recipeData.recipes[i].instructions;
      var instructionText = $("<p>").append(instruction);
      recipeList.append(instructionText);

      $("#recipe-display").append(recipeList);
      $("#recipe-display").append("<hr>");
      $("#recipe-display").css("background-color", "rgba(255, 255, 255, 0.123)");
    }
  }

  function showBG() {
    $("body,html").css({ "background": "url(assets/images/board-brown-326311.jpg)", "background-size": "cover", "background-repeat": "no-repeat" });
  }

});