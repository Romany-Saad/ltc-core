const ContactEmail = require("../../lib/models/ContactEmail").default;

let contactEmail;
beforeAll(() => {
  contactEmail = new ContactEmail();
});

const validValue = {
  "address": "test@domain.tld",
  "name": "test name",
};

const invalidValue = {
  "address": "testdomain.tld",
  "name": 2,
};


describe("contactEmail inherits from BaseModel class", () => {
  it("constructs successfully", () => {
    expect(contactEmail).toBeInstanceOf(ContactEmail);
  });

  it("sets and gets id", () => {
    contactEmail.setId("testId");
    expect(contactEmail.getId()).toBe("testId");
  });

  it("should subtract id from data", () => {
    contactEmail.set(Object.assign(validValue, { _id: "test_id_val" }));
    expect(contactEmail.getId()).toBe("test_id_val");
    expect(contactEmail.serialize()).toHaveProperty("_id");
  });

  it("serialized data should match set data", () => {
    contactEmail.set(validValue);
    expect(contactEmail.serialize()).toHaveProperty("address");
  });

  it("should return true when validating valid data", () => {
    contactEmail.set(validValue);
    expect(contactEmail.selfValidate()).toBe(true);
  });

  it("should return false when validating invalid data with errors", () => {
    contactEmail.set(invalidValue);
    expect(contactEmail.selfValidate()).toBe(false);
    expect(contactEmail.getErrors().length).toBeGreaterThan(0);
    expect(contactEmail.getErrors()[0]).toHaveProperty("dataPath");
  });

});
