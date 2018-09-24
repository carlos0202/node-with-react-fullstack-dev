const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, async (request, response) => {
    const { title, subject, body, recipients } = request.body;
    console.log(request.body);
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email })),
      dateSent: Date.now(),
      _user: request.user.id
    });
    console.log(request.user);
    try {
      // Send mail to recipients
      const mailerHelper = new Mailer(survey, surveyTemplate(survey));
      const sgResponse = await mailerHelper.send();
      const surveyMongo = await survey.save();
      console.log(surveyMongo);
      request.user.credits -= 1;
      const user = await request.user.save();

      response.send(user);
    } catch (err) {
      response.status(422).send(err);
    }
  });

  app.get("/api/surveys/:surveyId/:choice", (request, response) => {
    response.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (request, response) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(request.body)
      .map(({url, email}) => {
        const match = p.test(new URL(url).pathname);
        if(match){
          return { email,  ...match };
        }
      }).compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    response.send({success: true, message: 'All is ok'});
  });

  app.get('/api/surveys', requireLogin, async (request, response) => {
    const surveys = await Survey.find({ _user: request.user.id })
      .select({ recipients: false });

    response.send(surveys);
  });
};
