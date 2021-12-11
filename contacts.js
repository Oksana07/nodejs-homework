const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContent = async () => {
  try {
    const contactsPath = await fs.readFile(
      path.join(__dirname, "db", "contacts.json"),
      "utf8"
    );
    const result = JSON.parse(contactsPath);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const listContacts = async () => {
  try {
    return await readContent();
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await readContent();
    const newContact = { name, email, phone, id: crypto.randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "db", "contacts.json"),
      JSON.stringify(contacts, null, 4)
    );
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContent();
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContent();
    const id = contacts.findIndex(
      (contact) => contactId === contact.id.toString()
    );
    if (id === -1) {
      return;
    }
    const update = contacts.splice(id, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return update;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};