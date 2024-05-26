$("#sign-up-button").click(onSignUpClick);

function onSignUpClick() {
    let enteredEmailAddress = document.getElementById("cs-email-1394").value;

    var text = document.getElementById("sign-up-text");

    var form = document.getElementById("cs-email-1394");

    let savedMessage;
    let textColour;
    let formBorder;

    if (validateEmailAddress(enteredEmailAddress)) {
        saveEmailAddress(enteredEmailAddress);
        savedMessage = "Thank you for subscribing to our newsletter";
        textColour = "white";
        formBorder = "none";
    } else {
        savedMessage = "Please enter a valid email address";
        textColour = "red";
        formBorder = "3px solid red";
    }

    text.textContent = savedMessage;
    text.style.color = textColour;
    form.style.border = formBorder;
    text.style.fontSize = "large";
}

function validateEmailAddress(emailAddress) {
    // Function to validate an email address
    // Assumed rules for a valid email address are as follows:
    // For the email prefix:
    //      Allowed characters: letters (a-z), numbers, underscores, periods, and dashes.
    //      An underscore, period, or dash must be followed by one or more letter or number.
    // For the email domain:
    //      Allowed characters: letters, numbers, dashes.
    //      The last portion of the domain must be at least two characters, for example: .com, .org, .cc
    // Rules from: https://help.xmatters.com/ondemand/trial/valid_email_format.htm

    // Regex to match email address against
    // Start with [a-zA-Z0-9_.-], then has an "@" then matches [a-zA-Z0-9-],
    // then has an "." then matches [a-zA-Z0-9]
    const regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]/;

    // Checking to see if the email address is valid
    if (emailAddress.match(regex)) {
        const splitEmailAddress = emailAddress.split('@');

        let prefix = splitEmailAddress[0];

        let prefixSplit = prefix.split(/[_.-]/)

        let domain = splitEmailAddress[1].split('.');
        let domainName = domain[0];
        let domainSuffix = domain[1];

        if (!(prefixSplit.includes('')) && domainSuffix.length >= 2) {
            return true;
        }

    }

    return false;
}

const savedEmailAddressesKey = "savedEmailAddresses"

function saveEmailAddress(emailAddress) { 
    // Saving the email address to local storage
    // Meant to emulate the use of a database

    var localStorageSavedString = localStorage.getItem(savedEmailAddressesKey);
    console.log(localStorageSavedString);
    if (localStorageSavedString == null) {
        localStorageSavedString = "[]";
    }

    var localStorageSavedArray = JSON.parse(localStorageSavedString);
    console.log(localStorageSavedArray);

    localStorageSavedArray.push(emailAddress);
    console.log(localStorageSavedArray);

    localStorage.setItem(savedEmailAddressesKey, JSON.stringify(localStorageSavedArray))
}