const passport = require("passport");

const registerPost = (req, res, next) => {
  const done = (error, user) => {
    if (error) return next(error);

    req.login(user, (error) => (error ? next(error) : res.json(user)));
  };

  passport.authenticate("registerStrategy", done)(req);
};

const loginPost = (req, res, next) => {
  const done = (error, user) => {
    if (error) return next(error);

    req.login(user, (error) => (error ? next(error) : res.redirect("/")));
  };

  passport.authenticate("loginStrategy", done)(req);
};

const logoutPost = (req, res, next) => {

  if(req.user){
    console.log("Cerrando session")
    req.logout();
    req.session.destroy(()=>{
      res.clearCookie('connect.sid');
      return res.redirect('/');
    });
    
  }

}

module.exports = {
  registerPost,
  loginPost,
  logoutPost
};
