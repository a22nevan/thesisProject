//Write all fun scripts and functions here yippee

//Global variables
let fileSize = "s";
let maxCharacters = 300;
let minCharacters = 200;
let titleCharacters;

//Makes the info-box visible and interactable
function showInfo() {
    document.getElementById("darkFilter").classList.add("visible");
    document.getElementById("infoBox").classList.add("visible");
}

//Makes the info-box invisible and removes interactability
function exitInfo() {
    document.getElementById("darkFilter").classList.remove("visible");
    document.getElementById("infoBox").classList.remove("visible");
}

//Updates the file size (fairly self-explanatory)
function updateFileSize(value){
    fileSize = value;
    let postBody = document.getElementById("postBody");
    titleCharacters = document.getElementById("postTitle").value.length;
    let bodyLabel = document.getElementById("pbodyLabel");

    //Necessary reset shenanigans before updating the values to avoid errors
    postBody.minLength = 0;
    postBody.maxLength = 999999;

    //Changing values based on fileSize value
    switch (fileSize) {
        case "s":
            maxCharacters = 300;
            minCharacters = 150;
            break;

        case "m":
            maxCharacters = 1500;
            minCharacters = 950;
            break;

        case "l":
            maxCharacters = 7500;
            minCharacters = 4950;
            break;
        
        case "xl":
            maxCharacters = 22500;
            minCharacters = 14950;
            break;
    }

    postBody.maxLength = maxCharacters - titleCharacters;
    postBody.minLength = minCharacters;
    //Same updating as in updateCharacterCount for consistency
    bodyLabel.textContent = bodyLabel.textContent.split("/")[0] + "/" + (maxCharacters - titleCharacters) + " Characters";
}

//Updates the character count for the labels in createPost.php
//This function and the one above could technically be combined into one since they handle the same things but eh
function updateCharacterCount(textFieldID, labelID) {

    const textField = document.getElementById(textFieldID);
    const label = document.getElementById(labelID);

    let bodyLabel = document.getElementById("pbodyLabel");
    let postBody = document.getElementById("postBody");
    let characterCount = textField.value.length;
    titleCharacters = document.getElementById("postTitle").value.length;

    if(labelID == "ptitleLabel") {
        label.textContent = "Title | " + characterCount + "/50 Characters";
        //Updates the latter half of the "content" label so it dynamically shows how many characters remain depending on characters in title
        bodyLabel.textContent = bodyLabel.textContent.split("/")[0] + "/" + (maxCharacters - titleCharacters) + " Characters";
        //Also updates maxlength
        postBody.maxLength = maxCharacters - titleCharacters;
    } else if (labelID == "pbodyLabel") {
        label.textContent = "Content | " + characterCount + "/" + (maxCharacters - titleCharacters) + " Characters";
    }
}

//Onload eventlistener
document.addEventListener("DOMContentLoaded", () => {

    const page = window.location.pathname.split("/").pop();

    //Onload stuff for createPost.html
    if(page == "createPost.php"){
        const radios = document.querySelectorAll('input[name="fS"]');
        const pTitle = document.getElementById("postTitle");
        const pBody = document.getElementById("postBody");

        //Checks if a different radio button is checked
        radios.forEach(radio => {
            radio.addEventListener("change", () => {
                const selected = document.querySelector('input[name="fS"]:checked');
                console.log(selected.value);
                updateFileSize(selected.value);
            })
        })

        //Checks pTitle and pBody inputs, and updates the labels accordingly
        pTitle.addEventListener("input", () => {
            updateCharacterCount("postTitle", "ptitleLabel");
        })

        pBody.addEventListener("input", () => {
            updateCharacterCount("postBody", "pbodyLabel");
        })
    }
})


