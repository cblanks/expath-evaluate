# xpathevaluate

Experimenting with the browser's native xpath to process XML.

## Query speed comparisons

Comparing query speed of a sample XML document with:

- xpath, via `xmlDoc.evaluate()`
- DOM selection, via `xmlDoc.getElementsByTagName()`
- DOM selection, via jQuery `$(xmlDoc).find()`
- jsonpath, on document converted using `xml-js`
- operating directly on the JSON onbject knowing the explicit structure

Over 100,000 trials:

### Google Chrome

```javascript
{
  "xpath": [
    4060,
    4213,
    4186
  ],
  "element": [
    1997,
    2128,
    2051
  ],
  "jq": [
    4197,
    4391,
    4241
  ],
  "jsonpath": [
    16591,
    16836,
    16552
  ],
  "json": [
    205,
    188,
    177
  ]
}
```

### Safari

```javascript
{
  "xpath": [
    2209,
    3513,
    2096
  ],
  "element": [
    1201,
    1573,
    1256
  ],
  "jq": [
    3253,
    3777,
    2827
  ],
  "jsonpath": [
    19017,
    18748,
    17134
  ],
  "json": [
    546,
    247,
    307
  ]
}
```

### Firefox

```javascript
{
  "xpath": [
    3068,
    4054,
    3005
  ],
  "element": [
    1495,
    1513,
    1529
  ],
  "jq": [
    19445,
    4570,
    2846
  ],
  "jsonpath": [
    15455,
    14322,
    14226
  ],
  "json": [
    292,
    265,
    271
  ]
}
```

### Conclusions

- The DOM method is almost twice as fast as xpath! Not what I expected.
- Also more than twice as fast as jQuery.
- JSONPATH is really, really, really slow.  Large amounts of data should be requested as XML if available. 
- *If* you know the structure, it's faster to request JSON and grab the content directly.

## Data parsing speed comparisons

Comparing parsing speed of a sample XML document with:

- `DOMParser.parseFromString()`
- jQuery `$.parseXML()`
- `JSON.parse()`

Over 100 trials:

### Google Chrome

```javascript
{
  "xmlDOM": [
    495,
    504,
    418
  ],
  "xmlJQ": [
    474,
    456,
    424
  ],
  "jsonObj": [
    53,
    46,
    46
  ]
}
```

### Safari

```javascript
{
  "xmlDOM": [
    536,
    543,
    724
  ],
  "xmlJQ": [
    489,
    434,
    441
  ],
  "jsonObj": [
    42,
    38,
    47
  ]
}
```

### Firefox

```javascript
{
  "xmlDOM": [
    897,
    569,
    783
  ],
  "xmlJQ": [
    561,
    573,
    549
  ],
  "jsonObj": [
    65,
    57,
    47
  ]
}
```

### Conclusions

- JSON is approx. twice as fast to parse as XML.
- Parsing with DOMParser or jQuery is similar in Chrome.  A bit faster with jQuery surprisingly on Firefox and Safari.
