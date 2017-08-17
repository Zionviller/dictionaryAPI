//console.log("Yeep!");

var xhr = new XMLHttpRequest();

var searchBox = document.getElementById('wordToSearch');
var goButton = document.getElementById('submit');

var XMLParser = new DOMParser();
var data;
var definitions;
var resultsDIV = document.getElementById('results');

if(localStorage.search)
{
  searchBox.value = localStorage.search;
}

xhr.onreadystatechange = function() {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    data = JSON.parse(xhr.responseText);
    displayResults();
  }
};

goButton.addEventListener('mouseup', doSearch, false);
searchBox.addEventListener('keyup', handleEnterKey, false);

function doSearch() {
  var query = searchBox.value.replace(/[^a-zA-Z]/g, '');
  //console.log("Search is: " + query);
  localStorage.search = query;
  xhr.open('GET', 'https://api.datamuse.com/words?rel_syn=' + query, true);
  xhr.send(null);
}

function handleEnterKey(e)
{
  //console.log('key released');
  if(e.keyCode == 13)
  {
    doSearch();
  }
}

function displayResults() {
  ///console.log(data);
  resultsDIV.innerHTML = '';
  var resultsText = '';
  if(data.length == 0)
  {
    resultsText = "Cannot find synonyms.";
  } else if(data.length >= 5)
  {
    for(var i = 0; i < 5; i++) {
      resultsText += "<p>";
      resultsText += data[i].word;
      resultsText += "</p>";
    }
  } else {
    for(var i = 0; i < data.length; i++){
      resultsText += "<p>";
      resultsText += data[i].word;
      resultsText += "</p>";
    }
  }

  resultsDIV.innerHTML = resultsText;
}
