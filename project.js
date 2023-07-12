/*jslint browser:true */
"use strict";
function addMonths (elem) {
var annualUseKw = 0, dailyUseKw=0, i=0, x=0;
var months=document.getElementById(elem).getElementsByTagName('input');


    for(i=0; i<months.length; i++) {
        x = Number(months[i].value);
        annualUseKw += x;
    }   // End loop
    dailyUseKw = annualUseKw/365;
    return dailyUseKw;
} // End of Function
function sunHrs() {
var hrs;
var Zone = document.forms.solarForm .zone.selectedIndex;
Zone += 1;
switch(Zone) {
    case 1:
        hrs = 6;
        break;
    case 2:
        hrs = 5.5;
        break;
    case 3:
        hrs = 5;
        break;
    case 4:
        hrs = 4.5;
        break;
    case 5:
        hrs = 4.2;
        break;
    case 6:
        hrs = 3.5;
        break;
    default:
        hrs = 0;
}
return hrs;
}


function calcPanel() {
var userChoice = document.forms.solarForm.panel.selectedIndex;
var panelOptions = document.forms.solarForm.panel.options;
var power = panelOptions[userChoice].value;
var nameOfPanel = panelOptions[userChoice].text;
var x = [power, nameOfPanel];
return(x);
}


function calcSolar() {
var dailyUseKw = addMonths('mpc');
// console.log(dailyUseKw);

var sunHoursPerDay = sunHrs(); 
// console.log(sunHoursPerDay);

var minKwNeeds = dailyUseKw / sunHoursPerDay;
// console.log(minKwNeeds);

var realKwNeeds = minKwNeeds * 1.25;
// console.log(realKwNeeds);

var realWattNeeds = realKwNeeds * 1000;
// console.log(realWattNeeds);

var panelInfo = calcPanel();
var panelOutput = panelInfo[0];
var panelName = panelInfo[1];
// console.log(panelOutput);
// console.log(panelName);

var panelNeeded = Math.ceil(realWattNeeds / panelOutput);
// console.log(panelNeeded);


var feedback = "";
feedback+="<p>Based on your average daily use of "+Math.round(dailyUseKw)+" kWh, you will need to purchase "+panelNeeded+" "+panelName+" brand solar panels to offset 100% of you electricity bill.</p>";
feedback+="<h2>Additional Details</h2>";
feedback+="<p>Your average daily electricity Consumption: "+Math.round(dailyUseKw)+" kWh per day</p>"
feedback+="<p>Average Sunshine hours per day : "+ sunHoursPerDay +" hours</p>";
feedback+="<p>Realistc watts needed per hour: "+ Math.round(realWattNeeds)+" Watts/hours</p>";
feedback+="<p>The "+panelName+" panel you selected generates about "+panelOutput+" watts pers hour.</p>";

document.getElementById('feedback').innerHTML=feedback;

}