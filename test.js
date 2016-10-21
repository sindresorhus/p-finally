import test from 'ava';
import m from './';

const fixture = Symbol('fixture');
const fixtureErr = new Error('err');

test('does nothing when nothing is passed', async t => {
	t.is(await m(Promise.resolve(fixture)), fixture);
});

test('callback is called when promise is fulfilled', async t => {
	let called = false;

	const val = await m(Promise.resolve(fixture), () => {
		called = true;
	});

	t.is(val, fixture);
	t.true(called);
});

test('callback is called when promise is rejected', async t => {
	let called = false;

	await m(Promise.reject(fixtureErr), () => {
		called = true;
	}).catch(err => {
		t.is(err, fixtureErr);
	});

	t.true(called);
});

test('returning a rejected promise in the callback rejects the promise', async t => {
	await m(Promise.resolve(fixture), () => Promise.reject(fixtureErr)).then(() => {
		t.fail();
	}, err => {
		t.is(err, fixtureErr);
	});
});

test('returning a rejected promise in the callback for an already rejected promise changes the rejection reason', async t => {
	await m(Promise.reject(new Error('orig err')), () => Promise.reject(fixtureErr)).catch(err => {
		t.is(err, fixtureErr);
	});
});
