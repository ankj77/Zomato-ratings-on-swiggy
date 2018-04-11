function submitKey() {
	var key = document.getElementById('submitButton').value;
	console.log(key);
}	


window.addEventListener('load', function load(event){
    var createButton = document.getElementById('create_button');
    var btn = document.getElementById('submitButton');
    btn.addEventListener('click', function() { 
    	var key = document.getElementById('submitValue').value;
    	if(key)
    	 console.log(key);
    	else 
    	 return;
    });
});