// ==UserScript==
// @name         GenerateAndSubmit
// @namespace    http://tampermonkey.net/
// @version      2026-04-22
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1/thesisProject/pages/createPost.php
// @require      http://127.0.0.1/thesisProject/scripts/words.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const fileSize = "xl";
    const postLimit = 500;

    //Math random with seeding
    function jsf32(a, b, c, d) {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        var t = (a - ((b << 23) | (b >>> 9))) | 0;
        a = (b ^ ((c << 16) | (c >>> 16))) | 0;
        b = (c + ((d << 11) | (d >>> 21))) | 0;
        //b = (c + d) | 0;
        c = (d + t) | 0;
        d = (a + t) | 0;
        return (d >>> 0) / 4294967296;
    }

    Math.random = function () {
        var ran = jsf32(
            0xf1ea5eed,
            Math.randSeed + 6871,
            Math.randSeed + 1889,
            Math.randSeed + 56781
        );
        Math.randSeed += Math.floor(ran * 37237);
        return ran;
    };

    Math.setSeed = function (seed) {
        Math.randSeed = seed;
        for (var i = 0; i < 7; i++) Math.random();
    };

    Math.randSeed = Math.floor(Date.now());

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //Edits word to be in past tense, correct for the most part
    function edify(word) {
        var subs = word.slice(-1);
        if (subs != "e") {
            return "ed";
        } else {
            return "d";
        }
    }

    //Chooses word from list based on distribution
    //Linear if Distribution = 1, Normal Distribution if 0
    function randomword(list, distribution) {
        if (distribution) {
            var r = getRandomInt(0, list.length);
            return list[r];
        } else {
            var ret = getRandomInt(0, list.length);
            ret = getRandomInt(0, ret);
            return list[ret];
        }
    }

    //Replaces term "search" with "replace" at the first occurrence after position "n" in string "subject"
    function replacen(search, replace, subject, n) {
        var foundpos = 0;
        var beforestr = "";
        var afterstr = "";

        foundpos = subject.indexOf(search);

        if (foundpos != -1) {
            beforestr = subject.substr(0, foundpos);
            afterstr = subject.substr(foundpos + search.length);
            subject = beforestr + replace + afterstr;
        }

        return subject;
    }

    function countfinds(search, subject) {
        var n = 0;
        var count = 0;
        var index = 0;
        while (n >= 0) {
            n = subject.indexOf(search, index);
            if (n != -1) count++;
            index = n + search.length;
        }
        return count;
    }

    function replacerandom(placeholder, set, distribution, sentence) {
        var found = countfinds(placeholder, sentence);
        for (var i = 0; i < found; i++) {
            sentence = replacen(
                placeholder,
                randomword(set, distribution),
                sentence,
                0
            );
        }
        return sentence;
    }

    function generateSentence(
    probnounphrase,
     probverbphrase,
     probdualajdectives,
     probstartadj,
     distributionnouns,
     distributionverbs,
     distributionadjectives,
     distributionadverbs,
     distributiondeterminers,
     distributionconjunctions,
     distributionmodals
    ) {

        var sentence = "[subject] [verbphrase] [object]";

        sentence = sentence.replace("[subject]", "[nounphrase]");
        sentence = sentence.replace("[object]", "[nounphrase]");

        //Replace all nounphrases with "delimiter noun" or "delimiter adjective noun"
        //Also add determiners and plural s

        var nonounphrases = countfinds("[nounphrase]", sentence);
        for (var i = 0; i < nonounphrases; i++) {
            if (getRandomInt(0, 100) / 100.0 >= probnounphrase) {
                let replacestring = randomword(determiner, distributiondeterminers);

                if (
                    replacestring == "another" ||
                    replacestring == "a" ||
                    replacestring == "the" ||
                    replacestring == "one" ||
                    replacestring == "this" ||
                    replacestring == "that" ||
                    replacestring == "which" ||
                    replacestring == "either" ||
                    replacestring == "neither" ||
                    replacestring == "each" ||
                    replacestring == "every" ||
                    replacestring == "any" ||
                    replacestring == "whichever" ||
                    replacestring == "the same" ||
                    replacestring == "which" ||
                    replacestring == "whatever" ||
                    replacestring == "no" ||
                    replacestring == "my" ||
                    replacestring == "your" ||
                    replacestring == "our" ||
                    replacestring == "his" ||
                    replacestring == "her" ||
                    replacestring == "each" ||
                    replacestring == "the only" ||
                    replacestring == "the" ||
                    replacestring == "this" ||
                    replacestring == "that"
                ) {
                    replacestring = " " + replacestring + " [noun]";
                } else {
                    replacestring = " " + replacestring + " [noun]s";
                }

                sentence = replacen("[nounphrase]", replacestring, sentence, 0);
            } else {
                let replacestring = randomword(determiner, distributiondeterminers);

                if (
                    replacestring == "another" ||
                    replacestring == "a" ||
                    replacestring == "the" ||
                    replacestring == "one" ||
                    replacestring == "this" ||
                    replacestring == "that" ||
                    replacestring == "which" ||
                    replacestring == "either" ||
                    replacestring == "neither" ||
                    replacestring == "each" ||
                    replacestring == "every" ||
                    replacestring == "any" ||
                    replacestring == "whichever" ||
                    replacestring == "the same" ||
                    replacestring == "which" ||
                    replacestring == "whatever" ||
                    replacestring == "no" ||
                    replacestring == "my" ||
                    replacestring == "your" ||
                    replacestring == "our" ||
                    replacestring == "his" ||
                    replacestring == "her" ||
                    replacestring == "each" ||
                    replacestring == "the only" ||
                    replacestring == "the" ||
                    replacestring == "this" ||
                    replacestring == "that"
                ) {
                    replacestring = " " + replacestring + " [adjective] [noun]";
                } else {
                    replacestring = " " + replacestring + " [adjective] [noun]s";
                }

                sentence = replacen("[nounphrase]", replacestring, sentence, 0);
            }
        }

        // Replace all noun determiners with a random determiner
        found = countfinds("[determiner] [noun]", sentence);

        for (i = 0; i < found; i++) {
            //console.log("FOO"+ sentence +found);
            let replacestring = randomword(determiner, distributiondeterminers);

            if (
                replacestring == "another" ||
                replacestring == "a" ||
                replacestring == "the" ||
                replacestring == "one" ||
                replacestring == "much" ||
                replacestring == "this" ||
                replacestring == "that" ||
                replacestring == "which" ||
                replacestring == "either" ||
                replacestring == "neither" ||
                replacestring == "each" ||
                replacestring == "every" ||
                replacestring == "any" ||
                replacestring == "whichever" ||
                replacestring == "the same" ||
                replacestring == "which" ||
                replacestring == "whatever" ||
                replacestring == "no" ||
                replacestring == "my" ||
                replacestring == "your" ||
                replacestring == "our" ||
                replacestring == "his" ||
                replacestring == "her" ||
                replacestring == "each" ||
                replacestring == "the only" ||
                replacestring == "the" ||
                replacestring == "this" ||
                replacestring == "that"
            ) {
                replacestring = " " + replacestring + " [noun]";
            } else {
                replacestring = " " + replacestring + " [noun]s";
            }

            sentence = replacen("[determiner] [noun]", replacestring, sentence, 0);
        }

        //Replace all verbphrases with "verb" or "adverb verb"
        nonounphrases = countfinds("[verbphrase]", sentence);
        for (i = 0; i < nonounphrases; i++) {
            if (getRandomInt(0, 100) / 100.0 >= probverbphrase) {
                sentence = replacen("[verbphrase]", "[verb]", sentence, 0);
            } else {
                sentence = replacen("[verbphrase]", "[adverb] [verb]", sentence, 0);
            }
        }

        //Replace some adjectives with two adjectives
        let adjectives = countfinds("[adjective]", sentence);
        for (let i = 0; i < adjectives; i++) {
            if (getRandomInt(0, 100) / 100.0 >= probdualajdectives) {
                sentence = replacen("[adjective]", "[dual adjective]", sentence, 0);
            }
        }

        //Replace all dual adjectives with two adjectives
        //One alternative to this is to insert an "and" between the two adjectives
        let dualadjectives = countfinds("[dual adjective]", sentence);
        for (let i = 0; i < dualadjectives; i++) {
            sentence = replacen(
                "[dual adjective]",
                "[adjective] [conjunction] [adjective]",
                sentence,
                0
            );
        }

        //Replace all conjunctions with a random conjunction
        var conjunctions = countfinds(
            "[adjective] [conjunction] [adjective]",
            sentence
        );
        //console.log("Before conjunction loop: ["+found+"] " + sentence);
        for (let i = 0; i < conjunctions; i++) {
            //console.log("Before conjunction: "+sentence);
            let replacestring = randomword(conjunction, distributionconjunctions);
            if (replacestring == "or") {
                replacestring = "either [adjective] or [adjective]";
            } else if (replacestring == "nor") {
                replacestring = "neither [adjective] nor [adjective]";
            } else if (replacestring == "both") {
                replacestring = "both [adjective] and [adjective]";
            } else if (replacestring == "equally") {
                replacestring = "equally [adjective] and [adjective]";
            } else {
                replacestring = "[adjective] " + replacestring + " [adjective]";
            }
            sentence = replacen(
                "[adjective] [conjunction] [adjective]",
                replacestring,
                sentence,
                0
            );
        }

        // Replace all nouns with a random noun
        sentence = replacerandom("[noun]", noun, distributionnouns, sentence);

        // Replace all verbs with a random verb
        // Verbs have modals

        var found = countfinds("[verb]", sentence);
        for (let i = 0; i < found; i++) {
            let replacestring = randomword(verb, distributionverbs);
            let amodal = randomword(modal, distributionmodals);

            if (amodal == "s") {
                replacestring += "s";
            } else if (amodal == "ed") {
                replacestring += edify(replacestring);
            } else if (amodal == "had") {
                replacestring = amodal + " " + replacestring + edify(replacestring);
            } else {
                // All others such as can shall will did etc
                replacestring = amodal + " " + replacestring;
            }

            sentence = replacen("[verb]", replacestring, sentence, 0);
        }

        // Replace all adverbs with a random adverb
        sentence = replacerandom("[adverb]", adverb, distributionadverbs, sentence);

        // Replace all adjectives with a random adjective
        sentence = replacerandom(
            "[adjective]",
            adjective,
            distributionadjectives,
            sentence
        );

        // Remove starting space and add period and make first letter capital.
        sentence = sentence.trimStart();
        // remove double spaces
        sentence = sentence.replace(/  /g, " ");

        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
    }

    //Generates a post based on the file size
    function generatePost(fileSize) {

        let max, min, odds;

        //Determines character min and max, as well as odds for newline depending on file size
        switch (fileSize) {
            case "s":
                max = 300;
                min = 200;
                odds = 65;
                break;

            case "m":
                max = 1500;
                min = 1000;
                odds = 80;
                break;

            case "l":
                max = 7500;
                min = 5000;
                odds = 90;
                break;

            case "xl":
                max = 22500;
                min = 15000;
                odds = 95;
                break;
        }

        let text = "";
        let sentenceCount = 0;
        let attempts = 0; //Really only here as a failsafe in case it should throw an error multiple times in a row. Have not seen this happen

        while (true) {
            try {
                //Tries to generate a new sentence and add it to the existing text. If it goes over the max length the function stops and the sentence is discarded
                let sentence = generateSentence(0.5, 0.3, 0.2, 0.8, 0, 0, 0, 0, 1, 1, 1);
                let candidate = text ? text + " " + sentence : sentence;

                sentenceCount++;

                //After 10 sentences, there is a chance that line breaks will happen, essentially creating a new paragraph
                if (sentenceCount >= 10) {
                    let newLineCheck = getRandomInt(0, 10);
                    //console.log("NewLine: " + newLineCheck);

                    if (newLineCheck <= 2) {
                        candidate += "\n\n";
                        sentenceCount = 0; //Resets the sentence count if a paragraph break has been added
                    }
                }

                if (candidate.length > max) {
                    if (text.length >= min) {
                        break;
                    } else {
                        continue;
                    }
                }

                text = candidate;


                //While within the valid character range, generates a random number between 0 and 99. If the number is higher than the odds, the function stops making new sentences.
                //This is mainly to add variety to the text length, trying to spread it out evenly across the range instead of only populating either the higher or lower bound
                if (text.length >= min) {
                    let tempInt = getRandomInt(0, 100);
                    console.log(tempInt);

                    if (tempInt > odds){ break; }
                }
            } catch (err) { //Failsafe, probably unnecessary but better to be safe than sorry
                attempts ++;

                if (attempts > 20) {
                    console.error("Failed to generate sentence too many times", err);
                    text = "ERROR";
                    break;
                }
            }
        }

        return text;
    }

    //Generates a title by grabbing a random noun and converting the first letter to uppercase
    function generateTitle() {
        let title = randomword(noun, 0);

        return title.charAt(0).toUpperCase() + title.slice(1);
    }

    //Generates the entire post based on the seed, allowing for replication of the posts
    function generateAndPost(seed) {
        let radio;

        Math.setSeed(seed);

        switch (fileSize) {
            case "s":
                radio = document.getElementById("small");
                break;

            case "m":
                radio = document.getElementById("medium");
                break;

            case "l":
                radio = document.getElementById("large");
                break;

            case "xl":
                radio = document.getElementById("xLarge");
                break;
        }

        radio.checked = true;
        radio.dispatchEvent(new Event("change", { bubbles: true }));

        let post = generatePost(fileSize);
        let title = generateTitle();

        const titleInput = document.getElementById("postTitle");
        const bodyInput = document.getElementById("postBody");

        titleInput.value = title;
        bodyInput.value = post;

        titleInput.dispatchEvent(new Event("input", { bubbles: true }));
        bodyInput.dispatchEvent(new Event("input", { bubbles: true }));

        const submitButton = document.getElementById("postButton");
        submitButton.click();
    }

    let count = parseInt(localStorage.getItem("Counter")); //Manages the amount of times that a post should be made

    if (isNaN(count)) {
        count = 1;
    } else {
        count ++;
    }

    localStorage.setItem("Counter", count);
    console.log(count);

    //Generates posts and sends them to the database until enough posts have been made.
    if (count <= postLimit) {
        generateAndPost(count);
    } else if (count > postLimit) {
        localStorage.clear(); //Clearing count here to avoid having to rely on separate script for seed clearing and such.
        alert("Done!");
        return;
    }

})();