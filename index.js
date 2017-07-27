'use strict';
module.exports = (promise, onFinally) => {
	onFinally = onFinally || (() => {});

	return promise.then(
		val => {
			onFinally();
			return val;
		},
		err => {
			onFinally();
			throw err;
		}
	);
};
