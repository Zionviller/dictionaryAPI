console.log("Yeep!");

var xhr = new XMLHttpRequest();

var searchBox = document.getElementById('wordToSearch');
var goButton = document.getElementById('submit');

var resultsData = [];
var resultsHTML = "";
var resultsDIV = document.getElementById('results');

goButton.addEventListener('mouseup', doSearch, false);

function doSearch() {
  var query = searchBox.value.replace(/[^a-zA-Z]/g, '');
  console.log("Search is: " + query);

  xhr.send(null);

  displayResults();
}

function displayResults() {
  if(resultsData.length == 0) {
    resultsDIV.innerHTML = "<p>No results.</p>";
  } else {
    resultsDIV.innerHTML = '';

    for(var i = 0; i < resultsData.length; i++) {
      resultsDIV.innerHTML += "<p>" + resultsData[i] + "</p>";

    }
  }
}

xhr.onload = function() {
  if(xhr.status === 200) {
    if(isAllAnagrams) {
      resultsData = JSON.parse(xhr.responseText).all;
    } else {
      resultsData = JSON.parse(xhr.responseText).best;
    }

    console.log(resultsData);
  }
};
