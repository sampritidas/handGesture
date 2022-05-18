const fs = require('fs');

const stringToObject = function (data) {
  const [nameInSanskrit, translateInHindi, Illustrarion] = data.split('|');
  return {
    nameInSanskrit: nameInSanskrit,
    translateInHindi: translateInHindi,
    Illustration: Illustrarion,
  };
};

const formJSON = function (fileToBeParsed) {
  const fileAsString = fs.readFileSync(fileToBeParsed, 'utf8');
  const stringAsObject = fileAsString.split('\n').map(stringToObject);
  const spaces = 2;
  const jsonForm = JSON.stringify(stringAsObject, null, spaces);
  fs.writeFileSync('./handGestures.json', jsonForm, 'utf8');
};

exports.formJSON = formJSON;
