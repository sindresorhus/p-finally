Deprecated as it's now available in all modern browsers and Node.js versions.

---

# p-finally

> [`Promise#finally()`](https://github.com/tc39/proposal-promise-finally) [ponyfill](https://ponyfill.com) - Invoked when the promise is settled regardless of outcome

Useful for cleanup.

## Install

```
$ npm install p-finally
```

## Usage

```js
import pFinally from 'p-finally';

const directory = createTempDirectory();

await pFinally(write(directory), () => {
	cleanup(directory);
});
```

## API

### pFinally(promise, onFinally?)

Returns a `Promise`.

#### onFinally

Type: `Function`

Note: Throwing or returning a rejected promise will reject `promise` with the rejection reason.

## Related

- [p-try](https://github.com/sindresorhus/p-try) - `Promise.try()` ponyfill - Starts a promise chain
- [More…](https://github.com/sindresorhus/promise-fun)
