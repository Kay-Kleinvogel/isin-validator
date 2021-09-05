const DEBUG_MODE = false;

export const isValidIsin = (isin: string): boolean => {
  if (!isin) {
	if(DEBUG_MODE) console.log("isin is empty");
    return false;
  }
  if(isIsinFormat(isin)){
	  if(DEBUG_MODE) console.log("isin is valid");
	const numberIsin = translateNonNumericCharacters(isin);
	return isValidChecksum(numberIsin);
  }
  if(DEBUG_MODE) console.log("isin is invalid");
  return false;
}

// checks if the isin is in the correct format
export const isIsinFormat = (isin: string): boolean => {
  const isinRegex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
  return isinRegex.test(isin);
}

// removes country code from isin
export const removeCountryCode = (isin: string): string => {
  return isin.substr(2);
}

// translates non-numeric characters from isin
export const translateNonNumericCharacters = (isin: string): string => {
  const charArray = isin.toUpperCase().split('');
  const numericArray = charArray.map(char => {
    if (!isANumber(char)) {
      return parseInt(char, 36);
    }
    return Number(char);
  });
  if (DEBUG_MODE) {
	console.log(isin)
    	console.log(numericArray);
  }
  return numericArray.join('');
}

export const isANumber = (char: string): boolean => {
  return !isNaN(Number(char));
}

export const isValidChecksum = (isin: string): boolean => {
	const numberArray = isin.split('').map(char => Number(char));
	const baseSum = numberArray.pop();
	numberArray.reverse();
	let sum = 0;
	numberArray.forEach((number, index) => {
		if(DEBUG_MODE) console.log(number, index % 2 === 0);
		if (index % 2 === 0) {
			if(number * 2 > 9) {
				sum += (number * 2) - 9;
			} else {
				sum += number * 2;
			}
		} else {
			sum += number;
		}
	});
	const newSum = 10 - (sum % 10) % 10;
	if(DEBUG_MODE){
		console.log(baseSum);
		console.log(newSum);
	}
	return newSum === baseSum;
}
