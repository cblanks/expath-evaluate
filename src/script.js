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
    console.log(rawResult.attributes);
    // rawResult.attributes.forEach(function(attr) {
    //   thisResult[attr.name] = attr.value;
    // });

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
      xmlDoc = (new DOMParser()).parseFromString(xmlString, "text/xml");
      // console.log(xmlDoc);
      // xmlDoc = $.parseXML(xmlString);
      // console.log(xmlDoc);
    });
  });

  $('#search-button').on('click', function() {
    var titles = xpath('//title', xmlDoc);

    console.log(titles);
  });

});
