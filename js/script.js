

// chrome.runtime.onMessage.addListener(function(response, sender, sendResponse ) {
//     alert(response);
// })

window.addEventListener('load', function load(event){
    var createButton = document.getElementById('create_button');
    var btn = document.getElementById('submitButton');
    btn.addEventListener('click', function() { 
    	var key = document.getElementById('submitValue').value;
        const url = 'https://developers.zomato.com/api/v2.1/search?entity_id=1';
    	if(key) {
    	 console.log(key);
        }
         
         fetch(url, {
           headers: {
            "user-key": key
           } 
         })
          .then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
                if(myJson.code == 403)
                 document.getElementById('error-mssg').innerHTML = 'Invalid Api Key';    
                else
                // chrome.runtime.sendMessage(key);
                 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                 chrome.tabs.sendMessage(tabs[0].id, {apiKey: key}, function(response) {
                    console.log(response.farewell);
                 });
              });
           }) 
          .catch(error => {
          })
         // var xhttp = new XMLHttpRequest();
         // xhttp.onreadystatechange = function(){
         //    if(this.status === 403) {
         //        document.getElementById('error-mssg').innerHTML = 'Invalid Api Key';
         //        //alert('Invalid Api Key');
         //    }
         //    else {
         //        chrome.runtime.sendMessage(key);
         //    }

         // }

         
         //xhttp.open("GET", url, true);
         //xhttp.send();

    });
});