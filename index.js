export default async function pFinally(
	promise,
	onFinally = (() => {})
) {
	let value;
	try {
		value = await promise;
	} catch (error) {
		await onFinally();
		throw error;
	}

	await onFinally();
	return value;
}
