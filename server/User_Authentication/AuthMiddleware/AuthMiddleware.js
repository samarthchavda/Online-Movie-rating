const User = require("../../Models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../token");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user)
        return res.json({
          status: true,
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      else return res.json({ status: false });
    }
  });
};
