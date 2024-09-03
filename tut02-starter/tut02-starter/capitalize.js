/*
 * Capitalizing text of all paragraphs
 */
"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * init - write your logic here
   */
  function init() {
   const paragraphs = document.querySelectorAll('p')
   paragraphs.forEach((data) => data.textContent = data.textContent.toUpperCase())

  }
})();