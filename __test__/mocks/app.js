const App = require("../../lib/App").default;

// creating a new app instance
const app = new App();

// registering app services
app.register();

// initializing app
app.init();

// exporting application
module.exports = app;
