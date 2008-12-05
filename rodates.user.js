// ==UserScript==
// @name          Fix ICICIDirect Readonly date ranges on trade book and order book
// @namespace     http://bluesmoon.blogspot.com
// @include       https://secure.icicidirect.com/trading/equity/trading_*
// ==/UserScript==

if(document.getElementById('Text1'))
   document.getElementById('Text1').readOnly = false;
if(document.getElementById('Text2'))
   document.getElementById('Text2').readOnly = false;
