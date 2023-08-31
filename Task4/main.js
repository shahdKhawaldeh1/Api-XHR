// Create a new XMLHttpRequest instance to make AJAX requests
var request = new XMLHttpRequest();

// Initialize an array to store data
var data = [];

// Get the sidebar element
var sidebar = document.getElementById('sidebar');

// Function to fetch data based on a given type
function getData(type) {
    // Open a GET request to the Forkify API based on the type
    request.open('get', `https://forkify-api.herokuapp.com/api/search?q=${type}`);
    request.send();
    request.onreadystatechange = function () {
        // Check if the request is completed and successful
        if (request.readyState == 4 && request.status == 200) {
            // Parse the JSON response and store the recipes in the 'data' array
            data = JSON.parse(request.response).recipes;
            // Call the display function to show the recipes
            display();
        }
    };
}

// Function to display recipes
function display() {
    var content = ``;
    // Loop through the 'data' array and generate HTML content for each recipe
    for (var i = 0; i < data.length; i++) {
      content += `
        <div class="row-main">
          <div class="card ">
            <h2 class="heading2-main">${data[i].title}</h2>
            <p class="pargraph-main">${data[i].publisher}</p>
            <img src="${data[i].image_url}" class="w-100" alt="">
            <a class="click" href="details.html?id=${data[i].recipe_id}">Show Recipe Details</a>
          </div>
        </div>`;
    }
    
    // Set the generated HTML content in the 'content' div
    document.getElementById('content').innerHTML = content;
}

// Attach click event handler to the sidebar
sidebar.addEventListener('click', function (e) {
    if (e.target && e.target.matches('a.nav-link')) {
        // Get the clicked item's text content
        var item = e.target.textContent;
        // Call getData with the clicked item
        getData(item);
    }
});

// Array to store list items
const listItems = [
  "Pizza",
  "Carrot","Cucumber","Lettuce","Mushrooms"
  ,"Onion","Potato","Pumpkin","Red pepper"
  ,"Tomato","Beetroot","Brussel sprouts","Peas",
  ,"Zucchini","Radish","Sweet potato","Artichoke","Leek"
];

// Function to update the list based on the array
function updateList() {
  const sidebar = document.getElementById("sidebar");

  // Clear existing items
  sidebar.innerHTML = "";

  // Loop through the array and add items to the list
  listItems.forEach(item => {
    const li = document.createElement("li");
    li.className = "nav-item";
    const a = document.createElement("a");
    a.className = "nav-link";
    a.textContent = item;
    li.appendChild(a);
    sidebar.appendChild(li);
  });
}

// Initial update of the list
updateList();

// Example of adding a new item to the list
function addNewItem(item) {
  listItems.push(item);
  updateList();
}

// Call the function to add a new item (you can call this when needed)
addNewItem("Apple");