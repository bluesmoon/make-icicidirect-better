// ==UserScript==
// @name          Add portfolio link directly on equity page
// @namespace     http://bluesmoon.blogspot.com
// @include       https://secure.icicidirect.com/trading/equity/*
// ==/UserScript==

//GM_log("Started");
var as = document.evaluate('//a[@href="https://secure.icicidirect.com/trading/portfolio/portfolio.asp"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//GM_log("Got " + as.snapshotLength + " anchors");

for(var i=0; i<as.snapshotLength; i++)
{
   as.snapshotItem(i).href = "https://secure.icicidirect.com/trading/portfolio/portfolio_tracker.asp"
}
