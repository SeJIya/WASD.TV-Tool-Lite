chrome.browserAction.onClicked.addListener(() => {	
	window.open("https://wasd.tv/channel/173869");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	  if(request.message === "check_extension"){
			chrome.management.get("ckblfoghkjhaclegefojbgllenffajdc", (extension) => {
				if(extension){
					if(extension.enabled){
						sendResponse(true)
					}else{
						sendResponse(false)
					}
				}else{
					sendResponse(false)
				}
			})
	  };
	  return true;
});