/**
 * JS for dynamic form validation exercise
 */

"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * Sets up necessary functionality when page loads
   */
  function init() {
    // Add event listener to form submit button
    const form = id('registrationForm');
    form.addEventListener('submit', validateForm, { once: true })

    // Add event listeners to input fields for real-time validation
    id('name').addEventListener('input', validateName);
    id('email').addEventListener('input', validateEmail);
    id('password').addEventListener('input', validatePassword);
    id('confirmPassword').addEventListener('input', validateConfirmPassword);


  }

  /**
   * Validates the entire form on submit
   * @param {Event} event - the event that triggered this function
   */
  function validateForm(event) {
    // Prevent form from submitting if there are validation errors
    event.preventDefault();

    let isValid = validateName() && validateEmail() && validatePassword() && validateConfirmPassword();
    // After successful validation, display a 3-second countdown and then show a success message.
    if (isValid) {
      startCountdown();

    }

  }

  /**
   * Starts a 3-second countdown and displays a success message
   */
  function startCountdown() {
    const countdown = id('countdown');
    let counter = 3;
    const notification = document.createElement('p');
    notification.innerHTML = '';
    countdown.appendChild(notification);

    const CountDownRun = setInterval(() => {
      if (counter > 0) {
        notification.innerHTML = `The remaining is ${counter}...`;
        counter--;
      } else if (counter <= 0) {
        notification.innerHTML = `Form submitted successfully`;
        clearInterval(CountDownRun);
      }
    }, 1000)

    if (CountDownRun) {
      countdown.style.display = 'block';
    }
  }

  /**
   * Validates the name field
   * @returns {boolean} - true if valid, false otherwise
   */
  function validateName() {
    const name = id('name').value;
    const nameError = id('nameError');
    nameError.innerHTML = '';
    if (name.length === 0) {
      nameError.innerHTML = 'Please enter the name of user';
      return false;
    } else if (name.length < 3) {
      nameError.innerHTML = 'Your name is not less than 3 characters';
      return false;
    }
    return true;
  }

  /**
   * Validates the email field
   * @returns {boolean} - true if valid, false otherwise
   */
  function validateEmail() {
    const email = id('email').value;
    const emailError = id('emailError');
    emailError.innerHTML = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      emailError.innerHTML = 'Please enter the email of user';
      return false;
    } else if (!email.match(emailRegex)) {
      emailError.innerHTML = 'Your email must be a valid email address';
      return false;
    }
    return true;
  }


  /**
   * Validates the password field
   * @returns {boolean} - true if valid, false otherwise
   */
  function validatePassword() {
    const password = id('password').value;
    const passwordError = id('passwordError');
    passwordError.innerHTML = '';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password.length === 0 || password.length === null) {
      passwordError.innerHTML = 'Please enter the password of user';
      return false;
    } else if (!password.match(passwordRegex) && password.length < 8) {
      passwordError.innerHTML = 'User password must minimum 8 characters, must include at least one uppercase letter, one lowercase letter, and one number';
      return false;
    }
    return true;
  }

  /**
   * Validates the confirm password field
   * @returns {boolean} - true if valid, false otherwise
   */
  function validateConfirmPassword() {
    const password = id('password').value;
    const confirmPassword = id('confirmPassword').value;
    const confirmPasswordError = id('confirmPasswordError');
    confirmPasswordError.innerHTML = '';
    if (confirmPassword.length === 0 || confirmPassword.length === null) {
      confirmPasswordError.innerHTML = 'Please enter the confirmPassword of user';
      return false;
    } else if (password !== confirmPassword) {
      confirmPasswordError.innerHTML = 'User confirmPassword must match the Password field.';
      return false;
    }
    return true;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a DOM object from the given tag name.
   * @param {string} tagName - the name of the element to be created.
   * @returns {object} - DOM object of the specified tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
