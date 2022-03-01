// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
    // TODO: change this 
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
};

chrome.contextMenus.onClicked.addListener(onClickHandler); // Add listener

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function () {
    // Create one test item for each context type.
    var context = "selection";

    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({
        "title": title, "contexts": [context],
        "id": "context" + context
    });
    console.log("'" + context + "' item:" + id);
});
