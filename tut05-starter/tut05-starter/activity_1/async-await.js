"use strict";
(function () {

    window.addEventListener("load", init);

    // function init() {
    //     m3()
    //         .then(m1)
    //         .then(m2)
    //         .then(console.log)
    //         .catch(console.error);
    // }

    async function init() {
        try {
            const res3 = await m3();
            const res1 = await m1(res3);
            const res2 = await m2(res1);
            console.log(res2);
        } catch (error) {
            console.log(error);
        }
    }

    function m1(value) {
        return value + " lemon squeezy!";
    }

    function m2(value) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(value + " I'm gettin the hang of it now");
            }, 2000);
        });
    }

    function m3() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve("easy peasy");
            }, 1000);
        });
    }

})();