const User = require('../models/User');

class TestController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.log(User)
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new TestController();