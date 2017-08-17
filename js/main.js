console.log("Yeep!");

var xhr = new XMLHttpRequest();

var searchBox = document.getElementById('wordToSearch');
var goButton = document.getElementById('submit');

var XMLParser = new DOMParser();
var data;
var definitions;
var resultsDIV = document.getElementById('results');

xhr.onreadystatechange = function() {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    data = JSON.parse(xhr.responseText);
    displayResults();
  }
};

goButton.addEventListener('mouseup', doSearch, false);

function doSearch() {
  var query = searchBox.value.replace(/[^a-zA-Z]/g, '');
  console.log("Search is: " + query);

  xhr.open('GET', 'https://api.datamuse.com/words?rel_syn=' + query, true);
  xhr.send(null);
}

function displayResults() {
  if(data.length >= 5) {
    for(var i = 0; i < 5; i++) {
      console.log(data[i]);
    }
  } else {
    for(var i = 0; i < data.length; i++){
      console.log(data[i]);
    }
  }
}
