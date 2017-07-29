# xpathevaluate

Experimenting with the browser's native xpath to process XML.

A speed comparison over 100,000 trials with `xmlDoc.evaluate` xpath vs. `xmlDoc.getElementsByTagName` DOM element methods and jQuery equivalent selector `$(xmlDoc).find:

## Google Chrome
```
{
  "xpath": [
    4259,
    3946,
    4083,
    3898,
    4130
  ],
  "element": [
    2376,
    2185,
    2217,
    2220,
    2196
  ],
  "jq": [
    4971,
    4666,
    4718,
    4310,
    4382
  ]
}
```

## Safari
```
{
  "xpath": [
    1811,
    1650,
    1655,
    1649,
    1631
  ],
  "element": [
    981,
    974,
    974,
    942,
    955
  ],
  "jq": [
    3078,
    3016,
    3010,
    3021,
    3053
  ]
}
```

## Opera
```
{
  "xpath": [
    4125,
    4082,
    4188,
    4038,
    4305
  ],
  "element": [
    2035,
    2013,
    2009,
    2043,
    2052
  ],
  "jq": [
    4667,
    4371,
    4356,
    4324,
    4504
  ]
}
```

## Firefox
```
{
  "xpath": [
    3830,
    4150,
    3874,
    3786,
    3768,
    3980
  ],
  "element": [
    1707,
    1716,
    1712,
    1650,
    1885
  ],
  "jq": [
    4315,
    4648,
    4715,
    4107,
    3881
  ]
}
```

The DOM method is almost twice as fast as xpath! Not what I expected.
Also more than twice as fast as jQuery.
