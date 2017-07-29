var xmlDoc = null,
  stats = {
    xpath: [],
    element: [],
    jq: []
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
  // console.log(rawResult);
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

$(document).ready(function() {

  $('#stats').text(JSON.stringify(stats, null, 2));

  $('#load-button').on('click', function() {
    $.get({
      url: 'src/books.xml',
      dataType: 'text'

    }, function(xmlString) {
      $('#xml').text(xmlString);
      // xmlDoc = (new DOMParser()).parseFromString(xmlString, "text/xml");
      xmlDoc = $.parseXML(xmlString);
    });
  });

  $('#search-button-xpath').on('click', function() {
    var start = ( new Date() ).getTime(),
      titles;

    for(var i=0; i<100000; i++) {
      titles = xpath('//title', xmlDoc);
    }

    var duration = ( new Date() ).getTime() - start;

    stats.xpath.push(duration);
    $('#stats').text(JSON.stringify(stats, null, 2));
    $('#json').text(JSON.stringify(titles, null, 2));
  });

  $('#search-button-dom').on('click', function() {
    var start = ( new Date() ).getTime(),
      titles;

    for(var i=0; i<100000; i++) {
      titles = getElement('title', xmlDoc);
      // console.log(titles);
    }

    var duration = ( new Date() ).getTime() - start;

    stats.element.push(duration);
    $('#stats').text(JSON.stringify(stats, null, 2));
    $('#json').text(JSON.stringify(titles, null, 2));
  });

  $('#search-button-jq').on('click', function() {
    var start = ( new Date() ).getTime(),
      titles;

    for(var i=0; i<100000; i++) {
      titles = getElementJQ('title', xmlDoc);
      // console.log(titles);
    }

    var duration = ( new Date() ).getTime() - start;

    stats.jq.push(duration);
    $('#stats').text(JSON.stringify(stats, null, 2));
    $('#json').text(JSON.stringify(titles, null, 2));
  });

});
