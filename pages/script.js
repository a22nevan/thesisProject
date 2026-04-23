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
    const postBody = document.getElementById("postBody");
    titleCharacters = document.getElementById("postTitle").value.length;
    const bodyLabel = document.getElementById("pbodyLabel");

    let characterCount = postBody.value.length;

    //Necessary reset shenanigans before updating the values to avoid errors
    postBody.minLength = 0;
    postBody.maxLength = 999999;

    //Changing values based on fileSize value
    switch (fileSize) {
        case "s":
            maxCharacters = 300;
            minCharacters = 200;
            break;

        case "m":
            maxCharacters = 1500;
            minCharacters = 1000;
            break;

        case "l":
            maxCharacters = 7500;
            minCharacters = 5000;
            break;
        
        case "xl":
            maxCharacters = 22500;
            minCharacters = 15000;
            break;
    }

    postBody.maxLength = maxCharacters;
    postBody.minLength = minCharacters;
    //Same updating as in updateCharacterCount for consistency
    bodyLabel.textContent = bodyLabel.textContent.split("/")[0] + "/" + maxCharacters + " Characters";

    //Updating the button in here as well to prevent bypassing the disable when switching file sizes
    if(characterCount >= minCharacters && characterCount <= maxCharacters) {
        postButton.disabled = false;
    } else {
        postButton.disabled = true;
    }
}

//Updates the character count for the labels in createPost.php
//This function and the one above could technically be combined into one since they handle the same things but eh
function updateCharacterCount(textFieldID, labelID) {

    const textField = document.getElementById(textFieldID);
    const label = document.getElementById(labelID);
    const postBody = document.getElementById("postBody");
    const postButton = document.getElementById("postButton");

    let characterCount = textField.value.length;

    if(labelID == "ptitleLabel") {
        label.textContent = "Title | " + characterCount + "/50 Characters";
    } else if (labelID == "pbodyLabel") {
        label.textContent = "Content | " + characterCount + "/" + maxCharacters + " Characters";

        //Disables the button if character count in body isnt within the specified range
        if(characterCount >= minCharacters && characterCount <= maxCharacters) {
            postButton.disabled = false;
        } else {
            postButton.disabled = true;
        }
    }

}

//Updates the dropdown "listIndex" in getPost.php, based on the selected value in the "listSize" dropdown
function updateDropdown(value) {

    const dropdownIndex = document.getElementById("listIndex");
    const getButton = document.getElementById("rButton");
    let internalCount = 0; //Internal count for the index so it looks nicer in the dropdown

    //Calls upon the getResources.php to do some database magic
    fetch(`getResources.php?fileSize=${value}`)
        //Converts the result body into json
        .then(result => result.json())
        .then(posts => {

            //Clears the html in the index dropdown to prepare it for new option elements
            dropdownIndex.innerHTML = "";

            //If no posts were returned, adds an option that says that no posts were found
            if(posts.length === 0) {
                const option = document.createElement("option");
                
                option.textContent = "No posts found";
                option.disabled = true;
                option.selected = true;
                //Also disables the retrieve post button to prevent errors
                getButton.disabled = true;

                dropdownIndex.appendChild(option);

                //window.dispatchEvent(new Event("dropdownReady"));
                return;
            }

            //Adds an option to the dropdown for each post in the result
            posts.forEach(post => {
                const option = document.createElement("option");

                option.value = post.index; //Value is still accurate to the index in the database, not shown in the dropdown menu though
                
                //Adds "(No Title)" to option if post has no title
                if(post.title){
                    option.textContent = internalCount + ` - ${post.title}`;
                } else {
                    option.textContent = internalCount + " - (No Title)";
                }

                //Enables the button to prevent it from permanently being disabled if no posts were found previously
                getButton.disabled = false;

                dropdownIndex.appendChild(option);
                internalCount++;
            });

            window.dispatchEvent(new Event("dropdownReady"));
        });

}

//Onload eventlistener
document.addEventListener("DOMContentLoaded", () => {

    const page = window.location.pathname.split("/").pop();

    //Onload stuff for createPost.php
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
    //Onload for getPost.php
    else if(page == "getPost.php"){
        const sizeDropdown = document.getElementById("listSize");

        //Initial update of the dropdown based on the default value when loading the page
        updateDropdown(sizeDropdown.value);

        //Updates the index dropdown when a new value in the size dropdown is selected
        sizeDropdown.addEventListener("change", () => {
            const fileSize = sizeDropdown.value;
            updateDropdown(fileSize);
        })
    }
})


