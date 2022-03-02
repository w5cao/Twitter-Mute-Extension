// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



// The onClicked callback function.
function onClickHandler(info, tab) {
    // Get selected text 
    var text = info["selectionText"]
    console.log("WORD: " + text);
    
    // Get stored muted words
    chrome.storage.local.get({ mutedWords: [] }, // default value if not defined yet
                function (items) {
                    if (items.css) {
                        textarea.value = items.css;
                        message('Loaded saved CSS.');
                    }
                });
    
    console.log(JSON.stringify(mutedWords));
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
    
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({
        "title": title, "contexts": [context],
        "id": "context" + context
    });
    console.log("'" + context + "' item:" + id);
});