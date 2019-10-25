const convert = require('xml-js'),
  fs = require('fs');

const xml = fs.readFileSync('src/books.xml');

const result = convert.xml2json(xml, { compact: true, spaces: 2 });

fs.writeFileSync('src/books.json', result);
