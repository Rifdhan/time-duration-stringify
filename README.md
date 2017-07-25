# Time-Duration-Stringify

This package lets you transform a time duration into a nicely-formatted string. Provide an integer duration in milliseconds, and get a time duration of either the format "5:03", or "5 minutes, and 3 seconds".

# Installation

NPM: `npm install --save time-duration-stringify`

YarnPkg: `yarn add time-duration-stringify `

# Examples

```javascript
let Duration = require("time-duration-stringify");

// Example with whole number seconds
let durationMillis = 3725000; // one hour + 2 minutes + 5 seconds
let result1 = Duration.toStringShort(durationMillis);
// result1 will be "1:02:05"
let result2 = Duration.toStringLong(durationMillis);
// result2 will be "1 hour, 2 minutes, and 5 seconds"

// Example with fractional seconds (milliseconds)
let durationMillis = 301068; // 5 minutes + 1 second + 68 milliseconds
let result1 = Duration.toStringShort(durationMillis);
// result1 will be "5:01.068"
let result2 = Duration.toStringLong(durationMillis);
// result2 will be "5 minutes, 1 second, and 68 milliseconds"

// Example of omitting Oxford comma
let durationMillis = 125000 // 2 minutes + 5 seconds
let result1 = Duration.toStringLong(durationMillis);
// result1 will be "2 minutes, and 5 seconds"
let result2 = Duration.toStringLong(durationMillis, true);
// result2 will be "2 minutes and 5 seconds"
```

# API Reference

The largest unit of time supported is days. Thus the recognized separations are days, hours, minutes, seconds, and milliseconds.

## Duration.toStringShort(durationMillis);

`durationMillis`: a positive integer number representing a duration in milliseconds (throws error if invalid)

Return value: a string of format "4:02:35.749"

Corner cases:

```javascript
Duration.toStringShort(0)    -> "0:00"     // Zero value
Duration.toStringShort(130)  -> "0:00.130" // Always includes minutes, seconds
Duration.toStringShort(2000) -> "0:02"     // Omits milliseconds if none
```

## Duration.toStringLong(durationMillis, omitOxfordComma);

`durationMillis`: a positive integer number representing a duration in milliseconds (throws error if invalid)

`omitOxfordComma`: an optional boolean flag to omit the Oxford comma (eg "4 hours, 2 minutes, 35 seconds and 749 milliseconds)

Return value: a string of format "4 hours, 2 minutes, 35 seconds, and 749 milliseconds"

Corner cases:

```javascript
Duration.toStringShort(0)       -> "0 seconds" // Zero value
Duration.toStringShort(3600000) -> "1 day"     // Omits zero-components
```
