/*
 * Quadratic equation solver exercise
 *
 * TODO: implement the functionality for index.html webpage to solve quadratic equations
 * Use-case scenario: when a user enters numbers on three text fields with ids of "a",
 * "b", "c" and clicks "Solve" button, equation solution will be displayed on the <div>
 * with id "result".
 * 
 */
"use strict";
(function () {

  window.addEventListener("load", init);

  /**
   * init - write your logic here
   */
  function init() {
    document.getElementById('btn').addEventListener('click', handleClick);
  }

    const handleClick = () => {
      const a = parseInt(document.getElementById('a').value);
      const b = parseInt(document.getElementById('b').value);
      const c = parseInt(document.getElementById('c').value);

      // Validate input
      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById("result").textContent = "Please enter valid numbers for a, b, and c.";
        return;
      }

      if (a === 0) x = -c / b;
      if (b == 0) x = Math.sqrt(-c / a);
      if (c == 0) x1 = 0 && x2 == -b / a;

      let result = '';
      let delta = b * b - 4 * a * c;
      if (delta > 0) {
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        result = `With delta > 0, The result is: x1= ${x1} and x2= ${x2}`;
      } else if (delta == 0) {
        const x = -b / (2 * a);
        result = `With delta = 0, The result is: x1 = x2 = ${x} `;
      } else {
        // Complex roots
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
        result = `The roots are complex: x1 = ${realPart} + ${imaginaryPart}i, x2 = ${realPart} - ${imaginaryPart}i`;
      }
      document.getElementById('result').textContent = result;
    }
  }

)();