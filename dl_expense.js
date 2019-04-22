"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Dylan Kelley
   Date:   4.19.19
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

/// Event Listener to run the following anonymous function when the page loads.
window.addEventListener('load', function () {
      // Var: Matches all input elements in the travelExp table that belong to the sum class.
      var changingCells = document.querySelectorAll('table#travelExp input.sum');

      // For: Loops through every item in the changeCells collection.
      for (var i = 0; i < changingCells.length; i++) {
            /// Adds an onchange event handler that runs calcExp() function.
            changingCells[i].onchange = calcExp;
      }

      /// Adds an event handler for the click event that runs the validateSummary() function when the button with the ID of "submitButton" is clicked.
      document.getElementById("submitButton").onclick = validateSummary;
});

/**
 * @param {Event}
 */

// Func: Validates the data entry in the summary field.
function validateSummary(e) {
      // Var: Stores the summary field.
      var sum = document.getElementById("summary");
      // If: Checks if the validation state of the summary field value is missing.
      if (sum.validity.valueMissing) {
            /// Displays a customized validation message if employees neglect to fill out the summary field.
            sum.setCustomValidity("You must include a summary of the trip in your report.");
      }
      // Else: Sets the custom validation message to an empty text string.
      else {
            sum.setCustomValidity("");
      }
}

/**
 * @param {String} sumClass The class name.
 */

// Func: Sums up all of the data values for elements of the sumClass class.
function calcClass(sumClass) {
      // Var: Contains the object collection of all elements belonging to the sumClass class.
      var sumFields = document.getElementsByClassName(sumClass);

      // Var: Used to keep a running total of the total values in the input elements in the sumFields object collection, and starts with an initial value of 0.
      var sumTotal = 0;

      // For: Loops through the items in the sumFields object collection.
      for (var i = 0; i < sumFields.length; i++) {

            // Var: Equal to the numeric value of the current input element in the sumFields array.
            var itemValue = parseFloat(sumFields[i].value);

            // If: Checks if the itemValue variable is a numeric value.
            if (!isNaN(itemValue)) {
                  /// Adds itemValue to sumTotal.
                  sumTotal += itemValue;
            }
      }

      /// Returns the value of sumTotal.
      return sumTotal;
}

// Func: Calculates the travel expenses from all categories and dates.
function calcExp() {
      // Var: Contains all the table row elements within the table body of the travelExp table.
      var expTable = document.querySelectorAll("table#travelExp tbody tr");

      // For: Loops through the rows in the expTable collection.
      for (var i = 0; i < expTable.length; i++) {

            /// Sets the value of the input element with the ID subtotal[i] to the value returned by the calcClass() function using the parameter value date[i], and formats the value returned by the calcClass() function as a text string using the formatNumber() function to 2 decimals.
            expTable[i].querySelector("input#subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }

      /// Sets the values of the transTotal input elements by calling the calcClass() function using the parameter value "trans" and formatting the values using the formatNumber() function to 2 decimal places.
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);

      /// Sets the values of the lodgeTotal input elements by calling the calcClass() function using the parameter value "lodge" and formatting the values using the formatNumber() function to 2 decimal places.
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);

      /// Sets the values of the mealTotal input elements by calling the calcClass() function using the parameter value "meal" and formatting the values using the formatNumber() function to 2 decimal places.
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);

      /// Sets the values of the otherTotal input elements by calling the calcClass() function using the parameter value "other" and formatting the values using the formatNumber() function to 2 decimal places.
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);

      /// Sets the value of the expTotal input element to the value returned by the calcClass() function using “sum” as the parameter value and formatting the returned value using the formatUSCurrency() function.
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}



// * Given Fucntions * \\

// Func: Formats the value, "val" to the number of decimals indicated by "decimals", adding thousands separators.
function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

// Fucn

// Func: Formats the value, "val", as U.S. currency.
function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}