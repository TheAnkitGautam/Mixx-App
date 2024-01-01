const jwt = require('jsonwebtoken');

const generateToken = (user) => {
      const token = jwt.sign({
            _id: user._id
      }, 'process.env.JWT_SECRET', {
            expiresIn: '30d'
      });
      return token;
}

module.exports = generateToken;