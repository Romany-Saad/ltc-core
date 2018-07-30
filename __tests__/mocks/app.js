const App = require("../../lib/App").default;

// creating a new app instance
const app = new App();

async function registerPluginsAndInitApp() {
  await app.load();
  app.loadGraphQlFromPlugins();
  return app
}

module.exports = registerPluginsAndInitApp;
