var xmlDoc = null;

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

$(document).ready(function() {

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

  $('#search-button').on('click', function() {
    var titles = xpath('//title', xmlDoc);
    // console.log(titles);
    $('#json').text(JSON.stringify(titles, null, 2));
  });

});
