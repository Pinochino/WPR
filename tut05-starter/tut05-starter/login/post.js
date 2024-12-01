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
    const form = document.querySelector('form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      signIn();
    });
  }

  /**
   * TODO
   * signIn - Signs the user in based on username and password inputs
   */
  function signIn() {
    let message = id('response');
    message.innnerHTML = '';

    const usernameValue = id('username').value;
    const passwordValue = id('password').value;

    // if ((!usernameValue !== 'rainbowdash') || (!passwordValue !== 'ponyata')) {
    //   message.innerHTML = 'Username and password is wrong';
    // }

    const formDiv = new FormData();
    formDiv.append('user', usernameValue);
    formDiv.append('password', passwordValue);

    //TODO
    fetch(API_URL, {
      method: "POST",
      body: formDiv
    })
      .then(statusCheck)
      .then(response => response.text()) // Response is plain text
      .then(data => displayData(data))
      .catch(handleError);
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  function displayData(data) {
    const response = id('response');
    response.textContent = data;
    return response;
  }

  function handleError(error) {
    console.error(error);
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
