const jwt = require('jsonwebtoken');
const SECRET_PASS = "STORE_PASS_qwertyuiopasdfghjklzxvbnm_Admin_pass";
const AdminAuth = (req, res, next) => {
  const token = req.cookies.uid;

  if (token) {
    jwt.verify(token, SECRET_PASS, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        // Token is valid, proceed to the next middleware or route handler
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports ={AdminAuth}

