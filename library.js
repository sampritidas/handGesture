/* eslint-disable max-statements */
/* eslint-disable max-len */

const fs = require('fs');
const ZERO = 0;
const ONE = 1;

const classAttributes = function (attributes) {
  return Object.keys(attributes).map(function (key) {
    return key + '="' + attributes[key] + '"';
  }).join(' ');
};

const createTag = function (tagName, attributes, content) {
  const attribs = classAttributes(attributes);
  return ['<', tagName, ' ', attribs, '>\n', content, '\n</' + tagName + '>\n'].join('');
};

const createTableRow = function (tag, contents) {
  return Object.values(contents).map(function (content) {
    return ['<', tag, '>', content, '</', tag, '>\n'].join('');
  }).join('');
};

const tabularTag = function (parentTag, subTag, contents) {
  const tableRow = createTableRow(subTag, contents);
  return ['<', parentTag, '>\n', tableRow, '\n</', parentTag, '>'].join('');
};

const imgDiv = function (imgName) {
  const imageName = 'images/' + imgName;
  const indexToSlice = -5;
  const altName = imgName.slice(ZERO, indexToSlice);
  const imgTag = createTag('img', { 'src': imageName, 'alt': altName });
  return createTag('div', { 'class': 'image' }, imgTag);
};

const tbodyRow = function (contents) {
  contents.Illustration = imgDiv(contents.Illustration);
  return tabularTag('tr', 'td', contents);
};

const createBodycontent = function (contents) {
  return contents.map(tbodyRow).join('');
};

const createHeadTag = function (titleName) {
  const titleTag = createTag('title', '', titleName);
  const linkTag = createTag('link', { 'rel': 'stylesheet', 'href': 'css/styles.css' });
  return createTag('head', '', titleTag + linkTag);
};

const createTableDiv = function (data) {
  const thead = tabularTag('thead', 'th', data[ZERO]);
  const tbody = createBodycontent(data.slice(ONE));
  const tableBlock = createTag('tbody', '', thead + tbody);
  const tableTag = createTag('table', '', tableBlock);

  return createTag('div', { 'class': 'table-class' }, tableTag);
};

const createHeaderTag = function (tagName) {
  const uTag = createTag('u', '', tagName);
  const h2Tag = createTag('h2', '', uTag);
  return createTag('header', '', h2Tag);
};

const createBodyTag = function (data) {
  const tableDiv = createTableDiv(data);
  const headTag = createHeaderTag('Asamyukta Hastromudra');

  return createTag('body', '', headTag + tableDiv);
};

const createWebsite = function (fileName) {
  const handGesturesData = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  const headTag = createHeadTag('Hand Gestures');
  const bodyTag = createBodyTag(handGesturesData);
  
  return headTag + bodyTag;
};

exports.createWebsite = createWebsite;
