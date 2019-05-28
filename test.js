import test from 'ava';
import pFinally from '.';

const fixture = Symbol('fixture');
const fixtureError = new Error('error');

test('does nothing when nothing is passed', async t => {
	t.is(await pFinally(Promise.resolve(fixture)), fixture);
});

test('callback is called when promise is fulfilled', async t => {
	let isCalled = false;

	const value = await pFinally(Promise.resolve(fixture), () => {
		isCalled = true;
	});

	t.is(value, fixture);
	t.true(isCalled);
});

test('callback is called when promise is rejected', async t => {
	let isCalled = false;

	await pFinally(Promise.reject(fixtureError), () => {
		isCalled = true;
	}).catch(error => {
		t.is(error, fixtureError);
	});

	t.true(isCalled);
});

test('returning a rejected promise in the callback rejects the promise', async t => {
	await pFinally(Promise.resolve(fixture), () => Promise.reject(fixtureError)).then(() => {
		t.fail();
	}, error => {
		t.is(error, fixtureError);
	});
});

test('returning a rejected promise in the callback for an already rejected promise changes the rejection reason', async t => {
	await pFinally(Promise.reject(new Error('original error')), () => Promise.reject(fixtureError)).catch(error => {
		t.is(error, fixtureError);
	});
});
