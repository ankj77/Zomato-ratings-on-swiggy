 chrome.runtime.onMessage.addListener(function(response, sender, sendResponse ) {
    console.log('inside addListener fn');
    console.log(response);

    userkey = response;
  })