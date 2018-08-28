const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
require("./models/User");
require("./services/passport");

//connect to mongodb
mongoose.connect(keys.mongoDbURI);
//express server main object
const app = express();
//configure body parser middleware
app.use(bodyParser.json());
// configure cookie session options
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // lasts 30 days
    keys: [keys.cookieKey]
  })
);
// tell passport to use session.
app.use(passport.initialize());
app.use(passport.session());
//add routing to express API
require("./routes/auth")(app);
//add routing to billing routes
require("./routes/billing")(app);
//add request handlers for the react app in production environment
if(process.env.NODE_ENV === 'production'){
  // Tell Express to serve production assets required by the react app
  app.use(express.static('client/build'));

  // Express will serve index.html file whenever he encounters a route
  // he doesn't recognize
  const path = require('path');
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
