'use strict';

module.exports = async (
	promise,
	onFinally = (() => {})
) => {
	try {
		const value = await promise;
		await onFinally();
		return value;
	} catch (error) {
		await onFinally();
		throw error;
	}
};
