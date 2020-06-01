// business logic for address book
function AddressBook() {
    this.contacts = [];
    this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts.push(contact);
}

AddressBook.prototype.assignId = function () {
    return this.currentId += 1;;
}

// business logic for contacts
function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
}