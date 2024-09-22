/*
 * Sending POST request with fetch
 */
'use strict';
(function () {
  const API_URL = 'https://hanustartup.org/wpr/api/login.php';

  window.addEventListener('load', init);

  /**
   * TODO - setup the sign-in button on initial page load
   */
  function init() {
    // TODO
    const button = document.querySelector('form');
    button.addEventListener('submit', signIn);
  }

  /**
   * TODO
   * signIn - Signs the user in based on username and password inputs
   */
  function signIn(event) {
    event.preventDefault();
    const usernameValue = id('username').value;
    const passwordValue = id('password').value;

    //TODO
    

    fetch(API_URL , {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        user: usernameValue, 
        password: passwordValue
      })
    })
      .then(statusCheck)
      .then(response => response.text())
      .then(data => displayData(data))
      .catch(handleError)
    }

  /* ------------------------------ Helper Functions  ------------------------------ */
  function displayData(data) {
    console.log(data);
    const response = id('response');
    response.textContent = '';
    const user = data.user;
    const password = data.password
    if (data.user === 'rainbowdash' && data.password === 'ponyta') {
      response.textContent = `username: ${user}, password: ${password}`
    } else {
      response.textContent = `username: ${user}, password: ${password}`
    }
  }

  function handleError(error) {
    console.log(`Can not fetch the data ` + error.message);
  }

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
   * Returns the element that has the matches the selector passed.
   * @param {string} selector - selector for element
   * @return {object} DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
