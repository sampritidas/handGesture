/* eslint-disable max-len */

const fs = require('fs');
const formJSON = require('./generateJSON.js').formJSON;
const createWebsite = require('./library.js').createWebsite;

const main = function() {
  formJSON('./hand_gestures.csv');
  const file = './index.html';
  fs.writeFileSync(file, createWebsite('./handGestures.json'), 'utf8');
};

main();
