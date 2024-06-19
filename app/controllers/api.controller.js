const apiService = require("../services/api.service");

const identify = async (ctx) => {
  const { email, phoneNumber } = ctx.request.body;

  if (!email && !phoneNumber) {
    ctx.throw(400, "Email or phone number is required");
  }

  const existingContacts = await apiService.findContactByEmailOrPhone(
    email,
    phoneNumber
  );

  if (existingContacts.length === 0) {
    const newContact = await apiService.createPrimaryContact(
      email,
      phoneNumber
    );
    ctx.body = {
      contact: {
        primaryContactId: newContact.id,
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: [],
      },
    };
    return;
  }

  const contactIds = existingContacts.map((contact) => contact.id);

  for (let contact of existingContacts) {
    if (
      (email && contact.email !== email) ||
      (phoneNumber && contact.phoneNumber !== phoneNumber)
    ) {
      await apiService.createSecondaryContact(email, phoneNumber, contact.id);
      break;
    }
  }

  const consolidatedContact = await apiService.consolidateContacts(
    existingContacts
  );

  ctx.body = {
    contact: consolidatedContact,
  };
};

module.exports = {
  identify,
};
