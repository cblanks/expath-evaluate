var xmlDoc = null,
  jsonDoc = null,
  nTrials = 100000,
  stats = {
    xpath: [],
    element: [],
    jq: [],
    jsonpath: []
  };

function nsResolver(prefix) {
  var ns = {
    'xhtml' : 'http://www.w3.org/1999/xhtml',
    'mathml': 'http://www.w3.org/1998/Math/MathML'
  };
  return ns[prefix] || null;
}

function xpath(query, node) {
  var resultIterator = node.evaluate(
    query,
    node,
    nsResolver,
    XPathResult.ANY_TYPE,
    null
  );

  var results = [];
  while(true) {
    var rawResult = resultIterator.iterateNext();
    if(rawResult === null) { break; }

    var thisResult = {};

    thisResult[rawResult.tagName] = rawResult.textContent;

    for(var i=0; i<rawResult.attributes.length; i++) {
      thisResult['@'+rawResult.attributes.item(i).nodeName] = rawResult.attributes.item(i).nodeValue;
    }

    results.push(thisResult);
  }

  return results;
}

function getElement(target, node) {
  var rawResult = node.getElementsByTagName(target);

  var results = [];
  for(var i=0; i<rawResult.length; i++) {
    var thisResult = {};

    thisResult[rawResult[i].tagName] = rawResult[i].textContent;

    for(var j=0; j<rawResult[i].attributes.length; j++) {
      thisResult['@'+rawResult[i].attributes[j].nodeName] = rawResult[i].attributes[j].nodeValue;
    }

    results.push(thisResult);
  }

  return results;
}

function getElementJQ(target, node) {
  var rawResult = $(node).find(target);

  var results = [];
  for(var i=0; i<rawResult.length; i++) {
    var thisResult = {};

    thisResult[rawResult[i].tagName] = rawResult[i].textContent;

    for(var j=0; j<rawResult[i].attributes.length; j++) {
      thisResult['@'+rawResult[i].attributes[j].nodeName] = rawResult[i].attributes[j].nodeValue;
    }

    results.push(thisResult);
  }

  return results;
}


function getElementJQ(target, node) {
  var rawResult = $(node).find(target);

  var results = [];
  for(var i=0; i<rawResult.length; i++) {
    var thisResult = {};

    thisResult[rawResult[i].tagName] = rawResult[i].textContent;

    for(var j=0; j<rawResult[i].attributes.length; j++) {
      thisResult['@'+rawResult[i].attributes[j].nodeName] = rawResult[i].attributes[j].nodeValue;
    }

    results.push(thisResult);
  }

  return results;
}

function getElementJP(target, data) {
  var rawResult = jsonpath.query(data, `$..${target}`);

  var results = [];
  for(var i=0; i<rawResult.length; i++) {
    var thisResult = {};

    thisResult[target] = rawResult[i]['_text'];
    const attributes = Object.keys(rawResult[i]['_attributes']);

    for(var j=0; j<attributes.length; j++) {
      thisResult[`@${attributes[j]}`] = rawResult[i]['_attributes'][attributes[j]];
    }

    results.push(thisResult);
  }

  return results;
}

function loadJson() {
  $.get({
    url: 'src/books.json',
    dataType: 'text'

  }, jsonString => {
    $('#data').text(jsonString);
    jsonDoc = JSON.parse(jsonString);
  });
}

function loadXml() {
  $.get({
    url: 'src/books.xml',
    dataType: 'text'

  }, xmlString => {
    $('#data').text(xmlString);
    xmlDoc = (new DOMParser()).parseFromString(xmlString, "text/xml");
    // xmlDoc = $.parseXML(xmlString);
  });
}

function searchByXPath() {
  var start = ( new Date() ).getTime(),
    titles;

  for(var i=0; i<nTrials; i++) {
    titles = xpath('//title', xmlDoc);
  }

  var duration = ( new Date() ).getTime() - start;

  stats.xpath.push(duration);
  $('#stats').text(JSON.stringify(stats, null, 2));
  $('#json').text(JSON.stringify(titles, null, 2));
}

function searchByDom() {
  var start = ( new Date() ).getTime(),
    titles;

  for(var i=0; i<nTrials; i++) {
    titles = getElement('title', xmlDoc);
  }

  var duration = ( new Date() ).getTime() - start;

  stats.element.push(duration);
  $('#stats').text(JSON.stringify(stats, null, 2));
  $('#json').text(JSON.stringify(titles, null, 2));
}

function searchByJQ() {
  var start = ( new Date() ).getTime(),
    titles;

  for(var i=0; i<nTrials; i++) {
    titles = getElementJQ('title', xmlDoc);
  }

  var duration = ( new Date() ).getTime() - start;

  stats.jq.push(duration);
  $('#stats').text(JSON.stringify(stats, null, 2));
  $('#json').text(JSON.stringify(titles, null, 2));
}

function searchByJsonPath() {
  var start = ( new Date() ).getTime(),
    titles;

  for(var i=0; i<nTrials; i++) {
    titles = getElementJP('title', jsonDoc);
  }
 
  var duration = ( new Date() ).getTime() - start;

  stats.jsonpath.push(duration);
  $('#stats').text(JSON.stringify(stats, null, 2));
  $('#json').text(JSON.stringify(titles, null, 2));
}

$(document).ready(function() {
  $('#stats').text(JSON.stringify(stats, null, 2));
});
