const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.user);
if (req.user) {;
  res.locals.securityFeedback = req.flash("securityError");
  res.render("user-home.ejs")
} else {
  res.locals.signupFeedback = req.flash("signupSuccess");
  res.render("index.ejs")
}
});

module.exports = router;
