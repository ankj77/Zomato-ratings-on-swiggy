// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//    	console.log(" activeTab 1 "+activeTab)
    
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });


// chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
//    function(tabs){
//    	var url = tabs[0].url;
//    	console.log(" url 1 "+url)
//     chrome.tabs.sendMessage(url, {"message": "browser_url"});
//    }
// );

// chrome.browserAction.onClicked.addListener(function(){
//     console.log("inside action clicked");
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//         chrome.tabs.sendMessage(tabs[0].id,"toggle");
//     })
// });

console.log(chrome.browserAction)
chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,"toggle");
    })
});


// var iframe = document.createElement('iframe'); 
// iframe.style.background = "green";
// iframe.style.height = "100%";
// iframe.style.width = "360px";
// iframe.style.position = "fixed";
// iframe.style.top = "0px";
// iframe.style.right = "0px";
// iframe.style.zIndex = "9000000000000000000";
// iframe.frameBorder = "none"; 

// document.body.appendChild(iframe);