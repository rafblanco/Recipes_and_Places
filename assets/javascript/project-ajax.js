// curl --get --include 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?instructionsRequired=true&limitLicense=false&number=2&offset=0&query=burger&type=main+course' \
//   -H 'X-Mashape-Key: SE4MEobpHSmshiuMloSUR72qzcVkp14gABbjsnORUZgwncf1ug' \
//   -H 'Accept: application/json'

function buildQuery() {
  var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&"
  //number="+ numQueries + "&tags=" + food;
  var queryParams = {};
  queryParams.number = 4;
  queryParams.tags = $("#input-text").val();
  //var numQueries = $("numQueries").val().trim()
  //var food = $("search-term").val().trim()

  return queryURL + $.param(queryParams);
}

function updatePage(recipeData){


  for(var i= 0; i < 4; i++){

    //var eachRecipe = recipeData.recipes[i].title;
    
    // recipeData.recipes[i];
    
    //console.log("count: " + recipeCount);

    var recipeList = $("<div>");

    var recipeCount = i + 1;
    // Name of Recipe
    var nameOfRecipe = recipeData.recipes[i].title;
    var recipeListItem = $("<h4>").append("<span>" + recipeCount + ".</span>" + "<strong> " + nameOfRecipe + "</strong>");
    recipeList.append(recipeListItem);
    // Image
    var imageRec = recipeData.recipes[i].image;
    var imageP = $("<img>");
    imageP.attr("src", imageRec);
    imageP.css("height", "200px", "width", "300px");
    recipeList.append(imageP);
    // Ingredients
    var ingredientArray = recipeData.recipes[i].extendedIngredients;
    for(var j = 0; j < ingredientArray.length; j++){
      var ingredientList = $("<div>");
      var eachIngredient = ingredientArray[j].original;
      
      var ingredients = $("<p>").append(eachIngredient);
      ingredientList.append(ingredients);
      recipeList.append(ingredientList);
    }
    
    //Instructions
    var instruction = recipeData.recipes[i].instructions;
    var instructionText = $("<p>").append(instruction);
    recipeList.append(instructionText);
    
    $("#recipe-display").append(recipeList);
  }
}

function clear() {
  $("#recipe-display").empty();
  $("#intro-view").empty();
}

$("#search-btn").on("click", function (event) {
  //var queryURL="https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number="+ numQueries + "&tags=" + food 
  //search?instructionsRequired=true&limitLicense=false&number=2&offset=0&query=burger&type=main+course";
  event.preventDefault();
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
});