// ==UserScript==
// @name          Show percentage profit or loss
// @namespace     http://bluesmoon.blogspot.com
// @description   Shows percentage profit or loss 
// @include       https://secure.icicidirect.com/trading/portfolio/portfolio_tracker.asp*
// @include       https://secure.icicidirect.com/trading/portfolio/mf_portfolio_tracker.asp*
// ==/UserScript==

var tables = document.getElementsByTagName('table');
GM_log("Got " + tables.length + ' tables');
for(var i=0; i<tables.length; i++)
{
   var table = tables[i];
   GM_log("Checking " + i + ' for child tables');
   if (table.getElementsByTagName('table').length > 0)
      continue;

   GM_log("Checking " + i + ' for TOTAL');
   if (!table.innerHTML.match(/TOTAL/))
      continue;

   var rows = table.getElementsByTagName('tr');
   var len = rows.length;
   GM_log("Got table with " + len + " rows");

   var total_row = rows[len-2];
   total_row.appendChild(document.createElement('td'));

   var cols = total_row.getElementsByTagName('td');

   var input = parseFloat(cols[1].innerHTML.replace(/,/g, ''));
   var rprofit = parseFloat(cols[3].innerHTML.replace(/,/g, ''));
   var uprofit = parseFloat(cols[4].innerHTML.replace(/,/g, ''));

   var tprofit = Math.round((rprofit + uprofit)*100)/100;

   var pprofit = "" + (Math.round(tprofit*10000/input)/100);
   tprofit = "" + tprofit;

   cols[6].bgColor = "#ffffff";
   cols[6].align = cols[5].align="right";
   cols[6].className = cols[5].className = "content_bold";
   cols[5].colSpan = 1;
   cols[6].colSpan = 3;

   while(tprofit.match(/^\d{4,}/))
      tprofit = tprofit.replace(/^(\d+)(\d{3})/, '$1,$2');

   while(pprofit.match(/^\d{4,}/))
      pprofit = pprofit.replace(/^(\d+)(\d{3})/, '$1,$2');

   cols[5].innerHTML = tprofit;
   cols[6].innerHTML = pprofit + '%';

   break;
}
