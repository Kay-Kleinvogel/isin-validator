export const isValidIsin = (isin: string): boolean => {
  if (!isin) return false
  if(isIsinFormat(isin)){
	return isValidChecksum(translateNonNumericCharacters(isin));
  }
  return false;
}

// checks if the isin is in the correct format
export const isIsinFormat = (isin: string): boolean => {
  const isinRegex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
  return isinRegex.test(isin);
}
// translates non-numeric characters from isin
export const translateNonNumericCharacters = (isin: string): string => {
  const charArray = isin.toUpperCase().split('');
  const numericArray = charArray.map(char => {
	  return !isANumber(char)?parseInt(char,36):Number(char);
  });
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
		let num = 0; 
		index % 2 === 0 ? 
			number * 2 > 9 ?
				num = (number * 2) - 9 :
				num = number * 2 : 
			num = number;
		sum += num;
	});
	const newSum = 10 - (sum % 10) % 10;
	return newSum === baseSum;
}
