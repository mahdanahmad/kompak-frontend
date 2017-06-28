'use strict';

app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start; //parse to int
			return input.slice(start);
		}
		return [];
	};
});

app.filter('orderNotMyProvince', function () {
	return function (input) {
		return _.chain(input).sortBy(function (o) {
			return o.length;
		}).value();
	};
});

app.filter('ordinal', function () {
	return function (number) {
		if (_.isNil(number) || number < 1) {
			return number;
		} else {
			var lastDigit = number % 10;
			switch (lastDigit) {
				case 1:
					return number + 'st';
				case 2:
					return number + 'nd';
				case 3:
					return number + 'rd';
				default:
					return number + 'th';
			}
		}
	};
});
//# sourceMappingURL=filters.js.map
