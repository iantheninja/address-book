// Business logic for address book
function AddressBook() {
    this.contacts = [];
    this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts.push(contact);
}

AddressBook.prototype.assignId = function () {
    return this.currentId += 1;
}

AddressBook.prototype.findContact = function(id) {
    for (let i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i]) {      
            if (this.contacts[i].id == id) {
                return this.contacts[i];
            }
        }
    };
    return false;
}

AddressBook.prototype.deleteContact = function(id) {
    for (let i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i]) {      
            if (this.contacts[i].id == id) {
                delete this.contacts[i];
                return true;
            }
        }
    };
    return false;
}

// Business logic for contacts
function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
}

// User interface logic
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
    let contactsList = $("ul#contacts"); // query the dom once, multiple queries can slow down page
    let htmlForContactInfo = "";
    addressBookToDisplay.contacts.forEach(function(contact){
        htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
    });
    contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
    const contact = addressBook.findContact(contactId);
    $("#show-contact").show();

    console.log(contact.firstName);

    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
};

// Enables list items added to page to be clickable (event bubbling/delegation)
function attachContactListeners() {
    $("ul#contacts").on("click", "li", function() {
        console.log(this.id);
        showContact(this.id);
    });
};

$("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
});

/* Form submission block */
$(document).ready(function() {
    attachContactListeners();
    $("form#new-contact").submit(function(event){
        event.preventDefault();
        const inputtedFirstName = $("input#new-first-name").val();
        const inputtedLastName = $("input#new-last-name").val();
        const inputtedPhoneNumber = $("input#new-phone-number").val();

        $("input#new-first-name").val("");
        $("input#new-last-name").val("");
        $("input#new-phone-number").val("");

        let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
        addressBook.addContact(newContact);
        displayContactDetails(addressBook);
    });
});

