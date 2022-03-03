function onMessage(request, sender, sendResponse) {
  if (request.method == "saveStats") { 
    chrome.storage.sync.get({
      words: 0,
      pages: 0
    }, function(items) {
      chrome.storage.sync.set({
        words: items.words + request.words,
        pages: items.pages + 1
      });
    });
    sendResponse({});
  } else {
    // Show icon
    chrome.pageAction.show(sender.tab.id);
    chrome.storage.sync.get({
      filter: 'aggro'
    });
    sendResponse({});
  }
}

chrome.runtime.onMessage.addListener(onMessage);


// The onClicked callback function.
function onClickHandler(info, tab) {
  // Get selected text
  var text = info["selectionText"]
  console.log("WORD: " + text);

  // Get stored muted words
  chrome.storage.sync.get({
    blacklist: "" // default value
  },
      function (data) {
          console.log(data.blacklist);
          update(data.blacklist); //storing the storage value in a variable and passing to update function
          console.log(data.blacklist);
      }
  );

  function update(array) {
      array = array + "\n" + text;
      // update with modified value
      chrome.storage.sync.set({
        blacklist: array
      }, function () {});
  }
};


chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function () {
  var context = "selection";
  var title = "Test '" + context + "' menu item";
  var id = chrome.contextMenus.create({
      "title": title, "contexts": [context],
      "id": "context" + context
  });
  console.log("'" + context + "' item:" + id);
});
