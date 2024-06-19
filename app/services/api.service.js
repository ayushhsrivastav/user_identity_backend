const db = require("../../models/index");

const findContactByEmailOrPhone = async (email, phoneNumber) => {
  return db.Contact.findAll({
    where: {
      [db.Sequelize.Op.or]: [{ email }, { phoneNumber }],
      deletedAt: null,
    },
  });
};

const createPrimaryContact = async (email, phoneNumber) => {
  return db.Contact.create({
    email,
    phoneNumber,
    linkPrecedence: "primary",
  });
};

const createSecondaryContact = async (email, phoneNumber, linkedId) => {
  return db.Contact.create({
    email,
    phoneNumber,
    linkedId,
    linkPrecedence: "secondary",
  });
};

const updateContactLinkage = async (id, linkedId) => {
  return db.Contact.update(
    { linkedId, linkPrecedence: "secondary" },
    { where: { id } }
  );
};

const consolidateContacts = async (contacts) => {
  let primaryContact = contacts.find(
    (contact) => contact.linkPrecedence === "primary"
  );
  let secondaryContacts = contacts.filter(
    (contact) => contact.linkPrecedence === "secondary"
  );

  return {
    primaryContactId: primaryContact.id,
    emails: [...new Set(contacts.map((contact) => contact.email))],
    phoneNumbers: [...new Set(contacts.map((contact) => contact.phoneNumber))],
    secondaryContactIds: secondaryContacts.map((contact) => contact.id),
  };
};

module.exports = {
  findContactByEmailOrPhone,
  createPrimaryContact,
  createSecondaryContact,
  updateContactLinkage,
  consolidateContacts,
};
