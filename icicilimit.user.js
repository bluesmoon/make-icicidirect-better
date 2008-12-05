// ==UserScript==
// @name          Show total payable
// @namespace     http://bluesmoon.blogspot.com
// @description   Shows total amount payable by and to you
// @include       https://secure.icicidirect.com/trading/equity/trading_limit.asp
// ==/UserScript==

var tables = document.getElementsByTagName('table');
//GM_log("Got " + tables.length + ' tables');
for(var i=0; i<tables.length; i++)
{
   var table = tables[i];
   //GM_log("Checking " + i + ' for child tables');
   if (table.getElementsByTagName('table').length > 0)
      continue;

   //GM_log("Checking " + i + ' for allocations');
   if (!table.innerHTML.match(/Allocation\s+:/))
      continue;

   var allocation = table.innerHTML.match(/Allocation\s+:.+?([\d,.]+)/);
   allocation = parseFloat(allocation[1].replace(',', ''));
   //GM_log("Allocation: " + allocation);
   var payable_to=0;

   var rows = table.getElementsByTagName('tr');
   // first two rows are headings
   //GM_log("Got" + rows.length + ' rows');
   for (var j=2; j<rows.length; j++)
   {
      var cols = rows[j].getElementsByTagName('td');
      //GM_log("Cols: " + cols.length);
      //GM_log("Row Payable: " + cols[4].innerHTML + ', ' + cols[5].innerHTML);
      payable_to += parseFloat(cols[5].innerHTML.replace(',', '')) - parseFloat(cols[4].innerHTML.replace(',', ''));
      //GM_log("Payable: " + payable_to);
   }

   //GM_log("Sum Payable: " + payable_to);

   //GM_log("Appending row");

   var row = document.createElement('tr');
   row.style.backgroundColor = 'white';
   row.style.fontFamily = 'verdana';
   row.style.fontSize = '0.7em';
   row.style.textAlign='right';
   var col = document.createElement('th');
   col.colSpan = 5;
   col.style.textAlign='left';
   var text = document.createTextNode('Total:');
   col.appendChild(text);
   row.appendChild(col);

   col = document.createElement('td');
   var spayable_to = '' + Math.abs(payable_to.toFixed(2));
   while(spayable_to.match(/^\d{4,}/))
      spayable_to = spayable_to.replace(/^(\d+)(\d{3})/, '$1,$2');

   if(payable_to < 0)
   {
      spayable_to = '(' + spayable_to + ')';
      col.style.color = 'red';
   }
   text = document.createTextNode(spayable_to);
   col.appendChild(text);
   row.appendChild(col);
   
   //GM_log("Row: " + row.innerHTML);

   table.appendChild(row);

   row = document.createElement('tr');
   row.style.backgroundColor = 'white';
   row.style.fontFamily = 'verdana';
   row.style.fontSize = '0.7em';
   row.style.textAlign='right';
   col = document.createElement('th');
   col.colSpan = 5;
   col.style.textAlign='left';
   text = document.createTextNode('Allocation after transaction:');
   col.appendChild(text);
   row.appendChild(col);

   col = document.createElement('td');

   allocation += payable_to;

   var sallocation = '' + Math.abs(allocation.toFixed(2));
   while(sallocation.match(/^\d{4,}/))
      sallocation = sallocation.replace(/^(\d+)(\d{3})/, '$1,$2');

   if(allocation < 0)
   {
      sallocation = '(' + sallocation + ')';
      col.style.color = 'red';
   }
   text = document.createTextNode(sallocation);
   col.appendChild(text);
   row.appendChild(col);
   
   //GM_log("Row: " + row.innerHTML);

   table.appendChild(row);

   break;
}
