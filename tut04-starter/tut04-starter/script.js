/**
 * JS for working with JSON exercise
 */

"use strict";

(function () {
  
  // Initialize event listeners when the page loads
  window.addEventListener('load', init)

  /**
   * Sets up event listeners for the page elements
   * - Adds a click event listener to the "loadDataButton"
   *   that triggers the loadData function
   */
  function init() {
    const btn = id('loadDataButton');
    btn.addEventListener('click', loadData);
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
  function countdown (ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }


  async function loadData() {
    const content = id('dataContainer');
    content.textContent = ''; // Clear any previous content

    // Define the JSON object with sample data
    const data = [
      { name: "Alice", age: 30, country: "USA" },
      { name: "Bob", age: 25, country: "UK" },
      { name: "Charlie", age: 35, country: "Canada" }
    ]


    // Prepare to show countdown and data
    let time = 3;
    let p = gen('p');
    content.appendChild(p)
    // const countdown = setInterval(() => {
    //   p.textContent = `Loading data in ${time} seconds...`
    //   content.appendChild(p)
    //   time--;
    //   if (time < 0) {
    //     clearInterval(countdown);
    //     displayData(data);
    //   }
    // }, 1000);

    while(time >= 0){
      p.textContent = `Loading data in ${time} seconds...`
      await countdown(1000)
      time--
    }
    displayData(data);


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
  async function displayData(data) {
    const content = id('dataContainer');
    content.textContent = '';
    data.forEach(item => {
      const div = gen('div');
      div.textContent = `Name: ${item.name}, Age: ${item.age}, Country: ${item.country}`
      content.appendChild(div);
    });
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
