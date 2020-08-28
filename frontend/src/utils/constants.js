require('dotenv').config();

export const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:' + 4000
    : 'https://slackr-unsw.herokuapp.com';
