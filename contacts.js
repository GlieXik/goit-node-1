const fs = require("fs").promises;
const { log } = require("console");
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
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);

  return db;
}

async function getContactById(contactId) {
  const db = await listContacts();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const db = await listContacts();
  const contacts = db.filter((item) => item.id !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

async function addContact(name, email, phone) {
  const db = await listContacts();
  const id = nanoid();
  const contact = { id, name, email, phone };
  db.push(contact);
  fs.writeFile(contactsPath, JSON.stringify(db));
  return db;
}
