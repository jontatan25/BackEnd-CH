
require('dotenv').config()

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

module.exports = {
    id: FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: FACEBOOK_APP_SECRET
  };
