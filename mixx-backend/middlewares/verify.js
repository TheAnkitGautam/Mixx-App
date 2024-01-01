const errorCodes = require("../errorCodes.js");

const verify = (req, res, next) => {
      const token = req.header("token");
      if (!token) return res.status(419).send({ error: errorCodes[419] });

      try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
      }
      catch (error) {
            res.status(400).send({ error: "Invalid Token" });
      }
}

module.exports = verify;