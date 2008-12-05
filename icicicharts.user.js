// ==UserScript==
// @name          Fix ICICIDirect Charts
// @namespace     http://bluesmoon.blogspot.com
// @description   Converts backslashes in ICICI Direct's charts to front slashes
// @include       http://content.icicidirect.com/*
// @include       http://content.icicidirect.com/piecharttrading.asp
// ==/UserScript==

var imgs = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i<imgs.snapshotLength; i++)
{
   imgs.snapshotItem(i).src = imgs.snapshotItem(i).src.replace(/%5C|\\/, '/');
}
