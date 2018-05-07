const ContactEmail = require("../../lib/models/ContactEmail").default;

let contactEmail;
beforeAll(() => {
  contactEmail = new ContactEmail();
});

const validValue = {
  "address": "test@domain.tld",
  "name": "test name",
};

describe("contactEmail is an instance of ContactEmail class", () => {
  it("should set data and serialize data correctly", () => {
    contactEmail.set(validValue);
    expect(contactEmail.serialize()).toHaveProperty("address");
  });

  it("can set data", () => {
    contactEmail.set(validValue);
    expect(contactEmail.serialize()).toHaveProperty("address");
  });
});
