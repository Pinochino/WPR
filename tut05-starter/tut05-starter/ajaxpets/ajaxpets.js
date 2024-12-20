/**
 * A webpage for fetching cute pet photos.
 * Photos will be populated on the page after the user
 * selects their desired pet type.
 */
"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * TODO: What do we need to initialize?
   */
  function init() {
    // TODO
    // const inputs = qsa("input[name=animal]");
    // inputs.forEach((input) => {
    //   input.addEventListener('change', makeRequest)
    // })

    const inputDiv = qsa('input');
    inputDiv.forEach(input => input.addEventListener('click', makeRequest));
  }

  /**
   * 
   * TODO: Fetch data from the ajax pets API!
   */
  function makeRequest() {
    // const animal = qs("input[name=animal]:checked").value
    // const url = `https://hanustartup.org/wpr/api/pets/index.php?animal=${animal}`;
    const url = `https://hanustartup.org/wpr/api/pets/index.php?animal=` + this.value;


    fetch(url)
      .then(statusCheck)
      .then(data => data.text())
      .then(data => processData(data))
      .catch(error => console.log(error))
  }

  /**
   * TODO: Implement any other functions you need
   */
  function processData(data) {
    const pictureDiv = id('pictures');
    pictureDiv.textContent = ""

    let imgUrl = data.split('\n')
    imgUrl.forEach(path => {
      const imgDiv = document.createElement('img');

      imgDiv.src = path;
      pictureDiv.appendChild(imgDiv);
    })
  }

  function handleError(params) {
    params = `No images available`;
    return params;
  }


  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
