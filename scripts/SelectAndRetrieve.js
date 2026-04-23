// ==UserScript==
// @name         SelectAndRetrieve
// @namespace    http://tampermonkey.net/
// @version      2026-04-22
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1/thesisProject/pages/getPost.php
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const fileSize = "xl";

    let sizeList = document.getElementById("listSize");
    sizeList.value = fileSize;
    sizeList.dispatchEvent(new Event("change", { bubbles: true }));

    window.addEventListener("dropdownReady", () => {
        let indexList = document.getElementById("listIndex");
        let rButton = document.getElementById("rButton");

        let count = parseInt(localStorage.getItem("Counter"));

        if (isNaN(count)) {
            count = 0;
        } else {
            count ++;
        }

        localStorage.setItem("Counter", count);
        console.log(count);
        console.log("Dropdown ready: ", indexList.options.length);

        //Retrieves each available item in the dropdown list until it reaches the end
        if (count < indexList.options.length) {
            indexList.selectedIndex = count;
            rButton.click();
        } else {
            alert("It should be done now!");
            localStorage.clear();
        }

    }, { once: true });

})();