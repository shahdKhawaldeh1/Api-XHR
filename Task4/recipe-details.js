// Get the query string from the current URL
var queryString = window.location.search;
// Create a new URLSearchParams instance to parse the query string
var params = new URLSearchParams(queryString);
// Get the 'id' parameter value from the URL
var id = params.get('id');
var data = {};
var httpRequest = new XMLHttpRequest();
var ingredients=[]
getDetails(id);

// Function to fetch recipe details based on an ID
function getDetails(id) {
    httpRequest.open('get', `https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
    
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        
            data = JSON.parse(httpRequest.response).recipe
            ingredients =  JSON.parse(httpRequest.response).recipe.ingredients
            display()
            displayingredients()
        }
    };
}
// display details for each recipe 
function display(){
    document.getElementById('content').innerHTML=`
    <div class="row-details">
    <div class="column-details">
      <h2 class="heading2-details">${data.title}</h2>
      <img src="${data.image_url}" alt="">
    </div>
  </div>
  <div class="row-details">
    <div class="column-details">
      <h3>${data.publisher}</h3>
      <p class="paragraph-details">Recipe ingredients</p>
      <div id="ingredients"></div>
      <a class="btn-details" href="${data.publisher_url}">Publisher URL</a>
    </div>
  </div>
  `
}
// Function to display recipe ingredients
function displayIngredients() {
    // Loop through each ingredient
    for (var i = 0; i < ingredients.length; i++) {
        var element = document.createElement('p');
        element.innerText = ingredients[i];
        
        // Append the <p> element to the 'ingredients' container
        document.getElementById('ingredients').append(element);
    }
}