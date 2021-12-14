// A set of functions that might be used by multiple components

// DATES: Since some bootstrap components interpret the date strings as 1-indexed,
// there's a mismatch between how Javascript does it with dates, as dates are 0-index.

// converts the string format of the date of birth string into a useful
// entry
export const parseDob = (dobString) => new Date(dobString)

// Strip out the fractional portion of the miliseconds in ISO format
export const formatRealDob = (dateObj) => dateObj.toISOString().replace(/\.[0-9]*Z/, 'Z')

// Handles the 0-indexed date string
export const formatReactDob = (dateObj) => dateObj.toISOString().slice(0, 10)