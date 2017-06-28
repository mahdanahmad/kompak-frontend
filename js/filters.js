app.filter('startFrom', () => ((input, start) => {
	if (input) {
		start = +start; //parse to int
		return input.slice(start);
	}
	return [];
}));

app.filter('orderNotMyProvince', () => ((input) => (_.chain(input).sortBy((o) => (o.length)).value())));

app.filter('ordinal', () => ((number) => {
	if (_.isNil(number) || number < 1) {
		return number;
	} else {
		var lastDigit = number % 10;
		switch (lastDigit) {
			case 1: return number + 'st';
			case 2: return number + 'nd';
			case 3: return number + 'rd';
			default: return number + 'th';
		}
	}
}));
