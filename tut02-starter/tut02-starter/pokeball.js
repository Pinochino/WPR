/*
 * Pokeball Exercise
 *
 * Implements the functionality of the Pokeball webpage to show a mystery
 * Pokemon when a button is clicked.
 */
"use strict";
(function () {
  window.addEventListener("load", init);

  /**
   * init - setup the demo button to change the image on click.
   */
  function init() {
    const btn = document.querySelector("#demo-btn");
    btn.addEventListener("click", handleClick);
  }

  let state = false;
  function handleClick() {

    if (!state) {
      document.querySelector("#pokeball").src = "mystery.gif";
      state = true;
    } else {
      document.querySelector("#pokeball").src = "pokeball.jpg";
      state = false;
    }
  }
})();
