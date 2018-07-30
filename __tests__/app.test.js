const registerPluginsAndInitApp = require("./mocks/app");
const {names} = require("../lib/App")
const express = require("express");

let app;
beforeAll(async () => {
  app = await registerPluginsAndInitApp();
});

// todo: test App.addPlugin method

describe("given an instance of App", () => {
  it("should have an instance of express server bound", () => {
    const s = app.get(names.APP_SERVICE_EXPRESS);
    expect(s.constructor.toString()).toBe(express().constructor.toString());
    expect(s).toHaveProperty("post");
    expect(s).toHaveProperty("listen");
  });

  it("should throw an error when asked for a config while no config plugin is loaded", () => {
    expect(() => app.config())
      .toThrowError("configuration object not yet loaded");
  });
});
