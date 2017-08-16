console.log("Yeep!");

var xhr = new XMLHttpRequest();

var searchBox = document.getElementById('wordToAnagram');
var goButton = document.getElementById('findAnagram');

var resultsData = [];
var resultsHTML = "";
var resultsDIV = document.getElementById('results');

var isAllAnagrams = true;
var isAllAnagramsCheckbox = document.getElementById('isAllAnagrams');
checkBind();

goButton.addEventListener('mouseup', doSearch, false);
isAllAnagramsCheckbox.addEventListener('change', checkBind, false);

function checkBind() {
  isAllAnagrams = isAllAnagramsCheckbox.checked;
}

function doSearch() {
  var query = searchBox.value.replace(/[^a-zA-Z]/g, '');
  console.log("Search is: " + query);

  if(isAllAnagrams)  {
    xhr.open('GET', 'https://www.anagramica.com/all/:' + searchBox.value, true);
  } else {
    xhr.open('GET', 'https://www.anagramica.com/best/:' + searchBox.value, true);
  }

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
