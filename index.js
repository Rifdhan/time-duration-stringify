"use strict";

// Duration conversion constants
const MILLIS_IN_A_SECOND = 1000;
const MILLIS_IN_A_MINUTE = 60 * MILLIS_IN_A_SECOND;
const MILLIS_IN_AN_HOUR = 60 * MILLIS_IN_A_MINUTE;
const MILLIS_IN_A_DAY = 24 * MILLIS_IN_AN_HOUR;

// Converts a duration in milliseconds to a string of format "4:01"
function toStringShort(durationMillis) {
	// Check for valid input
	validateInput(durationMillis);

	// Check if there is at least one millisecond
	if(durationMillis < 1) {
		return "0:00";
	}

	// Break up the duration into various time components
	let durationComponents = granularizeDuration(durationMillis);

	// Combine and return the result
	return durationComponents.map((component, index) => {
		// Deal with a few special cases
		if(index === 0)
			return component.value;
		else if(component.unit === "millisecond")
			return "." + ("00" + component.value).slice(-3);
		else
			return ":" + ("0" + component.value).slice(-2);
	}).join("");
}

// Converts a duration in milliseconds to a string of format "4 minutes, and 1 second"
function toStringLong(durationMillis, omitOxfordComma) {
	// Check for valid input
	validateInput(durationMillis);

	// Check if there is at least one millisecond
	if(durationMillis < 1) {
		return "0 seconds";
	}

	// Break up the duration into various time components
	let durationComponents = granularizeDuration(durationMillis);

	// Remove all zero-components
	durationComponents = durationComponents.filter(component => (component.value > 0));

	// Special case if just one component
	if(durationComponents.length === 1) {
		return (durationComponents[0].value + " " +
			pluralize(durationComponents[0].unit, durationComponents[0].value));
	} else {
		let allButLast = durationComponents.slice(0, -1);
		let allButLastText = allButLast.map(component => {
			return (component.value + " " + pluralize(component.unit, component.value));
		}).join(", ");
		let last = durationComponents[durationComponents.length - 1];
		let lastText = (last.value + " " + pluralize(last.unit, last.value));
		return (allButLastText + (omitOxfordComma ? "" : ",") + " and " + lastText);
	}
}

// Validates input
function validateInput(durationMillis) {
	if(isNaN(durationMillis)) {
		throw new Error("Duration: Argument is not a number: " + durationMillis);
	} else if(!Number.isInteger(durationMillis)) {
		throw new Error("Duration: Argument is not an integer: " + durationMillis);
	} else if(durationMillis < 0) {
		throw new Error("Duration: Argument is not positive: " + durationMillis);
	}
}

// Granularizes a duration value into various time components
function granularizeDuration(durationMillis) {
	let durationComponents = [];

	let days = Math.floor(durationMillis / MILLIS_IN_A_DAY);
	if(days)
		durationComponents.push({ unit: "day", value: days });

	let hours = Math.floor((durationMillis % MILLIS_IN_A_DAY) / MILLIS_IN_AN_HOUR);
	if(hours || durationComponents.length)
		durationComponents.push({ unit: "hour", value: hours });

	let minutes = Math.floor((durationMillis % MILLIS_IN_AN_HOUR) / MILLIS_IN_A_MINUTE);
	durationComponents.push({ unit: "minute", value: minutes });

	let seconds = Math.floor((durationMillis % MILLIS_IN_A_MINUTE) / MILLIS_IN_A_SECOND);
	durationComponents.push({ unit: "second", value: seconds });

	let milliseconds = Math.floor(durationMillis % MILLIS_IN_A_SECOND);
	if(milliseconds)
		durationComponents.push({ unit: "millisecond", value: milliseconds });

	return durationComponents;
}

// Appends an "s" to the given word if the number is not 1
function pluralize(word, number) {
	return (number === 1 ? word : word + "s");
}

module.exports = {
	toStringShort,
	toStringLong
};
