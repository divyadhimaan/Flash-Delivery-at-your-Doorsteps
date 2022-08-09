const User = require("./models/User");
const Shop = require("./models/Shop");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
// const userFunc =  (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user){
            return done(null, false, { message: 'Incorrect username.' });
        } 
        // if (!user.validPassword(password)) {
        //     return done(null, false, { message: 'Incorrect password.' });
        //   }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};

// module.exports = function (passport) {
// // const userFunc =  (passport) => {
//   passport.use(
//     new localStrategy((username, password, done) => {
//       Shop.findOne({ username: username }, (err, shop) => {
//         if (err) throw err;
//         if (!shop){
//             return done(null, false, { message: 'Incorrect username.' });
//         } 
//         // if (!user.validPassword(password)) {
//         //     return done(null, false, { message: 'Incorrect password.' });
//         //   }
//         bcrypt.compare(password, shop.password, (err, result) => {
//           if (err) throw err;
//           if (result === true) {
//             return done(null, shop);
//           } else {
//             return done(null, false);
//           }
//         });
//       });
//     })
//   );

//   passport.serializeUser((shop, cb) => {
//     cb(null, shop.id);
//   });
//   passport.deserializeUser((id, cb) => {
//     Shop.findOne({ _id: id }, (err, shop) => {
//       const shopInformation = {
//         username: shop.username,
//       };
//       cb(err, shopInformation);
//     });
//   });
// };