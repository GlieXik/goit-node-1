const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("./contacts.json");
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

async function listContacts() {
  try {
    const dbRaw = await fs.readFile(contactsPath);
    const db = JSON.parse(dbRaw);

    return db;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const db = await listContacts();
    const contact = db.find((item) => item.id === contactId);
    if (!contact) {
      return `Contact with id = ${contactId} not found`;
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const db = await listContacts();
    const contacts = db.findIndex((item) => item.id === contactId);

    if (contacts === -1) return `Contact with id = ${contactId} not found`;
    const removeContact = db.splice(contacts, 1);
    await fs.writeFile(contactsPath, JSON.stringify(db));
    return removeContact;
  } catch (e) {
    console.log(e);
  }
}

async function addContact(name, email, phone) {
  try {
    const db = await listContacts();
    const id = nanoid();
    const contact = { id, name, email, phone };
    db.push(contact);
    fs.writeFile(contactsPath, JSON.stringify(db));
    return db;
  } catch (e) {
    console.log(e);
  }
}
