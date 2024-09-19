/**
 * JS for working with JSON exercise
 */

"use strict";
(function() {

  // Initialize event listeners when the page loads
  window.addEventListener('click', init);

  /**
   * Sets up event listeners for the page elements
   * - Adds a click event listener to the "loadDataButton"
   *   that triggers the loadData function
   */
  function init() {
    const button = document.getElementById('loadDataButton');
    button.addEventListener('click', loadData);
  }

  /**
   * Handles loading and displaying JSON data
   * - Defines a JSON object with sample data
   *    { name: "Alice", age: 30, country: "USA" },
        { name: "Bob", age: 25, country: "UK" },
        { name: "Charlie", age: 35, country: "Canada" }
   * - Shows a countdown timer before displaying the data
   * - Calls the displayData function to present the data after the countdown
   */
  function loadData() {
    // Define the JSON object with sample data
    const data = [
      { name: "Alice", age: 30, country: "USA" },
      { name: "Bob", age: 25, country: "UK" },
      { name: "Charlie", age: 35, country: "Canada" }
    ]
    

    // Prepare to show countdown and data

    const dataContainer = id('dataContainer');
    const p = document.createElement('p');
    dataContainer.appendChild(p);

    let counter = 3;
    let displayCountDown = id('dataContainer');
    displayCountDown.textContent =  `Loading data in ${counter} seconds...`

    let timerId = setInterval(function() {
      if (counter > 0) {
        counter--;
       displayCountDown.textContent =  `Loading data in ${counter} seconds...`

      } else {
        clearInterval(timerId);
        displayData(data);
      }
    }, 1000)

    // Update countdown every second

  }

  /**
   * Displays the JSON data in the data container
   * - Clears any existing content in the container
   * - Iterates over each item in the JSON data and creates
   *   a new div element for each item with formatted text
   * - Appends each div to the container
   * @param {object} data - The JSON data to be displayed
   */
  function displayData(data) {
    const container = id('dataContainer');
    container.innerHTML = '';

    for(let i = 0; i < data.length; i++){
      let div = gen('div');
      div.textContent = `Name: ${data[i].name}, Age: ${data[i].age}, Country: ${data[i].country}`;
      div.classList.add('data-item')
      container.appendChild(div);
    }
  }

  /**
   * Retrieves the DOM element with the specified ID
   * @param {string} id - The ID of the element to retrieve
   * @returns {object} - The DOM element with the specified ID
   */
  function id(id) {
    return document.getElementById(id);
  }
  
  /**
   * Creates a new DOM element with the specified tag name
   * @param {string} tagName - The name of the tag for the new element
   * @returns {object} - The newly created DOM element
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
