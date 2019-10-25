# xpathevaluate

Experimenting with the browser's native xpath to process XML.

Comparing parsing speed of a sample XML document with:

- xpath, via `xmlDoc.evaluate()`
- DOM selection, via `xmlDoc.getElementsByTagName()`
- DOM selection, via jQuery `$(xmlDoc).find()`
- jsonpath, on document converted using `xml-js`

Speed comparisons over 100,000 trials:

## Google Chrome

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
  ]
}
```

## Safari

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
  ]
}
```

## Firefox

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
  ]
}
```

### Conclusions

- The DOM method is almost twice as fast as xpath! Not what I expected.
- Also more than twice as fast as jQuery.
- JSONPATH is really, really, really slow.  Large amounts of data should be requested as XML if available. 
