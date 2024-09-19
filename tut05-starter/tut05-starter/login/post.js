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
    const button = id('sign-in');
    button.addEventListener('click', signIn);
  }

  /**
   * TODO
   * signIn - Signs the user in based on username and password inputs
   */
  function signIn() {
    const usernameValue = id('username').value;
    const passwordValue = id('password').value;

    //TODO
    const user = {
      username: usernameValue, 
      password: passwordValue
    }

    fetch(API_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(user)
    },
  )
      .then(statusCheck)
      .then(data => data.json())
      .then(displayData(data))
      .catch(handleError)
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  function displayData(data) {
    const response = id('response');
    response.innerHTML = '';
    if (data.username === 'rainbowdash' && data.password === ' ponyta') {
      response.innerHTML = `username: ${data.username}, password: ${data.password}`
    } else {
      response.innerHTML = 'Your information is wrong'
    }
  }

  function handleError(error) {
    console.log(`Can not fetch the data` + error);
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
