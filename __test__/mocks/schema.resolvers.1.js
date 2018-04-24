const data = require("./data");

module.exports = {
  Query: {
    users: () => data.users.map(user => ({username: user.username + " > override"})),
  },
};
