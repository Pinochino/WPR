/**
 * JS for blog post section exercise
 */

"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * Sets up necessary functionality when the page loads.
   */
  function init() {
    qs("#entryBtn").addEventListener("click", addEntry);
  }

  /**
   * Adds a blog entry to the blog post page.
   */
  function addEntry() {
    const inputDate = qs('#date');
    const inputEntry = qs('#entry');
    const postContainer = qs('#posts');

    const article = gen('article');
    article.classList.add('post');

    const heading = gen('h3');
    heading.textContent = `Date: ${inputDate.value}`;

    const paragraph = gen('p');
    paragraph.textContent = `Entry: ${inputEntry.value}`;

    article.appendChild(heading);
    article.appendChild(paragraph);

    // Add double-click event listener to remove the post
    article.addEventListener('dblclick', () => {
      article.remove();
      checkPostLimit();
    });

    // Append the new post to the container
    postContainer.appendChild(article);

    // Clear the form inputs
    inputDate.value = '';
    inputEntry.value = '';

    // Check if the post limit has been reached
    checkPostLimit();
  }

  /**
   * Disables the "Add Entry" button if there are 3 or more posts.
   * Enables the button if there are fewer than 3 posts.
   */
  function checkPostLimit() {
    const postContainer = qs('#posts');
    const entryBtn = qs('#entryBtn');
    const postsCount = postContainer.children.length;

    // Disable the button if 3 or more posts exist
    if (postsCount >= 4) {
      entryBtn.disabled = true;
    } else {
      entryBtn.disabled = false;
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a DOM object from the given tag name.
   * @param {string} tagName - the name of the element to be created.
   * @returns {object} a DOM object of the specified tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
