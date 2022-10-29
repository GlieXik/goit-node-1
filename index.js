const contacts = require("./contacts");

const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const db = await contacts.listContacts();

      console.log(db);

      break;

    case "get":
      const contactGet = await contacts.getContactById(id);
      console.log(contactGet);
      break;

    case "add":
      const contactAdd = await contacts.addContact(name, email, phone);
      console.log(contactAdd);

      break;

    case "remove":
      const contactRemove = await contacts.removeContact(id);
      console.log(contactRemove);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
