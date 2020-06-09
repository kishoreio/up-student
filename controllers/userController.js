const users = require('../models/userModel');

exports.getUser = async (req, res) => {
  try {
    const userQuery = users.find(req.body);
    const userData = await userQuery.select('name role');
    if (JSON.stringify(userData) !== '[]') {
      return res.status(200).json({
        status: 'success',
        data: {
          userData,
        },
      });
    }
    res.status(401).json({
      status: 'Not Found',
      message: 'Invalid User',
    });
  } catch (err) {
    console.log(err);
  }
};
