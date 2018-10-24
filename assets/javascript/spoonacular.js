

function buildQuery() {
  var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&";
  var queryParams = {};
  queryParams.number = 4;
  if($("#search-btn").on("click", APIcall)){
    queryParams.tags = $("#input-text").val().trim();
  } else{
    queryParams.tags = $(this).attr("data-cuisine");
  }
  return queryURL + $.param(queryParams);
}

function updatePage(recipeData){


  for(var i= 0; i < 4; i++){

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
    $("#recipe-display").append("<hr>");
  }
}

function clear() {
  $("#recipe-display").empty();
  $("#intro-view").empty();
  $(".nav-wrapper").removeClass("brown darken-3");
  showBG();
}

$("#search-btn").on("click", APIcall);
$(".dropdown-content").on("click", APIcall); 

function APIcall(event){
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
}

function showBG(){
  $("body,html").css({"background": "url(assets/images/board-brown-326311.jpg)", "background-size": "cover", "background-repeat": "no-repeat"});
}