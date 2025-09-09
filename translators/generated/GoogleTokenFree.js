function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var GoogleTranslator$1 = {};

const token$1 = '%[a-f0-9]{2}';
const singleMatcher = new RegExp('(' + token$1 + ')|([^%]+?)', 'gi');
const multiMatcher = new RegExp('(' + token$1 + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return [decodeURIComponent(components.join(''))];
	} catch {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	const left = components.slice(0, split);
	const right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode$2(input) {
	try {
		return decodeURIComponent(input);
	} catch {
		let tokens = input.match(singleMatcher) || [];

		for (let i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher) || [];
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	const replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD',
	};

	let match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch {
			const result = decode$2(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	const entries = Object.keys(replaceMap);

	for (const key of entries) {
		// Replace all decoded components
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

function decodeUriComponent(encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
}

function includeKeys(object, predicate) {
	const result = {};

	if (Array.isArray(predicate)) {
		for (const key of predicate) {
			const descriptor = Object.getOwnPropertyDescriptor(object, key);
			if (descriptor?.enumerable) {
				Object.defineProperty(result, key, descriptor);
			}
		}
	} else {
		// `Reflect.ownKeys()` is required to retrieve symbol properties
		for (const key of Reflect.ownKeys(object)) {
			const descriptor = Object.getOwnPropertyDescriptor(object, key);
			if (descriptor.enumerable) {
				const value = object[key];
				if (predicate(key, value, object)) {
					Object.defineProperty(result, key, descriptor);
				}
			}
		}
	}

	return result;
}

function splitOnFirst(string, separator) {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (string === '' || separator === '') {
		return [];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
}

const isNullOrUndefined = value => value === null || value === undefined;

// eslint-disable-next-line unicorn/prefer-code-point
const strictUriEncode = string => encodeURIComponent(string).replaceAll(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index': {
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined
					|| (options.skipNull && value === null)
					|| (options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [
						...result, [encode(key, options), '[', index, ']'].join(''),
					];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join(''),
				];
			};
		}

		case 'bracket': {
			return key => (result, value) => {
				if (
					value === undefined
					|| (options.skipNull && value === null)
					|| (options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [
						...result,
						[encode(key, options), '[]'].join(''),
					];
				}

				return [
					...result,
					[encode(key, options), '[]=', encode(value, options)].join(''),
				];
			};
		}

		case 'colon-list-separator': {
			return key => (result, value) => {
				if (
					value === undefined
					|| (options.skipNull && value === null)
					|| (options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [
						...result,
						[encode(key, options), ':list='].join(''),
					];
				}

				return [
					...result,
					[encode(key, options), ':list=', encode(value, options)].join(''),
				];
			};
		}

		case 'comma':
		case 'separator':
		case 'bracket-separator': {
			const keyValueSeparator = options.arrayFormat === 'bracket-separator'
				? '[]='
				: '=';

			return key => (result, value) => {
				if (
					value === undefined
					|| (options.skipNull && value === null)
					|| (options.skipEmptyString && value === '')
				) {
					return result;
				}

				// Translate null to an empty string so that it doesn't serialize as 'null'
				value = value === null ? '' : value;

				if (result.length === 0) {
					return [[encode(key, options), keyValueSeparator, encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};
		}

		default: {
			return key => (result, value) => {
				if (
					value === undefined
					|| (options.skipNull && value === null)
					|| (options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [
						...result,
						encode(key, options),
					];
				}

				return [
					...result,
					[encode(key, options), '=', encode(value, options)].join(''),
				];
			};
		}
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index': {
			return (key, value, accumulator) => {
				result = /\[(\d*)]$/.exec(key);

				key = key.replace(/\[\d*]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};
		}

		case 'bracket': {
			return (key, value, accumulator) => {
				result = /(\[])$/.exec(key);
				key = key.replace(/\[]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [...accumulator[key], value];
			};
		}

		case 'colon-list-separator': {
			return (key, value, accumulator) => {
				result = /(:list)$/.exec(key);
				key = key.replace(/:list$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [...accumulator[key], value];
			};
		}

		case 'comma':
		case 'separator': {
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
				const isEncodedArray = (typeof value === 'string' && !isArray && decode$1(value, options).includes(options.arrayFormatSeparator));
				value = isEncodedArray ? decode$1(value, options) : value;
				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode$1(item, options)) : (value === null ? value : decode$1(value, options));
				accumulator[key] = newValue;
			};
		}

		case 'bracket-separator': {
			return (key, value, accumulator) => {
				const isArray = /(\[])$/.test(key);
				key = key.replace(/\[]$/, '');

				if (!isArray) {
					accumulator[key] = value ? decode$1(value, options) : value;
					return;
				}

				const arrayValue = value === null
					? []
					: decode$1(value, options).split(options.arrayFormatSeparator);

				if (accumulator[key] === undefined) {
					accumulator[key] = arrayValue;
					return;
				}

				accumulator[key] = [...accumulator[key], ...arrayValue];
			};
		}

		default: {
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [...[accumulator[key]].flat(), value];
			};
		}
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode$1(value, options) {
	if (options.decode) {
		return decodeUriComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function parseValue(value, options, type) {
	if (type === 'string' && typeof value === 'string') {
		return value;
	}

	if (typeof type === 'function' && typeof value === 'string') {
		return type(value);
	}

	if (type === 'boolean' && value === null) {
		return true;
	}

	if (type === 'boolean' && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		return value.toLowerCase() === 'true';
	}

	if (type === 'boolean' && value !== null && (value.toLowerCase() === '1' || value.toLowerCase() === '0')) {
		return value.toLowerCase() === '1';
	}

	if (type === 'string[]' && options.arrayFormat !== 'none' && typeof value === 'string') {
		return [value];
	}

	if (type === 'number[]' && options.arrayFormat !== 'none' && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		return [Number(value)];
	}

	if (type === 'number' && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		return Number(value);
	}

	if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		return value.toLowerCase() === 'true';
	}

	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		return Number(value);
	}

	return value;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parse$1(query, options) {
	options = {
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false,
		types: Object.create(null),
		...options,
	};

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const returnValue = Object.create(null);

	if (typeof query !== 'string') {
		return returnValue;
	}

	query = query.trim().replace(/^[?#&]/, '');

	if (!query) {
		return returnValue;
	}

	for (const parameter of query.split('&')) {
		if (parameter === '') {
			continue;
		}

		const parameter_ = options.decode ? parameter.replaceAll('+', ' ') : parameter;

		let [key, value] = splitOnFirst(parameter_, '=');

		if (key === undefined) {
			key = parameter_;
		}

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : (['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode$1(value, options));
		formatter(decode$1(key, options), value, returnValue);
	}

	for (const [key, value] of Object.entries(returnValue)) {
		if (typeof value === 'object' && value !== null && options.types[key] !== 'string') {
			for (const [key2, value2] of Object.entries(value)) {
				const type = options.types[key] ? options.types[key].replace('[]', '') : undefined;
				value[key2] = parseValue(value2, options, type);
			}
		} else if (typeof value === 'object' && value !== null && options.types[key] === 'string') {
			returnValue[key] = Object.values(value).join(options.arrayFormatSeparator);
		} else {
			returnValue[key] = parseValue(value, options, options.types[key]);
		}
	}

	if (options.sort === false) {
		return returnValue;
	}

	// TODO: Remove the use of `reduce`.
	// eslint-disable-next-line unicorn/no-array-reduce
	return (options.sort === true ? Object.keys(returnValue).sort() : Object.keys(returnValue).sort(options.sort)).reduce((result, key) => {
		const value = returnValue[key];
		result[key] = Boolean(value) && typeof value === 'object' && !Array.isArray(value) ? keysSorter(value) : value;
		return result;
	}, Object.create(null));
}

function stringify(object, options) {
	if (!object) {
		return '';
	}

	options = {
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		...options,
	};

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key]))
		|| (options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const [key, value] of Object.entries(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = value;
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
				return encode(key, options) + '[]';
			}

			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
}

function parseUrl(url, options) {
	options = {
		decode: true,
		...options,
	};

	let [url_, hash] = splitOnFirst(url, '#');

	if (url_ === undefined) {
		url_ = url;
	}

	return {
		url: url_?.split('?')?.[0] ?? '',
		query: parse$1(extract(url), options),
		...(options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode$1(hash, options)} : {}),
	};
}

function stringifyUrl(object, options) {
	options = {
		encode: true,
		strict: true,
		[encodeFragmentIdentifier]: true,
		...options,
	};

	const url = removeHash(object.url).split('?')[0] || '';
	const queryFromUrl = extract(object.url);

	const query = {
		...parse$1(queryFromUrl, {sort: false, ...options}),
		...object.query,
	};

	let queryString = stringify(query, options);
	queryString &&= `?${queryString}`;

	let hash = getHash(object.url);
	if (typeof object.fragmentIdentifier === 'string') {
		const urlObjectForFragmentEncode = new URL(url);
		urlObjectForFragmentEncode.hash = object.fragmentIdentifier;
		hash = options[encodeFragmentIdentifier] ? urlObjectForFragmentEncode.hash : `#${object.fragmentIdentifier}`;
	}

	return `${url}${queryString}${hash}`;
}

function pick(input, filter, options) {
	options = {
		parseFragmentIdentifier: true,
		[encodeFragmentIdentifier]: false,
		...options,
	};

	const {url, query, fragmentIdentifier} = parseUrl(input, options);

	return stringifyUrl({
		url,
		query: includeKeys(query, filter),
		fragmentIdentifier,
	}, options);
}

function exclude(input, filter, options) {
	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

	return pick(input, exclusionFilter, options);
}

var queryString$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	exclude: exclude,
	extract: extract,
	parse: parse$1,
	parseUrl: parseUrl,
	pick: pick,
	stringify: stringify,
	stringifyUrl: stringifyUrl
});

var queryString = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: queryString$1
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(queryString);

var BaseTranslator$1 = {};

var basicFetcher$1 = {};

/* eslint-disable no-prototype-builtins */
var g$2 =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  // eslint-disable-next-line no-undef
  (typeof global !== 'undefined' && global) ||
  {};

var support = {
  searchParams: 'URLSearchParams' in g$2,
  iterable: 'Symbol' in g$2 && 'iterator' in Symbol,
  blob:
    'FileReader' in g$2 &&
    'Blob' in g$2 &&
    (function() {
      try {
        new Blob();
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in g$2,
  arrayBuffer: 'ArrayBuffer' in g$2
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ];

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift();
      return {done: value === undefined, value: value}
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    };
  }

  return iterator
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      if (header.length != 2) {
        throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length)
      }
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function(name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null
};

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
};

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function() {
  var items = [];
  this.forEach(function(value, name) {
    items.push(name);
  });
  return iteratorFor(items)
};

Headers.prototype.values = function() {
  var items = [];
  this.forEach(function(value) {
    items.push(value);
  });
  return iteratorFor(items)
};

Headers.prototype.entries = function() {
  var items = [];
  this.forEach(function(value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items)
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body._noBody) return
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function() {
      reject(reader.error);
    };
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
  var encoding = match ? match[1] : 'utf-8';
  reader.readAsText(blob, encoding);
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    // eslint-disable-next-line no-self-assign
    this.bodyUsed = this.bodyUsed;
    this._bodyInit = body;
    if (!body) {
      this._noBody = true;
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer);
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    };
  }

  this.arrayBuffer = function() {
    if (this._bodyArrayBuffer) {
      var isConsumed = consumed(this);
      if (isConsumed) {
        return isConsumed
      } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
        return Promise.resolve(
          this._bodyArrayBuffer.buffer.slice(
            this._bodyArrayBuffer.byteOffset,
            this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
          )
        )
      } else {
        return Promise.resolve(this._bodyArrayBuffer)
      }
    } else if (support.blob) {
      return this.blob().then(readBlobAsArrayBuffer)
    } else {
      throw new Error('could not read as ArrayBuffer')
    }
  };

  this.text = function() {
    var rejected = consumed(this);
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  };

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    };
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  };

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url;
    this.credentials = input.credentials;
    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }
    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;
    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }
  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal || (function () {
    if ('AbortController' in g$2) {
      var ctrl = new AbortController();
      return ctrl.signal;
    }
  }());
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body);

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/;
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/;
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
};

function decode(body) {
  var form = new FormData();
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        try {
          headers.append(key, value);
        } catch (error) {
          console.warn('Response ' + error.message);
        }
      }
    });
  return headers
}

Body.call(Request.prototype);

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  if (this.status < 200 || this.status > 599) {
    throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].")
  }
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
  this.headers = new Headers(options.headers);
  this.url = options.url || '';
  this._initBody(bodyInit);
}

Body.call(Response.prototype);

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
};

Response.error = function() {
  var response = new Response(null, {status: 200, statusText: ''});
  response.ok = false;
  response.status = 0;
  response.type = 'error';
  return response
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
};

var DOMException$3 = g$2.DOMException;
try {
  new DOMException$3();
} catch (err) {
  DOMException$3 = function(message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };
  DOMException$3.prototype = Object.create(Error.prototype);
  DOMException$3.prototype.constructor = DOMException$3;
}

function fetch$1(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException$3('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function() {
      var options = {
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      // This check if specifically for when a user fetches a file locally from the file system
      // Only if the status is out of a normal range
      if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
        options.status = 200;
      } else {
        options.status = xhr.status;
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      setTimeout(function() {
        resolve(new Response(body, options));
      }, 0);
    };

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request timed out'));
      }, 0);
    };

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException$3('Aborted', 'AbortError'));
      }, 0);
    };

    function fixUrl(url) {
      try {
        return url === '' && g$2.location.href ? g$2.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob';
      } else if (
        support.arrayBuffer
      ) {
        xhr.responseType = 'arraybuffer';
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers || (g$2.Headers && init.headers instanceof g$2.Headers))) {
      var names = [];
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        names.push(normalizeName(name));
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
      });
      request.headers.forEach(function(value, name) {
        if (names.indexOf(name) === -1) {
          xhr.setRequestHeader(name, value);
        }
      });
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  })
}

fetch$1.polyfill = true;

if (!g$2.fetch) {
  g$2.fetch = fetch$1;
  g$2.Headers = Headers;
  g$2.Request = Request;
  g$2.Response = Response;
}

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.

self.fetch.bind(self);

Object.defineProperty(basicFetcher$1, "__esModule", {
  value: true
});
basicFetcher$1.convertHeadersToMap = basicFetcher$1.basicFetcher = void 0;

var __awaiter$2 = function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest = function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const convertHeadersToMap = headers => {
  const map = new Map();
  headers.forEach((key, value) => {
    map.set(key, value);
  });
  return map;
};
/**
 * Basic implementation of API fetcher
 */
basicFetcher$1.convertHeadersToMap = convertHeadersToMap;
const basicFetcher = (url, _a) => __awaiter$2(void 0, void 0, void 0, function* () {
  var {
      responseType
    } = _a,
    options = __rest(_a, ["responseType"]);
  return fetch(url, options).then(response => __awaiter$2(void 0, void 0, void 0, function* () {
    const data = yield response[responseType]();
    const {
      ok,
      status,
      statusText
    } = response;
    return {
      headers: convertHeadersToMap(response.headers),
      ok,
      status,
      statusText,
      data
    };
  }));
});
basicFetcher$1.basicFetcher = basicFetcher;

Object.defineProperty(BaseTranslator$1, "__esModule", {
  value: true
});
BaseTranslator$1.BaseTranslator = void 0;
var _basicFetcher = basicFetcher$1;
var __awaiter$1 = function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
// TODO: remove it and provide utils to implement translators
/**
 * Basic abstract class for translator
 */
class BaseTranslator {
  constructor(options) {
    this.options = {};
    this.fetch = (url, options) => __awaiter$1(this, void 0, void 0, function* () {
      var _a;
      const fetcher = (_a = this.options.fetcher) !== null && _a !== void 0 ? _a : _basicFetcher.basicFetcher;
      return fetcher(url, options);
    });
    if (options !== undefined) {
      this.options = options;
    }
  }
  checkLimitExceeding(text) {
    const plainText = Array.isArray(text) ? text.join('') : text;
    const extra = plainText.length - this.getLengthLimit();
    return extra > 0 ? extra : 0;
  }
}
BaseTranslator$1.BaseTranslator = BaseTranslator;
BaseTranslator.translatorName = 'UnknownTranslator';
BaseTranslator.isRequiredKey = () => false;
BaseTranslator.isSupportedAutoFrom = () => false;
BaseTranslator.getSupportedLanguages = () => [];

var languages = {};

var LanguageAliases$1 = {};

Object.defineProperty(LanguageAliases$1, "__esModule", {
  value: true
});
LanguageAliases$1.createLanguageAliasesMap = LanguageAliases$1.LanguageAliases = void 0;
const createLanguageAliasesMap = languages => {
  const complexLanguages = languages.filter(language => language.includes('-'));
  // Build languages map
  const languagesMap = {};
  for (const language of complexLanguages) {
    const simpleLanguage = language.split('-')[0];
    if (!(simpleLanguage in languagesMap)) {
      languagesMap[simpleLanguage] = [language];
      continue;
    }
    languagesMap[simpleLanguage].push(language);
  }
  return languagesMap;
};
LanguageAliases$1.createLanguageAliasesMap = createLanguageAliasesMap;
class LanguageAliases {
  constructor(languagesList, options = {}) {
    this.languagesList = languagesList;
    this.options = options;
    // Build map
    const languagesMap = createLanguageAliasesMap(languagesList);
    this.languagesMaps = {
      normal: languagesMap,
      reverse: Object.fromEntries(Object.entries(languagesMap).map(([simpleLanguage, aliases]) => aliases.map(alias => [alias, simpleLanguage])).flat())
    };
    this.simpleLanguages = new Set(languagesList);
  }
  getAll() {
    var _a;
    return Array.from(new Set([...this.languagesList, ...Object.keys(this.languagesMaps.normal), ...Object.keys((_a = this.options.map) !== null && _a !== void 0 ? _a : {})]));
  }
  get(language) {
    var _a, _b;
    const mappedLanguage = this.getMappedLanguage(language);
    if (mappedLanguage) return mappedLanguage;
    // Return mapped language
    const languageAliases = this.languagesMaps.normal[language];
    // Check if key is exists
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (languageAliases) return (_a = this.getMappedLanguage(languageAliases[0])) !== null && _a !== void 0 ? _a : languageAliases[0];
    // Return language in list
    if (this.simpleLanguages.has(language)) return (_b = this.getMappedLanguage(language)) !== null && _b !== void 0 ? _b : language;
    return null;
  }
  getMappedLanguage(language) {
    const {
      map = {}
    } = this.options;
    // Return mapped language
    return language in map ? map[language] : null;
  }
}
LanguageAliases$1.LanguageAliases = LanguageAliases;

Object.defineProperty(languages, "__esModule", {
  value: true
});
languages.supportedLanguages = languages.languageAliases = languages.getFixedLanguage = languages.fixedLanguagesMap = void 0;
var _LanguageAliases = LanguageAliases$1;
/**
 * Raw languages array
 */
// prettier-ignore
const supportedLanguages = languages.supportedLanguages = ['af', 'ak', 'am', 'ar', 'as', 'ay', 'az', 'be', 'bg', 'bho', 'bm', 'bn', 'bs', 'ca', 'ceb', 'ckb', 'co', 'cs', 'cy', 'da', 'de', 'doi', 'dv', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gom', 'gu', 'ha', 'haw', 'hi', 'hmn', 'hr', 'ht', 'hu', 'hy', 'id', 'ig', 'ilo', 'is', 'it', 'iw', 'ja', 'jw', 'ka', 'kk', 'km', 'kn', 'ko', 'kri', 'ku', 'ky', 'la', 'lb', 'lg', 'ln', 'lo', 'lt', 'lus', 'lv', 'mai', 'mg', 'mi', 'mk', 'ml', 'mn', 'mni-Mtei', 'mr', 'ms', 'mt', 'my', 'ne', 'nl', 'no', 'nso', 'ny', 'om', 'or', 'pa', 'pl', 'ps', 'pt', 'qu', 'ro', 'ru', 'rw', 'sa', 'sd', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tr', 'ts', 'tt', 'ug', 'uk', 'ur', 'uz', 'vi', 'xh', 'yi', 'yo', 'zh', 'zh-CN', 'zh-TW', 'zu'];
/**
 * Map with languages aliases.
 *
 * Google translator use legacy codes for some languages,
 * this map useful to use actual language codes by aliases
 *
 * @link https://xml.coverpages.org/iso639a.html
 */
const fixedLanguagesMap = languages.fixedLanguagesMap = {
  he: 'iw',
  jv: 'jw'
};
/**
 * Map ISO lang codes to google translator lang codes
 */
const languageAliases = languages.languageAliases = new _LanguageAliases.LanguageAliases(supportedLanguages, {
  map: fixedLanguagesMap
});
/**
 * @param language language code or `auto`
 * @returns mapped language
 */
const getFixedLanguage = language => {
  var _a;
  return (_a = languageAliases.get(language)) !== null && _a !== void 0 ? _a : language;
};
languages.getFixedLanguage = getFixedLanguage;

var token = {};

Object.defineProperty(token, "__esModule", {
  value: true
});
token.getToken = getToken;
// This file is generated, so eslint is not needed here
/* eslint-disable */
// TKK value from https://github.com/FilipePS/Traduzir-paginas-web/blob/f3a4956a1aa96b7a9124864158a5200827694521/background/translationService.js
const googleTranslateTKK = '448487.932609646';

//
// Obfuscated logic: START
//

function shiftLeftOrRightThenSumOrXor(num, optString) {
  for (let i = 0; i < optString.length - 2; i += 3) {
    let acc = optString.charAt(i + 2);
    if ('a' <= acc) {
      acc = acc.charCodeAt(0) - 87;
    } else {
      acc = Number(acc);
    }
    if (optString.charAt(i + 1) == '+') {
      acc = num >>> acc;
    } else {
      acc = num << acc;
    }
    if (optString.charAt(i) == '+') {
      num += acc & 4294967295;
    } else {
      num ^= acc;
    }
  }
  return num;
}
function transformQuery(query) {
  const bytesArray = [];
  let idx = [];
  for (let i = 0; i < query.length; i++) {
    let charCode = query.charCodeAt(i);
    if (128 > charCode) {
      bytesArray[idx++] = charCode;
    } else {
      if (2048 > charCode) {
        bytesArray[idx++] = charCode >> 6 | 192;
      } else {
        if (55296 == (charCode & 64512) && i + 1 < query.length && 56320 == (query.charCodeAt(i + 1) & 64512)) {
          charCode = 65536 + ((charCode & 1023) << 10) + (query.charCodeAt(++i) & 1023);
          bytesArray[idx++] = charCode >> 18 | 240;
          bytesArray[idx++] = charCode >> 12 & 63 | 128;
        } else {
          bytesArray[idx++] = charCode >> 12 | 224;
        }
        bytesArray[idx++] = charCode >> 6 & 63 | 128;
      }
      bytesArray[idx++] = charCode & 63 | 128;
    }
  }
  return bytesArray;
}
function calcHash(query, windowTkk) {
  const tkkSplited = windowTkk.split('.');
  const tkkIndex = Number(tkkSplited[0]) || 0;
  const tkkKey = Number(tkkSplited[1]) || 0;
  const bytesArray = transformQuery(query);
  let encondingRound = tkkIndex;
  for (let i = 0; i < bytesArray.length; i++) {
    encondingRound += bytesArray[i];
    encondingRound = shiftLeftOrRightThenSumOrXor(encondingRound, '+-a^+6');
  }
  encondingRound = shiftLeftOrRightThenSumOrXor(encondingRound, '+-3^+b+-f');
  encondingRound ^= tkkKey;
  if (encondingRound <= 0) {
    encondingRound = (encondingRound & 2147483647) + 2147483648;
  }
  const normalizedResult = encondingRound % 1000000;
  return normalizedResult.toString() + '.' + (normalizedResult ^ tkkIndex);
}

//
// Obfuscated logic: END
//

function getToken(query) {
  return new Promise(res => res({
    value: calcHash(query, googleTranslateTKK)
  }));
}

var utils = {};

var xpath = {};

/*
 * xpath.js
 *
 * An XPath 1.0 library for JavaScript.
 *
 * Cameron McCormack <cam (at) mcc.id.au>
 *
 * This work is licensed under the MIT License.
 *
 * Revision 20: April 26, 2011
 *   Fixed a typo resulting in FIRST_ORDERED_NODE_TYPE results being wrong,
 *   thanks to <shi_a009 (at) hotmail.com>.
 *
 * Revision 19: November 29, 2005
 *   Nodesets now store their nodes in a height balanced tree, increasing
 *   performance for the common case of selecting nodes in document order,
 *   thanks to Sébastien Cramatte <contact (at) zeninteractif.com>.
 *   AVL tree code adapted from Raimund Neumann <rnova (at) gmx.net>.
 *
 * Revision 18: October 27, 2005
 *   DOM 3 XPath support.  Caveats:
 *     - namespace prefixes aren't resolved in XPathEvaluator.createExpression,
 *       but in XPathExpression.evaluate.
 *     - XPathResult.invalidIteratorState is not implemented.
 *
 * Revision 17: October 25, 2005
 *   Some core XPath function fixes and a patch to avoid crashing certain
 *   versions of MSXML in PathExpr.prototype.getOwnerElement, thanks to
 *   Sébastien Cramatte <contact (at) zeninteractif.com>.
 *
 * Revision 16: September 22, 2005
 *   Workarounds for some IE 5.5 deficiencies.
 *   Fixed problem with prefix node tests on attribute nodes.
 *
 * Revision 15: May 21, 2005
 *   Fixed problem with QName node tests on elements with an xmlns="...".
 *
 * Revision 14: May 19, 2005
 *   Fixed QName node tests on attribute node regression.
 *
 * Revision 13: May 3, 2005
 *   Node tests are case insensitive now if working in an HTML DOM.
 *
 * Revision 12: April 26, 2005
 *   Updated licence.  Slight code changes to enable use of Dean
 *   Edwards' script compression, http://dean.edwards.name/packer/ .
 *
 * Revision 11: April 23, 2005
 *   Fixed bug with 'and' and 'or' operators, fix thanks to
 *   Sandy McArthur <sandy (at) mcarthur.org>.
 *
 * Revision 10: April 15, 2005
 *   Added support for a virtual root node, supposedly helpful for
 *   implementing XForms.  Fixed problem with QName node tests and
 *   the parent axis.
 *
 * Revision 9: March 17, 2005
 *   Namespace resolver tweaked so using the document node as the context
 *   for namespace lookups is equivalent to using the document element.
 *
 * Revision 8: February 13, 2005
 *   Handle implicit declaration of 'xmlns' namespace prefix.
 *   Fixed bug when comparing nodesets.
 *   Instance data can now be associated with a FunctionResolver, and
 *     workaround for MSXML not supporting 'localName' and 'getElementById',
 *     thanks to Grant Gongaware.
 *   Fix a few problems when the context node is the root node.
 *
 * Revision 7: February 11, 2005
 *   Default namespace resolver fix from Grant Gongaware
 *   <grant (at) gongaware.com>.
 *
 * Revision 6: February 10, 2005
 *   Fixed bug in 'number' function.
 *
 * Revision 5: February 9, 2005
 *   Fixed bug where text nodes not getting converted to string values.
 *
 * Revision 4: January 21, 2005
 *   Bug in 'name' function, fix thanks to Bill Edney.
 *   Fixed incorrect processing of namespace nodes.
 *   Fixed NamespaceResolver to resolve 'xml' namespace.
 *   Implemented union '|' operator.
 *
 * Revision 3: January 14, 2005
 *   Fixed bug with nodeset comparisons, bug lexing < and >.
 *
 * Revision 2: October 26, 2004
 *   QName node test namespace handling fixed.  Few other bug fixes.
 *
 * Revision 1: August 13, 2004
 *   Bug fixes from William J. Edney <bedney (at) technicalpursuit.com>.
 *   Added minimal licence.
 *
 * Initial version: June 14, 2004
 */

(function (exports) {
	// non-node wrapper
	var xpath = exports;

	(function (exports) {

	    // namespace nodes are not part of the DOM spec, so we use a custom nodetype for them.
	    // should NOT be used externally
	    var NAMESPACE_NODE_NODETYPE = '__namespace';

	    var isNil = function (x) {
	        return x === null || x === undefined;
	    };

	    var isValidNodeType = function (nodeType) {
	        return nodeType === NAMESPACE_NODE_NODETYPE ||
	            (Number.isInteger(nodeType)
	                && nodeType >= 1
	                && nodeType <= 11
	            );
	    };

	    var isNodeLike = function (value) {
	        return value
	            && isValidNodeType(value.nodeType)
	            && typeof value.nodeName === "string";
	    };

	    // functional helpers
	    function curry(func) {
	        var slice = Array.prototype.slice,
	            totalargs = func.length,
	            partial = function (args, fn) {
	                return function () {
	                    return fn.apply(this, args.concat(slice.call(arguments)));
	                }
	            },
	            fn = function () {
	                var args = slice.call(arguments);
	                return (args.length < totalargs) ?
	                    partial(args, fn) :
	                    func.apply(this, slice.apply(arguments, [0, totalargs]));
	            };
	        return fn;
	    }

	    var forEach = function (f, xs) {
	        for (var i = 0; i < xs.length; i += 1) {
	            f(xs[i], i, xs);
	        }
	    };

	    var reduce = function (f, seed, xs) {
	        var acc = seed;

	        forEach(function (x, i) { acc = f(acc, x, i); }, xs);

	        return acc;
	    };

	    var map = function (f, xs) {
	        var mapped = new Array(xs.length);

	        forEach(function (x, i) { mapped[i] = f(x); }, xs);

	        return mapped;
	    };

	    var filter = function (f, xs) {
	        var filtered = [];

	        forEach(function (x, i) { if (f(x, i)) { filtered.push(x); } }, xs);

	        return filtered;
	    };

	    var includes = function (values, value) {
	        for (var i = 0; i < values.length; i += 1) {
	            if (values[i] === value) {
	                return true;
	            }
	        }

	        return false;
	    };

	    function always(value) { return function () { return value; } }

	    function toString(x) { return x.toString(); }
	    var join = function (s, xs) { return xs.join(s); };
	    var wrap = function (pref, suf, str) { return pref + str + suf; };

	    var prototypeConcat = Array.prototype.concat;

	    var sortNodes = function (nodes, reverse) {
	        var ns = new XNodeSet();

	        ns.addArray(nodes);

	        var sorted = ns.toArray();

	        return reverse ? sorted.reverse() : sorted;
	    };

	    // .apply() fails above a certain number of arguments - https://github.com/goto100/xpath/pull/98
	    var MAX_ARGUMENT_LENGTH = 32767;

	    function flatten(arr) {
	        var result = [];

	        for (var start = 0; start < arr.length; start += MAX_ARGUMENT_LENGTH) {
	            var chunk = arr.slice(start, start + MAX_ARGUMENT_LENGTH);

	            result = prototypeConcat.apply(result, chunk);
	        }

	        return result;
	    }

	    function assign(target, varArgs) { // .length of function is 2
	        var to = Object(target);

	        for (var index = 1; index < arguments.length; index++) {
	            var nextSource = arguments[index];

	            if (nextSource != null) { // Skip over if undefined or null
	                for (var nextKey in nextSource) {
	                    // Avoid bugs when hasOwnProperty is shadowed
	                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	                        to[nextKey] = nextSource[nextKey];
	                    }
	                }
	            }
	        }

	        return to;
	    }

	    var NodeTypes = {
	        ELEMENT_NODE: 1,
	        ATTRIBUTE_NODE: 2,
	        TEXT_NODE: 3,
	        CDATA_SECTION_NODE: 4,
	        PROCESSING_INSTRUCTION_NODE: 7,
	        COMMENT_NODE: 8,
	        DOCUMENT_NODE: 9,
	        DOCUMENT_TYPE_NODE: 10,
	        DOCUMENT_FRAGMENT_NODE: 11,
	        NAMESPACE_NODE: NAMESPACE_NODE_NODETYPE,
	    };

	    // XPathParser ///////////////////////////////////////////////////////////////

	    XPathParser.prototype = new Object();
	    XPathParser.prototype.constructor = XPathParser;
	    XPathParser.superclass = Object.prototype;

	    function XPathParser() {
	        this.init();
	    }

	    XPathParser.prototype.init = function () {
	        this.reduceActions = [];

	        this.reduceActions[3] = function (rhs) {
	            return new OrOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[5] = function (rhs) {
	            return new AndOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[7] = function (rhs) {
	            return new EqualsOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[8] = function (rhs) {
	            return new NotEqualOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[10] = function (rhs) {
	            return new LessThanOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[11] = function (rhs) {
	            return new GreaterThanOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[12] = function (rhs) {
	            return new LessThanOrEqualOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[13] = function (rhs) {
	            return new GreaterThanOrEqualOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[15] = function (rhs) {
	            return new PlusOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[16] = function (rhs) {
	            return new MinusOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[18] = function (rhs) {
	            return new MultiplyOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[19] = function (rhs) {
	            return new DivOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[20] = function (rhs) {
	            return new ModOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[22] = function (rhs) {
	            return new UnaryMinusOperation(rhs[1]);
	        };
	        this.reduceActions[24] = function (rhs) {
	            return new BarOperation(rhs[0], rhs[2]);
	        };
	        this.reduceActions[25] = function (rhs) {
	            return new PathExpr(undefined, undefined, rhs[0]);
	        };
	        this.reduceActions[27] = function (rhs) {
	            rhs[0].locationPath = rhs[2];
	            return rhs[0];
	        };
	        this.reduceActions[28] = function (rhs) {
	            rhs[0].locationPath = rhs[2];
	            rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
	            return rhs[0];
	        };
	        this.reduceActions[29] = function (rhs) {
	            return new PathExpr(rhs[0], [], undefined);
	        };
	        this.reduceActions[30] = function (rhs) {
	            if (Utilities.instance_of(rhs[0], PathExpr)) {
	                if (rhs[0].filterPredicates == undefined) {
	                    rhs[0].filterPredicates = [];
	                }
	                rhs[0].filterPredicates.push(rhs[1]);
	                return rhs[0];
	            } else {
	                return new PathExpr(rhs[0], [rhs[1]], undefined);
	            }
	        };
	        this.reduceActions[32] = function (rhs) {
	            return rhs[1];
	        };
	        this.reduceActions[33] = function (rhs) {
	            return new XString(rhs[0]);
	        };
	        this.reduceActions[34] = function (rhs) {
	            return new XNumber(rhs[0]);
	        };
	        this.reduceActions[36] = function (rhs) {
	            return new FunctionCall(rhs[0], []);
	        };
	        this.reduceActions[37] = function (rhs) {
	            return new FunctionCall(rhs[0], rhs[2]);
	        };
	        this.reduceActions[38] = function (rhs) {
	            return [rhs[0]];
	        };
	        this.reduceActions[39] = function (rhs) {
	            rhs[2].unshift(rhs[0]);
	            return rhs[2];
	        };
	        this.reduceActions[43] = function (rhs) {
	            return new LocationPath(true, []);
	        };
	        this.reduceActions[44] = function (rhs) {
	            rhs[1].absolute = true;
	            return rhs[1];
	        };
	        this.reduceActions[46] = function (rhs) {
	            return new LocationPath(false, [rhs[0]]);
	        };
	        this.reduceActions[47] = function (rhs) {
	            rhs[0].steps.push(rhs[2]);
	            return rhs[0];
	        };
	        this.reduceActions[49] = function (rhs) {
	            return new Step(rhs[0], rhs[1], []);
	        };
	        this.reduceActions[50] = function (rhs) {
	            return new Step(Step.CHILD, rhs[0], []);
	        };
	        this.reduceActions[51] = function (rhs) {
	            return new Step(rhs[0], rhs[1], rhs[2]);
	        };
	        this.reduceActions[52] = function (rhs) {
	            return new Step(Step.CHILD, rhs[0], rhs[1]);
	        };
	        this.reduceActions[54] = function (rhs) {
	            return [rhs[0]];
	        };
	        this.reduceActions[55] = function (rhs) {
	            rhs[1].unshift(rhs[0]);
	            return rhs[1];
	        };
	        this.reduceActions[56] = function (rhs) {
	            if (rhs[0] == "ancestor") {
	                return Step.ANCESTOR;
	            } else if (rhs[0] == "ancestor-or-self") {
	                return Step.ANCESTORORSELF;
	            } else if (rhs[0] == "attribute") {
	                return Step.ATTRIBUTE;
	            } else if (rhs[0] == "child") {
	                return Step.CHILD;
	            } else if (rhs[0] == "descendant") {
	                return Step.DESCENDANT;
	            } else if (rhs[0] == "descendant-or-self") {
	                return Step.DESCENDANTORSELF;
	            } else if (rhs[0] == "following") {
	                return Step.FOLLOWING;
	            } else if (rhs[0] == "following-sibling") {
	                return Step.FOLLOWINGSIBLING;
	            } else if (rhs[0] == "namespace") {
	                return Step.NAMESPACE;
	            } else if (rhs[0] == "parent") {
	                return Step.PARENT;
	            } else if (rhs[0] == "preceding") {
	                return Step.PRECEDING;
	            } else if (rhs[0] == "preceding-sibling") {
	                return Step.PRECEDINGSIBLING;
	            } else if (rhs[0] == "self") {
	                return Step.SELF;
	            }
	            return -1;
	        };
	        this.reduceActions[57] = function (rhs) {
	            return Step.ATTRIBUTE;
	        };
	        this.reduceActions[59] = function (rhs) {
	            if (rhs[0] == "comment") {
	                return NodeTest.commentTest;
	            } else if (rhs[0] == "text") {
	                return NodeTest.textTest;
	            } else if (rhs[0] == "processing-instruction") {
	                return NodeTest.anyPiTest;
	            } else if (rhs[0] == "node") {
	                return NodeTest.nodeTest;
	            }
	            return new NodeTest(-1, undefined);
	        };
	        this.reduceActions[60] = function (rhs) {
	            return new NodeTest.PITest(rhs[2]);
	        };
	        this.reduceActions[61] = function (rhs) {
	            return rhs[1];
	        };
	        this.reduceActions[63] = function (rhs) {
	            rhs[1].absolute = true;
	            rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
	            return rhs[1];
	        };
	        this.reduceActions[64] = function (rhs) {
	            rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
	            rhs[0].steps.push(rhs[2]);
	            return rhs[0];
	        };
	        this.reduceActions[65] = function (rhs) {
	            return new Step(Step.SELF, NodeTest.nodeTest, []);
	        };
	        this.reduceActions[66] = function (rhs) {
	            return new Step(Step.PARENT, NodeTest.nodeTest, []);
	        };
	        this.reduceActions[67] = function (rhs) {
	            return new VariableReference(rhs[1]);
	        };
	        this.reduceActions[68] = function (rhs) {
	            return NodeTest.nameTestAny;
	        };
	        this.reduceActions[69] = function (rhs) {
	            return new NodeTest.NameTestPrefixAny(rhs[0].split(':')[0]);
	        };
	        this.reduceActions[70] = function (rhs) {
	            return new NodeTest.NameTestQName(rhs[0]);
	        };
	    };

	    XPathParser.actionTable = [
	        " s s        sssssssss    s ss  s  ss",
	        "                 s                  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "                rrrrr               ",
	        " s s        sssssssss    s ss  s  ss",
	        "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
	        " s s        sssssssss    s ss  s  ss",
	        "                            s       ",
	        "                            s       ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "  s                                 ",
	        "                            s       ",
	        " s           s  sssss          s  s ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "a                                   ",
	        "r       s                    rr  r  ",
	        "r      sr                    rr  r  ",
	        "r   s  rr            s       rr  r  ",
	        "r   rssrr            rss     rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrrsss         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrrs  rr  r  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "r  srrrrrrrr         rrrrrrs rr sr  ",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "                sssss               ",
	        "r  rrrrrrrrr         rrrrrrr rr sr  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "                             s      ",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "              s                     ",
	        "                             s      ",
	        "                rrrrr               ",
	        " s s        sssssssss    s sss s  ss",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s s        sssssssss      ss  s  ss",
	        " s s        sssssssss    s ss  s  ss",
	        " s           s  sssss          s  s ",
	        " s           s  sssss          s  s ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        " s           s  sssss          s  s ",
	        " s           s  sssss          s  s ",
	        "r  rrrrrrrrr         rrrrrrr rr sr  ",
	        "r  rrrrrrrrr         rrrrrrr rr sr  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "                             s      ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "                             rr     ",
	        "                             s      ",
	        "                             rs     ",
	        "r      sr                    rr  r  ",
	        "r   s  rr            s       rr  r  ",
	        "r   rssrr            rss     rr  r  ",
	        "r   rssrr            rss     rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrr            rrrss   rr  r  ",
	        "r   rrrrrsss         rrrrr   rr  r  ",
	        "r   rrrrrsss         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrr   rr  r  ",
	        "r   rrrrrrrr         rrrrrr  rr  r  ",
	        "                                 r  ",
	        "                                 s  ",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        "r  srrrrrrrr         rrrrrrs rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr  r  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        " s s        sssssssss    s ss  s  ss",
	        "r  rrrrrrrrr         rrrrrrr rr rr  ",
	        "                             r      "
	    ];

	    XPathParser.actionTableNumber = [
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        "                 J                  ",
	        "a  aaaaaaaaa         aaaaaaa aa  a  ",
	        "                YYYYY               ",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        "K1  KKKKKKKK .  +*)('KKKKKK  KK# K\" ",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        "                            N       ",
	        "                            O       ",
	        "e  eeeeeeeee         eeeeeee ee ee  ",
	        "f  fffffffff         fffffff ff ff  ",
	        "d  ddddddddd         ddddddd dd dd  ",
	        "B  BBBBBBBBB         BBBBBBB BB BB  ",
	        "A  AAAAAAAAA         AAAAAAA AA AA  ",
	        "  P                                 ",
	        "                            Q       ",
	        " 1           .  +*)('          #  \" ",
	        "b  bbbbbbbbb         bbbbbbb bb  b  ",
	        "                                    ",
	        "!       S                    !!  !  ",
	        "\"      T\"                    \"\"  \"  ",
	        "$   V  $$            U       $$  $  ",
	        "&   &ZY&&            &XW     &&  &  ",
	        ")   )))))            )))\\[   ))  )  ",
	        ".   ....._^]         .....   ..  .  ",
	        "1   11111111         11111   11  1  ",
	        "5   55555555         55555`  55  5  ",
	        "7   77777777         777777  77  7  ",
	        "9   99999999         999999  99  9  ",
	        ":  c::::::::         ::::::b :: a:  ",
	        "I  fIIIIIIII         IIIIIIe II  I  ",
	        "=  =========         ======= == ==  ",
	        "?  ?????????         ??????? ?? ??  ",
	        "C  CCCCCCCCC         CCCCCCC CC CC  ",
	        "J   JJJJJJJJ         JJJJJJ  JJ  J  ",
	        "M   MMMMMMMM         MMMMMM  MM  M  ",
	        "N  NNNNNNNNN         NNNNNNN NN  N  ",
	        "P  PPPPPPPPP         PPPPPPP PP  P  ",
	        "                +*)('               ",
	        "R  RRRRRRRRR         RRRRRRR RR aR  ",
	        "U  UUUUUUUUU         UUUUUUU UU  U  ",
	        "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
	        "c  ccccccccc         ccccccc cc cc  ",
	        "                             j      ",
	        "L  fLLLLLLLL         LLLLLLe LL  L  ",
	        "6   66666666         66666   66  6  ",
	        "              k                     ",
	        "                             l      ",
	        "                XXXXX               ",
	        " 1 0        /.-,+*)('    & %$m #  \"!",
	        "_  f________         ______e __  _  ",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1 0        /.-,+*)('      %$  #  \"!",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        " 1           .  +*)('          #  \" ",
	        " 1           .  +*)('          #  \" ",
	        ">  >>>>>>>>>         >>>>>>> >> >>  ",
	        " 1           .  +*)('          #  \" ",
	        " 1           .  +*)('          #  \" ",
	        "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
	        "V  VVVVVVVVV         VVVVVVV VV aV  ",
	        "T  TTTTTTTTT         TTTTTTT TT  T  ",
	        "@  @@@@@@@@@         @@@@@@@ @@ @@  ",
	        "                             \x87      ",
	        "[  [[[[[[[[[         [[[[[[[ [[ [[  ",
	        "D  DDDDDDDDD         DDDDDDD DD DD  ",
	        "                             HH     ",
	        "                             \x88      ",
	        "                             F\x89     ",
	        "#      T#                    ##  #  ",
	        "%   V  %%            U       %%  %  ",
	        "'   'ZY''            'XW     ''  '  ",
	        "(   (ZY((            (XW     ((  (  ",
	        "+   +++++            +++\\[   ++  +  ",
	        "*   *****            ***\\[   **  *  ",
	        "-   -----            ---\\[   --  -  ",
	        ",   ,,,,,            ,,,\\[   ,,  ,  ",
	        "0   00000_^]         00000   00  0  ",
	        "/   /////_^]         /////   //  /  ",
	        "2   22222222         22222   22  2  ",
	        "3   33333333         33333   33  3  ",
	        "4   44444444         44444   44  4  ",
	        "8   88888888         888888  88  8  ",
	        "                                 ^  ",
	        "                                 \x8a  ",
	        ";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
	        "<  f<<<<<<<<         <<<<<<e <<  <  ",
	        "O  OOOOOOOOO         OOOOOOO OO  O  ",
	        "`  `````````         ``````` ``  `  ",
	        "S  SSSSSSSSS         SSSSSSS SS  S  ",
	        "W  WWWWWWWWW         WWWWWWW WW  W  ",
	        "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
	        "E  EEEEEEEEE         EEEEEEE EE EE  ",
	        " 1 0        /.-,+*)('    & %$  #  \"!",
	        "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
	        "                             G      "
	    ];

	    XPathParser.gotoTable = [
	        "3456789:;<=>?@ AB  CDEFGH IJ ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "L456789:;<=>?@ AB  CDEFGH IJ ",
	        "            M        EFGH IJ ",
	        "       N;<=>?@ AB  CDEFGH IJ ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "            S        EFGH IJ ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "              e              ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                        h  J ",
	        "              i          j   ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "o456789:;<=>?@ ABpqCDEFGH IJ ",
	        "                             ",
	        "  r6789:;<=>?@ AB  CDEFGH IJ ",
	        "   s789:;<=>?@ AB  CDEFGH IJ ",
	        "    t89:;<=>?@ AB  CDEFGH IJ ",
	        "    u89:;<=>?@ AB  CDEFGH IJ ",
	        "     v9:;<=>?@ AB  CDEFGH IJ ",
	        "     w9:;<=>?@ AB  CDEFGH IJ ",
	        "     x9:;<=>?@ AB  CDEFGH IJ ",
	        "     y9:;<=>?@ AB  CDEFGH IJ ",
	        "      z:;<=>?@ AB  CDEFGH IJ ",
	        "      {:;<=>?@ AB  CDEFGH IJ ",
	        "       |;<=>?@ AB  CDEFGH IJ ",
	        "       };<=>?@ AB  CDEFGH IJ ",
	        "       ~;<=>?@ AB  CDEFGH IJ ",
	        "         \x7f=>?@ AB  CDEFGH IJ ",
	        "\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
	        "            \x82        EFGH IJ ",
	        "            \x83        EFGH IJ ",
	        "                             ",
	        "                     \x84 GH IJ ",
	        "                     \x85 GH IJ ",
	        "              i          \x86   ",
	        "              i          \x87   ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "                             ",
	        "o456789:;<=>?@ AB\x8cqCDEFGH IJ ",
	        "                             ",
	        "                             "
	    ];

	    XPathParser.productions = [
	        [1, 1, 2],
	        [2, 1, 3],
	        [3, 1, 4],
	        [3, 3, 3, -9, 4],
	        [4, 1, 5],
	        [4, 3, 4, -8, 5],
	        [5, 1, 6],
	        [5, 3, 5, -22, 6],
	        [5, 3, 5, -5, 6],
	        [6, 1, 7],
	        [6, 3, 6, -23, 7],
	        [6, 3, 6, -24, 7],
	        [6, 3, 6, -6, 7],
	        [6, 3, 6, -7, 7],
	        [7, 1, 8],
	        [7, 3, 7, -25, 8],
	        [7, 3, 7, -26, 8],
	        [8, 1, 9],
	        [8, 3, 8, -12, 9],
	        [8, 3, 8, -11, 9],
	        [8, 3, 8, -10, 9],
	        [9, 1, 10],
	        [9, 2, -26, 9],
	        [10, 1, 11],
	        [10, 3, 10, -27, 11],
	        [11, 1, 12],
	        [11, 1, 13],
	        [11, 3, 13, -28, 14],
	        [11, 3, 13, -4, 14],
	        [13, 1, 15],
	        [13, 2, 13, 16],
	        [15, 1, 17],
	        [15, 3, -29, 2, -30],
	        [15, 1, -15],
	        [15, 1, -16],
	        [15, 1, 18],
	        [18, 3, -13, -29, -30],
	        [18, 4, -13, -29, 19, -30],
	        [19, 1, 20],
	        [19, 3, 20, -31, 19],
	        [20, 1, 2],
	        [12, 1, 14],
	        [12, 1, 21],
	        [21, 1, -28],
	        [21, 2, -28, 14],
	        [21, 1, 22],
	        [14, 1, 23],
	        [14, 3, 14, -28, 23],
	        [14, 1, 24],
	        [23, 2, 25, 26],
	        [23, 1, 26],
	        [23, 3, 25, 26, 27],
	        [23, 2, 26, 27],
	        [23, 1, 28],
	        [27, 1, 16],
	        [27, 2, 16, 27],
	        [25, 2, -14, -3],
	        [25, 1, -32],
	        [26, 1, 29],
	        [26, 3, -20, -29, -30],
	        [26, 4, -21, -29, -15, -30],
	        [16, 3, -33, 30, -34],
	        [30, 1, 2],
	        [22, 2, -4, 14],
	        [24, 3, 14, -4, 23],
	        [28, 1, -35],
	        [28, 1, -2],
	        [17, 2, -36, -18],
	        [29, 1, -17],
	        [29, 1, -19],
	        [29, 1, -18]
	    ];

	    XPathParser.DOUBLEDOT = 2;
	    XPathParser.DOUBLECOLON = 3;
	    XPathParser.DOUBLESLASH = 4;
	    XPathParser.NOTEQUAL = 5;
	    XPathParser.LESSTHANOREQUAL = 6;
	    XPathParser.GREATERTHANOREQUAL = 7;
	    XPathParser.AND = 8;
	    XPathParser.OR = 9;
	    XPathParser.MOD = 10;
	    XPathParser.DIV = 11;
	    XPathParser.MULTIPLYOPERATOR = 12;
	    XPathParser.FUNCTIONNAME = 13;
	    XPathParser.AXISNAME = 14;
	    XPathParser.LITERAL = 15;
	    XPathParser.NUMBER = 16;
	    XPathParser.ASTERISKNAMETEST = 17;
	    XPathParser.QNAME = 18;
	    XPathParser.NCNAMECOLONASTERISK = 19;
	    XPathParser.NODETYPE = 20;
	    XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
	    XPathParser.EQUALS = 22;
	    XPathParser.LESSTHAN = 23;
	    XPathParser.GREATERTHAN = 24;
	    XPathParser.PLUS = 25;
	    XPathParser.MINUS = 26;
	    XPathParser.BAR = 27;
	    XPathParser.SLASH = 28;
	    XPathParser.LEFTPARENTHESIS = 29;
	    XPathParser.RIGHTPARENTHESIS = 30;
	    XPathParser.COMMA = 31;
	    XPathParser.AT = 32;
	    XPathParser.LEFTBRACKET = 33;
	    XPathParser.RIGHTBRACKET = 34;
	    XPathParser.DOT = 35;
	    XPathParser.DOLLAR = 36;

	    XPathParser.prototype.tokenize = function (s1) {
	        var types = [];
	        var values = [];
	        var s = s1 + '\0';

	        var pos = 0;
	        var c = s.charAt(pos++);
	        while (1) {
	            while (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
	                c = s.charAt(pos++);
	            }
	            if (c == '\0' || pos >= s.length) {
	                break;
	            }

	            if (c == '(') {
	                types.push(XPathParser.LEFTPARENTHESIS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == ')') {
	                types.push(XPathParser.RIGHTPARENTHESIS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '[') {
	                types.push(XPathParser.LEFTBRACKET);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == ']') {
	                types.push(XPathParser.RIGHTBRACKET);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '@') {
	                types.push(XPathParser.AT);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == ',') {
	                types.push(XPathParser.COMMA);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '|') {
	                types.push(XPathParser.BAR);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '+') {
	                types.push(XPathParser.PLUS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '-') {
	                types.push(XPathParser.MINUS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '=') {
	                types.push(XPathParser.EQUALS);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }
	            if (c == '$') {
	                types.push(XPathParser.DOLLAR);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c == '.') {
	                c = s.charAt(pos++);
	                if (c == '.') {
	                    types.push(XPathParser.DOUBLEDOT);
	                    values.push("..");
	                    c = s.charAt(pos++);
	                    continue;
	                }
	                if (c >= '0' && c <= '9') {
	                    var number = "." + c;
	                    c = s.charAt(pos++);
	                    while (c >= '0' && c <= '9') {
	                        number += c;
	                        c = s.charAt(pos++);
	                    }
	                    types.push(XPathParser.NUMBER);
	                    values.push(number);
	                    continue;
	                }
	                types.push(XPathParser.DOT);
	                values.push('.');
	                continue;
	            }

	            if (c == '\'' || c == '"') {
	                var delimiter = c;
	                var literal = "";
	                while (pos < s.length && (c = s.charAt(pos)) !== delimiter) {
	                    literal += c;
	                    pos += 1;
	                }
	                if (c !== delimiter) {
	                    throw XPathException.fromMessage("Unterminated string literal: " + delimiter + literal);
	                }
	                pos += 1;
	                types.push(XPathParser.LITERAL);
	                values.push(literal);
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c >= '0' && c <= '9') {
	                var number = c;
	                c = s.charAt(pos++);
	                while (c >= '0' && c <= '9') {
	                    number += c;
	                    c = s.charAt(pos++);
	                }
	                if (c == '.') {
	                    if (s.charAt(pos) >= '0' && s.charAt(pos) <= '9') {
	                        number += c;
	                        number += s.charAt(pos++);
	                        c = s.charAt(pos++);
	                        while (c >= '0' && c <= '9') {
	                            number += c;
	                            c = s.charAt(pos++);
	                        }
	                    }
	                }
	                types.push(XPathParser.NUMBER);
	                values.push(number);
	                continue;
	            }

	            if (c == '*') {
	                if (types.length > 0) {
	                    var last = types[types.length - 1];
	                    if (last != XPathParser.AT
	                        && last != XPathParser.DOUBLECOLON
	                        && last != XPathParser.LEFTPARENTHESIS
	                        && last != XPathParser.LEFTBRACKET
	                        && last != XPathParser.AND
	                        && last != XPathParser.OR
	                        && last != XPathParser.MOD
	                        && last != XPathParser.DIV
	                        && last != XPathParser.MULTIPLYOPERATOR
	                        && last != XPathParser.SLASH
	                        && last != XPathParser.DOUBLESLASH
	                        && last != XPathParser.BAR
	                        && last != XPathParser.PLUS
	                        && last != XPathParser.MINUS
	                        && last != XPathParser.EQUALS
	                        && last != XPathParser.NOTEQUAL
	                        && last != XPathParser.LESSTHAN
	                        && last != XPathParser.LESSTHANOREQUAL
	                        && last != XPathParser.GREATERTHAN
	                        && last != XPathParser.GREATERTHANOREQUAL) {
	                        types.push(XPathParser.MULTIPLYOPERATOR);
	                        values.push(c);
	                        c = s.charAt(pos++);
	                        continue;
	                    }
	                }
	                types.push(XPathParser.ASTERISKNAMETEST);
	                values.push(c);
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c == ':') {
	                if (s.charAt(pos) == ':') {
	                    types.push(XPathParser.DOUBLECOLON);
	                    values.push("::");
	                    pos++;
	                    c = s.charAt(pos++);
	                    continue;
	                }
	            }

	            if (c == '/') {
	                c = s.charAt(pos++);
	                if (c == '/') {
	                    types.push(XPathParser.DOUBLESLASH);
	                    values.push("//");
	                    c = s.charAt(pos++);
	                    continue;
	                }
	                types.push(XPathParser.SLASH);
	                values.push('/');
	                continue;
	            }

	            if (c == '!') {
	                if (s.charAt(pos) == '=') {
	                    types.push(XPathParser.NOTEQUAL);
	                    values.push("!=");
	                    pos++;
	                    c = s.charAt(pos++);
	                    continue;
	                }
	            }

	            if (c == '<') {
	                if (s.charAt(pos) == '=') {
	                    types.push(XPathParser.LESSTHANOREQUAL);
	                    values.push("<=");
	                    pos++;
	                    c = s.charAt(pos++);
	                    continue;
	                }
	                types.push(XPathParser.LESSTHAN);
	                values.push('<');
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c == '>') {
	                if (s.charAt(pos) == '=') {
	                    types.push(XPathParser.GREATERTHANOREQUAL);
	                    values.push(">=");
	                    pos++;
	                    c = s.charAt(pos++);
	                    continue;
	                }
	                types.push(XPathParser.GREATERTHAN);
	                values.push('>');
	                c = s.charAt(pos++);
	                continue;
	            }

	            if (c == '_' || Utilities.isLetter(c.charCodeAt(0))) {
	                var name = c;
	                c = s.charAt(pos++);
	                while (Utilities.isNCNameChar(c.charCodeAt(0))) {
	                    name += c;
	                    c = s.charAt(pos++);
	                }
	                if (types.length > 0) {
	                    var last = types[types.length - 1];
	                    if (last != XPathParser.AT
	                        && last != XPathParser.DOUBLECOLON
	                        && last != XPathParser.LEFTPARENTHESIS
	                        && last != XPathParser.LEFTBRACKET
	                        && last != XPathParser.AND
	                        && last != XPathParser.OR
	                        && last != XPathParser.MOD
	                        && last != XPathParser.DIV
	                        && last != XPathParser.MULTIPLYOPERATOR
	                        && last != XPathParser.SLASH
	                        && last != XPathParser.DOUBLESLASH
	                        && last != XPathParser.BAR
	                        && last != XPathParser.PLUS
	                        && last != XPathParser.MINUS
	                        && last != XPathParser.EQUALS
	                        && last != XPathParser.NOTEQUAL
	                        && last != XPathParser.LESSTHAN
	                        && last != XPathParser.LESSTHANOREQUAL
	                        && last != XPathParser.GREATERTHAN
	                        && last != XPathParser.GREATERTHANOREQUAL) {
	                        if (name == "and") {
	                            types.push(XPathParser.AND);
	                            values.push(name);
	                            continue;
	                        }
	                        if (name == "or") {
	                            types.push(XPathParser.OR);
	                            values.push(name);
	                            continue;
	                        }
	                        if (name == "mod") {
	                            types.push(XPathParser.MOD);
	                            values.push(name);
	                            continue;
	                        }
	                        if (name == "div") {
	                            types.push(XPathParser.DIV);
	                            values.push(name);
	                            continue;
	                        }
	                    }
	                }
	                if (c == ':') {
	                    if (s.charAt(pos) == '*') {
	                        types.push(XPathParser.NCNAMECOLONASTERISK);
	                        values.push(name + ":*");
	                        pos++;
	                        c = s.charAt(pos++);
	                        continue;
	                    }
	                    if (s.charAt(pos) == '_' || Utilities.isLetter(s.charCodeAt(pos))) {
	                        name += ':';
	                        c = s.charAt(pos++);
	                        while (Utilities.isNCNameChar(c.charCodeAt(0))) {
	                            name += c;
	                            c = s.charAt(pos++);
	                        }
	                        if (c == '(') {
	                            types.push(XPathParser.FUNCTIONNAME);
	                            values.push(name);
	                            continue;
	                        }
	                        types.push(XPathParser.QNAME);
	                        values.push(name);
	                        continue;
	                    }
	                    if (s.charAt(pos) == ':') {
	                        types.push(XPathParser.AXISNAME);
	                        values.push(name);
	                        continue;
	                    }
	                }
	                if (c == '(') {
	                    if (name == "comment" || name == "text" || name == "node") {
	                        types.push(XPathParser.NODETYPE);
	                        values.push(name);
	                        continue;
	                    }
	                    if (name == "processing-instruction") {
	                        if (s.charAt(pos) == ')') {
	                            types.push(XPathParser.NODETYPE);
	                        } else {
	                            types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
	                        }
	                        values.push(name);
	                        continue;
	                    }
	                    types.push(XPathParser.FUNCTIONNAME);
	                    values.push(name);
	                    continue;
	                }
	                types.push(XPathParser.QNAME);
	                values.push(name);
	                continue;
	            }

	            throw new Error("Unexpected character " + c);
	        }
	        types.push(1);
	        values.push("[EOF]");
	        return [types, values];
	    };

	    XPathParser.SHIFT = 's';
	    XPathParser.REDUCE = 'r';
	    XPathParser.ACCEPT = 'a';

	    XPathParser.prototype.parse = function (s) {
	        if (!s) {
	            throw new Error('XPath expression unspecified.');
	        }
	        if (typeof s !== 'string'){
	            throw new Error('XPath expression must be a string.');
	        }

	        var types;
	        var values;
	        var res = this.tokenize(s);
	        if (res == undefined) {
	            return undefined;
	        }
	        types = res[0];
	        values = res[1];
	        var tokenPos = 0;
	        var state = [];
	        var tokenType = [];
	        var tokenValue = [];
	        var s;
	        var a;
	        var t;

	        state.push(0);
	        tokenType.push(1);
	        tokenValue.push("_S");

	        a = types[tokenPos];
	        t = values[tokenPos++];
	        while (1) {
	            s = state[state.length - 1];
	            switch (XPathParser.actionTable[s].charAt(a - 1)) {
	                case XPathParser.SHIFT:
	                    tokenType.push(-a);
	                    tokenValue.push(t);
	                    state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
	                    a = types[tokenPos];
	                    t = values[tokenPos++];
	                    break;
	                case XPathParser.REDUCE:
	                    var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
	                    var rhs = [];
	                    for (var i = 0; i < num; i++) {
	                        tokenType.pop();
	                        rhs.unshift(tokenValue.pop());
	                        state.pop();
	                    }
	                    var s_ = state[state.length - 1];
	                    tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
	                    if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == undefined) {
	                        tokenValue.push(rhs[0]);
	                    } else {
	                        tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32](rhs));
	                    }
	                    state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
	                    break;
	                case XPathParser.ACCEPT:
	                    return new XPath(tokenValue.pop());
	                default:
	                    throw new Error("XPath parse error");
	            }
	        }
	    };

	    // XPath /////////////////////////////////////////////////////////////////////

	    XPath.prototype = new Object();
	    XPath.prototype.constructor = XPath;
	    XPath.superclass = Object.prototype;

	    function XPath(e) {
	        this.expression = e;
	    }

	    XPath.prototype.toString = function () {
	        return this.expression.toString();
	    };

	    function setIfUnset(obj, prop, value) {
	        if (!(prop in obj)) {
	            obj[prop] = value;
	        }
	    }

	    XPath.prototype.evaluate = function (c) {
	        var node = c.expressionContextNode;

	        if (!(isNil(node) || isNodeLike(node))) {
	            throw new Error("Context node does not appear to be a valid DOM node.");
	        }

	        c.contextNode = c.expressionContextNode;
	        c.contextSize = 1;
	        c.contextPosition = 1;

	        // [2017-11-25] Removed usage of .implementation.hasFeature() since it does
	        //              not reliably detect HTML DOMs (always returns false in xmldom and true in browsers)
	        if (c.isHtml) {
	            setIfUnset(c, 'caseInsensitive', true);
	            setIfUnset(c, 'allowAnyNamespaceForNoPrefix', true);
	        }

	        setIfUnset(c, 'caseInsensitive', false);

	        return this.expression.evaluate(c);
	    };

	    XPath.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
	    XPath.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";

	    // Expression ////////////////////////////////////////////////////////////////

	    Expression.prototype = new Object();
	    Expression.prototype.constructor = Expression;
	    Expression.superclass = Object.prototype;

	    function Expression() {
	    }

	    Expression.prototype.init = function () {
	    };

	    Expression.prototype.toString = function () {
	        return "<Expression>";
	    };

	    Expression.prototype.evaluate = function (c) {
	        throw new Error("Could not evaluate expression.");
	    };

	    // UnaryOperation ////////////////////////////////////////////////////////////

	    UnaryOperation.prototype = new Expression();
	    UnaryOperation.prototype.constructor = UnaryOperation;
	    UnaryOperation.superclass = Expression.prototype;

	    function UnaryOperation(rhs) {
	        if (arguments.length > 0) {
	            this.init(rhs);
	        }
	    }

	    UnaryOperation.prototype.init = function (rhs) {
	        this.rhs = rhs;
	    };

	    // UnaryMinusOperation ///////////////////////////////////////////////////////

	    UnaryMinusOperation.prototype = new UnaryOperation();
	    UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
	    UnaryMinusOperation.superclass = UnaryOperation.prototype;

	    function UnaryMinusOperation(rhs) {
	        if (arguments.length > 0) {
	            this.init(rhs);
	        }
	    }

	    UnaryMinusOperation.prototype.init = function (rhs) {
	        UnaryMinusOperation.superclass.init.call(this, rhs);
	    };

	    UnaryMinusOperation.prototype.evaluate = function (c) {
	        return this.rhs.evaluate(c).number().negate();
	    };

	    UnaryMinusOperation.prototype.toString = function () {
	        return "-" + this.rhs.toString();
	    };

	    // BinaryOperation ///////////////////////////////////////////////////////////

	    BinaryOperation.prototype = new Expression();
	    BinaryOperation.prototype.constructor = BinaryOperation;
	    BinaryOperation.superclass = Expression.prototype;

	    function BinaryOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    BinaryOperation.prototype.init = function (lhs, rhs) {
	        this.lhs = lhs;
	        this.rhs = rhs;
	    };

	    // OrOperation ///////////////////////////////////////////////////////////////

	    OrOperation.prototype = new BinaryOperation();
	    OrOperation.prototype.constructor = OrOperation;
	    OrOperation.superclass = BinaryOperation.prototype;

	    function OrOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    OrOperation.prototype.init = function (lhs, rhs) {
	        OrOperation.superclass.init.call(this, lhs, rhs);
	    };

	    OrOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
	    };

	    OrOperation.prototype.evaluate = function (c) {
	        var b = this.lhs.evaluate(c).bool();
	        if (b.booleanValue()) {
	            return b;
	        }
	        return this.rhs.evaluate(c).bool();
	    };

	    // AndOperation //////////////////////////////////////////////////////////////

	    AndOperation.prototype = new BinaryOperation();
	    AndOperation.prototype.constructor = AndOperation;
	    AndOperation.superclass = BinaryOperation.prototype;

	    function AndOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    AndOperation.prototype.init = function (lhs, rhs) {
	        AndOperation.superclass.init.call(this, lhs, rhs);
	    };

	    AndOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
	    };

	    AndOperation.prototype.evaluate = function (c) {
	        var b = this.lhs.evaluate(c).bool();
	        if (!b.booleanValue()) {
	            return b;
	        }
	        return this.rhs.evaluate(c).bool();
	    };

	    // EqualsOperation ///////////////////////////////////////////////////////////

	    EqualsOperation.prototype = new BinaryOperation();
	    EqualsOperation.prototype.constructor = EqualsOperation;
	    EqualsOperation.superclass = BinaryOperation.prototype;

	    function EqualsOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    EqualsOperation.prototype.init = function (lhs, rhs) {
	        EqualsOperation.superclass.init.call(this, lhs, rhs);
	    };

	    EqualsOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
	    };

	    EqualsOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).equals(this.rhs.evaluate(c));
	    };

	    // NotEqualOperation /////////////////////////////////////////////////////////

	    NotEqualOperation.prototype = new BinaryOperation();
	    NotEqualOperation.prototype.constructor = NotEqualOperation;
	    NotEqualOperation.superclass = BinaryOperation.prototype;

	    function NotEqualOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    NotEqualOperation.prototype.init = function (lhs, rhs) {
	        NotEqualOperation.superclass.init.call(this, lhs, rhs);
	    };

	    NotEqualOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
	    };

	    NotEqualOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c));
	    };

	    // LessThanOperation /////////////////////////////////////////////////////////

	    LessThanOperation.prototype = new BinaryOperation();
	    LessThanOperation.prototype.constructor = LessThanOperation;
	    LessThanOperation.superclass = BinaryOperation.prototype;

	    function LessThanOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    LessThanOperation.prototype.init = function (lhs, rhs) {
	        LessThanOperation.superclass.init.call(this, lhs, rhs);
	    };

	    LessThanOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c));
	    };

	    LessThanOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
	    };

	    // GreaterThanOperation //////////////////////////////////////////////////////

	    GreaterThanOperation.prototype = new BinaryOperation();
	    GreaterThanOperation.prototype.constructor = GreaterThanOperation;
	    GreaterThanOperation.superclass = BinaryOperation.prototype;

	    function GreaterThanOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    GreaterThanOperation.prototype.init = function (lhs, rhs) {
	        GreaterThanOperation.superclass.init.call(this, lhs, rhs);
	    };

	    GreaterThanOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c));
	    };

	    GreaterThanOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
	    };

	    // LessThanOrEqualOperation //////////////////////////////////////////////////

	    LessThanOrEqualOperation.prototype = new BinaryOperation();
	    LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
	    LessThanOrEqualOperation.superclass = BinaryOperation.prototype;

	    function LessThanOrEqualOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    LessThanOrEqualOperation.prototype.init = function (lhs, rhs) {
	        LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
	    };

	    LessThanOrEqualOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c));
	    };

	    LessThanOrEqualOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
	    };

	    // GreaterThanOrEqualOperation ///////////////////////////////////////////////

	    GreaterThanOrEqualOperation.prototype = new BinaryOperation();
	    GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
	    GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;

	    function GreaterThanOrEqualOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    GreaterThanOrEqualOperation.prototype.init = function (lhs, rhs) {
	        GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
	    };

	    GreaterThanOrEqualOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c));
	    };

	    GreaterThanOrEqualOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
	    };

	    // PlusOperation /////////////////////////////////////////////////////////////

	    PlusOperation.prototype = new BinaryOperation();
	    PlusOperation.prototype.constructor = PlusOperation;
	    PlusOperation.superclass = BinaryOperation.prototype;

	    function PlusOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    PlusOperation.prototype.init = function (lhs, rhs) {
	        PlusOperation.superclass.init.call(this, lhs, rhs);
	    };

	    PlusOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number());
	    };

	    PlusOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
	    };

	    // MinusOperation ////////////////////////////////////////////////////////////

	    MinusOperation.prototype = new BinaryOperation();
	    MinusOperation.prototype.constructor = MinusOperation;
	    MinusOperation.superclass = BinaryOperation.prototype;

	    function MinusOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    MinusOperation.prototype.init = function (lhs, rhs) {
	        MinusOperation.superclass.init.call(this, lhs, rhs);
	    };

	    MinusOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number());
	    };

	    MinusOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
	    };

	    // MultiplyOperation /////////////////////////////////////////////////////////

	    MultiplyOperation.prototype = new BinaryOperation();
	    MultiplyOperation.prototype.constructor = MultiplyOperation;
	    MultiplyOperation.superclass = BinaryOperation.prototype;

	    function MultiplyOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    MultiplyOperation.prototype.init = function (lhs, rhs) {
	        MultiplyOperation.superclass.init.call(this, lhs, rhs);
	    };

	    MultiplyOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number());
	    };

	    MultiplyOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
	    };

	    // DivOperation //////////////////////////////////////////////////////////////

	    DivOperation.prototype = new BinaryOperation();
	    DivOperation.prototype.constructor = DivOperation;
	    DivOperation.superclass = BinaryOperation.prototype;

	    function DivOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    DivOperation.prototype.init = function (lhs, rhs) {
	        DivOperation.superclass.init.call(this, lhs, rhs);
	    };

	    DivOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number());
	    };

	    DivOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
	    };

	    // ModOperation //////////////////////////////////////////////////////////////

	    ModOperation.prototype = new BinaryOperation();
	    ModOperation.prototype.constructor = ModOperation;
	    ModOperation.superclass = BinaryOperation.prototype;

	    function ModOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    ModOperation.prototype.init = function (lhs, rhs) {
	        ModOperation.superclass.init.call(this, lhs, rhs);
	    };

	    ModOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number());
	    };

	    ModOperation.prototype.toString = function () {
	        return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
	    };

	    // BarOperation //////////////////////////////////////////////////////////////

	    BarOperation.prototype = new BinaryOperation();
	    BarOperation.prototype.constructor = BarOperation;
	    BarOperation.superclass = BinaryOperation.prototype;

	    function BarOperation(lhs, rhs) {
	        if (arguments.length > 0) {
	            this.init(lhs, rhs);
	        }
	    }

	    BarOperation.prototype.init = function (lhs, rhs) {
	        BarOperation.superclass.init.call(this, lhs, rhs);
	    };

	    BarOperation.prototype.evaluate = function (c) {
	        return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset());
	    };

	    BarOperation.prototype.toString = function () {
	        return map(toString, [this.lhs, this.rhs]).join(' | ');
	    };

	    // PathExpr //////////////////////////////////////////////////////////////////

	    PathExpr.prototype = new Expression();
	    PathExpr.prototype.constructor = PathExpr;
	    PathExpr.superclass = Expression.prototype;

	    function PathExpr(filter, filterPreds, locpath) {
	        if (arguments.length > 0) {
	            this.init(filter, filterPreds, locpath);
	        }
	    }

	    PathExpr.prototype.init = function (filter, filterPreds, locpath) {
	        PathExpr.superclass.init.call(this);
	        this.filter = filter;
	        this.filterPredicates = filterPreds;
	        this.locationPath = locpath;
	    };

	    /**
	     * Returns the topmost node of the tree containing node
	     */
	    function findRoot(node) {
	        while (node && node.parentNode) {
	            node = node.parentNode;
	        }

	        return node;
	    }

	    var applyPredicates = function (predicates, c, nodes, reverse) {
	        if (predicates.length === 0) {
	            return nodes;
	        }

	        var ctx = c.extend({});

	        return reduce(
	            function (inNodes, pred) {
	                ctx.contextSize = inNodes.length;

	                return filter(
	                    function (node, i) {
	                        ctx.contextNode = node;
	                        ctx.contextPosition = i + 1;

	                        return PathExpr.predicateMatches(pred, ctx);
	                    },
	                    inNodes
	                );
	            },
	            sortNodes(nodes, reverse),
	            predicates
	        );
	    };

	    PathExpr.getRoot = function (xpc, nodes) {
	        var firstNode = nodes[0];

	        // xpc.virtualRoot could possibly provide a root even if firstNode is null,
	        // so using a guard here instead of throwing.
	        if (firstNode && firstNode.nodeType === NodeTypes.DOCUMENT_NODE) {
	            return firstNode;
	        }

	        if (xpc.virtualRoot) {
	            return xpc.virtualRoot;
	        }

	        if (!firstNode) {
	            throw new Error('Context node not found when determining document root.');
	        }

	        var ownerDoc = firstNode.ownerDocument;

	        if (ownerDoc) {
	            return ownerDoc;
	        }

	        // IE 5.5 doesn't have ownerDocument?
	        var n = firstNode;
	        while (n.parentNode != null) {
	            n = n.parentNode;
	        }
	        return n;
	    };

	    var getPrefixForNamespaceNode = function (attrNode) {
	        var nm = String(attrNode.name);

	        if (nm === "xmlns") {
	            return "";
	        }

	        if (nm.substring(0, 6) === "xmlns:") {
	            return nm.substring(6, nm.length);
	        }

	        return null;
	    };

	    PathExpr.applyStep = function (step, xpc, node) {
	        if (!node) {
	            throw new Error('Context node not found when evaluating XPath step: ' + step);
	        }

	        var newNodes = [];
	        xpc.contextNode = node;

	        switch (step.axis) {
	            case Step.ANCESTOR:
	                // look at all the ancestor nodes
	                if (xpc.contextNode === xpc.virtualRoot) {
	                    break;
	                }
	                var m;
	                if (xpc.contextNode.nodeType == NodeTypes.ATTRIBUTE_NODE) {
	                    m = PathExpr.getOwnerElement(xpc.contextNode);
	                } else {
	                    m = xpc.contextNode.parentNode;
	                }
	                while (m != null) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                    if (m === xpc.virtualRoot) {
	                        break;
	                    }
	                    m = m.parentNode;
	                }
	                break;

	            case Step.ANCESTORORSELF:
	                // look at all the ancestor nodes and the current node
	                for (var m = xpc.contextNode; m != null; m = m.nodeType == NodeTypes.ATTRIBUTE_NODE ? PathExpr.getOwnerElement(m) : m.parentNode) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                    if (m === xpc.virtualRoot) {
	                        break;
	                    }
	                }
	                break;

	            case Step.ATTRIBUTE:
	                // look at the attributes
	                var nnm = xpc.contextNode.attributes;
	                if (nnm != null) {
	                    for (var k = 0; k < nnm.length; k++) {
	                        var m = nnm.item(k);
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.push(m);
	                        }
	                    }
	                }
	                break;

	            case Step.CHILD:
	                // look at all child elements
	                for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                }
	                break;

	            case Step.DESCENDANT:
	                // look at all descendant nodes
	                var st = [xpc.contextNode.firstChild];
	                while (st.length > 0) {
	                    for (var m = st.pop(); m != null;) {
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.push(m);
	                        }
	                        if (m.firstChild != null) {
	                            st.push(m.nextSibling);
	                            m = m.firstChild;
	                        } else {
	                            m = m.nextSibling;
	                        }
	                    }
	                }
	                break;

	            case Step.DESCENDANTORSELF:
	                // look at self
	                if (step.nodeTest.matches(xpc.contextNode, xpc)) {
	                    newNodes.push(xpc.contextNode);
	                }
	                // look at all descendant nodes
	                var st = [xpc.contextNode.firstChild];
	                while (st.length > 0) {
	                    for (var m = st.pop(); m != null;) {
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.push(m);
	                        }
	                        if (m.firstChild != null) {
	                            st.push(m.nextSibling);
	                            m = m.firstChild;
	                        } else {
	                            m = m.nextSibling;
	                        }
	                    }
	                }
	                break;

	            case Step.FOLLOWING:
	                if (xpc.contextNode === xpc.virtualRoot) {
	                    break;
	                }
	                var st = [];
	                if (xpc.contextNode.firstChild != null) {
	                    st.unshift(xpc.contextNode.firstChild);
	                } else {
	                    st.unshift(xpc.contextNode.nextSibling);
	                }
	                for (var m = xpc.contextNode.parentNode; m != null && m.nodeType != NodeTypes.DOCUMENT_NODE && m !== xpc.virtualRoot; m = m.parentNode) {
	                    st.unshift(m.nextSibling);
	                }
	                do {
	                    for (var m = st.pop(); m != null;) {
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.push(m);
	                        }
	                        if (m.firstChild != null) {
	                            st.push(m.nextSibling);
	                            m = m.firstChild;
	                        } else {
	                            m = m.nextSibling;
	                        }
	                    }
	                } while (st.length > 0);
	                break;

	            case Step.FOLLOWINGSIBLING:
	                if (xpc.contextNode === xpc.virtualRoot) {
	                    break;
	                }
	                for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                }
	                break;

	            case Step.NAMESPACE:
	                var nodes = {};

	                if (xpc.contextNode.nodeType == NodeTypes.ELEMENT_NODE) {
	                    // BUG: This only collects the namespaces on the current node, but seemingly
	                    //      it should collect all those in scope
	                    nodes["xml"] = new XPathNamespace("xml", null, XPath.XML_NAMESPACE_URI, xpc.contextNode);

	                    for (var m = xpc.contextNode; m != null && m.nodeType == NodeTypes.ELEMENT_NODE; m = m.parentNode) {
	                        for (var k = 0; k < m.attributes.length; k++) {
	                            var attr = m.attributes.item(k);

	                            var pre = getPrefixForNamespaceNode(attr);

	                            if (pre != null && nodes[pre] == undefined) {
	                                nodes[pre] = new XPathNamespace(pre, attr, attr.value, xpc.contextNode);
	                            }
	                        }
	                    }

	                    for (var pre in nodes) {
	                        var node = nodes[pre];

	                        if (step.nodeTest.matches(node, xpc)) {
	                            newNodes.push(node);
	                        }
	                    }
	                }
	                break;

	            case Step.PARENT:
	                m = null;
	                if (xpc.contextNode !== xpc.virtualRoot) {
	                    if (xpc.contextNode.nodeType == NodeTypes.ATTRIBUTE_NODE) {
	                        m = PathExpr.getOwnerElement(xpc.contextNode);
	                    } else {
	                        m = xpc.contextNode.parentNode;
	                    }
	                }
	                if (m != null && step.nodeTest.matches(m, xpc)) {
	                    newNodes.push(m);
	                }
	                break;

	            case Step.PRECEDING:
	                var st;
	                if (xpc.virtualRoot != null) {
	                    st = [xpc.virtualRoot];
	                } else {
	                    // cannot rely on .ownerDocument because the node may be in a document fragment
	                    st = [findRoot(xpc.contextNode)];
	                }
	                outer: while (st.length > 0) {
	                    for (var m = st.pop(); m != null;) {
	                        if (m == xpc.contextNode) {
	                            break outer;
	                        }
	                        if (step.nodeTest.matches(m, xpc)) {
	                            newNodes.unshift(m);
	                        }
	                        if (m.firstChild != null) {
	                            st.push(m.nextSibling);
	                            m = m.firstChild;
	                        } else {
	                            m = m.nextSibling;
	                        }
	                    }
	                }
	                break;

	            case Step.PRECEDINGSIBLING:
	                if (xpc.contextNode === xpc.virtualRoot) {
	                    break;
	                }
	                for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling) {
	                    if (step.nodeTest.matches(m, xpc)) {
	                        newNodes.push(m);
	                    }
	                }
	                break;

	            case Step.SELF:
	                if (step.nodeTest.matches(xpc.contextNode, xpc)) {
	                    newNodes.push(xpc.contextNode);
	                }
	                break;
	        }

	        return newNodes;
	    };

	    function applyStepWithPredicates(step, xpc, node) {
	        return applyPredicates(
	            step.predicates,
	            xpc,
	            PathExpr.applyStep(step, xpc, node),
	            includes(REVERSE_AXES, step.axis)
	        );
	    }

	    function applyStepToNodes(context, nodes, step) {
	        return flatten(
	            map(
	                applyStepWithPredicates.bind(null, step, context),
	                nodes
	            )
	        );
	    }

	    PathExpr.applySteps = function (steps, xpc, nodes) {
	        return reduce(
	            applyStepToNodes.bind(null, xpc),
	            nodes,
	            steps
	        );
	    };

	    PathExpr.prototype.applyFilter = function (c, xpc) {
	        if (!this.filter) {
	            return { nodes: [c.contextNode] };
	        }

	        var ns = this.filter.evaluate(c);

	        if (!Utilities.instance_of(ns, XNodeSet)) {
	            if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) {
	                throw new Error("Path expression filter must evaluate to a nodeset if predicates or location path are used");
	            }

	            return { nonNodes: ns };
	        }

	        return {
	            nodes: applyPredicates(
	                this.filterPredicates || [],
	                xpc,
	                ns.toUnsortedArray(),
	                false // reverse
	            )
	        };
	    };

	    PathExpr.applyLocationPath = function (locationPath, xpc, nodes) {
	        if (!locationPath) {
	            return nodes;
	        }

	        var startNodes = locationPath.absolute ? [PathExpr.getRoot(xpc, nodes)] : nodes;

	        return PathExpr.applySteps(locationPath.steps, xpc, startNodes);
	    };

	    PathExpr.prototype.evaluate = function (c) {
	        var xpc = assign(new XPathContext(), c);

	        var filterResult = this.applyFilter(c, xpc);

	        if ('nonNodes' in filterResult) {
	            return filterResult.nonNodes;
	        }

	        var ns = new XNodeSet();
	        ns.addArray(PathExpr.applyLocationPath(this.locationPath, xpc, filterResult.nodes));
	        return ns;
	    };

	    PathExpr.predicateMatches = function (pred, c) {
	        var res = pred.evaluate(c);

	        return Utilities.instance_of(res, XNumber)
	            ? c.contextPosition === res.numberValue()
	            : res.booleanValue();
	    };

	    PathExpr.predicateString = function (predicate) {
	        return wrap('[', ']', predicate.toString());
	    };

	    PathExpr.predicatesString = function (predicates) {
	        return join(
	            '',
	            map(PathExpr.predicateString, predicates)
	        );
	    };

	    PathExpr.prototype.toString = function () {
	        if (this.filter != undefined) {
	            var filterStr = toString(this.filter);

	            if (Utilities.instance_of(this.filter, XString)) {
	                return wrap("'", "'", filterStr);
	            }
	            if (this.filterPredicates != undefined && this.filterPredicates.length) {
	                return wrap('(', ')', filterStr) +
	                    PathExpr.predicatesString(this.filterPredicates);
	            }
	            if (this.locationPath != undefined) {
	                return filterStr +
	                    (this.locationPath.absolute ? '' : '/') +
	                    toString(this.locationPath);
	            }

	            return filterStr;
	        }

	        return toString(this.locationPath);
	    };

	    PathExpr.getOwnerElement = function (n) {
	        // DOM 2 has ownerElement
	        if (n.ownerElement) {
	            return n.ownerElement;
	        }
	        // DOM 1 Internet Explorer can use selectSingleNode (ironically)
	        try {
	            if (n.selectSingleNode) {
	                return n.selectSingleNode("..");
	            }
	        } catch (e) {
	        }
	        // Other DOM 1 implementations must use this egregious search
	        var doc = n.nodeType == NodeTypes.DOCUMENT_NODE
	            ? n
	            : n.ownerDocument;
	        var elts = doc.getElementsByTagName("*");
	        for (var i = 0; i < elts.length; i++) {
	            var elt = elts.item(i);
	            var nnm = elt.attributes;
	            for (var j = 0; j < nnm.length; j++) {
	                var an = nnm.item(j);
	                if (an === n) {
	                    return elt;
	                }
	            }
	        }
	        return null;
	    };

	    // LocationPath //////////////////////////////////////////////////////////////

	    LocationPath.prototype = new Object();
	    LocationPath.prototype.constructor = LocationPath;
	    LocationPath.superclass = Object.prototype;

	    function LocationPath(abs, steps) {
	        if (arguments.length > 0) {
	            this.init(abs, steps);
	        }
	    }

	    LocationPath.prototype.init = function (abs, steps) {
	        this.absolute = abs;
	        this.steps = steps;
	    };

	    LocationPath.prototype.toString = function () {
	        return (
	            (this.absolute ? '/' : '') +
	            map(toString, this.steps).join('/')
	        );
	    };

	    // Step //////////////////////////////////////////////////////////////////////

	    Step.prototype = new Object();
	    Step.prototype.constructor = Step;
	    Step.superclass = Object.prototype;

	    function Step(axis, nodetest, preds) {
	        if (arguments.length > 0) {
	            this.init(axis, nodetest, preds);
	        }
	    }

	    Step.prototype.init = function (axis, nodetest, preds) {
	        this.axis = axis;
	        this.nodeTest = nodetest;
	        this.predicates = preds;
	    };

	    Step.prototype.toString = function () {
	        return Step.STEPNAMES[this.axis] +
	            "::" +
	            this.nodeTest.toString() +
	            PathExpr.predicatesString(this.predicates);
	    };


	    Step.ANCESTOR = 0;
	    Step.ANCESTORORSELF = 1;
	    Step.ATTRIBUTE = 2;
	    Step.CHILD = 3;
	    Step.DESCENDANT = 4;
	    Step.DESCENDANTORSELF = 5;
	    Step.FOLLOWING = 6;
	    Step.FOLLOWINGSIBLING = 7;
	    Step.NAMESPACE = 8;
	    Step.PARENT = 9;
	    Step.PRECEDING = 10;
	    Step.PRECEDINGSIBLING = 11;
	    Step.SELF = 12;

	    Step.STEPNAMES = reduce(function (acc, x) { return acc[x[0]] = x[1], acc; }, {}, [
	        [Step.ANCESTOR, 'ancestor'],
	        [Step.ANCESTORORSELF, 'ancestor-or-self'],
	        [Step.ATTRIBUTE, 'attribute'],
	        [Step.CHILD, 'child'],
	        [Step.DESCENDANT, 'descendant'],
	        [Step.DESCENDANTORSELF, 'descendant-or-self'],
	        [Step.FOLLOWING, 'following'],
	        [Step.FOLLOWINGSIBLING, 'following-sibling'],
	        [Step.NAMESPACE, 'namespace'],
	        [Step.PARENT, 'parent'],
	        [Step.PRECEDING, 'preceding'],
	        [Step.PRECEDINGSIBLING, 'preceding-sibling'],
	        [Step.SELF, 'self']
	    ]);

	    var REVERSE_AXES = [
	        Step.ANCESTOR,
	        Step.ANCESTORORSELF,
	        Step.PARENT,
	        Step.PRECEDING,
	        Step.PRECEDINGSIBLING
	    ];

	    // NodeTest //////////////////////////////////////////////////////////////////

	    NodeTest.prototype = new Object();
	    NodeTest.prototype.constructor = NodeTest;
	    NodeTest.superclass = Object.prototype;

	    function NodeTest(type, value) {
	        if (arguments.length > 0) {
	            this.init(type, value);
	        }
	    }

	    NodeTest.prototype.init = function (type, value) {
	        this.type = type;
	        this.value = value;
	    };

	    NodeTest.prototype.toString = function () {
	        return "<unknown nodetest type>";
	    };

	    NodeTest.prototype.matches = function (n, xpc) {
	        console.warn('unknown node test type');
	    };

	    NodeTest.NAMETESTANY = 0;
	    NodeTest.NAMETESTPREFIXANY = 1;
	    NodeTest.NAMETESTQNAME = 2;
	    NodeTest.COMMENT = 3;
	    NodeTest.TEXT = 4;
	    NodeTest.PI = 5;
	    NodeTest.NODE = 6;

	    NodeTest.isNodeType = function (types) {
	        return function (node) {
	            return includes(types, node.nodeType);
	        };
	    };

	    NodeTest.makeNodeTestType = function (type, members, ctor) {
	        var newType = ctor || function () { };

	        newType.prototype = new NodeTest(type);
	        newType.prototype.constructor = newType;

	        assign(newType.prototype, members);

	        return newType;
	    };
	    // create invariant node test for certain node types
	    NodeTest.makeNodeTypeTest = function (type, nodeTypes, stringVal) {
	        return new (NodeTest.makeNodeTestType(type, {
	            matches: NodeTest.isNodeType(nodeTypes),
	            toString: always(stringVal)
	        }))();
	    };

	    NodeTest.hasPrefix = function (node) {
	        return node.prefix || (node.nodeName || node.tagName).indexOf(':') !== -1;
	    };

	    NodeTest.isElementOrAttribute = NodeTest.isNodeType([1, 2]);
	    NodeTest.nameSpaceMatches = function (prefix, xpc, n) {
	        var nNamespace = (n.namespaceURI || '');

	        if (!prefix) {
	            return !nNamespace || (xpc.allowAnyNamespaceForNoPrefix && !NodeTest.hasPrefix(n));
	        }

	        var ns = xpc.namespaceResolver.getNamespace(prefix, xpc.expressionContextNode);

	        if (ns == null) {
	            throw new Error("Cannot resolve QName " + prefix);
	        }

	        return ns === nNamespace;
	    };
	    NodeTest.localNameMatches = function (localName, xpc, n) {
	        var nLocalName = (n.localName || n.nodeName);

	        return xpc.caseInsensitive
	            ? localName.toLowerCase() === nLocalName.toLowerCase()
	            : localName === nLocalName;
	    };

	    NodeTest.NameTestPrefixAny = NodeTest.makeNodeTestType(
	        NodeTest.NAMETESTPREFIXANY,
	        {
	            matches: function (n, xpc) {
	                return NodeTest.isElementOrAttribute(n) &&
	                    NodeTest.nameSpaceMatches(this.prefix, xpc, n);
	            },
	            toString: function () {
	                return this.prefix + ":*";
	            }
	        },
	        function NameTestPrefixAny(prefix) { this.prefix = prefix; }
	    );

	    NodeTest.NameTestQName = NodeTest.makeNodeTestType(
	        NodeTest.NAMETESTQNAME,
	        {
	            matches: function (n, xpc) {
	                return NodeTest.isNodeType(
	                    [
	                        NodeTypes.ELEMENT_NODE,
	                        NodeTypes.ATTRIBUTE_NODE,
	                        NodeTypes.NAMESPACE_NODE,
	                    ]
	                )(n) &&
	                    NodeTest.nameSpaceMatches(this.prefix, xpc, n) &&
	                    NodeTest.localNameMatches(this.localName, xpc, n);
	            },
	            toString: function () {
	                return this.name;
	            }
	        },
	        function NameTestQName(name) {
	            var nameParts = name.split(':');

	            this.name = name;
	            this.prefix = nameParts.length > 1 ? nameParts[0] : null;
	            this.localName = nameParts[nameParts.length > 1 ? 1 : 0];
	        }
	    );

	    NodeTest.PITest = NodeTest.makeNodeTestType(NodeTest.PI, {
	        matches: function (n, xpc) {
	            return NodeTest.isNodeType(
	                [NodeTypes.PROCESSING_INSTRUCTION_NODE]
	            )(n) &&
	                (n.target || n.nodeName) === this.name;
	        },
	        toString: function () {
	            return wrap('processing-instruction("', '")', this.name);
	        }
	    }, function (name) { this.name = name; });

	    // singletons

	    // elements, attributes, namespaces
	    NodeTest.nameTestAny = NodeTest.makeNodeTypeTest(
	        NodeTest.NAMETESTANY,
	        [
	            NodeTypes.ELEMENT_NODE,
	            NodeTypes.ATTRIBUTE_NODE,
	            NodeTypes.NAMESPACE_NODE,
	        ],
	        '*'
	    );
	    // text, cdata
	    NodeTest.textTest = NodeTest.makeNodeTypeTest(
	        NodeTest.TEXT,
	        [
	            NodeTypes.TEXT_NODE,
	            NodeTypes.CDATA_SECTION_NODE,
	        ],
	        'text()'
	    );
	    NodeTest.commentTest = NodeTest.makeNodeTypeTest(
	        NodeTest.COMMENT,
	        [NodeTypes.COMMENT_NODE],
	        'comment()'
	    );
	    // elements, attributes, text, cdata, PIs, comments, document nodes
	    NodeTest.nodeTest = NodeTest.makeNodeTypeTest(
	        NodeTest.NODE,
	        [
	            NodeTypes.ELEMENT_NODE,
	            NodeTypes.ATTRIBUTE_NODE,
	            NodeTypes.TEXT_NODE,
	            NodeTypes.CDATA_SECTION_NODE,
	            NodeTypes.PROCESSING_INSTRUCTION_NODE,
	            NodeTypes.COMMENT_NODE,
	            NodeTypes.DOCUMENT_NODE,
	        ],
	        'node()'
	    );
	    NodeTest.anyPiTest = NodeTest.makeNodeTypeTest(
	        NodeTest.PI,
	        [NodeTypes.PROCESSING_INSTRUCTION_NODE],
	        'processing-instruction()'
	    );

	    // VariableReference /////////////////////////////////////////////////////////

	    VariableReference.prototype = new Expression();
	    VariableReference.prototype.constructor = VariableReference;
	    VariableReference.superclass = Expression.prototype;

	    function VariableReference(v) {
	        if (arguments.length > 0) {
	            this.init(v);
	        }
	    }

	    VariableReference.prototype.init = function (v) {
	        this.variable = v;
	    };

	    VariableReference.prototype.toString = function () {
	        return "$" + this.variable;
	    };

	    VariableReference.prototype.evaluate = function (c) {
	        var parts = Utilities.resolveQName(this.variable, c.namespaceResolver, c.contextNode, false);

	        if (parts[0] == null) {
	            throw new Error("Cannot resolve QName " + fn);
	        }
	        var result = c.variableResolver.getVariable(parts[1], parts[0]);
	        if (!result) {
	            throw XPathException.fromMessage("Undeclared variable: " + this.toString());
	        }
	        return result;
	    };

	    // FunctionCall //////////////////////////////////////////////////////////////

	    FunctionCall.prototype = new Expression();
	    FunctionCall.prototype.constructor = FunctionCall;
	    FunctionCall.superclass = Expression.prototype;

	    function FunctionCall(fn, args) {
	        if (arguments.length > 0) {
	            this.init(fn, args);
	        }
	    }

	    FunctionCall.prototype.init = function (fn, args) {
	        this.functionName = fn;
	        this.arguments = args;
	    };

	    FunctionCall.prototype.toString = function () {
	        var s = this.functionName + "(";
	        for (var i = 0; i < this.arguments.length; i++) {
	            if (i > 0) {
	                s += ", ";
	            }
	            s += this.arguments[i].toString();
	        }
	        return s + ")";
	    };

	    FunctionCall.prototype.evaluate = function (c) {
	        var f = FunctionResolver.getFunctionFromContext(this.functionName, c);

	        if (!f) {
	            throw new Error("Unknown function " + this.functionName);
	        }

	        var a = [c].concat(this.arguments);
	        return f.apply(c.functionResolver.thisArg, a);
	    };

	    // Operators /////////////////////////////////////////////////////////////////

	    var Operators = new Object();

	    Operators.equals = function (l, r) {
	        return l.equals(r);
	    };

	    Operators.notequal = function (l, r) {
	        return l.notequal(r);
	    };

	    Operators.lessthan = function (l, r) {
	        return l.lessthan(r);
	    };

	    Operators.greaterthan = function (l, r) {
	        return l.greaterthan(r);
	    };

	    Operators.lessthanorequal = function (l, r) {
	        return l.lessthanorequal(r);
	    };

	    Operators.greaterthanorequal = function (l, r) {
	        return l.greaterthanorequal(r);
	    };

	    // XString ///////////////////////////////////////////////////////////////////

	    XString.prototype = new Expression();
	    XString.prototype.constructor = XString;
	    XString.superclass = Expression.prototype;

	    function XString(s) {
	        if (arguments.length > 0) {
	            this.init(s);
	        }
	    }

	    XString.prototype.init = function (s) {
	        this.str = String(s);
	    };

	    XString.prototype.toString = function () {
	        return this.str;
	    };

	    XString.prototype.evaluate = function (c) {
	        return this;
	    };

	    XString.prototype.string = function () {
	        return this;
	    };

	    XString.prototype.number = function () {
	        return new XNumber(this.str);
	    };

	    XString.prototype.bool = function () {
	        return new XBoolean(this.str);
	    };

	    XString.prototype.nodeset = function () {
	        throw new Error("Cannot convert string to nodeset");
	    };

	    XString.prototype.stringValue = function () {
	        return this.str;
	    };

	    XString.prototype.numberValue = function () {
	        return this.number().numberValue();
	    };

	    XString.prototype.booleanValue = function () {
	        return this.bool().booleanValue();
	    };

	    XString.prototype.equals = function (r) {
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.bool().equals(r);
	        }
	        if (Utilities.instance_of(r, XNumber)) {
	            return this.number().equals(r);
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithString(this, Operators.equals);
	        }
	        return new XBoolean(this.str == r.str);
	    };

	    XString.prototype.notequal = function (r) {
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.bool().notequal(r);
	        }
	        if (Utilities.instance_of(r, XNumber)) {
	            return this.number().notequal(r);
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithString(this, Operators.notequal);
	        }
	        return new XBoolean(this.str != r.str);
	    };

	    XString.prototype.lessthan = function (r) {
	        return this.number().lessthan(r);
	    };

	    XString.prototype.greaterthan = function (r) {
	        return this.number().greaterthan(r);
	    };

	    XString.prototype.lessthanorequal = function (r) {
	        return this.number().lessthanorequal(r);
	    };

	    XString.prototype.greaterthanorequal = function (r) {
	        return this.number().greaterthanorequal(r);
	    };

	    // XNumber ///////////////////////////////////////////////////////////////////

	    XNumber.prototype = new Expression();
	    XNumber.prototype.constructor = XNumber;
	    XNumber.superclass = Expression.prototype;

	    function XNumber(n) {
	        if (arguments.length > 0) {
	            this.init(n);
	        }
	    }

	    XNumber.prototype.init = function (n) {
	        this.num = typeof n === "string" ? this.parse(n) : Number(n);
	    };

	    XNumber.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/;

	    XNumber.prototype.parse = function (s) {
	        // XPath representation of numbers is more restrictive than what Number() or parseFloat() allow
	        return this.numberFormat.test(s) ? parseFloat(s) : Number.NaN;
	    };

	    function padSmallNumber(numberStr) {
	        var parts = numberStr.split('e-');
	        var base = parts[0].replace('.', '');
	        var exponent = Number(parts[1]);

	        for (var i = 0; i < exponent - 1; i += 1) {
	            base = '0' + base;
	        }

	        return '0.' + base;
	    }

	    function padLargeNumber(numberStr) {
	        var parts = numberStr.split('e');
	        var base = parts[0].replace('.', '');
	        var exponent = Number(parts[1]);
	        var zerosToAppend = exponent + 1 - base.length;

	        for (var i = 0; i < zerosToAppend; i += 1) {
	            base += '0';
	        }

	        return base;
	    }

	    XNumber.prototype.toString = function () {
	        var strValue = this.num.toString();

	        if (strValue.indexOf('e-') !== -1) {
	            return padSmallNumber(strValue);
	        }

	        if (strValue.indexOf('e') !== -1) {
	            return padLargeNumber(strValue);
	        }

	        return strValue;
	    };

	    XNumber.prototype.evaluate = function (c) {
	        return this;
	    };

	    XNumber.prototype.string = function () {


	        return new XString(this.toString());
	    };

	    XNumber.prototype.number = function () {
	        return this;
	    };

	    XNumber.prototype.bool = function () {
	        return new XBoolean(this.num);
	    };

	    XNumber.prototype.nodeset = function () {
	        throw new Error("Cannot convert number to nodeset");
	    };

	    XNumber.prototype.stringValue = function () {
	        return this.string().stringValue();
	    };

	    XNumber.prototype.numberValue = function () {
	        return this.num;
	    };

	    XNumber.prototype.booleanValue = function () {
	        return this.bool().booleanValue();
	    };

	    XNumber.prototype.negate = function () {
	        return new XNumber(-this.num);
	    };

	    XNumber.prototype.equals = function (r) {
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.bool().equals(r);
	        }
	        if (Utilities.instance_of(r, XString)) {
	            return this.equals(r.number());
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.equals);
	        }
	        return new XBoolean(this.num == r.num);
	    };

	    XNumber.prototype.notequal = function (r) {
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.bool().notequal(r);
	        }
	        if (Utilities.instance_of(r, XString)) {
	            return this.notequal(r.number());
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.notequal);
	        }
	        return new XBoolean(this.num != r.num);
	    };

	    XNumber.prototype.lessthan = function (r) {
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.greaterthan);
	        }
	        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
	            return this.lessthan(r.number());
	        }
	        return new XBoolean(this.num < r.num);
	    };

	    XNumber.prototype.greaterthan = function (r) {
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.lessthan);
	        }
	        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
	            return this.greaterthan(r.number());
	        }
	        return new XBoolean(this.num > r.num);
	    };

	    XNumber.prototype.lessthanorequal = function (r) {
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.greaterthanorequal);
	        }
	        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
	            return this.lessthanorequal(r.number());
	        }
	        return new XBoolean(this.num <= r.num);
	    };

	    XNumber.prototype.greaterthanorequal = function (r) {
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithNumber(this, Operators.lessthanorequal);
	        }
	        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
	            return this.greaterthanorequal(r.number());
	        }
	        return new XBoolean(this.num >= r.num);
	    };

	    XNumber.prototype.plus = function (r) {
	        return new XNumber(this.num + r.num);
	    };

	    XNumber.prototype.minus = function (r) {
	        return new XNumber(this.num - r.num);
	    };

	    XNumber.prototype.multiply = function (r) {
	        return new XNumber(this.num * r.num);
	    };

	    XNumber.prototype.div = function (r) {
	        return new XNumber(this.num / r.num);
	    };

	    XNumber.prototype.mod = function (r) {
	        return new XNumber(this.num % r.num);
	    };

	    // XBoolean //////////////////////////////////////////////////////////////////

	    XBoolean.prototype = new Expression();
	    XBoolean.prototype.constructor = XBoolean;
	    XBoolean.superclass = Expression.prototype;

	    function XBoolean(b) {
	        if (arguments.length > 0) {
	            this.init(b);
	        }
	    }

	    XBoolean.prototype.init = function (b) {
	        this.b = Boolean(b);
	    };

	    XBoolean.prototype.toString = function () {
	        return this.b.toString();
	    };

	    XBoolean.prototype.evaluate = function (c) {
	        return this;
	    };

	    XBoolean.prototype.string = function () {
	        return new XString(this.b);
	    };

	    XBoolean.prototype.number = function () {
	        return new XNumber(this.b);
	    };

	    XBoolean.prototype.bool = function () {
	        return this;
	    };

	    XBoolean.prototype.nodeset = function () {
	        throw new Error("Cannot convert boolean to nodeset");
	    };

	    XBoolean.prototype.stringValue = function () {
	        return this.string().stringValue();
	    };

	    XBoolean.prototype.numberValue = function () {
	        return this.number().numberValue();
	    };

	    XBoolean.prototype.booleanValue = function () {
	        return this.b;
	    };

	    XBoolean.prototype.not = function () {
	        return new XBoolean(!this.b);
	    };

	    XBoolean.prototype.equals = function (r) {
	        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
	            return this.equals(r.bool());
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithBoolean(this, Operators.equals);
	        }
	        return new XBoolean(this.b == r.b);
	    };

	    XBoolean.prototype.notequal = function (r) {
	        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
	            return this.notequal(r.bool());
	        }
	        if (Utilities.instance_of(r, XNodeSet)) {
	            return r.compareWithBoolean(this, Operators.notequal);
	        }
	        return new XBoolean(this.b != r.b);
	    };

	    XBoolean.prototype.lessthan = function (r) {
	        return this.number().lessthan(r);
	    };

	    XBoolean.prototype.greaterthan = function (r) {
	        return this.number().greaterthan(r);
	    };

	    XBoolean.prototype.lessthanorequal = function (r) {
	        return this.number().lessthanorequal(r);
	    };

	    XBoolean.prototype.greaterthanorequal = function (r) {
	        return this.number().greaterthanorequal(r);
	    };

	    XBoolean.true_ = new XBoolean(true);
	    XBoolean.false_ = new XBoolean(false);

	    // AVLTree ///////////////////////////////////////////////////////////////////

	    AVLTree.prototype = new Object();
	    AVLTree.prototype.constructor = AVLTree;
	    AVLTree.superclass = Object.prototype;

	    function AVLTree(n) {
	        this.init(n);
	    }

	    AVLTree.prototype.init = function (n) {
	        this.left = null;
	        this.right = null;
	        this.node = n;
	        this.depth = 1;
	    };

	    AVLTree.prototype.balance = function () {
	        var ldepth = this.left == null ? 0 : this.left.depth;
	        var rdepth = this.right == null ? 0 : this.right.depth;

	        if (ldepth > rdepth + 1) {
	            // LR or LL rotation
	            var lldepth = this.left.left == null ? 0 : this.left.left.depth;
	            var lrdepth = this.left.right == null ? 0 : this.left.right.depth;

	            if (lldepth < lrdepth) {
	                // LR rotation consists of a RR rotation of the left child
	                this.left.rotateRR();
	                // plus a LL rotation of this node, which happens anyway
	            }
	            this.rotateLL();
	        } else if (ldepth + 1 < rdepth) {
	            // RR or RL rorarion
	            var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
	            var rldepth = this.right.left == null ? 0 : this.right.left.depth;

	            if (rldepth > rrdepth) {
	                // RR rotation consists of a LL rotation of the right child
	                this.right.rotateLL();
	                // plus a RR rotation of this node, which happens anyway
	            }
	            this.rotateRR();
	        }
	    };

	    AVLTree.prototype.rotateLL = function () {
	        // the left side is too long => rotate from the left (_not_ leftwards)
	        var nodeBefore = this.node;
	        var rightBefore = this.right;
	        this.node = this.left.node;
	        this.right = this.left;
	        this.left = this.left.left;
	        this.right.left = this.right.right;
	        this.right.right = rightBefore;
	        this.right.node = nodeBefore;
	        this.right.updateInNewLocation();
	        this.updateInNewLocation();
	    };

	    AVLTree.prototype.rotateRR = function () {
	        // the right side is too long => rotate from the right (_not_ rightwards)
	        var nodeBefore = this.node;
	        var leftBefore = this.left;
	        this.node = this.right.node;
	        this.left = this.right;
	        this.right = this.right.right;
	        this.left.right = this.left.left;
	        this.left.left = leftBefore;
	        this.left.node = nodeBefore;
	        this.left.updateInNewLocation();
	        this.updateInNewLocation();
	    };

	    AVLTree.prototype.updateInNewLocation = function () {
	        this.getDepthFromChildren();
	    };

	    AVLTree.prototype.getDepthFromChildren = function () {
	        this.depth = this.node == null ? 0 : 1;
	        if (this.left != null) {
	            this.depth = this.left.depth + 1;
	        }
	        if (this.right != null && this.depth <= this.right.depth) {
	            this.depth = this.right.depth + 1;
	        }
	    };

	    function nodeOrder(n1, n2) {
	        if (n1 === n2) {
	            return 0;
	        }

	        if (n1.compareDocumentPosition) {
	            var cpos = n1.compareDocumentPosition(n2);

	            if (cpos & 0x01) {
	                // not in the same document; return an arbitrary result (is there a better way to do this)
	                return 1;
	            }
	            if (cpos & 0x0A) {
	                // n2 precedes or contains n1
	                return 1;
	            }
	            if (cpos & 0x14) {
	                // n2 follows or is contained by n1
	                return -1;
	            }

	            return 0;
	        }

	        var d1 = 0,
	            d2 = 0;
	        for (var m1 = n1; m1 != null; m1 = m1.parentNode || m1.ownerElement) {
	            d1++;
	        }
	        for (var m2 = n2; m2 != null; m2 = m2.parentNode || m2.ownerElement) {
	            d2++;
	        }

	        // step up to same depth
	        if (d1 > d2) {
	            while (d1 > d2) {
	                n1 = n1.parentNode || n1.ownerElement;
	                d1--;
	            }
	            if (n1 === n2) {
	                return 1;
	            }
	        } else if (d2 > d1) {
	            while (d2 > d1) {
	                n2 = n2.parentNode || n2.ownerElement;
	                d2--;
	            }
	            if (n1 === n2) {
	                return -1;
	            }
	        }

	        var n1Par = n1.parentNode || n1.ownerElement,
	            n2Par = n2.parentNode || n2.ownerElement;

	        // find common parent
	        while (n1Par !== n2Par) {
	            n1 = n1Par;
	            n2 = n2Par;
	            n1Par = n1.parentNode || n1.ownerElement;
	            n2Par = n2.parentNode || n2.ownerElement;
	        }

	        var n1isAttr = isAttributeLike(n1);
	        var n2isAttr = isAttributeLike(n2);

	        if (n1isAttr && !n2isAttr) {
	            return -1;
	        }
	        if (!n1isAttr && n2isAttr) {
	            return 1;
	        }

	        // xml namespace node comes before others. namespace nodes before non-namespace nodes
	        if (n1.isXPathNamespace) {
	            if (n1.nodeValue === XPath.XML_NAMESPACE_URI) {
	                return -1;
	            }

	            if (!n2.isXPathNamespace) {
	                return -1;
	            }

	            if (n2.nodeValue === XPath.XML_NAMESPACE_URI) {
	                return 1;
	            }
	        } else if (n2.isXPathNamespace) {
	            return 1;
	        }

	        if (n1Par) {
	            var cn = n1isAttr ? n1Par.attributes : n1Par.childNodes;
	            var len = cn.length;
	            var n1Compare = n1.baseNode || n1;
	            var n2Compare = n2.baseNode || n2;

	            for (var i = 0; i < len; i += 1) {
	                var n = cn[i];
	                if (n === n1Compare) {
	                    return -1;
	                }
	                if (n === n2Compare) {
	                    return 1;
	                }
	            }
	        }

	        throw new Error('Unexpected: could not determine node order');
	    }

	    AVLTree.prototype.add = function (n) {
	        if (n === this.node) {
	            return false;
	        }

	        var o = nodeOrder(n, this.node);

	        var ret = false;
	        if (o == -1) {
	            if (this.left == null) {
	                this.left = new AVLTree(n);
	                ret = true;
	            } else {
	                ret = this.left.add(n);
	                if (ret) {
	                    this.balance();
	                }
	            }
	        } else if (o == 1) {
	            if (this.right == null) {
	                this.right = new AVLTree(n);
	                ret = true;
	            } else {
	                ret = this.right.add(n);
	                if (ret) {
	                    this.balance();
	                }
	            }
	        }

	        if (ret) {
	            this.getDepthFromChildren();
	        }
	        return ret;
	    };

	    // XNodeSet //////////////////////////////////////////////////////////////////

	    XNodeSet.prototype = new Expression();
	    XNodeSet.prototype.constructor = XNodeSet;
	    XNodeSet.superclass = Expression.prototype;

	    function XNodeSet() {
	        this.init();
	    }

	    XNodeSet.prototype.init = function () {
	        this.tree = null;
	        this.nodes = [];
	        this.size = 0;
	    };

	    XNodeSet.prototype.toString = function () {
	        var p = this.first();
	        if (p == null) {
	            return "";
	        }
	        return this.stringForNode(p);
	    };

	    XNodeSet.prototype.evaluate = function (c) {
	        return this;
	    };

	    XNodeSet.prototype.string = function () {
	        return new XString(this.toString());
	    };

	    XNodeSet.prototype.stringValue = function () {
	        return this.toString();
	    };

	    XNodeSet.prototype.number = function () {
	        return new XNumber(this.string());
	    };

	    XNodeSet.prototype.numberValue = function () {
	        return Number(this.string());
	    };

	    XNodeSet.prototype.bool = function () {
	        return new XBoolean(this.booleanValue());
	    };

	    XNodeSet.prototype.booleanValue = function () {
	        return !!this.size;
	    };

	    XNodeSet.prototype.nodeset = function () {
	        return this;
	    };

	    XNodeSet.prototype.stringForNode = function (n) {
	        if (n.nodeType == NodeTypes.DOCUMENT_NODE ||
	            n.nodeType == NodeTypes.ELEMENT_NODE ||
	            n.nodeType === NodeTypes.DOCUMENT_FRAGMENT_NODE) {
	            return this.stringForContainerNode(n);
	        }
	        if (n.nodeType === NodeTypes.ATTRIBUTE_NODE) {
	            return n.value || n.nodeValue;
	        }
	        if (n.isNamespaceNode) {
	            return n.namespace;
	        }
	        return n.nodeValue;
	    };

	    XNodeSet.prototype.stringForContainerNode = function (n) {
	        var s = "";
	        for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
	            var nt = n2.nodeType;
	            //  Element,    Text,       CDATA,      Document,   Document Fragment
	            if (nt === 1 || nt === 3 || nt === 4 || nt === 9 || nt === 11) {
	                s += this.stringForNode(n2);
	            }
	        }
	        return s;
	    };

	    XNodeSet.prototype.buildTree = function () {
	        if (!this.tree && this.nodes.length) {
	            this.tree = new AVLTree(this.nodes[0]);
	            for (var i = 1; i < this.nodes.length; i += 1) {
	                this.tree.add(this.nodes[i]);
	            }
	        }

	        return this.tree;
	    };

	    XNodeSet.prototype.first = function () {
	        var p = this.buildTree();
	        if (p == null) {
	            return null;
	        }
	        while (p.left != null) {
	            p = p.left;
	        }
	        return p.node;
	    };

	    XNodeSet.prototype.add = function (n) {
	        for (var i = 0; i < this.nodes.length; i += 1) {
	            if (n === this.nodes[i]) {
	                return;
	            }
	        }

	        this.tree = null;
	        this.nodes.push(n);
	        this.size += 1;
	    };

	    XNodeSet.prototype.addArray = function (ns) {
	        var self = this;

	        forEach(function (x) { self.add(x); }, ns);
	    };

	    /**
	     * Returns an array of the node set's contents in document order
	     */
	    XNodeSet.prototype.toArray = function () {
	        var a = [];
	        this.toArrayRec(this.buildTree(), a);
	        return a;
	    };

	    XNodeSet.prototype.toArrayRec = function (t, a) {
	        if (t != null) {
	            this.toArrayRec(t.left, a);
	            a.push(t.node);
	            this.toArrayRec(t.right, a);
	        }
	    };

	    /**
	     * Returns an array of the node set's contents in arbitrary order
	     */
	    XNodeSet.prototype.toUnsortedArray = function () {
	        return this.nodes.slice();
	    };

	    XNodeSet.prototype.compareWithString = function (r, o) {
	        var a = this.toUnsortedArray();
	        for (var i = 0; i < a.length; i++) {
	            var n = a[i];
	            var l = new XString(this.stringForNode(n));
	            var res = o(l, r);
	            if (res.booleanValue()) {
	                return res;
	            }
	        }
	        return new XBoolean(false);
	    };

	    XNodeSet.prototype.compareWithNumber = function (r, o) {
	        var a = this.toUnsortedArray();
	        for (var i = 0; i < a.length; i++) {
	            var n = a[i];
	            var l = new XNumber(this.stringForNode(n));
	            var res = o(l, r);
	            if (res.booleanValue()) {
	                return res;
	            }
	        }
	        return new XBoolean(false);
	    };

	    XNodeSet.prototype.compareWithBoolean = function (r, o) {
	        return o(this.bool(), r);
	    };

	    XNodeSet.prototype.compareWithNodeSet = function (r, o) {
	        var arr = this.toUnsortedArray();
	        var oInvert = function (lop, rop) { return o(rop, lop); };

	        for (var i = 0; i < arr.length; i++) {
	            var l = new XString(this.stringForNode(arr[i]));

	            var res = r.compareWithString(l, oInvert);
	            if (res.booleanValue()) {
	                return res;
	            }
	        }

	        return new XBoolean(false);
	    };

	    XNodeSet.compareWith = curry(function (o, r) {
	        if (Utilities.instance_of(r, XString)) {
	            return this.compareWithString(r, o);
	        }
	        if (Utilities.instance_of(r, XNumber)) {
	            return this.compareWithNumber(r, o);
	        }
	        if (Utilities.instance_of(r, XBoolean)) {
	            return this.compareWithBoolean(r, o);
	        }
	        return this.compareWithNodeSet(r, o);
	    });

	    XNodeSet.prototype.equals = XNodeSet.compareWith(Operators.equals);
	    XNodeSet.prototype.notequal = XNodeSet.compareWith(Operators.notequal);
	    XNodeSet.prototype.lessthan = XNodeSet.compareWith(Operators.lessthan);
	    XNodeSet.prototype.greaterthan = XNodeSet.compareWith(Operators.greaterthan);
	    XNodeSet.prototype.lessthanorequal = XNodeSet.compareWith(Operators.lessthanorequal);
	    XNodeSet.prototype.greaterthanorequal = XNodeSet.compareWith(Operators.greaterthanorequal);

	    XNodeSet.prototype.union = function (r) {
	        var ns = new XNodeSet();
	        ns.addArray(this.toUnsortedArray());
	        ns.addArray(r.toUnsortedArray());
	        return ns;
	    };

	    // XPathNamespace ////////////////////////////////////////////////////////////

	    XPathNamespace.prototype = new Object();
	    XPathNamespace.prototype.constructor = XPathNamespace;
	    XPathNamespace.superclass = Object.prototype;

	    function XPathNamespace(pre, node, uri, p) {
	        this.isXPathNamespace = true;
	        this.baseNode = node;
	        this.ownerDocument = p.ownerDocument;
	        this.nodeName = pre;
	        this.prefix = pre;
	        this.localName = pre;
	        this.namespaceURI = null;
	        this.nodeValue = uri;
	        this.ownerElement = p;
	        this.nodeType = NodeTypes.NAMESPACE_NODE;
	    }

	    XPathNamespace.prototype.toString = function () {
	        return "{ \"" + this.prefix + "\", \"" + this.namespaceURI + "\" }";
	    };

	    // XPathContext //////////////////////////////////////////////////////////////

	    XPathContext.prototype = new Object();
	    XPathContext.prototype.constructor = XPathContext;
	    XPathContext.superclass = Object.prototype;

	    function XPathContext(vr, nr, fr) {
	        this.variableResolver = vr != null ? vr : new VariableResolver();
	        this.namespaceResolver = nr != null ? nr : new NamespaceResolver();
	        this.functionResolver = fr != null ? fr : new FunctionResolver();
	    }

	    XPathContext.prototype.extend = function (newProps) {
	        return assign(new XPathContext(), this, newProps);
	    };

	    // VariableResolver //////////////////////////////////////////////////////////

	    VariableResolver.prototype = new Object();
	    VariableResolver.prototype.constructor = VariableResolver;
	    VariableResolver.superclass = Object.prototype;

	    function VariableResolver() {
	    }

	    VariableResolver.prototype.getVariable = function (ln, ns) {
	        return null;
	    };

	    // FunctionResolver //////////////////////////////////////////////////////////

	    FunctionResolver.prototype = new Object();
	    FunctionResolver.prototype.constructor = FunctionResolver;
	    FunctionResolver.superclass = Object.prototype;

	    function FunctionResolver(thisArg) {
	        this.thisArg = thisArg != null ? thisArg : Functions;
	        this.functions = new Object();
	        this.addStandardFunctions();
	    }

	    FunctionResolver.prototype.addStandardFunctions = function () {
	        this.functions["{}last"] = Functions.last;
	        this.functions["{}position"] = Functions.position;
	        this.functions["{}count"] = Functions.count;
	        this.functions["{}id"] = Functions.id;
	        this.functions["{}local-name"] = Functions.localName;
	        this.functions["{}namespace-uri"] = Functions.namespaceURI;
	        this.functions["{}name"] = Functions.name;
	        this.functions["{}string"] = Functions.string;
	        this.functions["{}concat"] = Functions.concat;
	        this.functions["{}starts-with"] = Functions.startsWith;
	        this.functions["{}contains"] = Functions.contains;
	        this.functions["{}substring-before"] = Functions.substringBefore;
	        this.functions["{}substring-after"] = Functions.substringAfter;
	        this.functions["{}substring"] = Functions.substring;
	        this.functions["{}string-length"] = Functions.stringLength;
	        this.functions["{}normalize-space"] = Functions.normalizeSpace;
	        this.functions["{}translate"] = Functions.translate;
	        this.functions["{}boolean"] = Functions.boolean_;
	        this.functions["{}not"] = Functions.not;
	        this.functions["{}true"] = Functions.true_;
	        this.functions["{}false"] = Functions.false_;
	        this.functions["{}lang"] = Functions.lang;
	        this.functions["{}number"] = Functions.number;
	        this.functions["{}sum"] = Functions.sum;
	        this.functions["{}floor"] = Functions.floor;
	        this.functions["{}ceiling"] = Functions.ceiling;
	        this.functions["{}round"] = Functions.round;
	    };

	    FunctionResolver.prototype.addFunction = function (ns, ln, f) {
	        this.functions["{" + ns + "}" + ln] = f;
	    };

	    FunctionResolver.getFunctionFromContext = function (qName, context) {
	        var parts = Utilities.resolveQName(qName, context.namespaceResolver, context.contextNode, false);

	        if (parts[0] === null) {
	            throw new Error("Cannot resolve QName " + name);
	        }

	        return context.functionResolver.getFunction(parts[1], parts[0]);
	    };

	    FunctionResolver.prototype.getFunction = function (localName, namespace) {
	        return this.functions["{" + namespace + "}" + localName];
	    };

	    // NamespaceResolver /////////////////////////////////////////////////////////

	    NamespaceResolver.prototype = new Object();
	    NamespaceResolver.prototype.constructor = NamespaceResolver;
	    NamespaceResolver.superclass = Object.prototype;

	    function NamespaceResolver() {
	    }

	    NamespaceResolver.prototype.getNamespace = function (prefix, n) {
	        if (prefix == "xml") {
	            return XPath.XML_NAMESPACE_URI;
	        } else if (prefix == "xmlns") {
	            return XPath.XMLNS_NAMESPACE_URI;
	        }
	        if (n.nodeType == NodeTypes.DOCUMENT_NODE) {
	            n = n.documentElement;
	        } else if (n.nodeType == NodeTypes.ATTRIBUTE_NODE) {
	            n = PathExpr.getOwnerElement(n);
	        } else if (n.nodeType != NodeTypes.ELEMENT_NODE) {
	            n = n.parentNode;
	        }
	        while (n != null && n.nodeType == NodeTypes.ELEMENT_NODE) {
	            var nnm = n.attributes;
	            for (var i = 0; i < nnm.length; i++) {
	                var a = nnm.item(i);
	                var aname = a.name || a.nodeName;
	                if ((aname === "xmlns" && prefix === "")
	                    || aname === "xmlns:" + prefix) {
	                    return String(a.value || a.nodeValue);
	                }
	            }
	            n = n.parentNode;
	        }
	        return null;
	    };

	    // Functions /////////////////////////////////////////////////////////////////

	    var Functions = new Object();

	    Functions.last = function (c) {
	        if (arguments.length != 1) {
	            throw new Error("Function last expects ()");
	        }

	        return new XNumber(c.contextSize);
	    };

	    Functions.position = function (c) {
	        if (arguments.length != 1) {
	            throw new Error("Function position expects ()");
	        }

	        return new XNumber(c.contextPosition);
	    };

	    Functions.count = function () {
	        var c = arguments[0];
	        var ns;
	        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
	            throw new Error("Function count expects (node-set)");
	        }
	        return new XNumber(ns.size);
	    };

	    Functions.id = function () {
	        var c = arguments[0];
	        var id;
	        if (arguments.length != 2) {
	            throw new Error("Function id expects (object)");
	        }
	        id = arguments[1].evaluate(c);
	        if (Utilities.instance_of(id, XNodeSet)) {
	            id = id.toArray().join(" ");
	        } else {
	            id = id.stringValue();
	        }
	        var ids = id.split(/[\x0d\x0a\x09\x20]+/);
	        var ns = new XNodeSet();
	        var doc = c.contextNode.nodeType == NodeTypes.DOCUMENT_NODE
	            ? c.contextNode
	            : c.contextNode.ownerDocument;
	        for (var i = 0; i < ids.length; i++) {
	            var n;
	            if (doc.getElementById) {
	                n = doc.getElementById(ids[i]);
	            } else {
	                n = Utilities.getElementById(doc, ids[i]);
	            }
	            if (n != null) {
	                ns.add(n);
	            }
	        }
	        return ns;
	    };

	    Functions.localName = function (c, eNode) {
	        var n;

	        if (arguments.length == 1) {
	            n = c.contextNode;
	        } else if (arguments.length == 2) {
	            n = eNode.evaluate(c).first();
	        } else {
	            throw new Error("Function local-name expects (node-set?)");
	        }

	        if (n == null) {
	            return new XString("");
	        }

	        return new XString(
	            n.localName ||     //  standard elements and attributes
	            n.baseName ||     //  IE
	            n.target ||     //  processing instructions
	            n.nodeName ||     //  DOM1 elements
	            ""                 //  fallback
	        );
	    };

	    Functions.namespaceURI = function () {
	        var c = arguments[0];
	        var n;

	        if (arguments.length == 1) {
	            n = c.contextNode;
	        } else if (arguments.length == 2) {
	            n = arguments[1].evaluate(c).first();
	        } else {
	            throw new Error("Function namespace-uri expects (node-set?)");
	        }

	        if (n == null) {
	            return new XString("");
	        }
	        return new XString(n.namespaceURI || '');
	    };

	    Functions.name = function () {
	        var c = arguments[0];
	        var n;
	        if (arguments.length == 1) {
	            n = c.contextNode;
	        } else if (arguments.length == 2) {
	            n = arguments[1].evaluate(c).first();
	        } else {
	            throw new Error("Function name expects (node-set?)");
	        }
	        if (n == null) {
	            return new XString("");
	        }
	        if (n.nodeType == NodeTypes.ELEMENT_NODE) {
	            return new XString(n.nodeName);
	        } else if (n.nodeType == NodeTypes.ATTRIBUTE_NODE) {
	            return new XString(n.name || n.nodeName);
	        } else if (n.nodeType === NodeTypes.PROCESSING_INSTRUCTION_NODE) {
	            return new XString(n.target || n.nodeName);
	        } else if (n.localName == null) {
	            return new XString("");
	        } else {
	            return new XString(n.localName);
	        }
	    };

	    Functions.string = function () {
	        var c = arguments[0];
	        if (arguments.length == 1) {
	            return new XString(XNodeSet.prototype.stringForNode(c.contextNode));
	        } else if (arguments.length == 2) {
	            return arguments[1].evaluate(c).string();
	        }
	        throw new Error("Function string expects (object?)");
	    };

	    Functions.concat = function (c) {
	        if (arguments.length < 3) {
	            throw new Error("Function concat expects (string, string[, string]*)");
	        }
	        var s = "";
	        for (var i = 1; i < arguments.length; i++) {
	            s += arguments[i].evaluate(c).stringValue();
	        }
	        return new XString(s);
	    };

	    Functions.startsWith = function () {
	        var c = arguments[0];
	        if (arguments.length != 3) {
	            throw new Error("Function startsWith expects (string, string)");
	        }
	        var s1 = arguments[1].evaluate(c).stringValue();
	        var s2 = arguments[2].evaluate(c).stringValue();
	        return new XBoolean(s1.substring(0, s2.length) == s2);
	    };

	    Functions.contains = function () {
	        var c = arguments[0];
	        if (arguments.length != 3) {
	            throw new Error("Function contains expects (string, string)");
	        }
	        var s1 = arguments[1].evaluate(c).stringValue();
	        var s2 = arguments[2].evaluate(c).stringValue();
	        return new XBoolean(s1.indexOf(s2) !== -1);
	    };

	    Functions.substringBefore = function () {
	        var c = arguments[0];
	        if (arguments.length != 3) {
	            throw new Error("Function substring-before expects (string, string)");
	        }
	        var s1 = arguments[1].evaluate(c).stringValue();
	        var s2 = arguments[2].evaluate(c).stringValue();
	        return new XString(s1.substring(0, s1.indexOf(s2)));
	    };

	    Functions.substringAfter = function () {
	        var c = arguments[0];
	        if (arguments.length != 3) {
	            throw new Error("Function substring-after expects (string, string)");
	        }
	        var s1 = arguments[1].evaluate(c).stringValue();
	        var s2 = arguments[2].evaluate(c).stringValue();
	        if (s2.length == 0) {
	            return new XString(s1);
	        }
	        var i = s1.indexOf(s2);
	        if (i == -1) {
	            return new XString("");
	        }
	        return new XString(s1.substring(i + s2.length));
	    };

	    Functions.substring = function () {
	        var c = arguments[0];
	        if (!(arguments.length == 3 || arguments.length == 4)) {
	            throw new Error("Function substring expects (string, number, number?)");
	        }
	        var s = arguments[1].evaluate(c).stringValue();
	        var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
	        var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : undefined;
	        return new XString(s.substring(n1, n2));
	    };

	    Functions.stringLength = function () {
	        var c = arguments[0];
	        var s;
	        if (arguments.length == 1) {
	            s = XNodeSet.prototype.stringForNode(c.contextNode);
	        } else if (arguments.length == 2) {
	            s = arguments[1].evaluate(c).stringValue();
	        } else {
	            throw new Error("Function string-length expects (string?)");
	        }
	        return new XNumber(s.length);
	    };

	    Functions.normalizeSpace = function () {
	        var c = arguments[0];
	        var s;
	        if (arguments.length == 1) {
	            s = XNodeSet.prototype.stringForNode(c.contextNode);
	        } else if (arguments.length == 2) {
	            s = arguments[1].evaluate(c).stringValue();
	        } else {
	            throw new Error("Function normalize-space expects (string?)");
	        }
	        var i = 0;
	        var j = s.length - 1;
	        while (Utilities.isSpace(s.charCodeAt(j))) {
	            j--;
	        }
	        var t = "";
	        while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
	            i++;
	        }
	        while (i <= j) {
	            if (Utilities.isSpace(s.charCodeAt(i))) {
	                t += " ";
	                while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
	                    i++;
	                }
	            } else {
	                t += s.charAt(i);
	                i++;
	            }
	        }
	        return new XString(t);
	    };

	    Functions.translate = function (c, eValue, eFrom, eTo) {
	        if (arguments.length != 4) {
	            throw new Error("Function translate expects (string, string, string)");
	        }

	        var value = eValue.evaluate(c).stringValue();
	        var from = eFrom.evaluate(c).stringValue();
	        var to = eTo.evaluate(c).stringValue();

	        var cMap = reduce(function (acc, ch, i) {
	            if (!(ch in acc)) {
	                acc[ch] = i > to.length ? '' : to[i];
	            }
	            return acc;
	        }, {}, from);

	        var t = join(
	            '',
	            map(function (ch) {
	                return ch in cMap ? cMap[ch] : ch;
	            }, value)
	        );

	        return new XString(t);
	    };

	    Functions.boolean_ = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function boolean expects (object)");
	        }
	        return arguments[1].evaluate(c).bool();
	    };

	    Functions.not = function (c, eValue) {
	        if (arguments.length != 2) {
	            throw new Error("Function not expects (object)");
	        }
	        return eValue.evaluate(c).bool().not();
	    };

	    Functions.true_ = function () {
	        if (arguments.length != 1) {
	            throw new Error("Function true expects ()");
	        }
	        return XBoolean.true_;
	    };

	    Functions.false_ = function () {
	        if (arguments.length != 1) {
	            throw new Error("Function false expects ()");
	        }
	        return XBoolean.false_;
	    };

	    Functions.lang = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function lang expects (string)");
	        }
	        var lang;
	        for (var n = c.contextNode; n != null && n.nodeType != NodeTypes.DOCUMENT_NODE; n = n.parentNode) {
	            var a = n.getAttributeNS(XPath.XML_NAMESPACE_URI, "lang");
	            if (a != null) {
	                lang = String(a);
	                break;
	            }
	        }
	        if (lang == null) {
	            return XBoolean.false_;
	        }
	        var s = arguments[1].evaluate(c).stringValue();
	        return new XBoolean(lang.substring(0, s.length) == s
	            && (lang.length == s.length || lang.charAt(s.length) == '-'));
	    };

	    Functions.number = function () {
	        var c = arguments[0];
	        if (!(arguments.length == 1 || arguments.length == 2)) {
	            throw new Error("Function number expects (object?)");
	        }
	        if (arguments.length == 1) {
	            return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
	        }
	        return arguments[1].evaluate(c).number();
	    };

	    Functions.sum = function () {
	        var c = arguments[0];
	        var ns;
	        if (arguments.length != 2 || !Utilities.instance_of((ns = arguments[1].evaluate(c)), XNodeSet)) {
	            throw new Error("Function sum expects (node-set)");
	        }
	        ns = ns.toUnsortedArray();
	        var n = 0;
	        for (var i = 0; i < ns.length; i++) {
	            n += new XNumber(XNodeSet.prototype.stringForNode(ns[i])).numberValue();
	        }
	        return new XNumber(n);
	    };

	    Functions.floor = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function floor expects (number)");
	        }
	        return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()));
	    };

	    Functions.ceiling = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function ceiling expects (number)");
	        }
	        return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()));
	    };

	    Functions.round = function () {
	        var c = arguments[0];
	        if (arguments.length != 2) {
	            throw new Error("Function round expects (number)");
	        }
	        return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()));
	    };

	    // Utilities /////////////////////////////////////////////////////////////////

	    var Utilities = new Object();

	    // Returns true if the node is an attribute node or namespace node
	    var isAttributeLike = function (val) {
	        return val && (
	            val.nodeType === NodeTypes.ATTRIBUTE_NODE ||
	            val.ownerElement ||
	            val.isXPathNamespace
	        );
	    };

	    Utilities.splitQName = function (qn) {
	        var i = qn.indexOf(":");
	        if (i == -1) {
	            return [null, qn];
	        }
	        return [qn.substring(0, i), qn.substring(i + 1)];
	    };

	    Utilities.resolveQName = function (qn, nr, n, useDefault) {
	        var parts = Utilities.splitQName(qn);
	        if (parts[0] != null) {
	            parts[0] = nr.getNamespace(parts[0], n);
	        } else {
	            if (useDefault) {
	                parts[0] = nr.getNamespace("", n);
	                if (parts[0] == null) {
	                    parts[0] = "";
	                }
	            } else {
	                parts[0] = "";
	            }
	        }
	        return parts;
	    };

	    Utilities.isSpace = function (c) {
	        return c == 0x9 || c == 0xd || c == 0xa || c == 0x20;
	    };

	    Utilities.isLetter = function (c) {
	        return c >= 0x0041 && c <= 0x005A ||
	            c >= 0x0061 && c <= 0x007A ||
	            c >= 0x00C0 && c <= 0x00D6 ||
	            c >= 0x00D8 && c <= 0x00F6 ||
	            c >= 0x00F8 && c <= 0x00FF ||
	            c >= 0x0100 && c <= 0x0131 ||
	            c >= 0x0134 && c <= 0x013E ||
	            c >= 0x0141 && c <= 0x0148 ||
	            c >= 0x014A && c <= 0x017E ||
	            c >= 0x0180 && c <= 0x01C3 ||
	            c >= 0x01CD && c <= 0x01F0 ||
	            c >= 0x01F4 && c <= 0x01F5 ||
	            c >= 0x01FA && c <= 0x0217 ||
	            c >= 0x0250 && c <= 0x02A8 ||
	            c >= 0x02BB && c <= 0x02C1 ||
	            c == 0x0386 ||
	            c >= 0x0388 && c <= 0x038A ||
	            c == 0x038C ||
	            c >= 0x038E && c <= 0x03A1 ||
	            c >= 0x03A3 && c <= 0x03CE ||
	            c >= 0x03D0 && c <= 0x03D6 ||
	            c == 0x03DA ||
	            c == 0x03DC ||
	            c == 0x03DE ||
	            c == 0x03E0 ||
	            c >= 0x03E2 && c <= 0x03F3 ||
	            c >= 0x0401 && c <= 0x040C ||
	            c >= 0x040E && c <= 0x044F ||
	            c >= 0x0451 && c <= 0x045C ||
	            c >= 0x045E && c <= 0x0481 ||
	            c >= 0x0490 && c <= 0x04C4 ||
	            c >= 0x04C7 && c <= 0x04C8 ||
	            c >= 0x04CB && c <= 0x04CC ||
	            c >= 0x04D0 && c <= 0x04EB ||
	            c >= 0x04EE && c <= 0x04F5 ||
	            c >= 0x04F8 && c <= 0x04F9 ||
	            c >= 0x0531 && c <= 0x0556 ||
	            c == 0x0559 ||
	            c >= 0x0561 && c <= 0x0586 ||
	            c >= 0x05D0 && c <= 0x05EA ||
	            c >= 0x05F0 && c <= 0x05F2 ||
	            c >= 0x0621 && c <= 0x063A ||
	            c >= 0x0641 && c <= 0x064A ||
	            c >= 0x0671 && c <= 0x06B7 ||
	            c >= 0x06BA && c <= 0x06BE ||
	            c >= 0x06C0 && c <= 0x06CE ||
	            c >= 0x06D0 && c <= 0x06D3 ||
	            c == 0x06D5 ||
	            c >= 0x06E5 && c <= 0x06E6 ||
	            c >= 0x0905 && c <= 0x0939 ||
	            c == 0x093D ||
	            c >= 0x0958 && c <= 0x0961 ||
	            c >= 0x0985 && c <= 0x098C ||
	            c >= 0x098F && c <= 0x0990 ||
	            c >= 0x0993 && c <= 0x09A8 ||
	            c >= 0x09AA && c <= 0x09B0 ||
	            c == 0x09B2 ||
	            c >= 0x09B6 && c <= 0x09B9 ||
	            c >= 0x09DC && c <= 0x09DD ||
	            c >= 0x09DF && c <= 0x09E1 ||
	            c >= 0x09F0 && c <= 0x09F1 ||
	            c >= 0x0A05 && c <= 0x0A0A ||
	            c >= 0x0A0F && c <= 0x0A10 ||
	            c >= 0x0A13 && c <= 0x0A28 ||
	            c >= 0x0A2A && c <= 0x0A30 ||
	            c >= 0x0A32 && c <= 0x0A33 ||
	            c >= 0x0A35 && c <= 0x0A36 ||
	            c >= 0x0A38 && c <= 0x0A39 ||
	            c >= 0x0A59 && c <= 0x0A5C ||
	            c == 0x0A5E ||
	            c >= 0x0A72 && c <= 0x0A74 ||
	            c >= 0x0A85 && c <= 0x0A8B ||
	            c == 0x0A8D ||
	            c >= 0x0A8F && c <= 0x0A91 ||
	            c >= 0x0A93 && c <= 0x0AA8 ||
	            c >= 0x0AAA && c <= 0x0AB0 ||
	            c >= 0x0AB2 && c <= 0x0AB3 ||
	            c >= 0x0AB5 && c <= 0x0AB9 ||
	            c == 0x0ABD ||
	            c == 0x0AE0 ||
	            c >= 0x0B05 && c <= 0x0B0C ||
	            c >= 0x0B0F && c <= 0x0B10 ||
	            c >= 0x0B13 && c <= 0x0B28 ||
	            c >= 0x0B2A && c <= 0x0B30 ||
	            c >= 0x0B32 && c <= 0x0B33 ||
	            c >= 0x0B36 && c <= 0x0B39 ||
	            c == 0x0B3D ||
	            c >= 0x0B5C && c <= 0x0B5D ||
	            c >= 0x0B5F && c <= 0x0B61 ||
	            c >= 0x0B85 && c <= 0x0B8A ||
	            c >= 0x0B8E && c <= 0x0B90 ||
	            c >= 0x0B92 && c <= 0x0B95 ||
	            c >= 0x0B99 && c <= 0x0B9A ||
	            c == 0x0B9C ||
	            c >= 0x0B9E && c <= 0x0B9F ||
	            c >= 0x0BA3 && c <= 0x0BA4 ||
	            c >= 0x0BA8 && c <= 0x0BAA ||
	            c >= 0x0BAE && c <= 0x0BB5 ||
	            c >= 0x0BB7 && c <= 0x0BB9 ||
	            c >= 0x0C05 && c <= 0x0C0C ||
	            c >= 0x0C0E && c <= 0x0C10 ||
	            c >= 0x0C12 && c <= 0x0C28 ||
	            c >= 0x0C2A && c <= 0x0C33 ||
	            c >= 0x0C35 && c <= 0x0C39 ||
	            c >= 0x0C60 && c <= 0x0C61 ||
	            c >= 0x0C85 && c <= 0x0C8C ||
	            c >= 0x0C8E && c <= 0x0C90 ||
	            c >= 0x0C92 && c <= 0x0CA8 ||
	            c >= 0x0CAA && c <= 0x0CB3 ||
	            c >= 0x0CB5 && c <= 0x0CB9 ||
	            c == 0x0CDE ||
	            c >= 0x0CE0 && c <= 0x0CE1 ||
	            c >= 0x0D05 && c <= 0x0D0C ||
	            c >= 0x0D0E && c <= 0x0D10 ||
	            c >= 0x0D12 && c <= 0x0D28 ||
	            c >= 0x0D2A && c <= 0x0D39 ||
	            c >= 0x0D60 && c <= 0x0D61 ||
	            c >= 0x0E01 && c <= 0x0E2E ||
	            c == 0x0E30 ||
	            c >= 0x0E32 && c <= 0x0E33 ||
	            c >= 0x0E40 && c <= 0x0E45 ||
	            c >= 0x0E81 && c <= 0x0E82 ||
	            c == 0x0E84 ||
	            c >= 0x0E87 && c <= 0x0E88 ||
	            c == 0x0E8A ||
	            c == 0x0E8D ||
	            c >= 0x0E94 && c <= 0x0E97 ||
	            c >= 0x0E99 && c <= 0x0E9F ||
	            c >= 0x0EA1 && c <= 0x0EA3 ||
	            c == 0x0EA5 ||
	            c == 0x0EA7 ||
	            c >= 0x0EAA && c <= 0x0EAB ||
	            c >= 0x0EAD && c <= 0x0EAE ||
	            c == 0x0EB0 ||
	            c >= 0x0EB2 && c <= 0x0EB3 ||
	            c == 0x0EBD ||
	            c >= 0x0EC0 && c <= 0x0EC4 ||
	            c >= 0x0F40 && c <= 0x0F47 ||
	            c >= 0x0F49 && c <= 0x0F69 ||
	            c >= 0x10A0 && c <= 0x10C5 ||
	            c >= 0x10D0 && c <= 0x10F6 ||
	            c == 0x1100 ||
	            c >= 0x1102 && c <= 0x1103 ||
	            c >= 0x1105 && c <= 0x1107 ||
	            c == 0x1109 ||
	            c >= 0x110B && c <= 0x110C ||
	            c >= 0x110E && c <= 0x1112 ||
	            c == 0x113C ||
	            c == 0x113E ||
	            c == 0x1140 ||
	            c == 0x114C ||
	            c == 0x114E ||
	            c == 0x1150 ||
	            c >= 0x1154 && c <= 0x1155 ||
	            c == 0x1159 ||
	            c >= 0x115F && c <= 0x1161 ||
	            c == 0x1163 ||
	            c == 0x1165 ||
	            c == 0x1167 ||
	            c == 0x1169 ||
	            c >= 0x116D && c <= 0x116E ||
	            c >= 0x1172 && c <= 0x1173 ||
	            c == 0x1175 ||
	            c == 0x119E ||
	            c == 0x11A8 ||
	            c == 0x11AB ||
	            c >= 0x11AE && c <= 0x11AF ||
	            c >= 0x11B7 && c <= 0x11B8 ||
	            c == 0x11BA ||
	            c >= 0x11BC && c <= 0x11C2 ||
	            c == 0x11EB ||
	            c == 0x11F0 ||
	            c == 0x11F9 ||
	            c >= 0x1E00 && c <= 0x1E9B ||
	            c >= 0x1EA0 && c <= 0x1EF9 ||
	            c >= 0x1F00 && c <= 0x1F15 ||
	            c >= 0x1F18 && c <= 0x1F1D ||
	            c >= 0x1F20 && c <= 0x1F45 ||
	            c >= 0x1F48 && c <= 0x1F4D ||
	            c >= 0x1F50 && c <= 0x1F57 ||
	            c == 0x1F59 ||
	            c == 0x1F5B ||
	            c == 0x1F5D ||
	            c >= 0x1F5F && c <= 0x1F7D ||
	            c >= 0x1F80 && c <= 0x1FB4 ||
	            c >= 0x1FB6 && c <= 0x1FBC ||
	            c == 0x1FBE ||
	            c >= 0x1FC2 && c <= 0x1FC4 ||
	            c >= 0x1FC6 && c <= 0x1FCC ||
	            c >= 0x1FD0 && c <= 0x1FD3 ||
	            c >= 0x1FD6 && c <= 0x1FDB ||
	            c >= 0x1FE0 && c <= 0x1FEC ||
	            c >= 0x1FF2 && c <= 0x1FF4 ||
	            c >= 0x1FF6 && c <= 0x1FFC ||
	            c == 0x2126 ||
	            c >= 0x212A && c <= 0x212B ||
	            c == 0x212E ||
	            c >= 0x2180 && c <= 0x2182 ||
	            c >= 0x3041 && c <= 0x3094 ||
	            c >= 0x30A1 && c <= 0x30FA ||
	            c >= 0x3105 && c <= 0x312C ||
	            c >= 0xAC00 && c <= 0xD7A3 ||
	            c >= 0x4E00 && c <= 0x9FA5 ||
	            c == 0x3007 ||
	            c >= 0x3021 && c <= 0x3029;
	    };

	    Utilities.isNCNameChar = function (c) {
	        return c >= 0x0030 && c <= 0x0039
	            || c >= 0x0660 && c <= 0x0669
	            || c >= 0x06F0 && c <= 0x06F9
	            || c >= 0x0966 && c <= 0x096F
	            || c >= 0x09E6 && c <= 0x09EF
	            || c >= 0x0A66 && c <= 0x0A6F
	            || c >= 0x0AE6 && c <= 0x0AEF
	            || c >= 0x0B66 && c <= 0x0B6F
	            || c >= 0x0BE7 && c <= 0x0BEF
	            || c >= 0x0C66 && c <= 0x0C6F
	            || c >= 0x0CE6 && c <= 0x0CEF
	            || c >= 0x0D66 && c <= 0x0D6F
	            || c >= 0x0E50 && c <= 0x0E59
	            || c >= 0x0ED0 && c <= 0x0ED9
	            || c >= 0x0F20 && c <= 0x0F29
	            || c == 0x002E
	            || c == 0x002D
	            || c == 0x005F
	            || Utilities.isLetter(c)
	            || c >= 0x0300 && c <= 0x0345
	            || c >= 0x0360 && c <= 0x0361
	            || c >= 0x0483 && c <= 0x0486
	            || c >= 0x0591 && c <= 0x05A1
	            || c >= 0x05A3 && c <= 0x05B9
	            || c >= 0x05BB && c <= 0x05BD
	            || c == 0x05BF
	            || c >= 0x05C1 && c <= 0x05C2
	            || c == 0x05C4
	            || c >= 0x064B && c <= 0x0652
	            || c == 0x0670
	            || c >= 0x06D6 && c <= 0x06DC
	            || c >= 0x06DD && c <= 0x06DF
	            || c >= 0x06E0 && c <= 0x06E4
	            || c >= 0x06E7 && c <= 0x06E8
	            || c >= 0x06EA && c <= 0x06ED
	            || c >= 0x0901 && c <= 0x0903
	            || c == 0x093C
	            || c >= 0x093E && c <= 0x094C
	            || c == 0x094D
	            || c >= 0x0951 && c <= 0x0954
	            || c >= 0x0962 && c <= 0x0963
	            || c >= 0x0981 && c <= 0x0983
	            || c == 0x09BC
	            || c == 0x09BE
	            || c == 0x09BF
	            || c >= 0x09C0 && c <= 0x09C4
	            || c >= 0x09C7 && c <= 0x09C8
	            || c >= 0x09CB && c <= 0x09CD
	            || c == 0x09D7
	            || c >= 0x09E2 && c <= 0x09E3
	            || c == 0x0A02
	            || c == 0x0A3C
	            || c == 0x0A3E
	            || c == 0x0A3F
	            || c >= 0x0A40 && c <= 0x0A42
	            || c >= 0x0A47 && c <= 0x0A48
	            || c >= 0x0A4B && c <= 0x0A4D
	            || c >= 0x0A70 && c <= 0x0A71
	            || c >= 0x0A81 && c <= 0x0A83
	            || c == 0x0ABC
	            || c >= 0x0ABE && c <= 0x0AC5
	            || c >= 0x0AC7 && c <= 0x0AC9
	            || c >= 0x0ACB && c <= 0x0ACD
	            || c >= 0x0B01 && c <= 0x0B03
	            || c == 0x0B3C
	            || c >= 0x0B3E && c <= 0x0B43
	            || c >= 0x0B47 && c <= 0x0B48
	            || c >= 0x0B4B && c <= 0x0B4D
	            || c >= 0x0B56 && c <= 0x0B57
	            || c >= 0x0B82 && c <= 0x0B83
	            || c >= 0x0BBE && c <= 0x0BC2
	            || c >= 0x0BC6 && c <= 0x0BC8
	            || c >= 0x0BCA && c <= 0x0BCD
	            || c == 0x0BD7
	            || c >= 0x0C01 && c <= 0x0C03
	            || c >= 0x0C3E && c <= 0x0C44
	            || c >= 0x0C46 && c <= 0x0C48
	            || c >= 0x0C4A && c <= 0x0C4D
	            || c >= 0x0C55 && c <= 0x0C56
	            || c >= 0x0C82 && c <= 0x0C83
	            || c >= 0x0CBE && c <= 0x0CC4
	            || c >= 0x0CC6 && c <= 0x0CC8
	            || c >= 0x0CCA && c <= 0x0CCD
	            || c >= 0x0CD5 && c <= 0x0CD6
	            || c >= 0x0D02 && c <= 0x0D03
	            || c >= 0x0D3E && c <= 0x0D43
	            || c >= 0x0D46 && c <= 0x0D48
	            || c >= 0x0D4A && c <= 0x0D4D
	            || c == 0x0D57
	            || c == 0x0E31
	            || c >= 0x0E34 && c <= 0x0E3A
	            || c >= 0x0E47 && c <= 0x0E4E
	            || c == 0x0EB1
	            || c >= 0x0EB4 && c <= 0x0EB9
	            || c >= 0x0EBB && c <= 0x0EBC
	            || c >= 0x0EC8 && c <= 0x0ECD
	            || c >= 0x0F18 && c <= 0x0F19
	            || c == 0x0F35
	            || c == 0x0F37
	            || c == 0x0F39
	            || c == 0x0F3E
	            || c == 0x0F3F
	            || c >= 0x0F71 && c <= 0x0F84
	            || c >= 0x0F86 && c <= 0x0F8B
	            || c >= 0x0F90 && c <= 0x0F95
	            || c == 0x0F97
	            || c >= 0x0F99 && c <= 0x0FAD
	            || c >= 0x0FB1 && c <= 0x0FB7
	            || c == 0x0FB9
	            || c >= 0x20D0 && c <= 0x20DC
	            || c == 0x20E1
	            || c >= 0x302A && c <= 0x302F
	            || c == 0x3099
	            || c == 0x309A
	            || c == 0x00B7
	            || c == 0x02D0
	            || c == 0x02D1
	            || c == 0x0387
	            || c == 0x0640
	            || c == 0x0E46
	            || c == 0x0EC6
	            || c == 0x3005
	            || c >= 0x3031 && c <= 0x3035
	            || c >= 0x309D && c <= 0x309E
	            || c >= 0x30FC && c <= 0x30FE;
	    };

	    Utilities.coalesceText = function (n) {
	        for (var m = n.firstChild; m != null; m = m.nextSibling) {
	            if (m.nodeType == NodeTypes.TEXT_NODE || m.nodeType == NodeTypes.CDATA_SECTION_NODE) {
	                var s = m.nodeValue;
	                var first = m;
	                m = m.nextSibling;
	                while (m != null && (m.nodeType == NodeTypes.TEXT_NODE || m.nodeType == NodeTypes.CDATA_SECTION_NODE)) {
	                    s += m.nodeValue;
	                    var del = m;
	                    m = m.nextSibling;
	                    del.parentNode.removeChild(del);
	                }
	                if (first.nodeType == NodeTypes.CDATA_SECTION_NODE) {
	                    var p = first.parentNode;
	                    if (first.nextSibling == null) {
	                        p.removeChild(first);
	                        p.appendChild(p.ownerDocument.createTextNode(s));
	                    } else {
	                        var next = first.nextSibling;
	                        p.removeChild(first);
	                        p.insertBefore(p.ownerDocument.createTextNode(s), next);
	                    }
	                } else {
	                    first.nodeValue = s;
	                }
	                if (m == null) {
	                    break;
	                }
	            } else if (m.nodeType == NodeTypes.ELEMENT_NODE) {
	                Utilities.coalesceText(m);
	            }
	        }
	    };

	    Utilities.instance_of = function (o, c) {
	        while (o != null) {
	            if (o.constructor === c) {
	                return true;
	            }
	            if (o === Object) {
	                return false;
	            }
	            o = o.constructor.superclass;
	        }
	        return false;
	    };

	    Utilities.getElementById = function (n, id) {
	        // Note that this does not check the DTD to check for actual
	        // attributes of type ID, so this may be a bit wrong.
	        if (n.nodeType == NodeTypes.ELEMENT_NODE) {
	            if (n.getAttribute("id") == id
	                || n.getAttributeNS(null, "id") == id) {
	                return n;
	            }
	        }
	        for (var m = n.firstChild; m != null; m = m.nextSibling) {
	            var res = Utilities.getElementById(m, id);
	            if (res != null) {
	                return res;
	            }
	        }
	        return null;
	    };

	    // XPathException ////////////////////////////////////////////////////////////

	    var XPathException = (function () {
	        function getMessage(code, exception) {
	            var msg = exception ? ": " + exception.toString() : "";
	            switch (code) {
	                case XPathException.INVALID_EXPRESSION_ERR:
	                    return "Invalid expression" + msg;
	                case XPathException.TYPE_ERR:
	                    return "Type error" + msg;
	            }
	            return null;
	        }

	        function XPathException(code, error, message) {
	            var err = Error.call(this, getMessage(code, error) || message);

	            err.code = code;
	            err.exception = error;

	            return err;
	        }

	        XPathException.prototype = Object.create(Error.prototype);
	        XPathException.prototype.constructor = XPathException;
	        XPathException.superclass = Error;

	        XPathException.prototype.toString = function () {
	            return this.message;
	        };

	        XPathException.fromMessage = function (message, error) {
	            return new XPathException(null, error, message);
	        };

	        XPathException.INVALID_EXPRESSION_ERR = 51;
	        XPathException.TYPE_ERR = 52;

	        return XPathException;
	    })();

	    // XPathExpression ///////////////////////////////////////////////////////////

	    XPathExpression.prototype = {};
	    XPathExpression.prototype.constructor = XPathExpression;
	    XPathExpression.superclass = Object.prototype;

	    function XPathExpression(e, r, p) {
	        this.xpath = p.parse(e);
	        this.context = new XPathContext();
	        this.context.namespaceResolver = new XPathNSResolverWrapper(r);
	    }

	    XPathExpression.getOwnerDocument = function (n) {
	        return n.nodeType === NodeTypes.DOCUMENT_NODE ? n : n.ownerDocument;
	    };

	    XPathExpression.detectHtmlDom = function (n) {
	        if (!n) { return false; }

	        var doc = XPathExpression.getOwnerDocument(n);

	        try {
	            return doc.implementation.hasFeature("HTML", "2.0");
	        } catch (e) {
	            return true;
	        }
	    };

	    XPathExpression.prototype.evaluate = function (n, t, res) {
	        this.context.expressionContextNode = n;
	        // backward compatibility - no reliable way to detect whether the DOM is HTML, but
	        // this library has been using this method up until now, so we will continue to use it
	        // ONLY when using an XPathExpression
	        this.context.caseInsensitive = XPathExpression.detectHtmlDom(n);

	        var result = this.xpath.evaluate(this.context);

	        return new XPathResult(result, t);
	    };

	    // XPathNSResolverWrapper ////////////////////////////////////////////////////

	    XPathNSResolverWrapper.prototype = {};
	    XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
	    XPathNSResolverWrapper.superclass = Object.prototype;

	    function XPathNSResolverWrapper(r) {
	        this.xpathNSResolver = r;
	    }

	    XPathNSResolverWrapper.prototype.getNamespace = function (prefix, n) {
	        if (this.xpathNSResolver == null) {
	            return null;
	        }
	        return this.xpathNSResolver.lookupNamespaceURI(prefix);
	    };

	    // NodeXPathNSResolver ///////////////////////////////////////////////////////

	    NodeXPathNSResolver.prototype = {};
	    NodeXPathNSResolver.prototype.constructor = NodeXPathNSResolver;
	    NodeXPathNSResolver.superclass = Object.prototype;

	    function NodeXPathNSResolver(n) {
	        this.node = n;
	        this.namespaceResolver = new NamespaceResolver();
	    }

	    NodeXPathNSResolver.prototype.lookupNamespaceURI = function (prefix) {
	        return this.namespaceResolver.getNamespace(prefix, this.node);
	    };

	    // XPathResult ///////////////////////////////////////////////////////////////

	    XPathResult.prototype = {};
	    XPathResult.prototype.constructor = XPathResult;
	    XPathResult.superclass = Object.prototype;

	    function XPathResult(v, t) {
	        if (t == XPathResult.ANY_TYPE) {
	            if (v.constructor === XString) {
	                t = XPathResult.STRING_TYPE;
	            } else if (v.constructor === XNumber) {
	                t = XPathResult.NUMBER_TYPE;
	            } else if (v.constructor === XBoolean) {
	                t = XPathResult.BOOLEAN_TYPE;
	            } else if (v.constructor === XNodeSet) {
	                t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	            }
	        }
	        this.resultType = t;
	        switch (t) {
	            case XPathResult.NUMBER_TYPE:
	                this.numberValue = v.numberValue();
	                return;
	            case XPathResult.STRING_TYPE:
	                this.stringValue = v.stringValue();
	                return;
	            case XPathResult.BOOLEAN_TYPE:
	                this.booleanValue = v.booleanValue();
	                return;
	            case XPathResult.ANY_UNORDERED_NODE_TYPE:
	            case XPathResult.FIRST_ORDERED_NODE_TYPE:
	                if (v.constructor === XNodeSet) {
	                    this.singleNodeValue = v.first();
	                    return;
	                }
	                break;
	            case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
	            case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
	                if (v.constructor === XNodeSet) {
	                    this.invalidIteratorState = false;
	                    this.nodes = v.toArray();
	                    this.iteratorIndex = 0;
	                    return;
	                }
	                break;
	            case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
	            case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
	                if (v.constructor === XNodeSet) {
	                    this.nodes = v.toArray();
	                    this.snapshotLength = this.nodes.length;
	                    return;
	                }
	                break;
	        }
	        throw new XPathException(XPathException.TYPE_ERR);
	    }
	    XPathResult.prototype.iterateNext = function () {
	        if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE
	            && this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
	            throw new XPathException(XPathException.TYPE_ERR);
	        }
	        return this.nodes[this.iteratorIndex++];
	    };

	    XPathResult.prototype.snapshotItem = function (i) {
	        if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
	            && this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
	            throw new XPathException(XPathException.TYPE_ERR);
	        }
	        return this.nodes[i];
	    };

	    XPathResult.ANY_TYPE = 0;
	    XPathResult.NUMBER_TYPE = 1;
	    XPathResult.STRING_TYPE = 2;
	    XPathResult.BOOLEAN_TYPE = 3;
	    XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
	    XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
	    XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
	    XPathResult.FIRST_ORDERED_NODE_TYPE = 9;

	    // DOM 3 XPath support ///////////////////////////////////////////////////////

	    function installDOM3XPathSupport(doc, p) {
	        doc.createExpression = function (e, r) {
	            try {
	                return new XPathExpression(e, r, p);
	            } catch (e) {
	                throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, e);
	            }
	        };
	        doc.createNSResolver = function (n) {
	            return new NodeXPathNSResolver(n);
	        };
	        doc.evaluate = function (e, cn, r, t, res) {
	            if (t < 0 || t > 9) {
	                throw { code: 0, toString: function () { return "Request type not supported"; } };
	            }
	            return doc.createExpression(e, r, p).evaluate(cn, t, res);
	        };
	    }
	    // ---------------------------------------------------------------------------

	    // Install DOM 3 XPath support for the current document.
	    try {
	        var shouldInstall = true;
	        try {
	            if (document.implementation
	                && document.implementation.hasFeature
	                && document.implementation.hasFeature("XPath", null)) {
	                shouldInstall = false;
	            }
	        } catch (e) {
	        }
	        if (shouldInstall) {
	            installDOM3XPathSupport(document, new XPathParser());
	        }
	    } catch (e) {
	    }

	    // ---------------------------------------------------------------------------
	    // exports for node.js

	    installDOM3XPathSupport(exports, new XPathParser());

	    (function () {
	        var parser = new XPathParser();

	        var defaultNSResolver = new NamespaceResolver();
	        var defaultFunctionResolver = new FunctionResolver();
	        var defaultVariableResolver = new VariableResolver();

	        function makeNSResolverFromFunction(func) {
	            return {
	                getNamespace: function (prefix, node) {
	                    var ns = func(prefix, node);

	                    return ns || defaultNSResolver.getNamespace(prefix, node);
	                }
	            };
	        }

	        function makeNSResolverFromObject(obj) {
	            return makeNSResolverFromFunction(obj.getNamespace.bind(obj));
	        }

	        function makeNSResolverFromMap(map) {
	            return makeNSResolverFromFunction(function (prefix) {
	                return map[prefix];
	            });
	        }

	        function makeNSResolver(resolver) {
	            if (resolver && typeof resolver.getNamespace === "function") {
	                return makeNSResolverFromObject(resolver);
	            }

	            if (typeof resolver === "function") {
	                return makeNSResolverFromFunction(resolver);
	            }

	            // assume prefix -> uri mapping
	            if (typeof resolver === "object") {
	                return makeNSResolverFromMap(resolver);
	            }

	            return defaultNSResolver;
	        }

	        /** Converts native JavaScript types to their XPath library equivalent */
	        function convertValue(value) {
	            if (value === null ||
	                typeof value === "undefined" ||
	                value instanceof XString ||
	                value instanceof XBoolean ||
	                value instanceof XNumber ||
	                value instanceof XNodeSet) {
	                return value;
	            }

	            switch (typeof value) {
	                case "string": return new XString(value);
	                case "boolean": return new XBoolean(value);
	                case "number": return new XNumber(value);
	            }

	            // assume node(s)
	            var ns = new XNodeSet();
	            ns.addArray([].concat(value));
	            return ns;
	        }

	        function makeEvaluator(func) {
	            return function (context) {
	                var args = Array.prototype.slice.call(arguments, 1).map(function (arg) {
	                    return arg.evaluate(context);
	                });
	                var result = func.apply(this, [].concat(context, args));
	                return convertValue(result);
	            };
	        }

	        function makeFunctionResolverFromFunction(func) {
	            return {
	                getFunction: function (name, namespace) {
	                    var found = func(name, namespace);
	                    if (found) {
	                        return makeEvaluator(found);
	                    }
	                    return defaultFunctionResolver.getFunction(name, namespace);
	                }
	            };
	        }

	        function makeFunctionResolverFromObject(obj) {
	            return makeFunctionResolverFromFunction(obj.getFunction.bind(obj));
	        }

	        function makeFunctionResolverFromMap(map) {
	            return makeFunctionResolverFromFunction(function (name) {
	                return map[name];
	            });
	        }

	        function makeFunctionResolver(resolver) {
	            if (resolver && typeof resolver.getFunction === "function") {
	                return makeFunctionResolverFromObject(resolver);
	            }

	            if (typeof resolver === "function") {
	                return makeFunctionResolverFromFunction(resolver);
	            }

	            // assume map
	            if (typeof resolver === "object") {
	                return makeFunctionResolverFromMap(resolver);
	            }

	            return defaultFunctionResolver;
	        }

	        function makeVariableResolverFromFunction(func) {
	            return {
	                getVariable: function (name, namespace) {
	                    var value = func(name, namespace);
	                    return convertValue(value);
	                }
	            };
	        }

	        function makeVariableResolver(resolver) {
	            if (resolver) {
	                if (typeof resolver.getVariable === "function") {
	                    return makeVariableResolverFromFunction(resolver.getVariable.bind(resolver));
	                }

	                if (typeof resolver === "function") {
	                    return makeVariableResolverFromFunction(resolver);
	                }

	                // assume map
	                if (typeof resolver === "object") {
	                    return makeVariableResolverFromFunction(function (name) {
	                        return resolver[name];
	                    });
	                }
	            }

	            return defaultVariableResolver;
	        }

	        function copyIfPresent(prop, dest, source) {
	            if (prop in source) { dest[prop] = source[prop]; }
	        }

	        function makeContext(options) {
	            var context = new XPathContext();

	            if (options) {
	                context.namespaceResolver = makeNSResolver(options.namespaces);
	                context.functionResolver = makeFunctionResolver(options.functions);
	                context.variableResolver = makeVariableResolver(options.variables);
	                context.expressionContextNode = options.node;
	                copyIfPresent('allowAnyNamespaceForNoPrefix', context, options);
	                copyIfPresent('isHtml', context, options);
	            } else {
	                context.namespaceResolver = defaultNSResolver;
	            }

	            return context;
	        }

	        function evaluate(parsedExpression, options) {
	            var context = makeContext(options);

	            return parsedExpression.evaluate(context);
	        }

	        var evaluatorPrototype = {
	            evaluate: function (options) {
	                return evaluate(this.expression, options);
	            }

	            , evaluateNumber: function (options) {
	                return this.evaluate(options).numberValue();
	            }

	            , evaluateString: function (options) {
	                return this.evaluate(options).stringValue();
	            }

	            , evaluateBoolean: function (options) {
	                return this.evaluate(options).booleanValue();
	            }

	            , evaluateNodeSet: function (options) {
	                return this.evaluate(options).nodeset();
	            }

	            , select: function (options) {
	                return this.evaluateNodeSet(options).toArray()
	            }

	            , select1: function (options) {
	                return this.select(options)[0];
	            }
	        };

	        function parse(xpath) {
	            var parsed = parser.parse(xpath);

	            return Object.create(evaluatorPrototype, {
	                expression: {
	                    value: parsed
	                }
	            });
	        }

	        exports.parse = parse;
	    })();

	    assign(
	        exports,
	        {
	            XPath: XPath,
	            XPathParser: XPathParser,
	            XPathResult: XPathResult,

	            Step: Step,
	            PathExpr: PathExpr,
	            NodeTest: NodeTest,
	            LocationPath: LocationPath,

	            OrOperation: OrOperation,
	            AndOperation: AndOperation,

	            BarOperation: BarOperation,

	            EqualsOperation: EqualsOperation,
	            NotEqualOperation: NotEqualOperation,
	            LessThanOperation: LessThanOperation,
	            GreaterThanOperation: GreaterThanOperation,
	            LessThanOrEqualOperation: LessThanOrEqualOperation,
	            GreaterThanOrEqualOperation: GreaterThanOrEqualOperation,

	            PlusOperation: PlusOperation,
	            MinusOperation: MinusOperation,
	            MultiplyOperation: MultiplyOperation,
	            DivOperation: DivOperation,
	            ModOperation: ModOperation,
	            UnaryMinusOperation: UnaryMinusOperation,

	            FunctionCall: FunctionCall,
	            VariableReference: VariableReference,

	            XPathContext: XPathContext,

	            XNodeSet: XNodeSet,
	            XBoolean: XBoolean,
	            XString: XString,
	            XNumber: XNumber,

	            NamespaceResolver: NamespaceResolver,
	            FunctionResolver: FunctionResolver,
	            VariableResolver: VariableResolver,

	            Utilities: Utilities,
	        }
	    );

	    // helper
	    exports.select = function (e, doc, single) {
	        return exports.selectWithResolver(e, doc, null, single);
	    };

	    exports.useNamespaces = function (mappings) {
	        var resolver = {
	            mappings: mappings || {},
	            lookupNamespaceURI: function (prefix) {
	                return this.mappings[prefix];
	            }
	        };

	        return function (e, doc, single) {
	            return exports.selectWithResolver(e, doc, resolver, single);
	        };
	    };

	    exports.selectWithResolver = function (e, doc, resolver, single) {
	        var expression = new XPathExpression(e, resolver, new XPathParser());
	        var type = XPathResult.ANY_TYPE;

	        var result = expression.evaluate(doc, type, null);

	        if (result.resultType == XPathResult.STRING_TYPE) {
	            result = result.stringValue;
	        }
	        else if (result.resultType == XPathResult.NUMBER_TYPE) {
	            result = result.numberValue;
	        }
	        else if (result.resultType == XPathResult.BOOLEAN_TYPE) {
	            result = result.booleanValue;
	        }
	        else {
	            result = result.nodes;
	            if (single) {
	                result = result[0];
	            }
	        }

	        return result;
	    };

	    exports.select1 = function (e, doc) {
	        return exports.select(e, doc, true);
	    };

	    var isArrayOfNodes = function (value) {
	        return Array.isArray(value) && value.every(isNodeLike);
	    };

	    var isNodeOfType = function (type) {
	        return function (value) {
	            return isNodeLike(value) && value.nodeType === type;
	        };
	    };

	    assign(
	        exports,
	        {
	            isNodeLike: isNodeLike,
	            isArrayOfNodes: isArrayOfNodes,
	            isElement: isNodeOfType(NodeTypes.ELEMENT_NODE),
	            isAttribute: isNodeOfType(NodeTypes.ATTRIBUTE_NODE),
	            isTextNode: isNodeOfType(NodeTypes.TEXT_NODE),
	            isCDATASection: isNodeOfType(NodeTypes.CDATA_SECTION_NODE),
	            isProcessingInstruction: isNodeOfType(NodeTypes.PROCESSING_INSTRUCTION_NODE),
	            isComment: isNodeOfType(NodeTypes.COMMENT_NODE),
	            isDocumentNode: isNodeOfType(NodeTypes.DOCUMENT_NODE),
	            isDocumentTypeNode: isNodeOfType(NodeTypes.DOCUMENT_TYPE_NODE),
	            isDocumentFragment: isNodeOfType(NodeTypes.DOCUMENT_FRAGMENT_NODE),
	        }
	    );
	    // end non-node wrapper
	})(xpath); 
} (xpath));

var lib = {};

var conventions$5 = {};

/**
 * Ponyfill for `Array.prototype.find` which is only available in ES6 runtimes.
 *
 * Works with anything that has a `length` property and index access properties,
 * including NodeList.
 *
 * @param {T[] | { length: number; [number]: T }} list
 * @param {function (item: T, index: number, list:T[]):boolean} predicate
 * @param {Partial<Pick<ArrayConstructor['prototype'], 'find'>>?} ac
 * Allows injecting a custom implementation in tests (`Array.prototype` by default).
 * @returns {T | undefined}
 * @template {unknown} T
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @see https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.find
 */
function find$1(list, predicate, ac) {
	if (ac === undefined) {
		ac = Array.prototype;
	}
	if (list && typeof ac.find === 'function') {
		return ac.find.call(list, predicate);
	}
	for (var i = 0; i < list.length; i++) {
		if (hasOwn$2(list, i)) {
			var item = list[i];
			if (predicate.call(undefined, item, i, list)) {
				return item;
			}
		}
	}
}

/**
 * "Shallow freezes" an object to render it immutable.
 * Uses `Object.freeze` if available,
 * otherwise the immutability is only in the type.
 *
 * Is used to create "enum like" objects.
 *
 * If `Object.getOwnPropertyDescriptors` is available,
 * a new object with all properties of object but without any prototype is created and returned
 * after freezing it.
 *
 * @param {T} object
 * The object to freeze.
 * @param {Pick<ObjectConstructor, 'create' | 'freeze' | 'getOwnPropertyDescriptors'>} [oc=Object]
 * `Object` by default,
 * allows to inject custom object constructor for tests.
 * @returns {Readonly<T>}
 * @template {Object} T
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * @prettierignore
 */
function freeze(object, oc) {
	if (oc === undefined) {
		oc = Object;
	}
	if (oc && typeof oc.getOwnPropertyDescriptors === 'function') {
		object = oc.create(null, oc.getOwnPropertyDescriptors(object));
	}
	return oc && typeof oc.freeze === 'function' ? oc.freeze(object) : object;
}

/**
 * Implementation for `Object.hasOwn` but ES5 compatible.
 *
 * @param {any} object
 * @param {string | number} key
 * @returns {boolean}
 */
function hasOwn$2(object, key) {
	return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * Since xmldom can not rely on `Object.assign`,
 * it uses/provides a simplified version that is sufficient for its needs.
 *
 * @param {Object} target
 * @param {Object | null | undefined} source
 * @returns {Object}
 * The target with the merged/overridden properties.
 * @throws {TypeError}
 * If target is not an object.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @see https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign
 */
function assign(target, source) {
	if (target === null || typeof target !== 'object') {
		throw new TypeError('target is not an object');
	}
	for (var key in source) {
		if (hasOwn$2(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
}

/**
 * A number of attributes are boolean attributes.
 * The presence of a boolean attribute on an element represents the `true` value,
 * and the absence of the attribute represents the `false` value.
 *
 * If the attribute is present, its value must either be the empty string, or a value that is
 * an ASCII case-insensitive match for the attribute's canonical name,
 * with no leading or trailing whitespace.
 *
 * Note: The values `"true"` and `"false"` are not allowed on boolean attributes.
 * To represent a `false` value, the attribute has to be omitted altogether.
 *
 * @see https://html.spec.whatwg.org/#boolean-attributes
 * @see https://html.spec.whatwg.org/#attributes-3
 */
var HTML_BOOLEAN_ATTRIBUTES = freeze({
	allowfullscreen: true,
	async: true,
	autofocus: true,
	autoplay: true,
	checked: true,
	controls: true,
	default: true,
	defer: true,
	disabled: true,
	formnovalidate: true,
	hidden: true,
	ismap: true,
	itemscope: true,
	loop: true,
	multiple: true,
	muted: true,
	nomodule: true,
	novalidate: true,
	open: true,
	playsinline: true,
	readonly: true,
	required: true,
	reversed: true,
	selected: true,
});

/**
 * Check if `name` is matching one of the HTML boolean attribute names.
 * This method doesn't check if such attributes are allowed in the context of the current
 * document/parsing.
 *
 * @param {string} name
 * @returns {boolean}
 * @see {@link HTML_BOOLEAN_ATTRIBUTES}
 * @see https://html.spec.whatwg.org/#boolean-attributes
 * @see https://html.spec.whatwg.org/#attributes-3
 */
function isHTMLBooleanAttribute(name) {
	return hasOwn$2(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
}

/**
 * Void elements only have a start tag; end tags must not be specified for void elements.
 * These elements should be written as self-closing like this: `<area />`.
 * This should not be confused with optional tags that HTML allows to omit the end tag for
 * (like `li`, `tr` and others), which can have content after them,
 * so they can not be written as self-closing.
 * xmldom does not have any logic for optional end tags cases,
 * and will report them as a warning.
 * Content that would go into the unopened element,
 * will instead be added as a sibling text node.
 *
 * @type {Readonly<{
 * 	area: boolean;
 * 	col: boolean;
 * 	img: boolean;
 * 	wbr: boolean;
 * 	link: boolean;
 * 	hr: boolean;
 * 	source: boolean;
 * 	br: boolean;
 * 	input: boolean;
 * 	param: boolean;
 * 	meta: boolean;
 * 	embed: boolean;
 * 	track: boolean;
 * 	base: boolean;
 * }>}
 * @see https://html.spec.whatwg.org/#void-elements
 * @see https://html.spec.whatwg.org/#optional-tags
 */
var HTML_VOID_ELEMENTS = freeze({
	area: true,
	base: true,
	br: true,
	col: true,
	embed: true,
	hr: true,
	img: true,
	input: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true,
});

/**
 * Check if `tagName` is matching one of the HTML void element names.
 * This method doesn't check if such tags are allowed in the context of the current
 * document/parsing.
 *
 * @param {string} tagName
 * @returns {boolean}
 * @see {@link HTML_VOID_ELEMENTS}
 * @see https://html.spec.whatwg.org/#void-elements
 */
function isHTMLVoidElement$1(tagName) {
	return hasOwn$2(HTML_VOID_ELEMENTS, tagName.toLowerCase());
}

/**
 * Tag names that are raw text elements according to HTML spec.
 * The value denotes whether they are escapable or not.
 *
 * @see {@link isHTMLEscapableRawTextElement}
 * @see {@link isHTMLRawTextElement}
 * @see https://html.spec.whatwg.org/#raw-text-elements
 * @see https://html.spec.whatwg.org/#escapable-raw-text-elements
 */
var HTML_RAW_TEXT_ELEMENTS = freeze({
	script: false,
	style: false,
	textarea: true,
	title: true,
});

/**
 * Check if `tagName` is matching one of the HTML raw text element names.
 * This method doesn't check if such tags are allowed in the context of the current
 * document/parsing.
 *
 * @param {string} tagName
 * @returns {boolean}
 * @see {@link isHTMLEscapableRawTextElement}
 * @see {@link HTML_RAW_TEXT_ELEMENTS}
 * @see https://html.spec.whatwg.org/#raw-text-elements
 * @see https://html.spec.whatwg.org/#escapable-raw-text-elements
 */
function isHTMLRawTextElement$2(tagName) {
	var key = tagName.toLowerCase();
	return hasOwn$2(HTML_RAW_TEXT_ELEMENTS, key) && !HTML_RAW_TEXT_ELEMENTS[key];
}
/**
 * Check if `tagName` is matching one of the HTML escapable raw text element names.
 * This method doesn't check if such tags are allowed in the context of the current
 * document/parsing.
 *
 * @param {string} tagName
 * @returns {boolean}
 * @see {@link isHTMLRawTextElement}
 * @see {@link HTML_RAW_TEXT_ELEMENTS}
 * @see https://html.spec.whatwg.org/#raw-text-elements
 * @see https://html.spec.whatwg.org/#escapable-raw-text-elements
 */
function isHTMLEscapableRawTextElement$1(tagName) {
	var key = tagName.toLowerCase();
	return hasOwn$2(HTML_RAW_TEXT_ELEMENTS, key) && HTML_RAW_TEXT_ELEMENTS[key];
}
/**
 * Only returns true if `value` matches MIME_TYPE.HTML, which indicates an HTML document.
 *
 * @param {string} mimeType
 * @returns {mimeType is 'text/html'}
 * @see https://www.iana.org/assignments/media-types/text/html
 * @see https://en.wikipedia.org/wiki/HTML
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
 */
function isHTMLMimeType$3(mimeType) {
	return mimeType === MIME_TYPE$2.HTML;
}
/**
 * For both the `text/html` and the `application/xhtml+xml` namespace the spec defines that the
 * HTML namespace is provided as the default.
 *
 * @param {string} mimeType
 * @returns {boolean}
 * @see https://dom.spec.whatwg.org/#dom-document-createelement
 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument
 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
 */
function hasDefaultHTMLNamespace$2(mimeType) {
	return isHTMLMimeType$3(mimeType) || mimeType === MIME_TYPE$2.XML_XHTML_APPLICATION;
}

/**
 * All mime types that are allowed as input to `DOMParser.parseFromString`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#Argument02
 *      MDN
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#domparsersupportedtype
 *      WHATWG HTML Spec
 * @see {@link DOMParser.prototype.parseFromString}
 */
var MIME_TYPE$2 = freeze({
	/**
	 * `text/html`, the only mime type that triggers treating an XML document as HTML.
	 *
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
	 *      WHATWG HTML Spec
	 */
	HTML: 'text/html',

	/**
	 * `application/xml`, the standard mime type for XML documents.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
	 *      registration
	 * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_APPLICATION: 'application/xml',

	/**
	 * `text/xml`, an alias for `application/xml`.
	 *
	 * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
	 * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_TEXT: 'text/xml',

	/**
	 * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
	 * but is parsed as an XML document.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
	 *      registration
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
	 * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
	 */
	XML_XHTML_APPLICATION: 'application/xhtml+xml',

	/**
	 * `image/svg+xml`,
	 *
	 * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
	 * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
	 * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
	 */
	XML_SVG_IMAGE: 'image/svg+xml',
});
/**
 * @typedef {'application/xhtml+xml' | 'application/xml' | 'image/svg+xml' | 'text/html' | 'text/xml'}
 * MimeType
 */
/**
 * @type {MimeType[]}
 * @private
 * Basically `Object.values`, which is not available in ES5.
 */
var _MIME_TYPES = Object.keys(MIME_TYPE$2).map(function (key) {
	return MIME_TYPE$2[key];
});

/**
 * Only returns true if `mimeType` is one of the allowed values for
 * `DOMParser.parseFromString`.
 *
 * @param {string} mimeType
 * @returns {mimeType is 'application/xhtml+xml' | 'application/xml' | 'image/svg+xml' |  'text/html' | 'text/xml'}
 *
 */
function isValidMimeType$1(mimeType) {
	return _MIME_TYPES.indexOf(mimeType) > -1;
}
/**
 * Namespaces that are used in this code base.
 *
 * @see http://www.w3.org/TR/REC-xml-names
 */
var NAMESPACE$3 = freeze({
	/**
	 * The XHTML namespace.
	 *
	 * @see http://www.w3.org/1999/xhtml
	 */
	HTML: 'http://www.w3.org/1999/xhtml',

	/**
	 * The SVG namespace.
	 *
	 * @see http://www.w3.org/2000/svg
	 */
	SVG: 'http://www.w3.org/2000/svg',

	/**
	 * The `xml:` namespace.
	 *
	 * @see http://www.w3.org/XML/1998/namespace
	 */
	XML: 'http://www.w3.org/XML/1998/namespace',

	/**
	 * The `xmlns:` namespace.
	 *
	 * @see https://www.w3.org/2000/xmlns/
	 */
	XMLNS: 'http://www.w3.org/2000/xmlns/',
});

conventions$5.assign = assign;
conventions$5.find = find$1;
conventions$5.freeze = freeze;
conventions$5.HTML_BOOLEAN_ATTRIBUTES = HTML_BOOLEAN_ATTRIBUTES;
conventions$5.HTML_RAW_TEXT_ELEMENTS = HTML_RAW_TEXT_ELEMENTS;
conventions$5.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
conventions$5.hasDefaultHTMLNamespace = hasDefaultHTMLNamespace$2;
conventions$5.hasOwn = hasOwn$2;
conventions$5.isHTMLBooleanAttribute = isHTMLBooleanAttribute;
conventions$5.isHTMLRawTextElement = isHTMLRawTextElement$2;
conventions$5.isHTMLEscapableRawTextElement = isHTMLEscapableRawTextElement$1;
conventions$5.isHTMLMimeType = isHTMLMimeType$3;
conventions$5.isHTMLVoidElement = isHTMLVoidElement$1;
conventions$5.isValidMimeType = isValidMimeType$1;
conventions$5.MIME_TYPE = MIME_TYPE$2;
conventions$5.NAMESPACE = NAMESPACE$3;

var errors$4 = {};

var conventions$4 = conventions$5;

function extendError(constructor, writableName) {
	constructor.prototype = Object.create(Error.prototype, {
		constructor: { value: constructor },
		name: { value: constructor.name, enumerable: true, writable: writableName },
	});
}

var DOMExceptionName$1 = conventions$4.freeze({
	/**
	 * the default value as defined by the spec
	 */
	Error: 'Error',
	/**
	 * @deprecated
	 * Use RangeError instead.
	 */
	IndexSizeError: 'IndexSizeError',
	/**
	 * @deprecated
	 * Just to match the related static code, not part of the spec.
	 */
	DomstringSizeError: 'DomstringSizeError',
	HierarchyRequestError: 'HierarchyRequestError',
	WrongDocumentError: 'WrongDocumentError',
	InvalidCharacterError: 'InvalidCharacterError',
	/**
	 * @deprecated
	 * Just to match the related static code, not part of the spec.
	 */
	NoDataAllowedError: 'NoDataAllowedError',
	NoModificationAllowedError: 'NoModificationAllowedError',
	NotFoundError: 'NotFoundError',
	NotSupportedError: 'NotSupportedError',
	InUseAttributeError: 'InUseAttributeError',
	InvalidStateError: 'InvalidStateError',
	SyntaxError: 'SyntaxError',
	InvalidModificationError: 'InvalidModificationError',
	NamespaceError: 'NamespaceError',
	/**
	 * @deprecated
	 * Use TypeError for invalid arguments,
	 * "NotSupportedError" DOMException for unsupported operations,
	 * and "NotAllowedError" DOMException for denied requests instead.
	 */
	InvalidAccessError: 'InvalidAccessError',
	/**
	 * @deprecated
	 * Just to match the related static code, not part of the spec.
	 */
	ValidationError: 'ValidationError',
	/**
	 * @deprecated
	 * Use TypeError instead.
	 */
	TypeMismatchError: 'TypeMismatchError',
	SecurityError: 'SecurityError',
	NetworkError: 'NetworkError',
	AbortError: 'AbortError',
	/**
	 * @deprecated
	 * Just to match the related static code, not part of the spec.
	 */
	URLMismatchError: 'URLMismatchError',
	QuotaExceededError: 'QuotaExceededError',
	TimeoutError: 'TimeoutError',
	InvalidNodeTypeError: 'InvalidNodeTypeError',
	DataCloneError: 'DataCloneError',
	EncodingError: 'EncodingError',
	NotReadableError: 'NotReadableError',
	UnknownError: 'UnknownError',
	ConstraintError: 'ConstraintError',
	DataError: 'DataError',
	TransactionInactiveError: 'TransactionInactiveError',
	ReadOnlyError: 'ReadOnlyError',
	VersionError: 'VersionError',
	OperationError: 'OperationError',
	NotAllowedError: 'NotAllowedError',
	OptOutError: 'OptOutError',
});
var DOMExceptionNames = Object.keys(DOMExceptionName$1);

function isValidDomExceptionCode(value) {
	return typeof value === 'number' && value >= 1 && value <= 25;
}
function endsWithError(value) {
	return typeof value === 'string' && value.substring(value.length - DOMExceptionName$1.Error.length) === DOMExceptionName$1.Error;
}
/**
 * DOM operations only raise exceptions in "exceptional" circumstances, i.e., when an operation
 * is impossible to perform (either for logical reasons, because data is lost, or because the
 * implementation has become unstable). In general, DOM methods return specific error values in
 * ordinary processing situations, such as out-of-bound errors when using NodeList.
 *
 * Implementations should raise other exceptions under other circumstances. For example,
 * implementations should raise an implementation-dependent exception if a null argument is
 * passed when null was not expected.
 *
 * This implementation supports the following usages:
 * 1. according to the living standard (both arguments are optional):
 * ```
 * new DOMException("message (can be empty)", DOMExceptionNames.HierarchyRequestError)
 * ```
 * 2. according to previous xmldom implementation (only the first argument is required):
 * ```
 * new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "optional message")
 * ```
 * both result in the proper name being set.
 *
 * @class DOMException
 * @param {number | string} messageOrCode
 * The reason why an operation is not acceptable.
 * If it is a number, it is used to determine the `name`, see
 * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-258A00AF ExceptionCode}
 * @param {string | keyof typeof DOMExceptionName | Error} [nameOrMessage]
 * The `name` to use for the error.
 * If `messageOrCode` is a number, this arguments is used as the `message` instead.
 * @augments Error
 * @see https://webidl.spec.whatwg.org/#idl-DOMException
 * @see https://webidl.spec.whatwg.org/#dfn-error-names-table
 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-17189187
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 */
function DOMException$2(messageOrCode, nameOrMessage) {
	// support old way of passing arguments: first argument is a valid number
	if (isValidDomExceptionCode(messageOrCode)) {
		this.name = DOMExceptionNames[messageOrCode];
		this.message = nameOrMessage || '';
	} else {
		this.message = messageOrCode;
		this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName$1.Error;
	}
	if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException$2);
}
extendError(DOMException$2, true);
Object.defineProperties(DOMException$2.prototype, {
	code: {
		enumerable: true,
		get: function () {
			var code = DOMExceptionNames.indexOf(this.name);
			if (isValidDomExceptionCode(code)) return code;
			return 0;
		},
	},
});

var ExceptionCode = {
	INDEX_SIZE_ERR: 1,
	DOMSTRING_SIZE_ERR: 2,
	HIERARCHY_REQUEST_ERR: 3,
	WRONG_DOCUMENT_ERR: 4,
	INVALID_CHARACTER_ERR: 5,
	NO_DATA_ALLOWED_ERR: 6,
	NO_MODIFICATION_ALLOWED_ERR: 7,
	NOT_FOUND_ERR: 8,
	NOT_SUPPORTED_ERR: 9,
	INUSE_ATTRIBUTE_ERR: 10,
	INVALID_STATE_ERR: 11,
	SYNTAX_ERR: 12,
	INVALID_MODIFICATION_ERR: 13,
	NAMESPACE_ERR: 14,
	INVALID_ACCESS_ERR: 15,
	VALIDATION_ERR: 16,
	TYPE_MISMATCH_ERR: 17,
	SECURITY_ERR: 18,
	NETWORK_ERR: 19,
	ABORT_ERR: 20,
	URL_MISMATCH_ERR: 21,
	QUOTA_EXCEEDED_ERR: 22,
	TIMEOUT_ERR: 23,
	INVALID_NODE_TYPE_ERR: 24,
	DATA_CLONE_ERR: 25,
};

var entries = Object.entries(ExceptionCode);
for (var i = 0; i < entries.length; i++) {
	var key = entries[i][0];
	DOMException$2[key] = entries[i][1];
}

/**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @class
 * @param {string} message
 * @param {any} [locator]
 */
function ParseError$2(message, locator) {
	this.message = message;
	this.locator = locator;
	if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError$2);
}
extendError(ParseError$2);

errors$4.DOMException = DOMException$2;
errors$4.DOMExceptionName = DOMExceptionName$1;
errors$4.ExceptionCode = ExceptionCode;
errors$4.ParseError = ParseError$2;

var dom$2 = {};

var grammar = {};

/**
 * Detects relevant unicode support for regular expressions in the runtime.
 * Should the runtime not accepts the flag `u` or unicode ranges,
 * character classes without unicode handling will be used.
 *
 * @param {typeof RegExp} [RegExpImpl=RegExp]
 * For testing: the RegExp class.
 * @returns {boolean}
 * @see https://node.green/#ES2015-syntax-RegExp--y--and--u--flags
 */
function detectUnicodeSupport(RegExpImpl) {
	try {
		if (typeof RegExpImpl !== 'function') {
			RegExpImpl = RegExp;
		}
		// eslint-disable-next-line es5/no-unicode-regex,es5/no-unicode-code-point-escape
		var match = new RegExpImpl('\u{1d306}', 'u').exec('𝌆');
		return !!match && match[0].length === 2;
	} catch (error) {}
	return false;
}
var UNICODE_SUPPORT = detectUnicodeSupport();

/**
 * Removes `[`, `]` and any trailing quantifiers from the source of a RegExp.
 *
 * @param {RegExp} regexp
 */
function chars(regexp) {
	if (regexp.source[0] !== '[') {
		throw new Error(regexp + ' can not be used with chars');
	}
	return regexp.source.slice(1, regexp.source.lastIndexOf(']'));
}

/**
 * Creates a new character list regular expression,
 * by removing `search` from the source of `regexp`.
 *
 * @param {RegExp} regexp
 * @param {string} search
 * The character(s) to remove.
 * @returns {RegExp}
 */
function chars_without(regexp, search) {
	if (regexp.source[0] !== '[') {
		throw new Error('/' + regexp.source + '/ can not be used with chars_without');
	}
	if (!search || typeof search !== 'string') {
		throw new Error(JSON.stringify(search) + ' is not a valid search');
	}
	if (regexp.source.indexOf(search) === -1) {
		throw new Error('"' + search + '" is not is /' + regexp.source + '/');
	}
	if (search === '-' && regexp.source.indexOf(search) !== 1) {
		throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + '/');
	}
	return new RegExp(regexp.source.replace(search, ''), UNICODE_SUPPORT ? 'u' : '');
}

/**
 * Combines and Regular expressions correctly by using `RegExp.source`.
 *
 * @param {...(RegExp | string)[]} args
 * @returns {RegExp}
 */
function reg(args) {
	var self = this;
	return new RegExp(
		Array.prototype.slice
			.call(arguments)
			.map(function (part) {
				var isStr = typeof part === 'string';
				if (isStr && self === undefined && part === '|') {
					throw new Error('use regg instead of reg to wrap expressions with `|`!');
				}
				return isStr ? part : part.source;
			})
			.join(''),
		UNICODE_SUPPORT ? 'mu' : 'm'
	);
}

/**
 * Like `reg` but wraps the expression in `(?:`,`)` to create a non tracking group.
 *
 * @param {...(RegExp | string)[]} args
 * @returns {RegExp}
 */
function regg(args) {
	if (arguments.length === 0) {
		throw new Error('no parameters provided');
	}
	return reg.apply(regg, ['(?:'].concat(Array.prototype.slice.call(arguments), [')']));
}

// /**
//  * Append ^ to the beginning of the expression.
//  * @param {...(RegExp | string)[]} args
//  * @returns {RegExp}
//  */
// function reg_start(args) {
// 	if (arguments.length === 0) {
// 		throw new Error('no parameters provided');
// 	}
// 	return reg.apply(reg_start, ['^'].concat(Array.prototype.slice.call(arguments)));
// }

// https://www.w3.org/TR/xml/#document
// `[1] document ::= prolog element Misc*`
// https://www.w3.org/TR/xml11/#NT-document
// `[1] document ::= ( prolog element Misc* ) - ( Char* RestrictedChar Char* )`

/**
 * A character usually appearing in wrongly converted strings.
 *
 * @type {string}
 * @see https://en.wikipedia.org/wiki/Specials_(Unicode_block)#Replacement_character
 * @see https://nodejs.dev/en/api/v18/buffer/#buffers-and-character-encodings
 * @see https://www.unicode.org/faq/utf_bom.html#BOM
 * @readonly
 */
var UNICODE_REPLACEMENT_CHARACTER = '\uFFFD';
// https://www.w3.org/TR/xml/#NT-Char
// any Unicode character, excluding the surrogate blocks, FFFE, and FFFF.
// `[2] Char ::= #x9 | #xA | #xD | [#x20-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]`
// https://www.w3.org/TR/xml11/#NT-Char
// `[2] Char ::= [#x1-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]`
// https://www.w3.org/TR/xml11/#NT-RestrictedChar
// `[2a] RestrictedChar ::= [#x1-#x8] | [#xB-#xC] | [#xE-#x1F] | [#x7F-#x84] | [#x86-#x9F]`
// https://www.w3.org/TR/xml11/#charsets
var Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/; // without \u10000-\uEFFFF
if (UNICODE_SUPPORT) {
	// eslint-disable-next-line es5/no-unicode-code-point-escape
	Char = reg('[', chars(Char), '\\u{10000}-\\u{10FFFF}', ']');
}

var _SChar = /[\x20\x09\x0D\x0A]/;
var SChar_s = chars(_SChar);
// https://www.w3.org/TR/xml11/#NT-S
// `[3] S ::= (#x20 | #x9 | #xD | #xA)+`
var S = reg(_SChar, '+');
// optional whitespace described as `S?` in the grammar,
// simplified to 0-n occurrences of the character class
// instead of 0-1 occurrences of a non-capturing group around S
var S_OPT = reg(_SChar, '*');

// https://www.w3.org/TR/xml11/#NT-NameStartChar
// `[4] NameStartChar ::= ":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]`
var NameStartChar =
	/[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; // without \u10000-\uEFFFF
if (UNICODE_SUPPORT) {
	// eslint-disable-next-line es5/no-unicode-code-point-escape
	NameStartChar = reg('[', chars(NameStartChar), '\\u{10000}-\\u{10FFFF}', ']');
}
var NameStartChar_s = chars(NameStartChar);

// https://www.w3.org/TR/xml11/#NT-NameChar
// `[4a] NameChar ::= NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]`
var NameChar = reg('[', NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), ']');
// https://www.w3.org/TR/xml11/#NT-Name
// `[5] Name ::= NameStartChar (NameChar)*`
var Name = reg(NameStartChar, NameChar, '*');
/*
https://www.w3.org/TR/xml11/#NT-Names
`[6] Names ::= Name (#x20 Name)*`
*/

// https://www.w3.org/TR/xml11/#NT-Nmtoken
// `[7] Nmtoken ::= (NameChar)+`
var Nmtoken = reg(NameChar, '+');
/*
https://www.w3.org/TR/xml11/#NT-Nmtokens
`[8] Nmtokens ::= Nmtoken (#x20 Nmtoken)*`
var Nmtokens = reg(Nmtoken, regg(/\x20/, Nmtoken), '*');
*/

// https://www.w3.org/TR/xml11/#NT-EntityRef
// `[68] EntityRef ::= '&' Name ';'` [WFC: Entity Declared] [VC: Entity Declared] [WFC: Parsed Entity] [WFC: No Recursion]
var EntityRef = reg('&', Name, ';');
// https://www.w3.org/TR/xml11/#NT-CharRef
// `[66] CharRef ::= '&#' [0-9]+ ';' | '&#x' [0-9a-fA-F]+ ';'` [WFC: Legal Character]
var CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/);

/*
https://www.w3.org/TR/xml11/#NT-Reference
- `[67] Reference ::= EntityRef | CharRef`
- `[66] CharRef ::= '&#' [0-9]+ ';' | '&#x' [0-9a-fA-F]+ ';'` [WFC: Legal Character]
- `[68] EntityRef ::= '&' Name ';'` [WFC: Entity Declared] [VC: Entity Declared] [WFC: Parsed Entity] [WFC: No Recursion]
*/
var Reference = regg(EntityRef, '|', CharRef);

// https://www.w3.org/TR/xml11/#NT-PEReference
// `[69] PEReference ::= '%' Name ';'`
// [VC: Entity Declared] [WFC: No Recursion] [WFC: In DTD]
var PEReference = reg('%', Name, ';');

// https://www.w3.org/TR/xml11/#NT-EntityValue
// `[9] EntityValue ::= '"' ([^%&"] | PEReference | Reference)* '"' | "'" ([^%&'] | PEReference | Reference)* "'"`
var EntityValue = regg(
	reg('"', regg(/[^%&"]/, '|', PEReference, '|', Reference), '*', '"'),
	'|',
	reg("'", regg(/[^%&']/, '|', PEReference, '|', Reference), '*', "'")
);

// https://www.w3.org/TR/xml11/#NT-AttValue
// `[10] AttValue ::= '"' ([^<&"] | Reference)* '"' | "'" ([^<&'] | Reference)* "'"`
var AttValue = regg('"', regg(/[^<&"]/, '|', Reference), '*', '"', '|', "'", regg(/[^<&']/, '|', Reference), '*', "'");

// https://www.w3.org/TR/xml-names/#ns-decl
// https://www.w3.org/TR/xml-names/#ns-qualnames
// NameStartChar without ":"
var NCNameStartChar = chars_without(NameStartChar, ':');
// https://www.w3.org/TR/xml-names/#orphans
// `[5] NCNameChar ::= NameChar - ':'`
// An XML NameChar, minus the ":"
var NCNameChar = chars_without(NameChar, ':');
// https://www.w3.org/TR/xml-names/#NT-NCName
// `[4] NCName ::= Name - (Char* ':' Char*)`
// An XML Name, minus the ":"
var NCName = reg(NCNameStartChar, NCNameChar, '*');

/**
https://www.w3.org/TR/xml-names/#ns-qualnames

```
[7] QName ::= PrefixedName | UnprefixedName
				  === (NCName ':' NCName) | NCName
				  === NCName (':' NCName)?
[8] PrefixedName ::= Prefix ':' LocalPart
								 === NCName ':' NCName
[9] UnprefixedName ::= LocalPart
									 === NCName
[10] Prefix ::= NCName
[11] LocalPart ::= NCName
```
*/
var QName = reg(NCName, regg(':', NCName), '?');
var QName_exact = reg('^', QName, '$');
var QName_group = reg('(', QName, ')');

// https://www.w3.org/TR/xml11/#NT-SystemLiteral
// `[11] SystemLiteral ::= ('"' [^"]* '"') | ("'" [^']* "'")`
var SystemLiteral = regg(/"[^"]*"|'[^']*'/);

/*
 https://www.w3.org/TR/xml11/#NT-PI
 ```
 [17] PITarget    ::= Name - (('X' | 'x') ('M' | 'm') ('L' | 'l'))
 [16] PI    ::= '<?' PITarget (S (Char* - (Char* '?>' Char*)))? '?>'
 ```
 target /xml/i is not excluded!
*/
var PI = reg(/^<\?/, '(', Name, ')', regg(S, '(', Char, '*?)'), '?', /\?>/);

// https://www.w3.org/TR/xml11/#NT-PubidChar
// `[13] PubidChar ::= #x20 | #xD | #xA | [a-zA-Z0-9] | [-'()+,./:=?;!*#@$_%]`
var PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/;

// https://www.w3.org/TR/xml11/#NT-PubidLiteral
// `[12] PubidLiteral ::= '"' PubidChar* '"' | "'" (PubidChar - "'")* "'"`
var PubidLiteral = regg('"', PubidChar, '*"', '|', "'", chars_without(PubidChar, "'"), "*'");

// https://www.w3.org/TR/xml11/#NT-CharData
// `[14] CharData    ::= [^<&]* - ([^<&]* ']]>' [^<&]*)`

var COMMENT_START = '<!--';
var COMMENT_END = '-->';
// https://www.w3.org/TR/xml11/#NT-Comment
// `[15] Comment ::= '<!--' ((Char - '-') | ('-' (Char - '-')))* '-->'`
var Comment$1 = reg(COMMENT_START, regg(chars_without(Char, '-'), '|', reg('-', chars_without(Char, '-'))), '*', COMMENT_END);

var PCDATA = '#PCDATA';
// https://www.w3.org/TR/xml11/#NT-Mixed
// `[51] Mixed ::= '(' S? '#PCDATA' (S? '|' S? Name)* S? ')*' | '(' S? '#PCDATA' S? ')'`
// https://www.w3.org/TR/xml-names/#NT-Mixed
// `[51] Mixed ::= '(' S? '#PCDATA' (S? '|' S? QName)* S? ')*' | '(' S? '#PCDATA' S? ')'`
// [VC: Proper Group/PE Nesting] [VC: No Duplicate Types]
var Mixed = regg(
	reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), '*', S_OPT, /\)\*/),
	'|',
	reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/)
);

var _children_quantity = /[?*+]?/;
/*
 `[49] choice ::= '(' S? cp ( S? '|' S? cp )+ S? ')'` [VC: Proper Group/PE Nesting]
 `[50] seq ::= '(' S? cp ( S? ',' S? cp )* S? ')'` [VC: Proper Group/PE Nesting]
 simplification to solve circular referencing, but doesn't check validity constraint "Proper Group/PE Nesting"
 var _choice_or_seq = reg('[', NameChar_s, SChar_s, chars(_children_quantity), '()|,]*');
 ```
 [48] cp ::= (Name | choice | seq) ('?' | '*' | '+')?
         === (Name | '(' S? cp ( S? '|' S? cp )+ S? ')' | '(' S? cp ( S? ',' S? cp )* S? ')') ('?' | '*' | '+')?
         !== (Name | [_choice_or_seq]*) ('?' | '*' | '+')?
 ```
 simplification to solve circular referencing, but doesn't check validity constraint "Proper Group/PE Nesting"
 var cp = reg(regg(Name, '|', _choice_or_seq), _children_quantity);
*/
/*
Inefficient regular expression (High)
This part of the regular expression may cause exponential backtracking on strings starting with '(|' and containing many repetitions of '|'.
https://github.com/xmldom/xmldom/security/code-scanning/91
var choice = regg(/\(/, S_OPT, cp, regg(S_OPT, /\|/, S_OPT, cp), '+', S_OPT, /\)/);
*/
/*
Inefficient regular expression (High)
This part of the regular expression may cause exponential backtracking on strings starting with '(,' and containing many repetitions of ','.
https://github.com/xmldom/xmldom/security/code-scanning/92
var seq = regg(/\(/, S_OPT, cp, regg(S_OPT, /,/, S_OPT, cp), '*', S_OPT, /\)/);
*/

// `[47] children ::= (choice | seq) ('?' | '*' | '+')?`
// simplification to solve circular referencing, but doesn't check validity constraint "Proper Group/PE Nesting"
var children = reg(/\([^>]+\)/, _children_quantity /*regg(choice, '|', seq), _children_quantity*/);

// https://www.w3.org/TR/xml11/#NT-contentspec
// `[46] contentspec ::= 'EMPTY' | 'ANY' | Mixed | children`
var contentspec = regg('EMPTY', '|', 'ANY', '|', Mixed, '|', children);

var ELEMENTDECL_START = '<!ELEMENT';
// https://www.w3.org/TR/xml11/#NT-elementdecl
// `[45] elementdecl ::= '<!ELEMENT' S Name S contentspec S? '>'`
// https://www.w3.org/TR/xml-names/#NT-elementdecl
// `[17] elementdecl ::= '<!ELEMENT' S QName S contentspec S? '>'`
// because of https://www.w3.org/TR/xml11/#NT-PEReference
// since xmldom is not supporting replacements of PEReferences in the DTD
// this also supports PEReference in the possible places
var elementdecl = reg(ELEMENTDECL_START, S, regg(QName, '|', PEReference), S, regg(contentspec, '|', PEReference), S_OPT, '>');

// https://www.w3.org/TR/xml11/#NT-NotationType
// `[58] NotationType ::= 'NOTATION' S '(' S? Name (S? '|' S? Name)* S? ')'`
// [VC: Notation Attributes] [VC: One Notation Per Element Type] [VC: No Notation on Empty Element] [VC: No Duplicate Tokens]
var NotationType = reg('NOTATION', S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), '*', S_OPT, /\)/);
// https://www.w3.org/TR/xml11/#NT-Enumeration
// `[59] Enumeration ::= '(' S? Nmtoken (S? '|' S? Nmtoken)* S? ')'`
// [VC: Enumeration] [VC: No Duplicate Tokens]
var Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), '*', S_OPT, /\)/);

// https://www.w3.org/TR/xml11/#NT-EnumeratedType
// `[57] EnumeratedType ::= NotationType | Enumeration`
var EnumeratedType = regg(NotationType, '|', Enumeration);

/*
```
[55] StringType ::= 'CDATA'
[56] TokenizedType ::= 'ID' [VC: ID] [VC: One ID per Element Type] [VC: ID Attribute Default]
   | 'IDREF' [VC: IDREF]
   | 'IDREFS' [VC: IDREF]
	 | 'ENTITY' [VC: Entity Name]
	 | 'ENTITIES' [VC: Entity Name]
	 | 'NMTOKEN' [VC: Name Token]
	 | 'NMTOKENS' [VC: Name Token]
 [54] AttType ::= StringType | TokenizedType | EnumeratedType
```*/
var AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, '|', EnumeratedType);

// `[60] DefaultDecl ::= '#REQUIRED' | '#IMPLIED' | (('#FIXED' S)? AttValue)`
// [WFC: No < in Attribute Values] [WFC: No External Entity References]
// [VC: Fixed Attribute Default] [VC: Required Attribute] [VC: Attribute Default Value Syntactically Correct]
var DefaultDecl = regg(/#REQUIRED|#IMPLIED/, '|', regg(regg('#FIXED', S), '?', AttValue));

// https://www.w3.org/TR/xml11/#NT-AttDef
// [53] AttDef ::= S Name S AttType S DefaultDecl
// https://www.w3.org/TR/xml-names/#NT-AttDef
// [1] NSAttName ::= PrefixedAttName | DefaultAttName
// [2] PrefixedAttName ::= 'xmlns:' NCName [NSC: Reserved Prefixes and Namespace Names]
// [3] DefaultAttName ::= 'xmlns'
// [21] AttDef ::= S (QName | NSAttName) S AttType S DefaultDecl
// 						 === S Name S AttType S DefaultDecl
// xmldom is not distinguishing between QName and NSAttName on this level
// to support XML without namespaces in DTD we can not restrict it to QName
var AttDef = regg(S, Name, S, AttType, S, DefaultDecl);

var ATTLIST_DECL_START = '<!ATTLIST';
// https://www.w3.org/TR/xml11/#NT-AttlistDecl
// `[52] AttlistDecl ::= '<!ATTLIST' S Name AttDef* S? '>'`
// https://www.w3.org/TR/xml-names/#NT-AttlistDecl
// `[20] AttlistDecl ::= '<!ATTLIST' S QName AttDef* S? '>'`
// to support XML without namespaces in DTD we can not restrict it to QName
var AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, '*', S_OPT, '>');

// https://html.spec.whatwg.org/multipage/urls-and-fetching.html#about:legacy-compat
var ABOUT_LEGACY_COMPAT = 'about:legacy-compat';
var ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', '|', "'" + ABOUT_LEGACY_COMPAT + "'");
var SYSTEM = 'SYSTEM';
var PUBLIC = 'PUBLIC';
// https://www.w3.org/TR/xml11/#NT-ExternalID
// `[75] ExternalID ::= 'SYSTEM' S SystemLiteral | 'PUBLIC' S PubidLiteral S SystemLiteral`
var ExternalID = regg(regg(SYSTEM, S, SystemLiteral), '|', regg(PUBLIC, S, PubidLiteral, S, SystemLiteral));
var ExternalID_match = reg(
	'^',
	regg(
		regg(SYSTEM, S, '(?<SystemLiteralOnly>', SystemLiteral, ')'),
		'|',
		regg(PUBLIC, S, '(?<PubidLiteral>', PubidLiteral, ')', S, '(?<SystemLiteral>', SystemLiteral, ')')
	)
);

// https://www.w3.org/TR/xml11/#NT-NDataDecl
// `[76] NDataDecl ::= S 'NDATA' S Name` [VC: Notation Declared]
var NDataDecl = regg(S, 'NDATA', S, Name);

// https://www.w3.org/TR/xml11/#NT-EntityDef
// `[73] EntityDef ::= EntityValue | (ExternalID NDataDecl?)`
var EntityDef = regg(EntityValue, '|', regg(ExternalID, NDataDecl, '?'));

var ENTITY_DECL_START = '<!ENTITY';
// https://www.w3.org/TR/xml11/#NT-GEDecl
// `[71] GEDecl ::= '<!ENTITY' S Name S EntityDef S? '>'`
var GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, '>');
// https://www.w3.org/TR/xml11/#NT-PEDef
// `[74] PEDef ::= EntityValue | ExternalID`
var PEDef = regg(EntityValue, '|', ExternalID);
// https://www.w3.org/TR/xml11/#NT-PEDecl
// `[72] PEDecl ::= '<!ENTITY' S '%' S Name S PEDef S? '>'`
var PEDecl = reg(ENTITY_DECL_START, S, '%', S, Name, S, PEDef, S_OPT, '>');
// https://www.w3.org/TR/xml11/#NT-EntityDecl
// `[70] EntityDecl ::= GEDecl | PEDecl`
var EntityDecl = regg(GEDecl, '|', PEDecl);

// https://www.w3.org/TR/xml11/#NT-PublicID
// `[83] PublicID    ::= 'PUBLIC' S PubidLiteral`
var PublicID = reg(PUBLIC, S, PubidLiteral);
// https://www.w3.org/TR/xml11/#NT-NotationDecl
// `[82] NotationDecl    ::= '<!NOTATION' S Name S (ExternalID | PublicID) S? '>'` [VC: Unique Notation Name]
var NotationDecl = reg('<!NOTATION', S, Name, S, regg(ExternalID, '|', PublicID), S_OPT, '>');

// https://www.w3.org/TR/xml11/#NT-Eq
// `[25] Eq ::= S? '=' S?`
var Eq = reg(S_OPT, '=', S_OPT);
// https://www.w3.org/TR/xml/#NT-VersionNum
// `[26] VersionNum ::= '1.' [0-9]+`
// https://www.w3.org/TR/xml11/#NT-VersionNum
// `[26] VersionNum ::= '1.1'`
var VersionNum = /1[.]\d+/;
// https://www.w3.org/TR/xml11/#NT-VersionInfo
// `[24] VersionInfo ::= S 'version' Eq ("'" VersionNum "'" | '"' VersionNum '"')`
var VersionInfo = reg(S, 'version', Eq, regg("'", VersionNum, "'", '|', '"', VersionNum, '"'));
// https://www.w3.org/TR/xml11/#NT-EncName
// `[81] EncName ::= [A-Za-z] ([A-Za-z0-9._] | '-')*`
var EncName = /[A-Za-z][-A-Za-z0-9._]*/;
// https://www.w3.org/TR/xml11/#NT-EncDecl
// `[80] EncodingDecl ::= S 'encoding' Eq ('"' EncName '"' | "'" EncName "'" )`
var EncodingDecl = regg(S, 'encoding', Eq, regg('"', EncName, '"', '|', "'", EncName, "'"));
// https://www.w3.org/TR/xml11/#NT-SDDecl
// `[32] SDDecl ::= S 'standalone' Eq (("'" ('yes' | 'no') "'") | ('"' ('yes' | 'no') '"'))`
var SDDecl = regg(S, 'standalone', Eq, regg("'", regg('yes', '|', 'no'), "'", '|', '"', regg('yes', '|', 'no'), '"'));
// https://www.w3.org/TR/xml11/#NT-XMLDecl
// [23] XMLDecl ::= '<?xml' VersionInfo EncodingDecl? SDDecl? S? '?>'
var XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, '?', SDDecl, '?', S_OPT, /\?>/);

/*
 https://www.w3.org/TR/xml/#NT-markupdecl
 https://www.w3.org/TR/xml11/#NT-markupdecl
 `[29] markupdecl ::= elementdecl | AttlistDecl | EntityDecl | NotationDecl | PI | Comment`
 var markupdecl = regg(elementdecl, '|', AttlistDecl, '|', EntityDecl, '|', NotationDecl, '|', PI_unsafe, '|', Comment);
*/
/*
 https://www.w3.org/TR/xml-names/#NT-doctypedecl
`[28a] DeclSep   ::= PEReference | S`
 https://www.w3.org/TR/xml11/#NT-intSubset
```
 [28b] intSubset ::= (markupdecl | DeclSep)*
                 === (markupdecl | PEReference | S)*
```
 [WFC: PE Between Declarations]
 var intSubset = reg(regg(markupdecl, '|', PEReference, '|', S), '*');
*/
var DOCTYPE_DECL_START = '<!DOCTYPE';
/*
 https://www.w3.org/TR/xml11/#NT-doctypedecl
 `[28] doctypedecl ::= '<!DOCTYPE' S Name (S ExternalID)? S? ('[' intSubset ']' S?)? '>'`
 https://www.afterwardsw3.org/TR/xml-names/#NT-doctypedecl
 `[16] doctypedecl ::= '<!DOCTYPE' S QName (S ExternalID)? S? ('[' (markupdecl | PEReference | S)* ']' S?)? '>'`
 var doctypedecl = reg('<!DOCTYPE', S, Name, regg(S, ExternalID), '?', S_OPT, regg(/\[/, intSubset, /]/, S_OPT), '?', '>');
*/

var CDATA_START = '<![CDATA[';
var CDATA_END = ']]>';
var CDStart = /<!\[CDATA\[/;
var CDEnd = /\]\]>/;
var CData = reg(Char, '*?', CDEnd);
/*
 https://www.w3.org/TR/xml/#dt-cdsection
 `[18]   	CDSect	   ::=   	CDStart CData CDEnd`
 `[19]   	CDStart	   ::=   	'<![CDATA['`
 `[20]   	CData	   ::=   	(Char* - (Char* ']]>' Char*))`
 `[21]   	CDEnd	   ::=   	']]>'`
*/
var CDSect = reg(CDStart, CData);

// unit tested
grammar.chars = chars;
grammar.chars_without = chars_without;
grammar.detectUnicodeSupport = detectUnicodeSupport;
grammar.reg = reg;
grammar.regg = regg;
grammar.ABOUT_LEGACY_COMPAT = ABOUT_LEGACY_COMPAT;
grammar.ABOUT_LEGACY_COMPAT_SystemLiteral = ABOUT_LEGACY_COMPAT_SystemLiteral;
grammar.AttlistDecl = AttlistDecl;
grammar.CDATA_START = CDATA_START;
grammar.CDATA_END = CDATA_END;
grammar.CDSect = CDSect;
grammar.Char = Char;
grammar.Comment = Comment$1;
grammar.COMMENT_START = COMMENT_START;
grammar.COMMENT_END = COMMENT_END;
grammar.DOCTYPE_DECL_START = DOCTYPE_DECL_START;
grammar.elementdecl = elementdecl;
grammar.EntityDecl = EntityDecl;
grammar.EntityValue = EntityValue;
grammar.ExternalID = ExternalID;
grammar.ExternalID_match = ExternalID_match;
grammar.Name = Name;
grammar.NotationDecl = NotationDecl;
grammar.Reference = Reference;
grammar.PEReference = PEReference;
grammar.PI = PI;
grammar.PUBLIC = PUBLIC;
grammar.PubidLiteral = PubidLiteral;
grammar.QName = QName;
grammar.QName_exact = QName_exact;
grammar.QName_group = QName_group;
grammar.S = S;
grammar.SChar_s = SChar_s;
grammar.S_OPT = S_OPT;
grammar.SYSTEM = SYSTEM;
grammar.SystemLiteral = SystemLiteral;
grammar.UNICODE_REPLACEMENT_CHARACTER = UNICODE_REPLACEMENT_CHARACTER;
grammar.UNICODE_SUPPORT = UNICODE_SUPPORT;
grammar.XMLDecl = XMLDecl;

var conventions$3 = conventions$5;
var find = conventions$3.find;
var hasDefaultHTMLNamespace$1 = conventions$3.hasDefaultHTMLNamespace;
var hasOwn$1 = conventions$3.hasOwn;
var isHTMLMimeType$2 = conventions$3.isHTMLMimeType;
var isHTMLRawTextElement$1 = conventions$3.isHTMLRawTextElement;
var isHTMLVoidElement = conventions$3.isHTMLVoidElement;
var MIME_TYPE$1 = conventions$3.MIME_TYPE;
var NAMESPACE$2 = conventions$3.NAMESPACE;

/**
 * Private DOM Constructor symbol
 *
 * Internal symbol used for construction of all classes whose constructors should be private.
 * Currently used for checks in `Node`, `Document`, `Element`, `Attr`, `CharacterData`, `Text`, `Comment`,
 * `CDATASection`, `DocumentType`, `Notation`, `Entity`, `EntityReference`, `DocumentFragment`, `ProcessingInstruction`
 * so the constructor can't be used from outside the module.
 */
var PDC = Symbol();

var errors$3 = errors$4;
var DOMException$1 = errors$3.DOMException;
var DOMExceptionName = errors$3.DOMExceptionName;

var g$1 = grammar;

/**
 * Checks if the given symbol equals the Private DOM Constructor symbol (PDC)
 * and throws an Illegal constructor exception when the symbols don't match.
 * This ensures that the constructor remains private and can't be used outside this module.
 */
function checkSymbol(symbol) {
	if (symbol !== PDC) {
		throw new TypeError('Illegal constructor');
	}
}

/**
 * A prerequisite for `[].filter`, to drop elements that are empty.
 *
 * @param {string} input
 * The string to be checked.
 * @returns {boolean}
 * Returns `true` if the input string is not empty, `false` otherwise.
 */
function notEmptyString(input) {
	return input !== '';
}
/**
 * Splits a string on ASCII whitespace characters (U+0009 TAB, U+000A LF, U+000C FF, U+000D CR,
 * U+0020 SPACE).
 * It follows the definition from the infra specification from WHATWG.
 *
 * @param {string} input
 * The string to be split.
 * @returns {string[]}
 * An array of the split strings. The array can be empty if the input string is empty or only
 * contains whitespace characters.
 * @see {@link https://infra.spec.whatwg.org/#split-on-ascii-whitespace}
 * @see {@link https://infra.spec.whatwg.org/#ascii-whitespace}
 */
function splitOnASCIIWhitespace(input) {
	// U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, U+0020 SPACE
	return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
}

/**
 * Adds element as a key to current if it is not already present.
 *
 * @param {Record<string, boolean | undefined>} current
 * The current record object to which the element will be added as a key.
 * The object's keys are string types and values are either boolean or undefined.
 * @param {string} element
 * The string to be added as a key to the current record.
 * @returns {Record<string, boolean | undefined>}
 * The updated record object after the addition of the new element.
 */
function orderedSetReducer(current, element) {
	if (!hasOwn$1(current, element)) {
		current[element] = true;
	}
	return current;
}

/**
 * Converts a string into an ordered set by splitting the input on ASCII whitespace and
 * ensuring uniqueness of elements.
 * This follows the definition of an ordered set from the infra specification by WHATWG.
 *
 * @param {string} input
 * The input string to be transformed into an ordered set.
 * @returns {string[]}
 * An array of unique strings obtained from the input, preserving the original order.
 * The array can be empty if the input string is empty or only contains whitespace characters.
 * @see {@link https://infra.spec.whatwg.org/#ordered-set}
 */
function toOrderedSet(input) {
	if (!input) return [];
	var list = splitOnASCIIWhitespace(input);
	return Object.keys(list.reduce(orderedSetReducer, {}));
}

/**
 * Uses `list.indexOf` to implement a function that behaves like `Array.prototype.includes`.
 * This function is used in environments where `Array.prototype.includes` may not be available.
 *
 * @param {any[]} list
 * The array in which to search for the element.
 * @returns {function(any): boolean}
 * A function that accepts an element and returns a boolean indicating whether the element is
 * included in the provided list.
 */
function arrayIncludes(list) {
	return function (element) {
		return list && list.indexOf(element) !== -1;
	};
}

/**
 * Validates a qualified name based on the criteria provided in the DOM specification by
 * WHATWG.
 *
 * @param {string} qualifiedName
 * The qualified name to be validated.
 * @throws {DOMException}
 * With code {@link DOMException.INVALID_CHARACTER_ERR} if the qualified name contains an
 * invalid character.
 * @see {@link https://dom.spec.whatwg.org/#validate}
 */
function validateQualifiedName(qualifiedName) {
	if (!g$1.QName_exact.test(qualifiedName)) {
		throw new DOMException$1(DOMException$1.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
	}
}

/**
 * Validates a qualified name and the namespace associated with it,
 * based on the criteria provided in the DOM specification by WHATWG.
 *
 * @param {string | null} namespace
 * The namespace to be validated. It can be a string or null.
 * @param {string} qualifiedName
 * The qualified name to be validated.
 * @returns {[namespace: string | null, prefix: string | null, localName: string]}
 * Returns a tuple with the namespace,
 * prefix and local name of the qualified name.
 * @throws {DOMException}
 * Throws a DOMException if the qualified name or the namespace is not valid.
 * @see {@link https://dom.spec.whatwg.org/#validate-and-extract}
 */
function validateAndExtract(namespace, qualifiedName) {
	validateQualifiedName(qualifiedName);
	namespace = namespace || null;
	/**
	 * @type {string | null}
	 */
	var prefix = null;
	var localName = qualifiedName;
	if (qualifiedName.indexOf(':') >= 0) {
		var splitResult = qualifiedName.split(':');
		prefix = splitResult[0];
		localName = splitResult[1];
	}
	if (prefix !== null && namespace === null) {
		throw new DOMException$1(DOMException$1.NAMESPACE_ERR, 'prefix is non-null and namespace is null');
	}
	if (prefix === 'xml' && namespace !== conventions$3.NAMESPACE.XML) {
		throw new DOMException$1(DOMException$1.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
	}
	if ((prefix === 'xmlns' || qualifiedName === 'xmlns') && namespace !== conventions$3.NAMESPACE.XMLNS) {
		throw new DOMException$1(
			DOMException$1.NAMESPACE_ERR,
			'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
		);
	}
	if (namespace === conventions$3.NAMESPACE.XMLNS && prefix !== 'xmlns' && qualifiedName !== 'xmlns') {
		throw new DOMException$1(
			DOMException$1.NAMESPACE_ERR,
			'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
		);
	}
	return [namespace, prefix, localName];
}

/**
 * Copies properties from one object to another.
 * It only copies the object's own (not inherited) properties.
 *
 * @param {Object} src
 * The source object from which properties are copied.
 * @param {Object} dest
 * The destination object to which properties are copied.
 */
function copy(src, dest) {
	for (var p in src) {
		if (hasOwn$1(src, p)) {
			dest[p] = src[p];
		}
	}
}

/**
 * Extends a class with the properties and methods of a super class.
 * It uses a form of prototypal inheritance, and establishes the `constructor` property
 * correctly(?).
 *
 * It is not clear to the current maintainers if this implementation is making sense,
 * since it creates an intermediate prototype function,
 * which all properties of `Super` are copied onto using `_copy`.
 *
 * @param {Object} Class
 * The class that is to be extended.
 * @param {Object} Super
 * The super class from which properties and methods are inherited.
 * @private
 */
function _extends(Class, Super) {
	var pt = Class.prototype;
	if (!(pt instanceof Super)) {
		function t() {}
		t.prototype = Super.prototype;
		t = new t();
		copy(pt, t);
		Class.prototype = pt = t;
	}
	if (pt.constructor != Class) {
		if (typeof Class != 'function') {
			console.error('unknown Class:' + Class);
		}
		pt.constructor = Class;
	}
}

var NodeType = {};
var ELEMENT_NODE = (NodeType.ELEMENT_NODE = 1);
var ATTRIBUTE_NODE = (NodeType.ATTRIBUTE_NODE = 2);
var TEXT_NODE = (NodeType.TEXT_NODE = 3);
var CDATA_SECTION_NODE = (NodeType.CDATA_SECTION_NODE = 4);
var ENTITY_REFERENCE_NODE = (NodeType.ENTITY_REFERENCE_NODE = 5);
var ENTITY_NODE = (NodeType.ENTITY_NODE = 6);
var PROCESSING_INSTRUCTION_NODE = (NodeType.PROCESSING_INSTRUCTION_NODE = 7);
var COMMENT_NODE = (NodeType.COMMENT_NODE = 8);
var DOCUMENT_NODE = (NodeType.DOCUMENT_NODE = 9);
var DOCUMENT_TYPE_NODE = (NodeType.DOCUMENT_TYPE_NODE = 10);
var DOCUMENT_FRAGMENT_NODE = (NodeType.DOCUMENT_FRAGMENT_NODE = 11);
var NOTATION_NODE = (NodeType.NOTATION_NODE = 12);

var DocumentPosition = conventions$3.freeze({
	DOCUMENT_POSITION_DISCONNECTED: 1,
	DOCUMENT_POSITION_PRECEDING: 2,
	DOCUMENT_POSITION_FOLLOWING: 4,
	DOCUMENT_POSITION_CONTAINS: 8,
	DOCUMENT_POSITION_CONTAINED_BY: 16,
	DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32,
});

//helper functions for compareDocumentPosition
/**
 * Finds the common ancestor in two parent chains.
 *
 * @param {Node[]} a
 * The first parent chain.
 * @param {Node[]} b
 * The second parent chain.
 * @returns {Node}
 * The common ancestor node if it exists. If there is no common ancestor, the function will
 * return `null`.
 */
function commonAncestor(a, b) {
	if (b.length < a.length) return commonAncestor(b, a);
	var c = null;
	for (var n in a) {
		if (a[n] !== b[n]) return c;
		c = a[n];
	}
	return c;
}

/**
 * Assigns a unique identifier to a document to ensure consistency while comparing unrelated
 * nodes.
 *
 * @param {Document} doc
 * The document to which a unique identifier is to be assigned.
 * @returns {string}
 * The unique identifier of the document. If the document already had a unique identifier, the
 * function will return the existing one.
 */
function docGUID(doc) {
	if (!doc.guid) doc.guid = Math.random();
	return doc.guid;
}
//-- end of helper functions

/**
 * The NodeList interface provides the abstraction of an ordered collection of nodes,
 * without defining or constraining how this collection is implemented.
 * NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 * You can also access the items of the NodeList with a `for...of` loop.
 *
 * @class NodeList
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * @constructs NodeList
 */
function NodeList() {}
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1
	 * inclusive.
	 *
	 * @type {number}
	 */
	length: 0,
	/**
	 * Returns the item at `index`. If index is greater than or equal to the number of nodes in
	 * the list, this returns null.
	 *
	 * @param index
	 * Unsigned long Index into the collection.
	 * @returns {Node | null}
	 * The node at position `index` in the NodeList,
	 * or null if that is not a valid index.
	 */
	item: function (index) {
		return index >= 0 && index < this.length ? this[index] : null;
	},
	/**
	 * Returns a string representation of the NodeList.
	 *
	 * @param {unknown} nodeFilter
	 * __A filter function? Not implemented according to the spec?__.
	 * @returns {string}
	 * A string representation of the NodeList.
	 */
	toString: function (nodeFilter) {
		for (var buf = [], i = 0; i < this.length; i++) {
			serializeToString(this[i], buf, nodeFilter);
		}
		return buf.join('');
	},
	/**
	 * Filters the NodeList based on a predicate.
	 *
	 * @param {function(Node): boolean} predicate
	 * - A predicate function to filter the NodeList.
	 * @returns {Node[]}
	 * An array of nodes that satisfy the predicate.
	 * @private
	 */
	filter: function (predicate) {
		return Array.prototype.filter.call(this, predicate);
	},
	/**
	 * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
	 * not present.
	 *
	 * @param {Node} item
	 * - The Node item to locate in the NodeList.
	 * @returns {number}
	 * The first index of the node in the NodeList; -1 if not found.
	 * @private
	 */
	indexOf: function (item) {
		return Array.prototype.indexOf.call(this, item);
	},
};
NodeList.prototype[Symbol.iterator] = function () {
	var me = this;
	var index = 0;

	return {
		next: function () {
			if (index < me.length) {
				return {
					value: me[index++],
					done: false,
				};
			} else {
				return {
					done: true,
				};
			}
		},
		return: function () {
			return {
				done: true,
			};
		},
	};
};

/**
 * Represents a live collection of nodes that is automatically updated when its associated
 * document changes.
 *
 * @class LiveNodeList
 * @param {Node} node
 * The associated node.
 * @param {function} refresh
 * The function to refresh the live node list.
 * @augments NodeList
 * @constructs LiveNodeList
 */
function LiveNodeList(node, refresh) {
	this._node = node;
	this._refresh = refresh;
	_updateLiveList(this);
}
/**
 * Updates the live node list.
 *
 * @param {LiveNodeList} list
 * The live node list to update.
 * @private
 */
function _updateLiveList(list) {
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if (list._inc !== inc) {
		var ls = list._refresh(list._node);
		__set__(list, 'length', ls.length);
		if (!list.$$length || ls.length < list.$$length) {
			for (var i = ls.length; i in list; i++) {
				if (hasOwn$1(list, i)) {
					delete list[i];
				}
			}
		}
		copy(ls, list);
		list._inc = inc;
	}
}
/**
 * Returns the node at position `index` in the LiveNodeList, or null if that is not a valid
 * index.
 *
 * @param {number} i
 * Index into the collection.
 * @returns {Node | null}
 * The node at position `index` in the LiveNodeList, or null if that is not a valid index.
 */
LiveNodeList.prototype.item = function (i) {
	_updateLiveList(this);
	return this[i] || null;
};

_extends(LiveNodeList, NodeList);

/**
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes
 * that can be accessed by name.
 * Note that NamedNodeMap does not inherit from NodeList;
 * NamedNodeMaps are not maintained in any particular order.
 * Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal
 * index,
 * but this is simply to allow convenient enumeration of the contents of a NamedNodeMap,
 * and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities
 *
 * This implementation only supports property indices, but does not support named properties,
 * as specified in the living standard.
 *
 * @class NamedNodeMap
 * @see https://dom.spec.whatwg.org/#interface-namednodemap
 * @see https://webidl.spec.whatwg.org/#dfn-supported-property-names
 * @constructs NamedNodeMap
 */
function NamedNodeMap() {}
/**
 * Returns the index of a node within the list.
 *
 * @param {Array} list
 * The list of nodes.
 * @param {Node} node
 * The node to find.
 * @returns {number}
 * The index of the node within the list, or -1 if not found.
 * @private
 */
function _findNodeIndex(list, node) {
	var i = 0;
	while (i < list.length) {
		if (list[i] === node) {
			return i;
		}
		i++;
	}
}
/**
 * Adds a new attribute to the list and updates the owner element of the attribute.
 *
 * @param {Element} el
 * The element which will become the owner of the new attribute.
 * @param {NamedNodeMap} list
 * The list to which the new attribute will be added.
 * @param {Attr} newAttr
 * The new attribute to be added.
 * @param {Attr} oldAttr
 * The old attribute to be replaced, or null if no attribute is to be replaced.
 * @returns {void}
 * @private
 */
function _addNamedNode(el, list, newAttr, oldAttr) {
	if (oldAttr) {
		list[_findNodeIndex(list, oldAttr)] = newAttr;
	} else {
		list[list.length] = newAttr;
		list.length++;
	}
	if (el) {
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if (doc) {
			oldAttr && _onRemoveAttribute(doc, el, oldAttr);
			_onAddAttribute(doc, el, newAttr);
		}
	}
}
/**
 * Removes an attribute from the list and updates the owner element of the attribute.
 *
 * @param {Element} el
 * The element which is the current owner of the attribute.
 * @param {NamedNodeMap} list
 * The list from which the attribute will be removed.
 * @param {Attr} attr
 * The attribute to be removed.
 * @returns {void}
 * @private
 */
function _removeNamedNode(el, list, attr) {
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list, attr);
	if (i >= 0) {
		var lastIndex = list.length - 1;
		while (i <= lastIndex) {
			list[i] = list[++i];
		}
		list.length = lastIndex;
		if (el) {
			var doc = el.ownerDocument;
			if (doc) {
				_onRemoveAttribute(doc, el, attr);
			}
			attr.ownerElement = null;
		}
	}
}
NamedNodeMap.prototype = {
	length: 0,
	item: NodeList.prototype.item,

	/**
	 * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
	 * document.
	 *
	 * @param {string} localName
	 * The local name of the attribute.
	 * @returns {Attr | null}
	 * The attribute with the given local name, or null if no such attribute exists.
	 * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
	 */
	getNamedItem: function (localName) {
		if (this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace()) {
			localName = localName.toLowerCase();
		}
		var i = 0;
		while (i < this.length) {
			var attr = this[i];
			if (attr.nodeName === localName) {
				return attr;
			}
			i++;
		}
		return null;
	},

	/**
	 * Set an attribute.
	 *
	 * @param {Attr} attr
	 * The attribute to set.
	 * @returns {Attr | null}
	 * The old attribute with the same local name and namespace URI as the new one, or null if no
	 * such attribute exists.
	 * @throws {DOMException}
	 * With code:
	 * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
	 * element.
	 * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
	 */
	setNamedItem: function (attr) {
		var el = attr.ownerElement;
		if (el && el !== this._ownerElement) {
			throw new DOMException$1(DOMException$1.INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
		if (oldAttr === attr) {
			return attr;
		}
		_addNamedNode(this._ownerElement, this, attr, oldAttr);
		return oldAttr;
	},

	/**
	 * Set an attribute, replacing an existing attribute with the same local name and namespace
	 * URI if one exists.
	 *
	 * @param {Attr} attr
	 * The attribute to set.
	 * @returns {Attr | null}
	 * The old attribute with the same local name and namespace URI as the new one, or null if no
	 * such attribute exists.
	 * @throws {DOMException}
	 * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
	 * attribute of another element.
	 * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
	 */
	setNamedItemNS: function (attr) {
		return this.setNamedItem(attr);
	},

	/**
	 * Removes an attribute specified by the local name.
	 *
	 * @param {string} localName
	 * The local name of the attribute to be removed.
	 * @returns {Attr}
	 * The attribute node that was removed.
	 * @throws {DOMException}
	 * With code:
	 * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
	 * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
	 * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
	 */
	removeNamedItem: function (localName) {
		var attr = this.getNamedItem(localName);
		if (!attr) {
			throw new DOMException$1(DOMException$1.NOT_FOUND_ERR, localName);
		}
		_removeNamedNode(this._ownerElement, this, attr);
		return attr;
	},

	/**
	 * Removes an attribute specified by the namespace and local name.
	 *
	 * @param {string | null} namespaceURI
	 * The namespace URI of the attribute to be removed.
	 * @param {string} localName
	 * The local name of the attribute to be removed.
	 * @returns {Attr}
	 * The attribute node that was removed.
	 * @throws {DOMException}
	 * With code:
	 * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
	 * name is found.
	 * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
	 * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
	 */
	removeNamedItemNS: function (namespaceURI, localName) {
		var attr = this.getNamedItemNS(namespaceURI, localName);
		if (!attr) {
			throw new DOMException$1(DOMException$1.NOT_FOUND_ERR, namespaceURI ? namespaceURI + ' : ' + localName : localName);
		}
		_removeNamedNode(this._ownerElement, this, attr);
		return attr;
	},

	/**
	 * Get an attribute by namespace and local name.
	 *
	 * @param {string | null} namespaceURI
	 * The namespace URI of the attribute.
	 * @param {string} localName
	 * The local name of the attribute.
	 * @returns {Attr | null}
	 * The attribute with the given namespace URI and local name, or null if no such attribute
	 * exists.
	 * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
	 */
	getNamedItemNS: function (namespaceURI, localName) {
		if (!namespaceURI) {
			namespaceURI = null;
		}
		var i = 0;
		while (i < this.length) {
			var node = this[i];
			if (node.localName === localName && node.namespaceURI === namespaceURI) {
				return node;
			}
			i++;
		}
		return null;
	},
};
NamedNodeMap.prototype[Symbol.iterator] = function () {
	var me = this;
	var index = 0;

	return {
		next: function () {
			if (index < me.length) {
				return {
					value: me[index++],
					done: false,
				};
			} else {
				return {
					done: true,
				};
			}
		},
		return: function () {
			return {
				done: true,
			};
		},
	};
};

/**
 * The DOMImplementation interface provides a number of methods for performing operations that
 * are independent of any particular instance of the document object model.
 *
 * The DOMImplementation interface represents an object providing methods which are not
 * dependent on any particular document.
 * Such an object is returned by the `Document.implementation` property.
 *
 * **The individual methods describe the differences compared to the specs**.
 *
 * @class DOMImplementation
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core
 *      (Initial)
 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
 * @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
 * @constructs DOMImplementation
 */
function DOMImplementation$1() {}

DOMImplementation$1.prototype = {
	/**
	 * Test if the DOM implementation implements a specific feature and version, as specified in
	 * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
	 *
	 * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
	 * feature is supported. The different implementations fairly diverged in what kind of
	 * features were reported. The latest version of the spec settled to force this method to
	 * always return true, where the functionality was accurate and in use.
	 *
	 * @deprecated
	 * It is deprecated and modern browsers return true in all cases.
	 * @function DOMImplementation#hasFeature
	 * @param {string} feature
	 * The name of the feature to test.
	 * @param {string} [version]
	 * This is the version number of the feature to test.
	 * @returns {boolean}
	 * Always returns true.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
	 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
	 */
	hasFeature: function (feature, version) {
		return true;
	},
	/**
	 * Creates a DOM Document object of the specified type with its document element. Note that
	 * based on the {@link DocumentType}
	 * given to create the document, the implementation may instantiate specialized
	 * {@link Document} objects that support additional features than the "Core", such as "HTML"
	 * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
	 * On the other hand, setting the {@link DocumentType} after the document was created makes
	 * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
	 * such as createHTMLDocument
	 * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
	 * can be used to obtain specific types of {@link Document} objects.
	 *
	 * __It behaves slightly different from the description in the living standard__:
	 * - There is no interface/class `XMLDocument`, it returns a `Document`
	 * instance (with it's `type` set to `'xml'`).
	 * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 *
	 * @function DOMImplementation.createDocument
	 * @param {string | null} namespaceURI
	 * The
	 * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
	 * of the document element to create or null.
	 * @param {string | null} qualifiedName
	 * The
	 * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
	 * of the document element to be created or null.
	 * @param {DocumentType | null} [doctype=null]
	 * The type of document to be created or null. When doctype is not null, its
	 * {@link Node#ownerDocument} attribute is set to the document being created. Default is
	 * `null`
	 * @returns {Document}
	 * A new {@link Document} object with its document element. If the NamespaceURI,
	 * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
	 * document element.
	 * @throws {DOMException}
	 * With code:
	 *
	 * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
	 * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
	 * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
	 * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
	 * is different from null, or if the qualifiedName has a prefix that is "xml" and the
	 * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
	 * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
	 * or if the DOM implementation does not support the "XML" feature but a non-null namespace
	 * URI was provided, since namespaces were defined by XML.
	 * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
	 * or was created from a different implementation.
	 * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
	 * "XML" and the language exposed through the Document does not support XML Namespaces (such
	 * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
	 * @since DOM Level 2.
	 * @see {@link #createHTMLDocument}
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
	 *      Level 3 Core
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
	 *      Level 2 Core (initial)
	 */
	createDocument: function (namespaceURI, qualifiedName, doctype) {
		var contentType = MIME_TYPE$1.XML_APPLICATION;
		if (namespaceURI === NAMESPACE$2.HTML) {
			contentType = MIME_TYPE$1.XML_XHTML_APPLICATION;
		} else if (namespaceURI === NAMESPACE$2.SVG) {
			contentType = MIME_TYPE$1.XML_SVG_IMAGE;
		}
		var doc = new Document(PDC, { contentType: contentType });
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype || null;
		if (doctype) {
			doc.appendChild(doctype);
		}
		if (qualifiedName) {
			var root = doc.createElementNS(namespaceURI, qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	/**
	 * Creates an empty DocumentType node. Entity declarations and notations are not made
	 * available. Entity reference expansions and default attribute additions do not occur.
	 *
	 * **This behavior is slightly different from the one in the specs**:
	 * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 * - `publicId` and `systemId` contain the raw data including any possible quotes,
	 *   so they can always be serialized back to the original value
	 * - `internalSubset` contains the raw string between `[` and `]` if present,
	 *   but is not parsed or validated in any form.
	 *
	 * @function DOMImplementation#createDocumentType
	 * @param {string} qualifiedName
	 * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
	 * name} of the document type to be created.
	 * @param {string} [publicId]
	 * The external subset public identifier.
	 * @param {string} [systemId]
	 * The external subset system identifier.
	 * @param {string} [internalSubset]
	 * the internal subset or an empty string if it is not present
	 * @returns {DocumentType}
	 * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
	 * @throws {DOMException}
	 * With code:
	 *
	 * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
	 * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
	 * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
	 * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
	 * "XML" and the language exposed through the Document does not support XML Namespaces (such
	 * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
	 * @since DOM Level 2.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
	 *      MDN
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
	 *      Standard
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
	 *      Level 3 Core
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
	 *      Level 2 Core
	 * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
	 * @prettierignore
	 */
	createDocumentType: function (qualifiedName, publicId, systemId, internalSubset) {
		validateQualifiedName(qualifiedName);
		var node = new DocumentType(PDC);
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId || '';
		node.systemId = systemId || '';
		node.internalSubset = internalSubset || '';
		node.childNodes = new NodeList();

		return node;
	},
	/**
	 * Returns an HTML document, that might already have a basic DOM structure.
	 *
	 * __It behaves slightly different from the description in the living standard__:
	 * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
	 * omitted)
	 * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 *
	 * @param {string | false} [title]
	 * A string containing the title to give the new HTML document.
	 * @returns {Document}
	 * The HTML document.
	 * @since WHATWG Living Standard.
	 * @see {@link #createDocument}
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
	 * @see https://dom.spec.whatwg.org/#html-document
	 */
	createHTMLDocument: function (title) {
		var doc = new Document(PDC, { contentType: MIME_TYPE$1.HTML });
		doc.implementation = this;
		doc.childNodes = new NodeList();
		if (title !== false) {
			doc.doctype = this.createDocumentType('html');
			doc.doctype.ownerDocument = doc;
			doc.appendChild(doc.doctype);
			var htmlNode = doc.createElement('html');
			doc.appendChild(htmlNode);
			var headNode = doc.createElement('head');
			htmlNode.appendChild(headNode);
			if (typeof title === 'string') {
				var titleNode = doc.createElement('title');
				titleNode.appendChild(doc.createTextNode(title));
				headNode.appendChild(titleNode);
			}
			htmlNode.appendChild(doc.createElement('body'));
		}
		return doc;
	},
};

/**
 * The DOM Node interface is an abstract base class upon which many other DOM API objects are
 * based, thus letting those object types to be used similarly and often interchangeably. As an
 * abstract class, there is no such thing as a plain Node object. All objects that implement
 * Node functionality are based on one of its subclasses. Most notable are Document, Element,
 * and DocumentFragment.
 *
 * In addition, every kind of DOM node is represented by an interface based on Node. These
 * include Attr, CharacterData (which Text, Comment, CDATASection and ProcessingInstruction are
 * all based on), and DocumentType.
 *
 * In some cases, a particular feature of the base Node interface may not apply to one of its
 * child interfaces; in that case, the inheriting node may return null or throw an exception,
 * depending on circumstances. For example, attempting to add children to a node type that
 * cannot have children will throw an exception.
 *
 * **This behavior is slightly different from the in the specs**:
 * - unimplemented interfaces: `EventTarget`
 *
 * @class
 * @abstract
 * @param {Symbol} symbol
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 * @see https://dom.spec.whatwg.org/#node
 * @prettierignore
 */
function Node(symbol) {
	checkSymbol(symbol);
}

Node.prototype = {
	/**
	 * The first child of this node.
	 *
	 * @type {Node | null}
	 */
	firstChild: null,
	/**
	 * The last child of this node.
	 *
	 * @type {Node | null}
	 */
	lastChild: null,
	/**
	 * The previous sibling of this node.
	 *
	 * @type {Node | null}
	 */
	previousSibling: null,
	/**
	 * The next sibling of this node.
	 *
	 * @type {Node | null}
	 */
	nextSibling: null,
	/**
	 * The parent node of this node.
	 *
	 * @type {Node | null}
	 */
	parentNode: null,
	/**
	 * The parent element of this node.
	 *
	 * @type {Element | null}
	 */
	get parentElement() {
		return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
	},
	/**
	 * The child nodes of this node.
	 *
	 * @type {NodeList}
	 */
	childNodes: null,
	/**
	 * The document object associated with this node.
	 *
	 * @type {Document | null}
	 */
	ownerDocument: null,
	/**
	 * The value of this node.
	 *
	 * @type {string | null}
	 */
	nodeValue: null,
	/**
	 * The namespace URI of this node.
	 *
	 * @type {string | null}
	 */
	namespaceURI: null,
	/**
	 * The prefix of the namespace for this node.
	 *
	 * @type {string | null}
	 */
	prefix: null,
	/**
	 * The local part of the qualified name of this node.
	 *
	 * @type {string | null}
	 */
	localName: null,
	/**
	 * The baseURI is currently always `about:blank`,
	 * since that's what happens when you create a document from scratch.
	 *
	 * @type {'about:blank'}
	 */
	baseURI: 'about:blank',
	/**
	 * Is true if this node is part of a document.
	 *
	 * @type {boolean}
	 */
	get isConnected() {
		var rootNode = this.getRootNode();
		return rootNode && rootNode.nodeType === rootNode.DOCUMENT_NODE;
	},
	/**
	 * Checks whether `other` is an inclusive descendant of this node.
	 *
	 * @param {Node | null | undefined} other
	 * The node to check.
	 * @returns {boolean}
	 * True if `other` is an inclusive descendant of this node; false otherwise.
	 * @see https://dom.spec.whatwg.org/#dom-node-contains
	 */
	contains: function (other) {
		if (!other) return false;
		var parent = other;
		do {
			if (this === parent) return true;
			parent = other.parentNode;
		} while (parent);
		return false;
	},
	/**
	 * @typedef GetRootNodeOptions
	 * @property {boolean} [composed=false]
	 */
	/**
	 * Searches for the root node of this node.
	 *
	 * **This behavior is slightly different from the in the specs**:
	 * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
	 *
	 * @param {GetRootNodeOptions} [options]
	 * @returns {Node}
	 * Root node.
	 * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
	 * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
	 */
	getRootNode: function (options) {
		var parent = this;
		do {
			if (!parent.parentNode) {
				return parent;
			}
			parent = parent.parentNode;
		} while (parent);
	},
	/**
	 * Checks whether the given node is equal to this node.
	 *
	 * @param {Node} [otherNode]
	 * @see https://dom.spec.whatwg.org/#concept-node-equals
	 */
	isEqualNode: function (otherNode) {
		if (!otherNode) return false;

		if (this.nodeType !== otherNode.nodeType) return false;

		switch (this.nodeType) {
			case this.DOCUMENT_TYPE_NODE:
				if (this.name !== otherNode.name) return false;
				if (this.publicId !== otherNode.publicId) return false;
				if (this.systemId !== otherNode.systemId) return false;
				break;
			case this.ELEMENT_NODE:
				if (this.namespaceURI !== otherNode.namespaceURI) return false;
				if (this.prefix !== otherNode.prefix) return false;
				if (this.localName !== otherNode.localName) return false;
				if (this.attributes.length !== otherNode.attributes.length) return false;
				for (var i = 0; i < this.attributes.length; i++) {
					var attr = this.attributes.item(i);
					if (!attr.isEqualNode(otherNode.getAttributeNodeNS(attr.namespaceURI, attr.localName))) {
						return false;
					}
				}
				break;
			case this.ATTRIBUTE_NODE:
				if (this.namespaceURI !== otherNode.namespaceURI) return false;
				if (this.localName !== otherNode.localName) return false;
				if (this.value !== otherNode.value) return false;

				break;
			case this.PROCESSING_INSTRUCTION_NODE:
				if (this.target !== otherNode.target || this.data !== otherNode.data) {
					return false;
				}
				break;
			case this.TEXT_NODE:
			case this.COMMENT_NODE:
				if (this.data !== otherNode.data) return false;
				break;
		}

		if (this.childNodes.length !== otherNode.childNodes.length) {
			return false;
		}

		for (var i = 0; i < this.childNodes.length; i++) {
			if (!this.childNodes[i].isEqualNode(otherNode.childNodes[i])) {
				return false;
			}
		}

		return true;
	},
	/**
	 * Checks whether or not the given node is this node.
	 *
	 * @param {Node} [otherNode]
	 */
	isSameNode: function (otherNode) {
		return this === otherNode;
	},
	/**
	 * Inserts a node before a reference node as a child of this node.
	 *
	 * @param {Node} newChild
	 * The new child node to be inserted.
	 * @param {Node | null} refChild
	 * The reference node before which newChild will be inserted.
	 * @returns {Node}
	 * The new child node successfully inserted.
	 * @throws {DOMException}
	 * Throws a DOMException if inserting the node would result in a DOM tree that is not
	 * well-formed, or if `child` is provided but is not a child of `parent`.
	 * See {@link _insertBefore} for more details.
	 * @since Modified in DOM L2
	 */
	insertBefore: function (newChild, refChild) {
		return _insertBefore(this, newChild, refChild);
	},
	/**
	 * Replaces an old child node with a new child node within this node.
	 *
	 * @param {Node} newChild
	 * The new node that is to replace the old node.
	 * If it already exists in the DOM, it is removed from its original position.
	 * @param {Node} oldChild
	 * The existing child node to be replaced.
	 * @returns {Node}
	 * Returns the replaced child node.
	 * @throws {DOMException}
	 * Throws a DOMException if replacing the node would result in a DOM tree that is not
	 * well-formed, or if `oldChild` is not a child of `this`.
	 * This can also occur if the pre-replacement validity assertion fails.
	 * See {@link _insertBefore}, {@link Node.removeChild}, and
	 * {@link assertPreReplacementValidityInDocument} for more details.
	 * @see https://dom.spec.whatwg.org/#concept-node-replace
	 */
	replaceChild: function (newChild, oldChild) {
		_insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
		if (oldChild) {
			this.removeChild(oldChild);
		}
	},
	/**
	 * Removes an existing child node from this node.
	 *
	 * @param {Node} oldChild
	 * The child node to be removed.
	 * @returns {Node}
	 * Returns the removed child node.
	 * @throws {DOMException}
	 * Throws a DOMException if `oldChild` is not a child of `this`.
	 * See {@link _removeChild} for more details.
	 */
	removeChild: function (oldChild) {
		return _removeChild(this, oldChild);
	},
	/**
	 * Appends a child node to this node.
	 *
	 * @param {Node} newChild
	 * The child node to be appended to this node.
	 * If it already exists in the DOM, it is removed from its original position.
	 * @returns {Node}
	 * Returns the appended child node.
	 * @throws {DOMException}
	 * Throws a DOMException if appending the node would result in a DOM tree that is not
	 * well-formed, or if `newChild` is not a valid Node.
	 * See {@link insertBefore} for more details.
	 */
	appendChild: function (newChild) {
		return this.insertBefore(newChild, null);
	},
	/**
	 * Determines whether this node has any child nodes.
	 *
	 * @returns {boolean}
	 * Returns true if this node has any child nodes, and false otherwise.
	 */
	hasChildNodes: function () {
		return this.firstChild != null;
	},
	/**
	 * Creates a copy of the calling node.
	 *
	 * @param {boolean} deep
	 * If true, the contents of the node are recursively copied.
	 * If false, only the node itself (and its attributes, if it is an element) are copied.
	 * @returns {Node}
	 * Returns the newly created copy of the node.
	 * @throws {DOMException}
	 * May throw a DOMException if operations within {@link Element#setAttributeNode} or
	 * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
	 * specific constraints.
	 * @see {@link cloneNode}
	 */
	cloneNode: function (deep) {
		return cloneNode(this.ownerDocument || this, this, deep);
	},
	/**
	 * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
	 * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
	 *
	 * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
	 * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
	 * nodes.
	 *
	 * This method operates recursively, so it also normalizes any and all descendent nodes within
	 * the subtree.
	 *
	 * @throws {DOMException}
	 * May throw a DOMException if operations within removeChild or appendData (which are
	 * potentially invoked in this method) do not meet their specific constraints.
	 * @since Modified in DOM Level 2
	 * @see {@link Node.removeChild}
	 * @see {@link CharacterData.appendData}
	 */
	normalize: function () {
		var child = this.firstChild;
		while (child) {
			var next = child.nextSibling;
			if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
				this.removeChild(next);
				child.appendData(next.data);
			} else {
				child.normalize();
				child = next;
			}
		}
	},
	/**
	 * Checks whether the DOM implementation implements a specific feature and its version.
	 *
	 * @deprecated
	 * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
	 * @param {string} feature
	 * The package name of the feature to test. This is the same name that can be passed to the
	 * method `hasFeature` on `DOMImplementation`.
	 * @param {string} version
	 * This is the version number of the package name to test.
	 * @returns {boolean}
	 * Returns true in all cases in the current implementation.
	 * @since Introduced in DOM Level 2
	 * @see {@link DOMImplementation.hasFeature}
	 */
	isSupported: function (feature, version) {
		return this.ownerDocument.implementation.hasFeature(feature, version);
	},
	/**
	 * Look up the prefix associated to the given namespace URI, starting from this node.
	 * **The default namespace declarations are ignored by this method.**
	 * See Namespace Prefix Lookup for details on the algorithm used by this method.
	 *
	 * **This behavior is different from the in the specs**:
	 * - no node type specific handling
	 * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
	 *
	 * @param {string | null} namespaceURI
	 * The namespace URI for which to find the associated prefix.
	 * @returns {string | null}
	 * The associated prefix, if found; otherwise, null.
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
	 * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
	 * @see https://github.com/xmldom/xmldom/issues/322
	 * @prettierignore
	 */
	lookupPrefix: function (namespaceURI) {
		var el = this;
		while (el) {
			var map = el._nsMap;
			//console.dir(map)
			if (map) {
				for (var n in map) {
					if (hasOwn$1(map, n) && map[n] === namespaceURI) {
						return n;
					}
				}
			}
			el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
		}
		return null;
	},
	/**
	 * This function is used to look up the namespace URI associated with the given prefix,
	 * starting from this node.
	 *
	 * **This behavior is different from the in the specs**:
	 * - no node type specific handling
	 * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
	 *
	 * @param {string | null} prefix
	 * The prefix for which to find the associated namespace URI.
	 * @returns {string | null}
	 * The associated namespace URI, if found; otherwise, null.
	 * @since DOM Level 3
	 * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
	 * @prettierignore
	 */
	lookupNamespaceURI: function (prefix) {
		var el = this;
		while (el) {
			var map = el._nsMap;
			//console.dir(map)
			if (map) {
				if (hasOwn$1(map, prefix)) {
					return map[prefix];
				}
			}
			el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
		}
		return null;
	},
	/**
	 * Determines whether the given namespace URI is the default namespace.
	 *
	 * The function works by looking up the prefix associated with the given namespace URI. If no
	 * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
	 * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
	 * the default.
	 *
	 * **This behavior is different from the in the specs**:
	 * - no node type specific handling
	 * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
	 *
	 * @param {string | null} namespaceURI
	 * The namespace URI to be checked.
	 * @returns {boolean}
	 * Returns true if the given namespace URI is the default namespace, false otherwise.
	 * @since DOM Level 3
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
	 * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
	 * @prettierignore
	 */
	isDefaultNamespace: function (namespaceURI) {
		var prefix = this.lookupPrefix(namespaceURI);
		return prefix == null;
	},
	/**
	 * Compares the reference node with a node with regard to their position in the document and
	 * according to the document order.
	 *
	 * @param {Node} other
	 * The node to compare the reference node to.
	 * @returns {number}
	 * Returns how the node is positioned relatively to the reference node according to the
	 * bitmask. 0 if reference node and given node are the same.
	 * @since DOM Level 3
	 * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
	 * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
	 */
	compareDocumentPosition: function (other) {
		if (this === other) return 0;
		var node1 = other;
		var node2 = this;
		var attr1 = null;
		var attr2 = null;
		if (node1 instanceof Attr) {
			attr1 = node1;
			node1 = attr1.ownerElement;
		}
		if (node2 instanceof Attr) {
			attr2 = node2;
			node2 = attr2.ownerElement;
			if (attr1 && node1 && node2 === node1) {
				for (var i = 0, attr; (attr = node2.attributes[i]); i++) {
					if (attr === attr1)
						return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
					if (attr === attr2)
						return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
				}
			}
		}
		if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument) {
			return (
				DocumentPosition.DOCUMENT_POSITION_DISCONNECTED +
				DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC +
				(docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument)
					? DocumentPosition.DOCUMENT_POSITION_FOLLOWING
					: DocumentPosition.DOCUMENT_POSITION_PRECEDING)
			);
		}
		if (attr2 && node1 === node2) {
			return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
		}
		if (attr1 && node1 === node2) {
			return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
		}

		var chain1 = [];
		var ancestor1 = node1.parentNode;
		while (ancestor1) {
			if (!attr2 && ancestor1 === node2) {
				return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
			}
			chain1.push(ancestor1);
			ancestor1 = ancestor1.parentNode;
		}
		chain1.reverse();

		var chain2 = [];
		var ancestor2 = node2.parentNode;
		while (ancestor2) {
			if (!attr1 && ancestor2 === node1) {
				return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
			}
			chain2.push(ancestor2);
			ancestor2 = ancestor2.parentNode;
		}
		chain2.reverse();

		var ca = commonAncestor(chain1, chain2);
		for (var n in ca.childNodes) {
			var child = ca.childNodes[n];
			if (child === node2) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
			if (child === node1) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
			if (chain2.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
			if (chain1.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
		}
		return 0;
	},
};

/**
 * Encodes special XML characters to their corresponding entities.
 *
 * @param {string} c
 * The character to be encoded.
 * @returns {string}
 * The encoded character.
 * @private
 */
function _xmlEncoder(c) {
	return (
		(c == '<' && '&lt;') || (c == '>' && '&gt;') || (c == '&' && '&amp;') || (c == '"' && '&quot;') || '&#' + c.charCodeAt() + ';'
	);
}

copy(NodeType, Node);
copy(NodeType, Node.prototype);
copy(DocumentPosition, Node);
copy(DocumentPosition, Node.prototype);

/**
 * @param callback
 * Return true for continue,false for break.
 * @returns
 * boolean true: break visit;
 */
function _visitNode(node, callback) {
	if (callback(node)) {
		return true;
	}
	if ((node = node.firstChild)) {
		do {
			if (_visitNode(node, callback)) {
				return true;
			}
		} while ((node = node.nextSibling));
	}
}

/**
 * @typedef DocumentOptions
 * @property {string} [contentType=MIME_TYPE.XML_APPLICATION]
 */
/**
 * The Document interface describes the common properties and methods for any kind of document.
 *
 * It should usually be created using `new DOMImplementation().createDocument(...)`
 * or `new DOMImplementation().createHTMLDocument(...)`.
 *
 * The constructor is considered a private API and offers to initially set the `contentType`
 * property via it's options parameter.
 *
 * @class
 * @param {Symbol} symbol
 * @param {DocumentOptions} [options]
 * @augments Node
 * @private
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 * @see https://dom.spec.whatwg.org/#interface-document
 */
function Document(symbol, options) {
	checkSymbol(symbol);

	var opt = options || {};
	this.ownerDocument = this;
	/**
	 * The mime type of the document is determined at creation time and can not be modified.
	 *
	 * @type {string}
	 * @see https://dom.spec.whatwg.org/#concept-document-content-type
	 * @see {@link DOMImplementation}
	 * @see {@link MIME_TYPE}
	 * @readonly
	 */
	this.contentType = opt.contentType || MIME_TYPE$1.XML_APPLICATION;
	/**
	 * @type {'html' | 'xml'}
	 * @see https://dom.spec.whatwg.org/#concept-document-type
	 * @see {@link DOMImplementation}
	 * @readonly
	 */
	this.type = isHTMLMimeType$2(this.contentType) ? 'html' : 'xml';
}

/**
 * Updates the namespace mapping of an element when a new attribute is added.
 *
 * @param {Document} doc
 * The document that the element belongs to.
 * @param {Element} el
 * The element to which the attribute is being added.
 * @param {Attr} newAttr
 * The new attribute being added.
 * @private
 */
function _onAddAttribute(doc, el, newAttr) {
	doc && doc._inc++;
	var ns = newAttr.namespaceURI;
	if (ns === NAMESPACE$2.XMLNS) {
		//update namespace
		el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
	}
}

/**
 * Updates the namespace mapping of an element when an attribute is removed.
 *
 * @param {Document} doc
 * The document that the element belongs to.
 * @param {Element} el
 * The element from which the attribute is being removed.
 * @param {Attr} newAttr
 * The attribute being removed.
 * @param {boolean} remove
 * Indicates whether the attribute is to be removed.
 * @private
 */
function _onRemoveAttribute(doc, el, newAttr, remove) {
	doc && doc._inc++;
	var ns = newAttr.namespaceURI;
	if (ns === NAMESPACE$2.XMLNS) {
		//update namespace
		delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
	}
}

/**
 * Updates `parent.childNodes`, adjusting the indexed items and its `length`.
 * If `newChild` is provided and has no nextSibling, it will be appended.
 * Otherwise, it's assumed that an item has been removed or inserted,
 * and `parent.firstNode` and its `.nextSibling` to re-indexing all child nodes of `parent`.
 *
 * @param {Document} doc
 * The parent document of `el`.
 * @param {Node} parent
 * The parent node whose childNodes list needs to be updated.
 * @param {Node} [newChild]
 * The new child node to be appended. If not provided, the function assumes a node has been
 * removed.
 * @private
 */
function _onUpdateChild(doc, parent, newChild) {
	if (doc && doc._inc) {
		doc._inc++;
		var childNodes = parent.childNodes;
		// assumes nextSibling and previousSibling were already configured upfront
		if (newChild && !newChild.nextSibling) {
			// if an item has been appended, we only need to update the last index and the length
			childNodes[childNodes.length++] = newChild;
		} else {
			// otherwise we need to reindex all items,
			// which can take a while when processing nodes with a lot of children
			var child = parent.firstChild;
			var i = 0;
			while (child) {
				childNodes[i++] = child;
				child = child.nextSibling;
			}
			childNodes.length = i;
			delete childNodes[childNodes.length];
		}
	}
}

/**
 * Removes the connections between `parentNode` and `child`
 * and any existing `child.previousSibling` or `child.nextSibling`.
 *
 * @param {Node} parentNode
 * The parent node from which the child node is to be removed.
 * @param {Node} child
 * The child node to be removed from the parentNode.
 * @returns {Node}
 * Returns the child node that was removed.
 * @throws {DOMException}
 * With code:
 * - {@link DOMException.NOT_FOUND_ERR} If the parentNode is not the parent of the child node.
 * @private
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 */
function _removeChild(parentNode, child) {
	if (parentNode !== child.parentNode) {
		throw new DOMException$1(DOMException$1.NOT_FOUND_ERR, "child's parent is not parent");
	}
	var oldPreviousSibling = child.previousSibling;
	var oldNextSibling = child.nextSibling;
	if (oldPreviousSibling) {
		oldPreviousSibling.nextSibling = oldNextSibling;
	} else {
		parentNode.firstChild = oldNextSibling;
	}
	if (oldNextSibling) {
		oldNextSibling.previousSibling = oldPreviousSibling;
	} else {
		parentNode.lastChild = oldPreviousSibling;
	}
	_onUpdateChild(parentNode.ownerDocument, parentNode);
	child.parentNode = null;
	child.previousSibling = null;
	child.nextSibling = null;
	return child;
}

/**
 * Returns `true` if `node` can be a parent for insertion.
 *
 * @param {Node} node
 * @returns {boolean}
 */
function hasValidParentNodeType(node) {
	return (
		node &&
		(node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE)
	);
}

/**
 * Returns `true` if `node` can be inserted according to it's `nodeType`.
 *
 * @param {Node} node
 * @returns {boolean}
 */
function hasInsertableNodeType(node) {
	return (
		node &&
		(node.nodeType === Node.CDATA_SECTION_NODE ||
			node.nodeType === Node.COMMENT_NODE ||
			node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
			node.nodeType === Node.DOCUMENT_TYPE_NODE ||
			node.nodeType === Node.ELEMENT_NODE ||
			node.nodeType === Node.PROCESSING_INSTRUCTION_NODE ||
			node.nodeType === Node.TEXT_NODE)
	);
}

/**
 * Returns true if `node` is a DOCTYPE node.
 *
 * @param {Node} node
 * @returns {boolean}
 */
function isDocTypeNode(node) {
	return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
}

/**
 * Returns true if the node is an element.
 *
 * @param {Node} node
 * @returns {boolean}
 */
function isElementNode(node) {
	return node && node.nodeType === Node.ELEMENT_NODE;
}
/**
 * Returns true if `node` is a text node.
 *
 * @param {Node} node
 * @returns {boolean}
 */
function isTextNode(node) {
	return node && node.nodeType === Node.TEXT_NODE;
}

/**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Document} doc
 * The document node.
 * @param {Node} child
 * The node that would become the nextSibling if the element would be inserted.
 * @returns {boolean}
 * `true` if an element can be inserted before child.
 * @private
 */
function isElementInsertionPossible(doc, child) {
	var parentChildNodes = doc.childNodes || [];
	if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
		return false;
	}
	var docTypeNode = find(parentChildNodes, isDocTypeNode);
	return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}

/**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Node} doc
 * The document node.
 * @param {Node} child
 * The node that would become the nextSibling if the element would be inserted.
 * @returns {boolean}
 * `true` if an element can be inserted before child.
 * @private
 */
function isElementReplacementPossible(doc, child) {
	var parentChildNodes = doc.childNodes || [];

	function hasElementChildThatIsNotChild(node) {
		return isElementNode(node) && node !== child;
	}

	if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
		return false;
	}
	var docTypeNode = find(parentChildNodes, isDocTypeNode);
	return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}

/**
 * Asserts pre-insertion validity of a node into a parent before a child.
 * Throws errors for invalid node combinations that would result in an ill-formed DOM.
 *
 * @param {Node} parent
 * The parent node to insert `node` into.
 * @param {Node} node
 * The node to insert.
 * @param {Node | null} child
 * The node that should become the `nextSibling` of `node`. If null, no sibling is considered.
 * @throws {DOMException}
 * With code:
 * - {@link DOMException.HIERARCHY_REQUEST_ERR} If `parent` is not a Document,
 * DocumentFragment, or Element node.
 * - {@link DOMException.HIERARCHY_REQUEST_ERR} If `node` is a host-including inclusive
 * ancestor of `parent`. (Currently not implemented)
 * - {@link DOMException.NOT_FOUND_ERR} If `child` is non-null and its `parent` is not
 * `parent`.
 * - {@link DOMException.HIERARCHY_REQUEST_ERR} If `node` is not a DocumentFragment,
 * DocumentType, Element, or CharacterData node.
 * - {@link DOMException.HIERARCHY_REQUEST_ERR} If either `node` is a Text node and `parent` is
 * a document, or if `node` is a doctype and `parent` is not a document.
 * @private
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreInsertionValidity1to5(parent, node, child) {
	// 1. If `parent` is not a Document, DocumentFragment, or Element node, then throw a "HierarchyRequestError" DOMException.
	if (!hasValidParentNodeType(parent)) {
		throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Unexpected parent node type ' + parent.nodeType);
	}
	// 2. If `node` is a host-including inclusive ancestor of `parent`, then throw a "HierarchyRequestError" DOMException.
	// not implemented!
	// 3. If `child` is non-null and its parent is not `parent`, then throw a "NotFoundError" DOMException.
	if (child && child.parentNode !== parent) {
		throw new DOMException$1(DOMException$1.NOT_FOUND_ERR, 'child not in parent');
	}
	if (
		// 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
		!hasInsertableNodeType(node) ||
		// 5. If either `node` is a Text node and `parent` is a document,
		// the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
		// || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
		// or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
		(isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE)
	) {
		throw new DOMException$1(
			DOMException$1.HIERARCHY_REQUEST_ERR,
			'Unexpected node type ' + node.nodeType + ' for parent node type ' + parent.nodeType
		);
	}
}

/**
 * Asserts pre-insertion validity of a node into a document before a child.
 * Throws errors for invalid node combinations that would result in an ill-formed DOM.
 *
 * @param {Document} parent
 * The parent node to insert `node` into.
 * @param {Node} node
 * The node to insert.
 * @param {Node | undefined} child
 * The node that should become the `nextSibling` of `node`. If undefined, no sibling is
 * considered.
 * @returns {Node}
 * @throws {DOMException}
 * With code:
 * - {@link DOMException.HIERARCHY_REQUEST_ERR} If `node` is a DocumentFragment with more than
 * one element child or has a Text node child.
 * - {@link DOMException.HIERARCHY_REQUEST_ERR} If `node` is a DocumentFragment with one
 * element child and either `parent` has an element child, `child` is a doctype, or `child` is
 * non-null and a doctype is following `child`.
 * - {@link DOMException.HIERARCHY_REQUEST_ERR} If `node` is an Element and `parent` has an
 * element child, `child` is a doctype, or `child` is non-null and a doctype is following
 * `child`.
 * - {@link DOMException.HIERARCHY_REQUEST_ERR} If `node` is a DocumentType and `parent` has a
 * doctype child, `child` is non-null and an element is preceding `child`, or `child` is null
 * and `parent` has an element child.
 * @private
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreInsertionValidityInDocument(parent, node, child) {
	var parentChildNodes = parent.childNodes || [];
	var nodeChildNodes = node.childNodes || [];

	// DocumentFragment
	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		var nodeChildElements = nodeChildNodes.filter(isElementNode);
		// If node has more than one element child or has a Text node child.
		if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'More than one element or text in fragment');
		}
		// Otherwise, if `node` has one element child and either `parent` has an element child,
		// `child` is a doctype, or `child` is non-null and a doctype is following `child`.
		if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Element in fragment can not be inserted before doctype');
		}
	}
	// Element
	if (isElementNode(node)) {
		// `parent` has an element child, `child` is a doctype,
		// or `child` is non-null and a doctype is following `child`.
		if (!isElementInsertionPossible(parent, child)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Only one element can be added and only after doctype');
		}
	}
	// DocumentType
	if (isDocTypeNode(node)) {
		// `parent` has a doctype child,
		if (find(parentChildNodes, isDocTypeNode)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Only one doctype is allowed');
		}
		var parentElementChild = find(parentChildNodes, isElementNode);
		// `child` is non-null and an element is preceding `child`,
		if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Doctype can only be inserted before an element');
		}
		// or `child` is null and `parent` has an element child.
		if (!child && parentElementChild) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Doctype can not be appended since element is present');
		}
	}
}

/**
 * @param {Document} parent
 * The parent node to insert `node` into.
 * @param {Node} node
 * The node to insert.
 * @param {Node | undefined} child
 * the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws {DOMException}
 * For several node combinations that would create a DOM that is not well-formed.
 * @throws {DOMException}
 * If `child` is provided but is not a child of `parent`.
 * @private
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreReplacementValidityInDocument(parent, node, child) {
	var parentChildNodes = parent.childNodes || [];
	var nodeChildNodes = node.childNodes || [];

	// DocumentFragment
	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		var nodeChildElements = nodeChildNodes.filter(isElementNode);
		// If `node` has more than one element child or has a Text node child.
		if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'More than one element or text in fragment');
		}
		// Otherwise, if `node` has one element child and either `parent` has an element child that is not `child` or a doctype is following `child`.
		if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Element in fragment can not be inserted before doctype');
		}
	}
	// Element
	if (isElementNode(node)) {
		// `parent` has an element child that is not `child` or a doctype is following `child`.
		if (!isElementReplacementPossible(parent, child)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Only one element can be added and only after doctype');
		}
	}
	// DocumentType
	if (isDocTypeNode(node)) {
		function hasDoctypeChildThatIsNotChild(node) {
			return isDocTypeNode(node) && node !== child;
		}

		// `parent` has a doctype child that is not `child`,
		if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Only one doctype is allowed');
		}
		var parentElementChild = find(parentChildNodes, isElementNode);
		// or an element is preceding `child`.
		if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
			throw new DOMException$1(DOMException$1.HIERARCHY_REQUEST_ERR, 'Doctype can only be inserted before an element');
		}
	}
}

/**
 * Inserts a node into a parent node before a child node.
 *
 * @param {Node} parent
 * The parent node to insert the node into.
 * @param {Node} node
 * The node to insert into the parent.
 * @param {Node | null} child
 * The node that should become the next sibling of the node.
 * If null, the function inserts the node at the end of the children of the parent node.
 * @param {Function} [_inDocumentAssertion]
 * An optional function to check pre-insertion validity if parent is a document node.
 * Defaults to {@link assertPreInsertionValidityInDocument}
 * @returns {Node}
 * Returns the inserted node.
 * @throws {DOMException}
 * Throws a DOMException if inserting the node would result in a DOM tree that is not
 * well-formed. See {@link assertPreInsertionValidity1to5},
 * {@link assertPreInsertionValidityInDocument}.
 * @throws {DOMException}
 * Throws a DOMException if child is provided but is not a child of the parent. See
 * {@link Node.removeChild}
 * @private
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function _insertBefore(parent, node, child, _inDocumentAssertion) {
	// To ensure pre-insertion validity of a node into a parent before a child, run these steps:
	assertPreInsertionValidity1to5(parent, node, child);

	// If parent is a document, and any of the statements below, switched on the interface node implements,
	// are true, then throw a "HierarchyRequestError" DOMException.
	if (parent.nodeType === Node.DOCUMENT_NODE) {
		(_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
	}

	var cp = node.parentNode;
	if (cp) {
		cp.removeChild(node); //remove and update
	}
	if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
		var newFirst = node.firstChild;
		if (newFirst == null) {
			return node;
		}
		var newLast = node.lastChild;
	} else {
		newFirst = newLast = node;
	}
	var pre = child ? child.previousSibling : parent.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = child;

	if (pre) {
		pre.nextSibling = newFirst;
	} else {
		parent.firstChild = newFirst;
	}
	if (child == null) {
		parent.lastChild = newLast;
	} else {
		child.previousSibling = newLast;
	}
	do {
		newFirst.parentNode = parent;
	} while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
	_onUpdateChild(parent.ownerDocument || parent, parent, node);
	if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
		node.firstChild = node.lastChild = null;
	}

	return node;
}

Document.prototype = {
	/**
	 * The implementation that created this document.
	 *
	 * @type DOMImplementation
	 * @readonly
	 */
	implementation: null,
	nodeName: '#document',
	nodeType: DOCUMENT_NODE,
	/**
	 * The DocumentType node of the document.
	 *
	 * @type DocumentType
	 * @readonly
	 */
	doctype: null,
	documentElement: null,
	_inc: 1,

	insertBefore: function (newChild, refChild) {
		//raises
		if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
			var child = newChild.firstChild;
			while (child) {
				var next = child.nextSibling;
				this.insertBefore(child, refChild);
				child = next;
			}
			return newChild;
		}
		_insertBefore(this, newChild, refChild);
		newChild.ownerDocument = this;
		if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
			this.documentElement = newChild;
		}

		return newChild;
	},
	removeChild: function (oldChild) {
		var removed = _removeChild(this, oldChild);
		if (removed === this.documentElement) {
			this.documentElement = null;
		}
		return removed;
	},
	replaceChild: function (newChild, oldChild) {
		//raises
		_insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
		newChild.ownerDocument = this;
		if (oldChild) {
			this.removeChild(oldChild);
		}
		if (isElementNode(newChild)) {
			this.documentElement = newChild;
		}
	},
	// Introduced in DOM Level 2:
	importNode: function (importedNode, deep) {
		return importNode(this, importedNode, deep);
	},
	// Introduced in DOM Level 2:
	getElementById: function (id) {
		var rtv = null;
		_visitNode(this.documentElement, function (node) {
			if (node.nodeType == ELEMENT_NODE) {
				if (node.getAttribute('id') == id) {
					rtv = node;
					return true;
				}
			}
		});
		return rtv;
	},

	/**
	 * Creates a new `Element` that is owned by this `Document`.
	 * In HTML Documents `localName` is the lower cased `tagName`,
	 * otherwise no transformation is being applied.
	 * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
	 *
	 * __This implementation differs from the specification:__ - The provided name is not checked
	 * against the `Name` production,
	 * so no related error will be thrown.
	 * - There is no interface `HTMLElement`, it is always an `Element`.
	 * - There is no support for a second argument to indicate using custom elements.
	 *
	 * @param {string} tagName
	 * @returns {Element}
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
	 * @see https://dom.spec.whatwg.org/#dom-document-createelement
	 * @see https://dom.spec.whatwg.org/#concept-create-element
	 */
	createElement: function (tagName) {
		var node = new Element(PDC);
		node.ownerDocument = this;
		if (this.type === 'html') {
			tagName = tagName.toLowerCase();
		}
		if (hasDefaultHTMLNamespace$1(this.contentType)) {
			node.namespaceURI = NAMESPACE$2.HTML;
		}
		node.nodeName = tagName;
		node.tagName = tagName;
		node.localName = tagName;
		node.childNodes = new NodeList();
		var attrs = (node.attributes = new NamedNodeMap());
		attrs._ownerElement = node;
		return node;
	},
	/**
	 * @returns {DocumentFragment}
	 */
	createDocumentFragment: function () {
		var node = new DocumentFragment(PDC);
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	/**
	 * @param {string} data
	 * @returns {Text}
	 */
	createTextNode: function (data) {
		var node = new Text(PDC);
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		node.appendData(data);
		return node;
	},
	/**
	 * @param {string} data
	 * @returns {Comment}
	 */
	createComment: function (data) {
		var node = new Comment(PDC);
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		node.appendData(data);
		return node;
	},
	/**
	 * @param {string} data
	 * @returns {CDATASection}
	 */
	createCDATASection: function (data) {
		var node = new CDATASection(PDC);
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		node.appendData(data);
		return node;
	},
	/**
	 * @param {string} target
	 * @param {string} data
	 * @returns {ProcessingInstruction}
	 */
	createProcessingInstruction: function (target, data) {
		var node = new ProcessingInstruction(PDC);
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		node.nodeName = node.target = target;
		node.nodeValue = node.data = data;
		return node;
	},
	/**
	 * Creates an `Attr` node that is owned by this document.
	 * In HTML Documents `localName` is the lower cased `name`,
	 * otherwise no transformation is being applied.
	 *
	 * __This implementation differs from the specification:__ - The provided name is not checked
	 * against the `Name` production,
	 * so no related error will be thrown.
	 *
	 * @param {string} name
	 * @returns {Attr}
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
	 * @see https://dom.spec.whatwg.org/#dom-document-createattribute
	 */
	createAttribute: function (name) {
		if (!g$1.QName_exact.test(name)) {
			throw new DOMException$1(DOMException$1.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
		}
		if (this.type === 'html') {
			name = name.toLowerCase();
		}
		return this._createAttribute(name);
	},
	_createAttribute: function (name) {
		var node = new Attr(PDC);
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		node.name = name;
		node.nodeName = name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	/**
	 * Creates an EntityReference object.
	 * The current implementation does not fill the `childNodes` with those of the corresponding
	 * `Entity`
	 *
	 * @deprecated
	 * In DOM Level 4.
	 * @param {string} name
	 * The name of the entity to reference. No namespace well-formedness checks are performed.
	 * @returns {EntityReference}
	 * @throws {DOMException}
	 * With code `INVALID_CHARACTER_ERR` when `name` is not valid.
	 * @throws {DOMException}
	 * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
	 */
	createEntityReference: function (name) {
		if (!g$1.Name.test(name)) {
			throw new DOMException$1(DOMException$1.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
		}
		if (this.type === 'html') {
			throw new DOMException$1('document is an html document', DOMExceptionName.NotSupportedError);
		}

		var node = new EntityReference(PDC);
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		node.nodeName = name;
		return node;
	},
	// Introduced in DOM Level 2:
	/**
	 * @param {string} namespaceURI
	 * @param {string} qualifiedName
	 * @returns {Element}
	 */
	createElementNS: function (namespaceURI, qualifiedName) {
		var validated = validateAndExtract(namespaceURI, qualifiedName);
		var node = new Element(PDC);
		var attrs = (node.attributes = new NamedNodeMap());
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = validated[0];
		node.prefix = validated[1];
		node.localName = validated[2];
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	/**
	 * @param {string} namespaceURI
	 * @param {string} qualifiedName
	 * @returns {Attr}
	 */
	createAttributeNS: function (namespaceURI, qualifiedName) {
		var validated = validateAndExtract(namespaceURI, qualifiedName);
		var node = new Attr(PDC);
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.specified = true;
		node.namespaceURI = validated[0];
		node.prefix = validated[1];
		node.localName = validated[2];
		return node;
	},
};
_extends(Document, Node);

function Element(symbol) {
	checkSymbol(symbol);

	this._nsMap = Object.create(null);
}
Element.prototype = {
	nodeType: ELEMENT_NODE,
	/**
	 * The attributes of this element.
	 *
	 * @type {NamedNodeMap | null}
	 */
	attributes: null,
	getQualifiedName: function () {
		return this.prefix ? this.prefix + ':' + this.localName : this.localName;
	},
	_isInHTMLDocumentAndNamespace: function () {
		return this.ownerDocument.type === 'html' && this.namespaceURI === NAMESPACE$2.HTML;
	},
	/**
	 * Implementaton of Level2 Core function hasAttributes.
	 *
	 * @returns {boolean}
	 * True if attribute list is not empty.
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-NodeHasAttrs
	 */
	hasAttributes: function () {
		return !!(this.attributes && this.attributes.length);
	},
	hasAttribute: function (name) {
		return !!this.getAttributeNode(name);
	},
	/**
	 * Returns element’s first attribute whose qualified name is `name`, and `null`
	 * if there is no such attribute.
	 *
	 * @param {string} name
	 * @returns {string | null}
	 */
	getAttribute: function (name) {
		var attr = this.getAttributeNode(name);
		return attr ? attr.value : null;
	},
	getAttributeNode: function (name) {
		if (this._isInHTMLDocumentAndNamespace()) {
			name = name.toLowerCase();
		}
		return this.attributes.getNamedItem(name);
	},
	/**
	 * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
	 *
	 * @param {string} name
	 * @param {string} value
	 */
	setAttribute: function (name, value) {
		if (this._isInHTMLDocumentAndNamespace()) {
			name = name.toLowerCase();
		}
		var attr = this.getAttributeNode(name);
		if (attr) {
			attr.value = attr.nodeValue = '' + value;
		} else {
			attr = this.ownerDocument._createAttribute(name);
			attr.value = attr.nodeValue = '' + value;
			this.setAttributeNode(attr);
		}
	},
	removeAttribute: function (name) {
		var attr = this.getAttributeNode(name);
		attr && this.removeAttributeNode(attr);
	},
	setAttributeNode: function (newAttr) {
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS: function (newAttr) {
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode: function (oldAttr) {
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS: function (namespaceURI, localName) {
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},

	hasAttributeNS: function (namespaceURI, localName) {
		return this.getAttributeNodeNS(namespaceURI, localName) != null;
	},
	/**
	 * Returns element’s attribute whose namespace is `namespaceURI` and local name is
	 * `localName`,
	 * or `null` if there is no such attribute.
	 *
	 * @param {string} namespaceURI
	 * @param {string} localName
	 * @returns {string | null}
	 */
	getAttributeNS: function (namespaceURI, localName) {
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr ? attr.value : null;
	},
	/**
	 * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
	 * `localName` to value.
	 *
	 * @param {string} namespaceURI
	 * @param {string} qualifiedName
	 * @param {string} value
	 * @see https://dom.spec.whatwg.org/#dom-element-setattributens
	 */
	setAttributeNS: function (namespaceURI, qualifiedName, value) {
		var validated = validateAndExtract(namespaceURI, qualifiedName);
		var localName = validated[2];
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		if (attr) {
			attr.value = attr.nodeValue = '' + value;
		} else {
			attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
			attr.value = attr.nodeValue = '' + value;
			this.setAttributeNode(attr);
		}
	},
	getAttributeNodeNS: function (namespaceURI, localName) {
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},

	/**
	 * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
	 *
	 * Returns an empty list if `classNames` is an empty string or only contains HTML white space
	 * characters.
	 *
	 * Warning: This returns a live LiveNodeList.
	 * Changes in the DOM will reflect in the array as the changes occur.
	 * If an element selected by this array no longer qualifies for the selector,
	 * it will automatically be removed. Be aware of this for iteration purposes.
	 *
	 * @param {string} classNames
	 * Is a string representing the class name(s) to match; multiple class names are separated by
	 * (ASCII-)whitespace.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
	 * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
	 */
	getElementsByClassName: function (classNames) {
		var classNamesSet = toOrderedSet(classNames);
		return new LiveNodeList(this, function (base) {
			var ls = [];
			if (classNamesSet.length > 0) {
				_visitNode(base, function (node) {
					if (node !== base && node.nodeType === ELEMENT_NODE) {
						var nodeClassNames = node.getAttribute('class');
						// can be null if the attribute does not exist
						if (nodeClassNames) {
							// before splitting and iterating just compare them for the most common case
							var matches = classNames === nodeClassNames;
							if (!matches) {
								var nodeClassNamesSet = toOrderedSet(nodeClassNames);
								matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
							}
							if (matches) {
								ls.push(node);
							}
						}
					}
				});
			}
			return ls;
		});
	},

	/**
	 * Returns a LiveNodeList of elements with the given qualifiedName.
	 * Searching for all descendants can be done by passing `*` as `qualifiedName`.
	 *
	 * All descendants of the specified element are searched, but not the element itself.
	 * The returned list is live, which means it updates itself with the DOM tree automatically.
	 * Therefore, there is no need to call `Element.getElementsByTagName()`
	 * with the same element and arguments repeatedly if the DOM changes in between calls.
	 *
	 * When called on an HTML element in an HTML document,
	 * `getElementsByTagName` lower-cases the argument before searching for it.
	 * This is undesirable when trying to match camel-cased SVG elements (such as
	 * `<linearGradient>`) in an HTML document.
	 * Instead, use `Element.getElementsByTagNameNS()`,
	 * which preserves the capitalization of the tag name.
	 *
	 * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
	 * except that it only searches for elements that are descendants of the specified element.
	 *
	 * @param {string} qualifiedName
	 * @returns {LiveNodeList}
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
	 * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
	 */
	getElementsByTagName: function (qualifiedName) {
		var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === 'html';
		var lowerQualifiedName = qualifiedName.toLowerCase();
		return new LiveNodeList(this, function (base) {
			var ls = [];
			_visitNode(base, function (node) {
				if (node === base || node.nodeType !== ELEMENT_NODE) {
					return;
				}
				if (qualifiedName === '*') {
					ls.push(node);
				} else {
					var nodeQualifiedName = node.getQualifiedName();
					var matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE$2.HTML ? lowerQualifiedName : qualifiedName;
					if (nodeQualifiedName === matchingQName) {
						ls.push(node);
					}
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS: function (namespaceURI, localName) {
		return new LiveNodeList(this, function (base) {
			var ls = [];
			_visitNode(base, function (node) {
				if (
					node !== base &&
					node.nodeType === ELEMENT_NODE &&
					(namespaceURI === '*' || node.namespaceURI === namespaceURI) &&
					(localName === '*' || node.localName == localName)
				) {
					ls.push(node);
				}
			});
			return ls;
		});
	},
};
Document.prototype.getElementsByClassName = Element.prototype.getElementsByClassName;
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;

_extends(Element, Node);
function Attr(symbol) {
	checkSymbol(symbol);

	this.namespaceURI = null;
	this.prefix = null;
	this.ownerElement = null;
}
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr, Node);

function CharacterData(symbol) {
	checkSymbol(symbol);
}
CharacterData.prototype = {
	data: '',
	substringData: function (offset, count) {
		return this.data.substring(offset, offset + count);
	},
	appendData: function (text) {
		text = this.data + text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function (offset, text) {
		this.replaceData(offset, 0, text);
	},
	deleteData: function (offset, count) {
		this.replaceData(offset, count, '');
	},
	replaceData: function (offset, count, text) {
		var start = this.data.substring(0, offset);
		var end = this.data.substring(offset + count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
};
_extends(CharacterData, Node);
function Text(symbol) {
	checkSymbol(symbol);
}
Text.prototype = {
	nodeName: '#text',
	nodeType: TEXT_NODE,
	splitText: function (offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if (this.parentNode) {
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	},
};
_extends(Text, CharacterData);
function Comment(symbol) {
	checkSymbol(symbol);
}
Comment.prototype = {
	nodeName: '#comment',
	nodeType: COMMENT_NODE,
};
_extends(Comment, CharacterData);

function CDATASection(symbol) {
	checkSymbol(symbol);
}
CDATASection.prototype = {
	nodeName: '#cdata-section',
	nodeType: CDATA_SECTION_NODE,
};
_extends(CDATASection, Text);

function DocumentType(symbol) {
	checkSymbol(symbol);
}
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType, Node);

function Notation(symbol) {
	checkSymbol(symbol);
}
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation, Node);

function Entity(symbol) {
	checkSymbol(symbol);
}
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity, Node);

function EntityReference(symbol) {
	checkSymbol(symbol);
}
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference, Node);

function DocumentFragment(symbol) {
	checkSymbol(symbol);
}
DocumentFragment.prototype.nodeName = '#document-fragment';
DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment, Node);

function ProcessingInstruction(symbol) {
	checkSymbol(symbol);
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction, CharacterData);
function XMLSerializer() {}
XMLSerializer.prototype.serializeToString = function (node, nodeFilter) {
	return nodeSerializeToString.call(node, nodeFilter);
};
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(nodeFilter) {
	var buf = [];
	var refNode = (this.nodeType === DOCUMENT_NODE && this.documentElement) || this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;

	if (uri && prefix == null) {
		var prefix = refNode.lookupPrefix(uri);
		if (prefix == null) {
			var visibleNamespaces = [
				{ namespace: uri, prefix: null },
				//{namespace:uri,prefix:''}
			];
		}
	}
	serializeToString(this, buf, nodeFilter, visibleNamespaces);
	return buf.join('');
}

function needNamespaceDefine(node, isHTML, visibleNamespaces) {
	var prefix = node.prefix || '';
	var uri = node.namespaceURI;
	// According to [Namespaces in XML 1.0](https://www.w3.org/TR/REC-xml-names/#ns-using) ,
	// and more specifically https://www.w3.org/TR/REC-xml-names/#nsc-NoPrefixUndecl :
	// > In a namespace declaration for a prefix [...], the attribute value MUST NOT be empty.
	// in a similar manner [Namespaces in XML 1.1](https://www.w3.org/TR/xml-names11/#ns-using)
	// and more specifically https://www.w3.org/TR/xml-names11/#nsc-NSDeclared :
	// > [...] Furthermore, the attribute value [...] must not be an empty string.
	// so serializing empty namespace value like xmlns:ds="" would produce an invalid XML document.
	if (!uri) {
		return false;
	}
	if ((prefix === 'xml' && uri === NAMESPACE$2.XML) || uri === NAMESPACE$2.XMLNS) {
		return false;
	}

	var i = visibleNamespaces.length;
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		if (ns.prefix === prefix) {
			return ns.namespace !== uri;
		}
	}
	return true;
}
/**
 * Literal whitespace other than space that appear in attribute values are serialized as
 * their entity references, so they will be preserved.
 * (In contrast to whitespace literals in the input which are normalized to spaces).
 *
 * Well-formed constraint: No < in Attribute Values:
 * > The replacement text of any entity referred to directly or indirectly
 * > in an attribute value must not contain a <.
 *
 * @see https://www.w3.org/TR/xml11/#CleanAttrVals
 * @see https://www.w3.org/TR/xml11/#NT-AttValue
 * @see https://www.w3.org/TR/xml11/#AVNormalize
 * @see https://w3c.github.io/DOM-Parsing/#serializing-an-element-s-attributes
 * @prettierignore
 */
function addSerializedAttribute(buf, qualifiedName, value) {
	buf.push(' ', qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
}

function serializeToString(node, buf, nodeFilter, visibleNamespaces) {
	if (!visibleNamespaces) {
		visibleNamespaces = [];
	}
	var doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument;
	var isHTML = doc.type === 'html';

	if (nodeFilter) {
		node = nodeFilter(node);
		if (node) {
			if (typeof node == 'string') {
				buf.push(node);
				return;
			}
		} else {
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}

	switch (node.nodeType) {
		case ELEMENT_NODE:
			var attrs = node.attributes;
			var len = attrs.length;
			var child = node.firstChild;
			var nodeName = node.tagName;

			var prefixedNodeName = nodeName;
			if (!isHTML && !node.prefix && node.namespaceURI) {
				var defaultNS;
				// lookup current default ns from `xmlns` attribute
				for (var ai = 0; ai < attrs.length; ai++) {
					if (attrs.item(ai).name === 'xmlns') {
						defaultNS = attrs.item(ai).value;
						break;
					}
				}
				if (!defaultNS) {
					// lookup current default ns in visibleNamespaces
					for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
						var namespace = visibleNamespaces[nsi];
						if (namespace.prefix === '' && namespace.namespace === node.namespaceURI) {
							defaultNS = namespace.namespace;
							break;
						}
					}
				}
				if (defaultNS !== node.namespaceURI) {
					for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
						var namespace = visibleNamespaces[nsi];
						if (namespace.namespace === node.namespaceURI) {
							if (namespace.prefix) {
								prefixedNodeName = namespace.prefix + ':' + nodeName;
							}
							break;
						}
					}
				}
			}

			buf.push('<', prefixedNodeName);

			for (var i = 0; i < len; i++) {
				// add namespaces for attributes
				var attr = attrs.item(i);
				if (attr.prefix == 'xmlns') {
					visibleNamespaces.push({
						prefix: attr.localName,
						namespace: attr.value,
					});
				} else if (attr.nodeName == 'xmlns') {
					visibleNamespaces.push({ prefix: '', namespace: attr.value });
				}
			}

			for (var i = 0; i < len; i++) {
				var attr = attrs.item(i);
				if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
					var prefix = attr.prefix || '';
					var uri = attr.namespaceURI;
					addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : 'xmlns', uri);
					visibleNamespaces.push({ prefix: prefix, namespace: uri });
				}
				serializeToString(attr, buf, nodeFilter, visibleNamespaces);
			}

			// add namespace for current node
			if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
				var prefix = node.prefix || '';
				var uri = node.namespaceURI;
				addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : 'xmlns', uri);
				visibleNamespaces.push({ prefix: prefix, namespace: uri });
			}
			// in XML elements can be closed when they have no children
			var canCloseTag = !child;
			if (canCloseTag && (isHTML || node.namespaceURI === NAMESPACE$2.HTML)) {
				// in HTML (doc or ns) only void elements can be closed right away
				canCloseTag = isHTMLVoidElement(nodeName);
			}
			if (canCloseTag) {
				buf.push('/>');
			} else {
				buf.push('>');
				//if is cdata child node
				if (isHTML && isHTMLRawTextElement$1(nodeName)) {
					while (child) {
						if (child.data) {
							buf.push(child.data);
						} else {
							serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
						}
						child = child.nextSibling;
					}
				} else {
					while (child) {
						serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
						child = child.nextSibling;
					}
				}
				buf.push('</', prefixedNodeName, '>');
			}
			// remove added visible namespaces
			//visibleNamespaces.length = startVisibleNamespaces;
			return;
		case DOCUMENT_NODE:
		case DOCUMENT_FRAGMENT_NODE:
			var child = node.firstChild;
			while (child) {
				serializeToString(child, buf, nodeFilter, visibleNamespaces.slice());
				child = child.nextSibling;
			}
			return;
		case ATTRIBUTE_NODE:
			return addSerializedAttribute(buf, node.name, node.value);
		case TEXT_NODE:
			/*
			 * The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
			 * except when used as markup delimiters, or within a comment, a processing instruction,
			 * or a CDATA section.
			 * If they are needed elsewhere, they must be escaped using either numeric character
			 * references or the strings `&amp;` and `&lt;` respectively.
			 * The right angle bracket (>) may be represented using the string " &gt; ",
			 * and must, for compatibility, be escaped using either `&gt;`,
			 * or a character reference when it appears in the string `]]>` in content,
			 * when that string is not marking the end of a CDATA section.
			 *
			 * In the content of elements, character data is any string of characters which does not
			 * contain the start-delimiter of any markup and does not include the CDATA-section-close
			 * delimiter, `]]>`.
			 *
			 * @see https://www.w3.org/TR/xml/#NT-CharData
			 * @see https://w3c.github.io/DOM-Parsing/#xml-serializing-a-text-node
			 */
			return buf.push(node.data.replace(/[<&>]/g, _xmlEncoder));
		case CDATA_SECTION_NODE:
			return buf.push(g$1.CDATA_START, node.data, g$1.CDATA_END);
		case COMMENT_NODE:
			return buf.push(g$1.COMMENT_START, node.data, g$1.COMMENT_END);
		case DOCUMENT_TYPE_NODE:
			var pubid = node.publicId;
			var sysid = node.systemId;
			buf.push(g$1.DOCTYPE_DECL_START, ' ', node.name);
			if (pubid) {
				buf.push(' ', g$1.PUBLIC, ' ', pubid);
				if (sysid && sysid !== '.') {
					buf.push(' ', sysid);
				}
			} else if (sysid && sysid !== '.') {
				buf.push(' ', g$1.SYSTEM, ' ', sysid);
			}
			if (node.internalSubset) {
				buf.push(' [', node.internalSubset, ']');
			}
			buf.push('>');
			return;
		case PROCESSING_INSTRUCTION_NODE:
			return buf.push('<?', node.target, ' ', node.data, '?>');
		case ENTITY_REFERENCE_NODE:
			return buf.push('&', node.nodeName, ';');
		//case ENTITY_NODE:
		//case NOTATION_NODE:
		default:
			buf.push('??', node.nodeName);
	}
}
function importNode(doc, node, deep) {
	var node2;
	switch (node.nodeType) {
		case ELEMENT_NODE:
			node2 = node.cloneNode(false);
			node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
		//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
		case DOCUMENT_FRAGMENT_NODE:
			break;
		case ATTRIBUTE_NODE:
			deep = true;
			break;
		//case ENTITY_REFERENCE_NODE:
		//case PROCESSING_INSTRUCTION_NODE:
		////case TEXT_NODE:
		//case CDATA_SECTION_NODE:
		//case COMMENT_NODE:
		//	deep = false;
		//	break;
		//case DOCUMENT_NODE:
		//case DOCUMENT_TYPE_NODE:
		//cannot be imported.
		//case ENTITY_NODE:
		//case NOTATION_NODE：
		//can not hit in level3
		//default:throw e;
	}
	if (!node2) {
		node2 = node.cloneNode(false); //false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if (deep) {
		var child = node.firstChild;
		while (child) {
			node2.appendChild(importNode(doc, child, deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

/**
 * Creates a copy of a node from an existing one.
 *
 * @param {Document} doc
 * The Document object representing the document that the new node will belong to.
 * @param {Node} node
 * The node to clone.
 * @param {boolean} deep
 * If true, the contents of the node are recursively copied.
 * If false, only the node itself (and its attributes, if it is an element) are copied.
 * @returns {Node}
 * Returns the newly created copy of the node.
 * @throws {DOMException}
 * May throw a DOMException if operations within setAttributeNode or appendChild (which are
 * potentially invoked in this function) do not meet their specific constraints.
 */
function cloneNode(doc, node, deep) {
	var node2 = new node.constructor(PDC);
	for (var n in node) {
		if (hasOwn$1(node, n)) {
			var v = node[n];
			if (typeof v != 'object') {
				if (v != node2[n]) {
					node2[n] = v;
				}
			}
		}
	}
	if (node.childNodes) {
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
		case ELEMENT_NODE:
			var attrs = node.attributes;
			var attrs2 = (node2.attributes = new NamedNodeMap());
			var len = attrs.length;
			attrs2._ownerElement = node2;
			for (var i = 0; i < len; i++) {
				node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
			}
			break;
		case ATTRIBUTE_NODE:
			deep = true;
	}
	if (deep) {
		var child = node.firstChild;
		while (child) {
			node2.appendChild(cloneNode(doc, child, deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object, key, value) {
	object[key] = value;
}
//do dynamic
try {
	if (Object.defineProperty) {
		Object.defineProperty(LiveNodeList.prototype, 'length', {
			get: function () {
				_updateLiveList(this);
				return this.$$length;
			},
		});

		Object.defineProperty(Node.prototype, 'textContent', {
			get: function () {
				return getTextContent(this);
			},

			set: function (data) {
				switch (this.nodeType) {
					case ELEMENT_NODE:
					case DOCUMENT_FRAGMENT_NODE:
						while (this.firstChild) {
							this.removeChild(this.firstChild);
						}
						if (data || String(data)) {
							this.appendChild(this.ownerDocument.createTextNode(data));
						}
						break;

					default:
						this.data = data;
						this.value = data;
						this.nodeValue = data;
				}
			},
		});

		function getTextContent(node) {
			switch (node.nodeType) {
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					var buf = [];
					node = node.firstChild;
					while (node) {
						if (node.nodeType !== 7 && node.nodeType !== 8) {
							buf.push(getTextContent(node));
						}
						node = node.nextSibling;
					}
					return buf.join('');
				default:
					return node.nodeValue;
			}
		}

		__set__ = function (object, key, value) {
			//console.log(value)
			object['$$' + key] = value;
		};
	}
} catch (e) {
	//ie8
}

dom$2._updateLiveList = _updateLiveList;
dom$2.Attr = Attr;
dom$2.CDATASection = CDATASection;
dom$2.CharacterData = CharacterData;
dom$2.Comment = Comment;
dom$2.Document = Document;
dom$2.DocumentFragment = DocumentFragment;
dom$2.DocumentType = DocumentType;
dom$2.DOMImplementation = DOMImplementation$1;
dom$2.Element = Element;
dom$2.Entity = Entity;
dom$2.EntityReference = EntityReference;
dom$2.LiveNodeList = LiveNodeList;
dom$2.NamedNodeMap = NamedNodeMap;
dom$2.Node = Node;
dom$2.NodeList = NodeList;
dom$2.Notation = Notation;
dom$2.Text = Text;
dom$2.ProcessingInstruction = ProcessingInstruction;
dom$2.XMLSerializer = XMLSerializer;

var domParser$1 = {};

var entities$1 = {};

(function (exports) {

	var freeze = conventions$5.freeze;

	/**
	 * The entities that are predefined in every XML document.
	 *
	 * @see https://www.w3.org/TR/2006/REC-xml11-20060816/#sec-predefined-ent W3C XML 1.1
	 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent W3C XML 1.0
	 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML
	 *      Wikipedia
	 */
	exports.XML_ENTITIES = freeze({
		amp: '&',
		apos: "'",
		gt: '>',
		lt: '<',
		quot: '"',
	});

	/**
	 * A map of all entities that are detected in an HTML document.
	 * They contain all entries from `XML_ENTITIES`.
	 *
	 * @see {@link XML_ENTITIES}
	 * @see {@link DOMParser.parseFromString}
	 * @see {@link DOMImplementation.prototype.createHTMLDocument}
	 * @see https://html.spec.whatwg.org/#named-character-references WHATWG HTML(5)
	 *      Spec
	 * @see https://html.spec.whatwg.org/entities.json JSON
	 * @see https://www.w3.org/TR/xml-entity-names/ W3C XML Entity Names
	 * @see https://www.w3.org/TR/html4/sgml/entities.html W3C HTML4/SGML
	 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML
	 *      Wikipedia (HTML)
	 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Entities_representing_special_characters_in_XHTML
	 *      Wikpedia (XHTML)
	 */
	exports.HTML_ENTITIES = freeze({
		Aacute: '\u00C1',
		aacute: '\u00E1',
		Abreve: '\u0102',
		abreve: '\u0103',
		ac: '\u223E',
		acd: '\u223F',
		acE: '\u223E\u0333',
		Acirc: '\u00C2',
		acirc: '\u00E2',
		acute: '\u00B4',
		Acy: '\u0410',
		acy: '\u0430',
		AElig: '\u00C6',
		aelig: '\u00E6',
		af: '\u2061',
		Afr: '\uD835\uDD04',
		afr: '\uD835\uDD1E',
		Agrave: '\u00C0',
		agrave: '\u00E0',
		alefsym: '\u2135',
		aleph: '\u2135',
		Alpha: '\u0391',
		alpha: '\u03B1',
		Amacr: '\u0100',
		amacr: '\u0101',
		amalg: '\u2A3F',
		AMP: '\u0026',
		amp: '\u0026',
		And: '\u2A53',
		and: '\u2227',
		andand: '\u2A55',
		andd: '\u2A5C',
		andslope: '\u2A58',
		andv: '\u2A5A',
		ang: '\u2220',
		ange: '\u29A4',
		angle: '\u2220',
		angmsd: '\u2221',
		angmsdaa: '\u29A8',
		angmsdab: '\u29A9',
		angmsdac: '\u29AA',
		angmsdad: '\u29AB',
		angmsdae: '\u29AC',
		angmsdaf: '\u29AD',
		angmsdag: '\u29AE',
		angmsdah: '\u29AF',
		angrt: '\u221F',
		angrtvb: '\u22BE',
		angrtvbd: '\u299D',
		angsph: '\u2222',
		angst: '\u00C5',
		angzarr: '\u237C',
		Aogon: '\u0104',
		aogon: '\u0105',
		Aopf: '\uD835\uDD38',
		aopf: '\uD835\uDD52',
		ap: '\u2248',
		apacir: '\u2A6F',
		apE: '\u2A70',
		ape: '\u224A',
		apid: '\u224B',
		apos: '\u0027',
		ApplyFunction: '\u2061',
		approx: '\u2248',
		approxeq: '\u224A',
		Aring: '\u00C5',
		aring: '\u00E5',
		Ascr: '\uD835\uDC9C',
		ascr: '\uD835\uDCB6',
		Assign: '\u2254',
		ast: '\u002A',
		asymp: '\u2248',
		asympeq: '\u224D',
		Atilde: '\u00C3',
		atilde: '\u00E3',
		Auml: '\u00C4',
		auml: '\u00E4',
		awconint: '\u2233',
		awint: '\u2A11',
		backcong: '\u224C',
		backepsilon: '\u03F6',
		backprime: '\u2035',
		backsim: '\u223D',
		backsimeq: '\u22CD',
		Backslash: '\u2216',
		Barv: '\u2AE7',
		barvee: '\u22BD',
		Barwed: '\u2306',
		barwed: '\u2305',
		barwedge: '\u2305',
		bbrk: '\u23B5',
		bbrktbrk: '\u23B6',
		bcong: '\u224C',
		Bcy: '\u0411',
		bcy: '\u0431',
		bdquo: '\u201E',
		becaus: '\u2235',
		Because: '\u2235',
		because: '\u2235',
		bemptyv: '\u29B0',
		bepsi: '\u03F6',
		bernou: '\u212C',
		Bernoullis: '\u212C',
		Beta: '\u0392',
		beta: '\u03B2',
		beth: '\u2136',
		between: '\u226C',
		Bfr: '\uD835\uDD05',
		bfr: '\uD835\uDD1F',
		bigcap: '\u22C2',
		bigcirc: '\u25EF',
		bigcup: '\u22C3',
		bigodot: '\u2A00',
		bigoplus: '\u2A01',
		bigotimes: '\u2A02',
		bigsqcup: '\u2A06',
		bigstar: '\u2605',
		bigtriangledown: '\u25BD',
		bigtriangleup: '\u25B3',
		biguplus: '\u2A04',
		bigvee: '\u22C1',
		bigwedge: '\u22C0',
		bkarow: '\u290D',
		blacklozenge: '\u29EB',
		blacksquare: '\u25AA',
		blacktriangle: '\u25B4',
		blacktriangledown: '\u25BE',
		blacktriangleleft: '\u25C2',
		blacktriangleright: '\u25B8',
		blank: '\u2423',
		blk12: '\u2592',
		blk14: '\u2591',
		blk34: '\u2593',
		block: '\u2588',
		bne: '\u003D\u20E5',
		bnequiv: '\u2261\u20E5',
		bNot: '\u2AED',
		bnot: '\u2310',
		Bopf: '\uD835\uDD39',
		bopf: '\uD835\uDD53',
		bot: '\u22A5',
		bottom: '\u22A5',
		bowtie: '\u22C8',
		boxbox: '\u29C9',
		boxDL: '\u2557',
		boxDl: '\u2556',
		boxdL: '\u2555',
		boxdl: '\u2510',
		boxDR: '\u2554',
		boxDr: '\u2553',
		boxdR: '\u2552',
		boxdr: '\u250C',
		boxH: '\u2550',
		boxh: '\u2500',
		boxHD: '\u2566',
		boxHd: '\u2564',
		boxhD: '\u2565',
		boxhd: '\u252C',
		boxHU: '\u2569',
		boxHu: '\u2567',
		boxhU: '\u2568',
		boxhu: '\u2534',
		boxminus: '\u229F',
		boxplus: '\u229E',
		boxtimes: '\u22A0',
		boxUL: '\u255D',
		boxUl: '\u255C',
		boxuL: '\u255B',
		boxul: '\u2518',
		boxUR: '\u255A',
		boxUr: '\u2559',
		boxuR: '\u2558',
		boxur: '\u2514',
		boxV: '\u2551',
		boxv: '\u2502',
		boxVH: '\u256C',
		boxVh: '\u256B',
		boxvH: '\u256A',
		boxvh: '\u253C',
		boxVL: '\u2563',
		boxVl: '\u2562',
		boxvL: '\u2561',
		boxvl: '\u2524',
		boxVR: '\u2560',
		boxVr: '\u255F',
		boxvR: '\u255E',
		boxvr: '\u251C',
		bprime: '\u2035',
		Breve: '\u02D8',
		breve: '\u02D8',
		brvbar: '\u00A6',
		Bscr: '\u212C',
		bscr: '\uD835\uDCB7',
		bsemi: '\u204F',
		bsim: '\u223D',
		bsime: '\u22CD',
		bsol: '\u005C',
		bsolb: '\u29C5',
		bsolhsub: '\u27C8',
		bull: '\u2022',
		bullet: '\u2022',
		bump: '\u224E',
		bumpE: '\u2AAE',
		bumpe: '\u224F',
		Bumpeq: '\u224E',
		bumpeq: '\u224F',
		Cacute: '\u0106',
		cacute: '\u0107',
		Cap: '\u22D2',
		cap: '\u2229',
		capand: '\u2A44',
		capbrcup: '\u2A49',
		capcap: '\u2A4B',
		capcup: '\u2A47',
		capdot: '\u2A40',
		CapitalDifferentialD: '\u2145',
		caps: '\u2229\uFE00',
		caret: '\u2041',
		caron: '\u02C7',
		Cayleys: '\u212D',
		ccaps: '\u2A4D',
		Ccaron: '\u010C',
		ccaron: '\u010D',
		Ccedil: '\u00C7',
		ccedil: '\u00E7',
		Ccirc: '\u0108',
		ccirc: '\u0109',
		Cconint: '\u2230',
		ccups: '\u2A4C',
		ccupssm: '\u2A50',
		Cdot: '\u010A',
		cdot: '\u010B',
		cedil: '\u00B8',
		Cedilla: '\u00B8',
		cemptyv: '\u29B2',
		cent: '\u00A2',
		CenterDot: '\u00B7',
		centerdot: '\u00B7',
		Cfr: '\u212D',
		cfr: '\uD835\uDD20',
		CHcy: '\u0427',
		chcy: '\u0447',
		check: '\u2713',
		checkmark: '\u2713',
		Chi: '\u03A7',
		chi: '\u03C7',
		cir: '\u25CB',
		circ: '\u02C6',
		circeq: '\u2257',
		circlearrowleft: '\u21BA',
		circlearrowright: '\u21BB',
		circledast: '\u229B',
		circledcirc: '\u229A',
		circleddash: '\u229D',
		CircleDot: '\u2299',
		circledR: '\u00AE',
		circledS: '\u24C8',
		CircleMinus: '\u2296',
		CirclePlus: '\u2295',
		CircleTimes: '\u2297',
		cirE: '\u29C3',
		cire: '\u2257',
		cirfnint: '\u2A10',
		cirmid: '\u2AEF',
		cirscir: '\u29C2',
		ClockwiseContourIntegral: '\u2232',
		CloseCurlyDoubleQuote: '\u201D',
		CloseCurlyQuote: '\u2019',
		clubs: '\u2663',
		clubsuit: '\u2663',
		Colon: '\u2237',
		colon: '\u003A',
		Colone: '\u2A74',
		colone: '\u2254',
		coloneq: '\u2254',
		comma: '\u002C',
		commat: '\u0040',
		comp: '\u2201',
		compfn: '\u2218',
		complement: '\u2201',
		complexes: '\u2102',
		cong: '\u2245',
		congdot: '\u2A6D',
		Congruent: '\u2261',
		Conint: '\u222F',
		conint: '\u222E',
		ContourIntegral: '\u222E',
		Copf: '\u2102',
		copf: '\uD835\uDD54',
		coprod: '\u2210',
		Coproduct: '\u2210',
		COPY: '\u00A9',
		copy: '\u00A9',
		copysr: '\u2117',
		CounterClockwiseContourIntegral: '\u2233',
		crarr: '\u21B5',
		Cross: '\u2A2F',
		cross: '\u2717',
		Cscr: '\uD835\uDC9E',
		cscr: '\uD835\uDCB8',
		csub: '\u2ACF',
		csube: '\u2AD1',
		csup: '\u2AD0',
		csupe: '\u2AD2',
		ctdot: '\u22EF',
		cudarrl: '\u2938',
		cudarrr: '\u2935',
		cuepr: '\u22DE',
		cuesc: '\u22DF',
		cularr: '\u21B6',
		cularrp: '\u293D',
		Cup: '\u22D3',
		cup: '\u222A',
		cupbrcap: '\u2A48',
		CupCap: '\u224D',
		cupcap: '\u2A46',
		cupcup: '\u2A4A',
		cupdot: '\u228D',
		cupor: '\u2A45',
		cups: '\u222A\uFE00',
		curarr: '\u21B7',
		curarrm: '\u293C',
		curlyeqprec: '\u22DE',
		curlyeqsucc: '\u22DF',
		curlyvee: '\u22CE',
		curlywedge: '\u22CF',
		curren: '\u00A4',
		curvearrowleft: '\u21B6',
		curvearrowright: '\u21B7',
		cuvee: '\u22CE',
		cuwed: '\u22CF',
		cwconint: '\u2232',
		cwint: '\u2231',
		cylcty: '\u232D',
		Dagger: '\u2021',
		dagger: '\u2020',
		daleth: '\u2138',
		Darr: '\u21A1',
		dArr: '\u21D3',
		darr: '\u2193',
		dash: '\u2010',
		Dashv: '\u2AE4',
		dashv: '\u22A3',
		dbkarow: '\u290F',
		dblac: '\u02DD',
		Dcaron: '\u010E',
		dcaron: '\u010F',
		Dcy: '\u0414',
		dcy: '\u0434',
		DD: '\u2145',
		dd: '\u2146',
		ddagger: '\u2021',
		ddarr: '\u21CA',
		DDotrahd: '\u2911',
		ddotseq: '\u2A77',
		deg: '\u00B0',
		Del: '\u2207',
		Delta: '\u0394',
		delta: '\u03B4',
		demptyv: '\u29B1',
		dfisht: '\u297F',
		Dfr: '\uD835\uDD07',
		dfr: '\uD835\uDD21',
		dHar: '\u2965',
		dharl: '\u21C3',
		dharr: '\u21C2',
		DiacriticalAcute: '\u00B4',
		DiacriticalDot: '\u02D9',
		DiacriticalDoubleAcute: '\u02DD',
		DiacriticalGrave: '\u0060',
		DiacriticalTilde: '\u02DC',
		diam: '\u22C4',
		Diamond: '\u22C4',
		diamond: '\u22C4',
		diamondsuit: '\u2666',
		diams: '\u2666',
		die: '\u00A8',
		DifferentialD: '\u2146',
		digamma: '\u03DD',
		disin: '\u22F2',
		div: '\u00F7',
		divide: '\u00F7',
		divideontimes: '\u22C7',
		divonx: '\u22C7',
		DJcy: '\u0402',
		djcy: '\u0452',
		dlcorn: '\u231E',
		dlcrop: '\u230D',
		dollar: '\u0024',
		Dopf: '\uD835\uDD3B',
		dopf: '\uD835\uDD55',
		Dot: '\u00A8',
		dot: '\u02D9',
		DotDot: '\u20DC',
		doteq: '\u2250',
		doteqdot: '\u2251',
		DotEqual: '\u2250',
		dotminus: '\u2238',
		dotplus: '\u2214',
		dotsquare: '\u22A1',
		doublebarwedge: '\u2306',
		DoubleContourIntegral: '\u222F',
		DoubleDot: '\u00A8',
		DoubleDownArrow: '\u21D3',
		DoubleLeftArrow: '\u21D0',
		DoubleLeftRightArrow: '\u21D4',
		DoubleLeftTee: '\u2AE4',
		DoubleLongLeftArrow: '\u27F8',
		DoubleLongLeftRightArrow: '\u27FA',
		DoubleLongRightArrow: '\u27F9',
		DoubleRightArrow: '\u21D2',
		DoubleRightTee: '\u22A8',
		DoubleUpArrow: '\u21D1',
		DoubleUpDownArrow: '\u21D5',
		DoubleVerticalBar: '\u2225',
		DownArrow: '\u2193',
		Downarrow: '\u21D3',
		downarrow: '\u2193',
		DownArrowBar: '\u2913',
		DownArrowUpArrow: '\u21F5',
		DownBreve: '\u0311',
		downdownarrows: '\u21CA',
		downharpoonleft: '\u21C3',
		downharpoonright: '\u21C2',
		DownLeftRightVector: '\u2950',
		DownLeftTeeVector: '\u295E',
		DownLeftVector: '\u21BD',
		DownLeftVectorBar: '\u2956',
		DownRightTeeVector: '\u295F',
		DownRightVector: '\u21C1',
		DownRightVectorBar: '\u2957',
		DownTee: '\u22A4',
		DownTeeArrow: '\u21A7',
		drbkarow: '\u2910',
		drcorn: '\u231F',
		drcrop: '\u230C',
		Dscr: '\uD835\uDC9F',
		dscr: '\uD835\uDCB9',
		DScy: '\u0405',
		dscy: '\u0455',
		dsol: '\u29F6',
		Dstrok: '\u0110',
		dstrok: '\u0111',
		dtdot: '\u22F1',
		dtri: '\u25BF',
		dtrif: '\u25BE',
		duarr: '\u21F5',
		duhar: '\u296F',
		dwangle: '\u29A6',
		DZcy: '\u040F',
		dzcy: '\u045F',
		dzigrarr: '\u27FF',
		Eacute: '\u00C9',
		eacute: '\u00E9',
		easter: '\u2A6E',
		Ecaron: '\u011A',
		ecaron: '\u011B',
		ecir: '\u2256',
		Ecirc: '\u00CA',
		ecirc: '\u00EA',
		ecolon: '\u2255',
		Ecy: '\u042D',
		ecy: '\u044D',
		eDDot: '\u2A77',
		Edot: '\u0116',
		eDot: '\u2251',
		edot: '\u0117',
		ee: '\u2147',
		efDot: '\u2252',
		Efr: '\uD835\uDD08',
		efr: '\uD835\uDD22',
		eg: '\u2A9A',
		Egrave: '\u00C8',
		egrave: '\u00E8',
		egs: '\u2A96',
		egsdot: '\u2A98',
		el: '\u2A99',
		Element: '\u2208',
		elinters: '\u23E7',
		ell: '\u2113',
		els: '\u2A95',
		elsdot: '\u2A97',
		Emacr: '\u0112',
		emacr: '\u0113',
		empty: '\u2205',
		emptyset: '\u2205',
		EmptySmallSquare: '\u25FB',
		emptyv: '\u2205',
		EmptyVerySmallSquare: '\u25AB',
		emsp: '\u2003',
		emsp13: '\u2004',
		emsp14: '\u2005',
		ENG: '\u014A',
		eng: '\u014B',
		ensp: '\u2002',
		Eogon: '\u0118',
		eogon: '\u0119',
		Eopf: '\uD835\uDD3C',
		eopf: '\uD835\uDD56',
		epar: '\u22D5',
		eparsl: '\u29E3',
		eplus: '\u2A71',
		epsi: '\u03B5',
		Epsilon: '\u0395',
		epsilon: '\u03B5',
		epsiv: '\u03F5',
		eqcirc: '\u2256',
		eqcolon: '\u2255',
		eqsim: '\u2242',
		eqslantgtr: '\u2A96',
		eqslantless: '\u2A95',
		Equal: '\u2A75',
		equals: '\u003D',
		EqualTilde: '\u2242',
		equest: '\u225F',
		Equilibrium: '\u21CC',
		equiv: '\u2261',
		equivDD: '\u2A78',
		eqvparsl: '\u29E5',
		erarr: '\u2971',
		erDot: '\u2253',
		Escr: '\u2130',
		escr: '\u212F',
		esdot: '\u2250',
		Esim: '\u2A73',
		esim: '\u2242',
		Eta: '\u0397',
		eta: '\u03B7',
		ETH: '\u00D0',
		eth: '\u00F0',
		Euml: '\u00CB',
		euml: '\u00EB',
		euro: '\u20AC',
		excl: '\u0021',
		exist: '\u2203',
		Exists: '\u2203',
		expectation: '\u2130',
		ExponentialE: '\u2147',
		exponentiale: '\u2147',
		fallingdotseq: '\u2252',
		Fcy: '\u0424',
		fcy: '\u0444',
		female: '\u2640',
		ffilig: '\uFB03',
		fflig: '\uFB00',
		ffllig: '\uFB04',
		Ffr: '\uD835\uDD09',
		ffr: '\uD835\uDD23',
		filig: '\uFB01',
		FilledSmallSquare: '\u25FC',
		FilledVerySmallSquare: '\u25AA',
		fjlig: '\u0066\u006A',
		flat: '\u266D',
		fllig: '\uFB02',
		fltns: '\u25B1',
		fnof: '\u0192',
		Fopf: '\uD835\uDD3D',
		fopf: '\uD835\uDD57',
		ForAll: '\u2200',
		forall: '\u2200',
		fork: '\u22D4',
		forkv: '\u2AD9',
		Fouriertrf: '\u2131',
		fpartint: '\u2A0D',
		frac12: '\u00BD',
		frac13: '\u2153',
		frac14: '\u00BC',
		frac15: '\u2155',
		frac16: '\u2159',
		frac18: '\u215B',
		frac23: '\u2154',
		frac25: '\u2156',
		frac34: '\u00BE',
		frac35: '\u2157',
		frac38: '\u215C',
		frac45: '\u2158',
		frac56: '\u215A',
		frac58: '\u215D',
		frac78: '\u215E',
		frasl: '\u2044',
		frown: '\u2322',
		Fscr: '\u2131',
		fscr: '\uD835\uDCBB',
		gacute: '\u01F5',
		Gamma: '\u0393',
		gamma: '\u03B3',
		Gammad: '\u03DC',
		gammad: '\u03DD',
		gap: '\u2A86',
		Gbreve: '\u011E',
		gbreve: '\u011F',
		Gcedil: '\u0122',
		Gcirc: '\u011C',
		gcirc: '\u011D',
		Gcy: '\u0413',
		gcy: '\u0433',
		Gdot: '\u0120',
		gdot: '\u0121',
		gE: '\u2267',
		ge: '\u2265',
		gEl: '\u2A8C',
		gel: '\u22DB',
		geq: '\u2265',
		geqq: '\u2267',
		geqslant: '\u2A7E',
		ges: '\u2A7E',
		gescc: '\u2AA9',
		gesdot: '\u2A80',
		gesdoto: '\u2A82',
		gesdotol: '\u2A84',
		gesl: '\u22DB\uFE00',
		gesles: '\u2A94',
		Gfr: '\uD835\uDD0A',
		gfr: '\uD835\uDD24',
		Gg: '\u22D9',
		gg: '\u226B',
		ggg: '\u22D9',
		gimel: '\u2137',
		GJcy: '\u0403',
		gjcy: '\u0453',
		gl: '\u2277',
		gla: '\u2AA5',
		glE: '\u2A92',
		glj: '\u2AA4',
		gnap: '\u2A8A',
		gnapprox: '\u2A8A',
		gnE: '\u2269',
		gne: '\u2A88',
		gneq: '\u2A88',
		gneqq: '\u2269',
		gnsim: '\u22E7',
		Gopf: '\uD835\uDD3E',
		gopf: '\uD835\uDD58',
		grave: '\u0060',
		GreaterEqual: '\u2265',
		GreaterEqualLess: '\u22DB',
		GreaterFullEqual: '\u2267',
		GreaterGreater: '\u2AA2',
		GreaterLess: '\u2277',
		GreaterSlantEqual: '\u2A7E',
		GreaterTilde: '\u2273',
		Gscr: '\uD835\uDCA2',
		gscr: '\u210A',
		gsim: '\u2273',
		gsime: '\u2A8E',
		gsiml: '\u2A90',
		Gt: '\u226B',
		GT: '\u003E',
		gt: '\u003E',
		gtcc: '\u2AA7',
		gtcir: '\u2A7A',
		gtdot: '\u22D7',
		gtlPar: '\u2995',
		gtquest: '\u2A7C',
		gtrapprox: '\u2A86',
		gtrarr: '\u2978',
		gtrdot: '\u22D7',
		gtreqless: '\u22DB',
		gtreqqless: '\u2A8C',
		gtrless: '\u2277',
		gtrsim: '\u2273',
		gvertneqq: '\u2269\uFE00',
		gvnE: '\u2269\uFE00',
		Hacek: '\u02C7',
		hairsp: '\u200A',
		half: '\u00BD',
		hamilt: '\u210B',
		HARDcy: '\u042A',
		hardcy: '\u044A',
		hArr: '\u21D4',
		harr: '\u2194',
		harrcir: '\u2948',
		harrw: '\u21AD',
		Hat: '\u005E',
		hbar: '\u210F',
		Hcirc: '\u0124',
		hcirc: '\u0125',
		hearts: '\u2665',
		heartsuit: '\u2665',
		hellip: '\u2026',
		hercon: '\u22B9',
		Hfr: '\u210C',
		hfr: '\uD835\uDD25',
		HilbertSpace: '\u210B',
		hksearow: '\u2925',
		hkswarow: '\u2926',
		hoarr: '\u21FF',
		homtht: '\u223B',
		hookleftarrow: '\u21A9',
		hookrightarrow: '\u21AA',
		Hopf: '\u210D',
		hopf: '\uD835\uDD59',
		horbar: '\u2015',
		HorizontalLine: '\u2500',
		Hscr: '\u210B',
		hscr: '\uD835\uDCBD',
		hslash: '\u210F',
		Hstrok: '\u0126',
		hstrok: '\u0127',
		HumpDownHump: '\u224E',
		HumpEqual: '\u224F',
		hybull: '\u2043',
		hyphen: '\u2010',
		Iacute: '\u00CD',
		iacute: '\u00ED',
		ic: '\u2063',
		Icirc: '\u00CE',
		icirc: '\u00EE',
		Icy: '\u0418',
		icy: '\u0438',
		Idot: '\u0130',
		IEcy: '\u0415',
		iecy: '\u0435',
		iexcl: '\u00A1',
		iff: '\u21D4',
		Ifr: '\u2111',
		ifr: '\uD835\uDD26',
		Igrave: '\u00CC',
		igrave: '\u00EC',
		ii: '\u2148',
		iiiint: '\u2A0C',
		iiint: '\u222D',
		iinfin: '\u29DC',
		iiota: '\u2129',
		IJlig: '\u0132',
		ijlig: '\u0133',
		Im: '\u2111',
		Imacr: '\u012A',
		imacr: '\u012B',
		image: '\u2111',
		ImaginaryI: '\u2148',
		imagline: '\u2110',
		imagpart: '\u2111',
		imath: '\u0131',
		imof: '\u22B7',
		imped: '\u01B5',
		Implies: '\u21D2',
		in: '\u2208',
		incare: '\u2105',
		infin: '\u221E',
		infintie: '\u29DD',
		inodot: '\u0131',
		Int: '\u222C',
		int: '\u222B',
		intcal: '\u22BA',
		integers: '\u2124',
		Integral: '\u222B',
		intercal: '\u22BA',
		Intersection: '\u22C2',
		intlarhk: '\u2A17',
		intprod: '\u2A3C',
		InvisibleComma: '\u2063',
		InvisibleTimes: '\u2062',
		IOcy: '\u0401',
		iocy: '\u0451',
		Iogon: '\u012E',
		iogon: '\u012F',
		Iopf: '\uD835\uDD40',
		iopf: '\uD835\uDD5A',
		Iota: '\u0399',
		iota: '\u03B9',
		iprod: '\u2A3C',
		iquest: '\u00BF',
		Iscr: '\u2110',
		iscr: '\uD835\uDCBE',
		isin: '\u2208',
		isindot: '\u22F5',
		isinE: '\u22F9',
		isins: '\u22F4',
		isinsv: '\u22F3',
		isinv: '\u2208',
		it: '\u2062',
		Itilde: '\u0128',
		itilde: '\u0129',
		Iukcy: '\u0406',
		iukcy: '\u0456',
		Iuml: '\u00CF',
		iuml: '\u00EF',
		Jcirc: '\u0134',
		jcirc: '\u0135',
		Jcy: '\u0419',
		jcy: '\u0439',
		Jfr: '\uD835\uDD0D',
		jfr: '\uD835\uDD27',
		jmath: '\u0237',
		Jopf: '\uD835\uDD41',
		jopf: '\uD835\uDD5B',
		Jscr: '\uD835\uDCA5',
		jscr: '\uD835\uDCBF',
		Jsercy: '\u0408',
		jsercy: '\u0458',
		Jukcy: '\u0404',
		jukcy: '\u0454',
		Kappa: '\u039A',
		kappa: '\u03BA',
		kappav: '\u03F0',
		Kcedil: '\u0136',
		kcedil: '\u0137',
		Kcy: '\u041A',
		kcy: '\u043A',
		Kfr: '\uD835\uDD0E',
		kfr: '\uD835\uDD28',
		kgreen: '\u0138',
		KHcy: '\u0425',
		khcy: '\u0445',
		KJcy: '\u040C',
		kjcy: '\u045C',
		Kopf: '\uD835\uDD42',
		kopf: '\uD835\uDD5C',
		Kscr: '\uD835\uDCA6',
		kscr: '\uD835\uDCC0',
		lAarr: '\u21DA',
		Lacute: '\u0139',
		lacute: '\u013A',
		laemptyv: '\u29B4',
		lagran: '\u2112',
		Lambda: '\u039B',
		lambda: '\u03BB',
		Lang: '\u27EA',
		lang: '\u27E8',
		langd: '\u2991',
		langle: '\u27E8',
		lap: '\u2A85',
		Laplacetrf: '\u2112',
		laquo: '\u00AB',
		Larr: '\u219E',
		lArr: '\u21D0',
		larr: '\u2190',
		larrb: '\u21E4',
		larrbfs: '\u291F',
		larrfs: '\u291D',
		larrhk: '\u21A9',
		larrlp: '\u21AB',
		larrpl: '\u2939',
		larrsim: '\u2973',
		larrtl: '\u21A2',
		lat: '\u2AAB',
		lAtail: '\u291B',
		latail: '\u2919',
		late: '\u2AAD',
		lates: '\u2AAD\uFE00',
		lBarr: '\u290E',
		lbarr: '\u290C',
		lbbrk: '\u2772',
		lbrace: '\u007B',
		lbrack: '\u005B',
		lbrke: '\u298B',
		lbrksld: '\u298F',
		lbrkslu: '\u298D',
		Lcaron: '\u013D',
		lcaron: '\u013E',
		Lcedil: '\u013B',
		lcedil: '\u013C',
		lceil: '\u2308',
		lcub: '\u007B',
		Lcy: '\u041B',
		lcy: '\u043B',
		ldca: '\u2936',
		ldquo: '\u201C',
		ldquor: '\u201E',
		ldrdhar: '\u2967',
		ldrushar: '\u294B',
		ldsh: '\u21B2',
		lE: '\u2266',
		le: '\u2264',
		LeftAngleBracket: '\u27E8',
		LeftArrow: '\u2190',
		Leftarrow: '\u21D0',
		leftarrow: '\u2190',
		LeftArrowBar: '\u21E4',
		LeftArrowRightArrow: '\u21C6',
		leftarrowtail: '\u21A2',
		LeftCeiling: '\u2308',
		LeftDoubleBracket: '\u27E6',
		LeftDownTeeVector: '\u2961',
		LeftDownVector: '\u21C3',
		LeftDownVectorBar: '\u2959',
		LeftFloor: '\u230A',
		leftharpoondown: '\u21BD',
		leftharpoonup: '\u21BC',
		leftleftarrows: '\u21C7',
		LeftRightArrow: '\u2194',
		Leftrightarrow: '\u21D4',
		leftrightarrow: '\u2194',
		leftrightarrows: '\u21C6',
		leftrightharpoons: '\u21CB',
		leftrightsquigarrow: '\u21AD',
		LeftRightVector: '\u294E',
		LeftTee: '\u22A3',
		LeftTeeArrow: '\u21A4',
		LeftTeeVector: '\u295A',
		leftthreetimes: '\u22CB',
		LeftTriangle: '\u22B2',
		LeftTriangleBar: '\u29CF',
		LeftTriangleEqual: '\u22B4',
		LeftUpDownVector: '\u2951',
		LeftUpTeeVector: '\u2960',
		LeftUpVector: '\u21BF',
		LeftUpVectorBar: '\u2958',
		LeftVector: '\u21BC',
		LeftVectorBar: '\u2952',
		lEg: '\u2A8B',
		leg: '\u22DA',
		leq: '\u2264',
		leqq: '\u2266',
		leqslant: '\u2A7D',
		les: '\u2A7D',
		lescc: '\u2AA8',
		lesdot: '\u2A7F',
		lesdoto: '\u2A81',
		lesdotor: '\u2A83',
		lesg: '\u22DA\uFE00',
		lesges: '\u2A93',
		lessapprox: '\u2A85',
		lessdot: '\u22D6',
		lesseqgtr: '\u22DA',
		lesseqqgtr: '\u2A8B',
		LessEqualGreater: '\u22DA',
		LessFullEqual: '\u2266',
		LessGreater: '\u2276',
		lessgtr: '\u2276',
		LessLess: '\u2AA1',
		lesssim: '\u2272',
		LessSlantEqual: '\u2A7D',
		LessTilde: '\u2272',
		lfisht: '\u297C',
		lfloor: '\u230A',
		Lfr: '\uD835\uDD0F',
		lfr: '\uD835\uDD29',
		lg: '\u2276',
		lgE: '\u2A91',
		lHar: '\u2962',
		lhard: '\u21BD',
		lharu: '\u21BC',
		lharul: '\u296A',
		lhblk: '\u2584',
		LJcy: '\u0409',
		ljcy: '\u0459',
		Ll: '\u22D8',
		ll: '\u226A',
		llarr: '\u21C7',
		llcorner: '\u231E',
		Lleftarrow: '\u21DA',
		llhard: '\u296B',
		lltri: '\u25FA',
		Lmidot: '\u013F',
		lmidot: '\u0140',
		lmoust: '\u23B0',
		lmoustache: '\u23B0',
		lnap: '\u2A89',
		lnapprox: '\u2A89',
		lnE: '\u2268',
		lne: '\u2A87',
		lneq: '\u2A87',
		lneqq: '\u2268',
		lnsim: '\u22E6',
		loang: '\u27EC',
		loarr: '\u21FD',
		lobrk: '\u27E6',
		LongLeftArrow: '\u27F5',
		Longleftarrow: '\u27F8',
		longleftarrow: '\u27F5',
		LongLeftRightArrow: '\u27F7',
		Longleftrightarrow: '\u27FA',
		longleftrightarrow: '\u27F7',
		longmapsto: '\u27FC',
		LongRightArrow: '\u27F6',
		Longrightarrow: '\u27F9',
		longrightarrow: '\u27F6',
		looparrowleft: '\u21AB',
		looparrowright: '\u21AC',
		lopar: '\u2985',
		Lopf: '\uD835\uDD43',
		lopf: '\uD835\uDD5D',
		loplus: '\u2A2D',
		lotimes: '\u2A34',
		lowast: '\u2217',
		lowbar: '\u005F',
		LowerLeftArrow: '\u2199',
		LowerRightArrow: '\u2198',
		loz: '\u25CA',
		lozenge: '\u25CA',
		lozf: '\u29EB',
		lpar: '\u0028',
		lparlt: '\u2993',
		lrarr: '\u21C6',
		lrcorner: '\u231F',
		lrhar: '\u21CB',
		lrhard: '\u296D',
		lrm: '\u200E',
		lrtri: '\u22BF',
		lsaquo: '\u2039',
		Lscr: '\u2112',
		lscr: '\uD835\uDCC1',
		Lsh: '\u21B0',
		lsh: '\u21B0',
		lsim: '\u2272',
		lsime: '\u2A8D',
		lsimg: '\u2A8F',
		lsqb: '\u005B',
		lsquo: '\u2018',
		lsquor: '\u201A',
		Lstrok: '\u0141',
		lstrok: '\u0142',
		Lt: '\u226A',
		LT: '\u003C',
		lt: '\u003C',
		ltcc: '\u2AA6',
		ltcir: '\u2A79',
		ltdot: '\u22D6',
		lthree: '\u22CB',
		ltimes: '\u22C9',
		ltlarr: '\u2976',
		ltquest: '\u2A7B',
		ltri: '\u25C3',
		ltrie: '\u22B4',
		ltrif: '\u25C2',
		ltrPar: '\u2996',
		lurdshar: '\u294A',
		luruhar: '\u2966',
		lvertneqq: '\u2268\uFE00',
		lvnE: '\u2268\uFE00',
		macr: '\u00AF',
		male: '\u2642',
		malt: '\u2720',
		maltese: '\u2720',
		Map: '\u2905',
		map: '\u21A6',
		mapsto: '\u21A6',
		mapstodown: '\u21A7',
		mapstoleft: '\u21A4',
		mapstoup: '\u21A5',
		marker: '\u25AE',
		mcomma: '\u2A29',
		Mcy: '\u041C',
		mcy: '\u043C',
		mdash: '\u2014',
		mDDot: '\u223A',
		measuredangle: '\u2221',
		MediumSpace: '\u205F',
		Mellintrf: '\u2133',
		Mfr: '\uD835\uDD10',
		mfr: '\uD835\uDD2A',
		mho: '\u2127',
		micro: '\u00B5',
		mid: '\u2223',
		midast: '\u002A',
		midcir: '\u2AF0',
		middot: '\u00B7',
		minus: '\u2212',
		minusb: '\u229F',
		minusd: '\u2238',
		minusdu: '\u2A2A',
		MinusPlus: '\u2213',
		mlcp: '\u2ADB',
		mldr: '\u2026',
		mnplus: '\u2213',
		models: '\u22A7',
		Mopf: '\uD835\uDD44',
		mopf: '\uD835\uDD5E',
		mp: '\u2213',
		Mscr: '\u2133',
		mscr: '\uD835\uDCC2',
		mstpos: '\u223E',
		Mu: '\u039C',
		mu: '\u03BC',
		multimap: '\u22B8',
		mumap: '\u22B8',
		nabla: '\u2207',
		Nacute: '\u0143',
		nacute: '\u0144',
		nang: '\u2220\u20D2',
		nap: '\u2249',
		napE: '\u2A70\u0338',
		napid: '\u224B\u0338',
		napos: '\u0149',
		napprox: '\u2249',
		natur: '\u266E',
		natural: '\u266E',
		naturals: '\u2115',
		nbsp: '\u00A0',
		nbump: '\u224E\u0338',
		nbumpe: '\u224F\u0338',
		ncap: '\u2A43',
		Ncaron: '\u0147',
		ncaron: '\u0148',
		Ncedil: '\u0145',
		ncedil: '\u0146',
		ncong: '\u2247',
		ncongdot: '\u2A6D\u0338',
		ncup: '\u2A42',
		Ncy: '\u041D',
		ncy: '\u043D',
		ndash: '\u2013',
		ne: '\u2260',
		nearhk: '\u2924',
		neArr: '\u21D7',
		nearr: '\u2197',
		nearrow: '\u2197',
		nedot: '\u2250\u0338',
		NegativeMediumSpace: '\u200B',
		NegativeThickSpace: '\u200B',
		NegativeThinSpace: '\u200B',
		NegativeVeryThinSpace: '\u200B',
		nequiv: '\u2262',
		nesear: '\u2928',
		nesim: '\u2242\u0338',
		NestedGreaterGreater: '\u226B',
		NestedLessLess: '\u226A',
		NewLine: '\u000A',
		nexist: '\u2204',
		nexists: '\u2204',
		Nfr: '\uD835\uDD11',
		nfr: '\uD835\uDD2B',
		ngE: '\u2267\u0338',
		nge: '\u2271',
		ngeq: '\u2271',
		ngeqq: '\u2267\u0338',
		ngeqslant: '\u2A7E\u0338',
		nges: '\u2A7E\u0338',
		nGg: '\u22D9\u0338',
		ngsim: '\u2275',
		nGt: '\u226B\u20D2',
		ngt: '\u226F',
		ngtr: '\u226F',
		nGtv: '\u226B\u0338',
		nhArr: '\u21CE',
		nharr: '\u21AE',
		nhpar: '\u2AF2',
		ni: '\u220B',
		nis: '\u22FC',
		nisd: '\u22FA',
		niv: '\u220B',
		NJcy: '\u040A',
		njcy: '\u045A',
		nlArr: '\u21CD',
		nlarr: '\u219A',
		nldr: '\u2025',
		nlE: '\u2266\u0338',
		nle: '\u2270',
		nLeftarrow: '\u21CD',
		nleftarrow: '\u219A',
		nLeftrightarrow: '\u21CE',
		nleftrightarrow: '\u21AE',
		nleq: '\u2270',
		nleqq: '\u2266\u0338',
		nleqslant: '\u2A7D\u0338',
		nles: '\u2A7D\u0338',
		nless: '\u226E',
		nLl: '\u22D8\u0338',
		nlsim: '\u2274',
		nLt: '\u226A\u20D2',
		nlt: '\u226E',
		nltri: '\u22EA',
		nltrie: '\u22EC',
		nLtv: '\u226A\u0338',
		nmid: '\u2224',
		NoBreak: '\u2060',
		NonBreakingSpace: '\u00A0',
		Nopf: '\u2115',
		nopf: '\uD835\uDD5F',
		Not: '\u2AEC',
		not: '\u00AC',
		NotCongruent: '\u2262',
		NotCupCap: '\u226D',
		NotDoubleVerticalBar: '\u2226',
		NotElement: '\u2209',
		NotEqual: '\u2260',
		NotEqualTilde: '\u2242\u0338',
		NotExists: '\u2204',
		NotGreater: '\u226F',
		NotGreaterEqual: '\u2271',
		NotGreaterFullEqual: '\u2267\u0338',
		NotGreaterGreater: '\u226B\u0338',
		NotGreaterLess: '\u2279',
		NotGreaterSlantEqual: '\u2A7E\u0338',
		NotGreaterTilde: '\u2275',
		NotHumpDownHump: '\u224E\u0338',
		NotHumpEqual: '\u224F\u0338',
		notin: '\u2209',
		notindot: '\u22F5\u0338',
		notinE: '\u22F9\u0338',
		notinva: '\u2209',
		notinvb: '\u22F7',
		notinvc: '\u22F6',
		NotLeftTriangle: '\u22EA',
		NotLeftTriangleBar: '\u29CF\u0338',
		NotLeftTriangleEqual: '\u22EC',
		NotLess: '\u226E',
		NotLessEqual: '\u2270',
		NotLessGreater: '\u2278',
		NotLessLess: '\u226A\u0338',
		NotLessSlantEqual: '\u2A7D\u0338',
		NotLessTilde: '\u2274',
		NotNestedGreaterGreater: '\u2AA2\u0338',
		NotNestedLessLess: '\u2AA1\u0338',
		notni: '\u220C',
		notniva: '\u220C',
		notnivb: '\u22FE',
		notnivc: '\u22FD',
		NotPrecedes: '\u2280',
		NotPrecedesEqual: '\u2AAF\u0338',
		NotPrecedesSlantEqual: '\u22E0',
		NotReverseElement: '\u220C',
		NotRightTriangle: '\u22EB',
		NotRightTriangleBar: '\u29D0\u0338',
		NotRightTriangleEqual: '\u22ED',
		NotSquareSubset: '\u228F\u0338',
		NotSquareSubsetEqual: '\u22E2',
		NotSquareSuperset: '\u2290\u0338',
		NotSquareSupersetEqual: '\u22E3',
		NotSubset: '\u2282\u20D2',
		NotSubsetEqual: '\u2288',
		NotSucceeds: '\u2281',
		NotSucceedsEqual: '\u2AB0\u0338',
		NotSucceedsSlantEqual: '\u22E1',
		NotSucceedsTilde: '\u227F\u0338',
		NotSuperset: '\u2283\u20D2',
		NotSupersetEqual: '\u2289',
		NotTilde: '\u2241',
		NotTildeEqual: '\u2244',
		NotTildeFullEqual: '\u2247',
		NotTildeTilde: '\u2249',
		NotVerticalBar: '\u2224',
		npar: '\u2226',
		nparallel: '\u2226',
		nparsl: '\u2AFD\u20E5',
		npart: '\u2202\u0338',
		npolint: '\u2A14',
		npr: '\u2280',
		nprcue: '\u22E0',
		npre: '\u2AAF\u0338',
		nprec: '\u2280',
		npreceq: '\u2AAF\u0338',
		nrArr: '\u21CF',
		nrarr: '\u219B',
		nrarrc: '\u2933\u0338',
		nrarrw: '\u219D\u0338',
		nRightarrow: '\u21CF',
		nrightarrow: '\u219B',
		nrtri: '\u22EB',
		nrtrie: '\u22ED',
		nsc: '\u2281',
		nsccue: '\u22E1',
		nsce: '\u2AB0\u0338',
		Nscr: '\uD835\uDCA9',
		nscr: '\uD835\uDCC3',
		nshortmid: '\u2224',
		nshortparallel: '\u2226',
		nsim: '\u2241',
		nsime: '\u2244',
		nsimeq: '\u2244',
		nsmid: '\u2224',
		nspar: '\u2226',
		nsqsube: '\u22E2',
		nsqsupe: '\u22E3',
		nsub: '\u2284',
		nsubE: '\u2AC5\u0338',
		nsube: '\u2288',
		nsubset: '\u2282\u20D2',
		nsubseteq: '\u2288',
		nsubseteqq: '\u2AC5\u0338',
		nsucc: '\u2281',
		nsucceq: '\u2AB0\u0338',
		nsup: '\u2285',
		nsupE: '\u2AC6\u0338',
		nsupe: '\u2289',
		nsupset: '\u2283\u20D2',
		nsupseteq: '\u2289',
		nsupseteqq: '\u2AC6\u0338',
		ntgl: '\u2279',
		Ntilde: '\u00D1',
		ntilde: '\u00F1',
		ntlg: '\u2278',
		ntriangleleft: '\u22EA',
		ntrianglelefteq: '\u22EC',
		ntriangleright: '\u22EB',
		ntrianglerighteq: '\u22ED',
		Nu: '\u039D',
		nu: '\u03BD',
		num: '\u0023',
		numero: '\u2116',
		numsp: '\u2007',
		nvap: '\u224D\u20D2',
		nVDash: '\u22AF',
		nVdash: '\u22AE',
		nvDash: '\u22AD',
		nvdash: '\u22AC',
		nvge: '\u2265\u20D2',
		nvgt: '\u003E\u20D2',
		nvHarr: '\u2904',
		nvinfin: '\u29DE',
		nvlArr: '\u2902',
		nvle: '\u2264\u20D2',
		nvlt: '\u003C\u20D2',
		nvltrie: '\u22B4\u20D2',
		nvrArr: '\u2903',
		nvrtrie: '\u22B5\u20D2',
		nvsim: '\u223C\u20D2',
		nwarhk: '\u2923',
		nwArr: '\u21D6',
		nwarr: '\u2196',
		nwarrow: '\u2196',
		nwnear: '\u2927',
		Oacute: '\u00D3',
		oacute: '\u00F3',
		oast: '\u229B',
		ocir: '\u229A',
		Ocirc: '\u00D4',
		ocirc: '\u00F4',
		Ocy: '\u041E',
		ocy: '\u043E',
		odash: '\u229D',
		Odblac: '\u0150',
		odblac: '\u0151',
		odiv: '\u2A38',
		odot: '\u2299',
		odsold: '\u29BC',
		OElig: '\u0152',
		oelig: '\u0153',
		ofcir: '\u29BF',
		Ofr: '\uD835\uDD12',
		ofr: '\uD835\uDD2C',
		ogon: '\u02DB',
		Ograve: '\u00D2',
		ograve: '\u00F2',
		ogt: '\u29C1',
		ohbar: '\u29B5',
		ohm: '\u03A9',
		oint: '\u222E',
		olarr: '\u21BA',
		olcir: '\u29BE',
		olcross: '\u29BB',
		oline: '\u203E',
		olt: '\u29C0',
		Omacr: '\u014C',
		omacr: '\u014D',
		Omega: '\u03A9',
		omega: '\u03C9',
		Omicron: '\u039F',
		omicron: '\u03BF',
		omid: '\u29B6',
		ominus: '\u2296',
		Oopf: '\uD835\uDD46',
		oopf: '\uD835\uDD60',
		opar: '\u29B7',
		OpenCurlyDoubleQuote: '\u201C',
		OpenCurlyQuote: '\u2018',
		operp: '\u29B9',
		oplus: '\u2295',
		Or: '\u2A54',
		or: '\u2228',
		orarr: '\u21BB',
		ord: '\u2A5D',
		order: '\u2134',
		orderof: '\u2134',
		ordf: '\u00AA',
		ordm: '\u00BA',
		origof: '\u22B6',
		oror: '\u2A56',
		orslope: '\u2A57',
		orv: '\u2A5B',
		oS: '\u24C8',
		Oscr: '\uD835\uDCAA',
		oscr: '\u2134',
		Oslash: '\u00D8',
		oslash: '\u00F8',
		osol: '\u2298',
		Otilde: '\u00D5',
		otilde: '\u00F5',
		Otimes: '\u2A37',
		otimes: '\u2297',
		otimesas: '\u2A36',
		Ouml: '\u00D6',
		ouml: '\u00F6',
		ovbar: '\u233D',
		OverBar: '\u203E',
		OverBrace: '\u23DE',
		OverBracket: '\u23B4',
		OverParenthesis: '\u23DC',
		par: '\u2225',
		para: '\u00B6',
		parallel: '\u2225',
		parsim: '\u2AF3',
		parsl: '\u2AFD',
		part: '\u2202',
		PartialD: '\u2202',
		Pcy: '\u041F',
		pcy: '\u043F',
		percnt: '\u0025',
		period: '\u002E',
		permil: '\u2030',
		perp: '\u22A5',
		pertenk: '\u2031',
		Pfr: '\uD835\uDD13',
		pfr: '\uD835\uDD2D',
		Phi: '\u03A6',
		phi: '\u03C6',
		phiv: '\u03D5',
		phmmat: '\u2133',
		phone: '\u260E',
		Pi: '\u03A0',
		pi: '\u03C0',
		pitchfork: '\u22D4',
		piv: '\u03D6',
		planck: '\u210F',
		planckh: '\u210E',
		plankv: '\u210F',
		plus: '\u002B',
		plusacir: '\u2A23',
		plusb: '\u229E',
		pluscir: '\u2A22',
		plusdo: '\u2214',
		plusdu: '\u2A25',
		pluse: '\u2A72',
		PlusMinus: '\u00B1',
		plusmn: '\u00B1',
		plussim: '\u2A26',
		plustwo: '\u2A27',
		pm: '\u00B1',
		Poincareplane: '\u210C',
		pointint: '\u2A15',
		Popf: '\u2119',
		popf: '\uD835\uDD61',
		pound: '\u00A3',
		Pr: '\u2ABB',
		pr: '\u227A',
		prap: '\u2AB7',
		prcue: '\u227C',
		prE: '\u2AB3',
		pre: '\u2AAF',
		prec: '\u227A',
		precapprox: '\u2AB7',
		preccurlyeq: '\u227C',
		Precedes: '\u227A',
		PrecedesEqual: '\u2AAF',
		PrecedesSlantEqual: '\u227C',
		PrecedesTilde: '\u227E',
		preceq: '\u2AAF',
		precnapprox: '\u2AB9',
		precneqq: '\u2AB5',
		precnsim: '\u22E8',
		precsim: '\u227E',
		Prime: '\u2033',
		prime: '\u2032',
		primes: '\u2119',
		prnap: '\u2AB9',
		prnE: '\u2AB5',
		prnsim: '\u22E8',
		prod: '\u220F',
		Product: '\u220F',
		profalar: '\u232E',
		profline: '\u2312',
		profsurf: '\u2313',
		prop: '\u221D',
		Proportion: '\u2237',
		Proportional: '\u221D',
		propto: '\u221D',
		prsim: '\u227E',
		prurel: '\u22B0',
		Pscr: '\uD835\uDCAB',
		pscr: '\uD835\uDCC5',
		Psi: '\u03A8',
		psi: '\u03C8',
		puncsp: '\u2008',
		Qfr: '\uD835\uDD14',
		qfr: '\uD835\uDD2E',
		qint: '\u2A0C',
		Qopf: '\u211A',
		qopf: '\uD835\uDD62',
		qprime: '\u2057',
		Qscr: '\uD835\uDCAC',
		qscr: '\uD835\uDCC6',
		quaternions: '\u210D',
		quatint: '\u2A16',
		quest: '\u003F',
		questeq: '\u225F',
		QUOT: '\u0022',
		quot: '\u0022',
		rAarr: '\u21DB',
		race: '\u223D\u0331',
		Racute: '\u0154',
		racute: '\u0155',
		radic: '\u221A',
		raemptyv: '\u29B3',
		Rang: '\u27EB',
		rang: '\u27E9',
		rangd: '\u2992',
		range: '\u29A5',
		rangle: '\u27E9',
		raquo: '\u00BB',
		Rarr: '\u21A0',
		rArr: '\u21D2',
		rarr: '\u2192',
		rarrap: '\u2975',
		rarrb: '\u21E5',
		rarrbfs: '\u2920',
		rarrc: '\u2933',
		rarrfs: '\u291E',
		rarrhk: '\u21AA',
		rarrlp: '\u21AC',
		rarrpl: '\u2945',
		rarrsim: '\u2974',
		Rarrtl: '\u2916',
		rarrtl: '\u21A3',
		rarrw: '\u219D',
		rAtail: '\u291C',
		ratail: '\u291A',
		ratio: '\u2236',
		rationals: '\u211A',
		RBarr: '\u2910',
		rBarr: '\u290F',
		rbarr: '\u290D',
		rbbrk: '\u2773',
		rbrace: '\u007D',
		rbrack: '\u005D',
		rbrke: '\u298C',
		rbrksld: '\u298E',
		rbrkslu: '\u2990',
		Rcaron: '\u0158',
		rcaron: '\u0159',
		Rcedil: '\u0156',
		rcedil: '\u0157',
		rceil: '\u2309',
		rcub: '\u007D',
		Rcy: '\u0420',
		rcy: '\u0440',
		rdca: '\u2937',
		rdldhar: '\u2969',
		rdquo: '\u201D',
		rdquor: '\u201D',
		rdsh: '\u21B3',
		Re: '\u211C',
		real: '\u211C',
		realine: '\u211B',
		realpart: '\u211C',
		reals: '\u211D',
		rect: '\u25AD',
		REG: '\u00AE',
		reg: '\u00AE',
		ReverseElement: '\u220B',
		ReverseEquilibrium: '\u21CB',
		ReverseUpEquilibrium: '\u296F',
		rfisht: '\u297D',
		rfloor: '\u230B',
		Rfr: '\u211C',
		rfr: '\uD835\uDD2F',
		rHar: '\u2964',
		rhard: '\u21C1',
		rharu: '\u21C0',
		rharul: '\u296C',
		Rho: '\u03A1',
		rho: '\u03C1',
		rhov: '\u03F1',
		RightAngleBracket: '\u27E9',
		RightArrow: '\u2192',
		Rightarrow: '\u21D2',
		rightarrow: '\u2192',
		RightArrowBar: '\u21E5',
		RightArrowLeftArrow: '\u21C4',
		rightarrowtail: '\u21A3',
		RightCeiling: '\u2309',
		RightDoubleBracket: '\u27E7',
		RightDownTeeVector: '\u295D',
		RightDownVector: '\u21C2',
		RightDownVectorBar: '\u2955',
		RightFloor: '\u230B',
		rightharpoondown: '\u21C1',
		rightharpoonup: '\u21C0',
		rightleftarrows: '\u21C4',
		rightleftharpoons: '\u21CC',
		rightrightarrows: '\u21C9',
		rightsquigarrow: '\u219D',
		RightTee: '\u22A2',
		RightTeeArrow: '\u21A6',
		RightTeeVector: '\u295B',
		rightthreetimes: '\u22CC',
		RightTriangle: '\u22B3',
		RightTriangleBar: '\u29D0',
		RightTriangleEqual: '\u22B5',
		RightUpDownVector: '\u294F',
		RightUpTeeVector: '\u295C',
		RightUpVector: '\u21BE',
		RightUpVectorBar: '\u2954',
		RightVector: '\u21C0',
		RightVectorBar: '\u2953',
		ring: '\u02DA',
		risingdotseq: '\u2253',
		rlarr: '\u21C4',
		rlhar: '\u21CC',
		rlm: '\u200F',
		rmoust: '\u23B1',
		rmoustache: '\u23B1',
		rnmid: '\u2AEE',
		roang: '\u27ED',
		roarr: '\u21FE',
		robrk: '\u27E7',
		ropar: '\u2986',
		Ropf: '\u211D',
		ropf: '\uD835\uDD63',
		roplus: '\u2A2E',
		rotimes: '\u2A35',
		RoundImplies: '\u2970',
		rpar: '\u0029',
		rpargt: '\u2994',
		rppolint: '\u2A12',
		rrarr: '\u21C9',
		Rrightarrow: '\u21DB',
		rsaquo: '\u203A',
		Rscr: '\u211B',
		rscr: '\uD835\uDCC7',
		Rsh: '\u21B1',
		rsh: '\u21B1',
		rsqb: '\u005D',
		rsquo: '\u2019',
		rsquor: '\u2019',
		rthree: '\u22CC',
		rtimes: '\u22CA',
		rtri: '\u25B9',
		rtrie: '\u22B5',
		rtrif: '\u25B8',
		rtriltri: '\u29CE',
		RuleDelayed: '\u29F4',
		ruluhar: '\u2968',
		rx: '\u211E',
		Sacute: '\u015A',
		sacute: '\u015B',
		sbquo: '\u201A',
		Sc: '\u2ABC',
		sc: '\u227B',
		scap: '\u2AB8',
		Scaron: '\u0160',
		scaron: '\u0161',
		sccue: '\u227D',
		scE: '\u2AB4',
		sce: '\u2AB0',
		Scedil: '\u015E',
		scedil: '\u015F',
		Scirc: '\u015C',
		scirc: '\u015D',
		scnap: '\u2ABA',
		scnE: '\u2AB6',
		scnsim: '\u22E9',
		scpolint: '\u2A13',
		scsim: '\u227F',
		Scy: '\u0421',
		scy: '\u0441',
		sdot: '\u22C5',
		sdotb: '\u22A1',
		sdote: '\u2A66',
		searhk: '\u2925',
		seArr: '\u21D8',
		searr: '\u2198',
		searrow: '\u2198',
		sect: '\u00A7',
		semi: '\u003B',
		seswar: '\u2929',
		setminus: '\u2216',
		setmn: '\u2216',
		sext: '\u2736',
		Sfr: '\uD835\uDD16',
		sfr: '\uD835\uDD30',
		sfrown: '\u2322',
		sharp: '\u266F',
		SHCHcy: '\u0429',
		shchcy: '\u0449',
		SHcy: '\u0428',
		shcy: '\u0448',
		ShortDownArrow: '\u2193',
		ShortLeftArrow: '\u2190',
		shortmid: '\u2223',
		shortparallel: '\u2225',
		ShortRightArrow: '\u2192',
		ShortUpArrow: '\u2191',
		shy: '\u00AD',
		Sigma: '\u03A3',
		sigma: '\u03C3',
		sigmaf: '\u03C2',
		sigmav: '\u03C2',
		sim: '\u223C',
		simdot: '\u2A6A',
		sime: '\u2243',
		simeq: '\u2243',
		simg: '\u2A9E',
		simgE: '\u2AA0',
		siml: '\u2A9D',
		simlE: '\u2A9F',
		simne: '\u2246',
		simplus: '\u2A24',
		simrarr: '\u2972',
		slarr: '\u2190',
		SmallCircle: '\u2218',
		smallsetminus: '\u2216',
		smashp: '\u2A33',
		smeparsl: '\u29E4',
		smid: '\u2223',
		smile: '\u2323',
		smt: '\u2AAA',
		smte: '\u2AAC',
		smtes: '\u2AAC\uFE00',
		SOFTcy: '\u042C',
		softcy: '\u044C',
		sol: '\u002F',
		solb: '\u29C4',
		solbar: '\u233F',
		Sopf: '\uD835\uDD4A',
		sopf: '\uD835\uDD64',
		spades: '\u2660',
		spadesuit: '\u2660',
		spar: '\u2225',
		sqcap: '\u2293',
		sqcaps: '\u2293\uFE00',
		sqcup: '\u2294',
		sqcups: '\u2294\uFE00',
		Sqrt: '\u221A',
		sqsub: '\u228F',
		sqsube: '\u2291',
		sqsubset: '\u228F',
		sqsubseteq: '\u2291',
		sqsup: '\u2290',
		sqsupe: '\u2292',
		sqsupset: '\u2290',
		sqsupseteq: '\u2292',
		squ: '\u25A1',
		Square: '\u25A1',
		square: '\u25A1',
		SquareIntersection: '\u2293',
		SquareSubset: '\u228F',
		SquareSubsetEqual: '\u2291',
		SquareSuperset: '\u2290',
		SquareSupersetEqual: '\u2292',
		SquareUnion: '\u2294',
		squarf: '\u25AA',
		squf: '\u25AA',
		srarr: '\u2192',
		Sscr: '\uD835\uDCAE',
		sscr: '\uD835\uDCC8',
		ssetmn: '\u2216',
		ssmile: '\u2323',
		sstarf: '\u22C6',
		Star: '\u22C6',
		star: '\u2606',
		starf: '\u2605',
		straightepsilon: '\u03F5',
		straightphi: '\u03D5',
		strns: '\u00AF',
		Sub: '\u22D0',
		sub: '\u2282',
		subdot: '\u2ABD',
		subE: '\u2AC5',
		sube: '\u2286',
		subedot: '\u2AC3',
		submult: '\u2AC1',
		subnE: '\u2ACB',
		subne: '\u228A',
		subplus: '\u2ABF',
		subrarr: '\u2979',
		Subset: '\u22D0',
		subset: '\u2282',
		subseteq: '\u2286',
		subseteqq: '\u2AC5',
		SubsetEqual: '\u2286',
		subsetneq: '\u228A',
		subsetneqq: '\u2ACB',
		subsim: '\u2AC7',
		subsub: '\u2AD5',
		subsup: '\u2AD3',
		succ: '\u227B',
		succapprox: '\u2AB8',
		succcurlyeq: '\u227D',
		Succeeds: '\u227B',
		SucceedsEqual: '\u2AB0',
		SucceedsSlantEqual: '\u227D',
		SucceedsTilde: '\u227F',
		succeq: '\u2AB0',
		succnapprox: '\u2ABA',
		succneqq: '\u2AB6',
		succnsim: '\u22E9',
		succsim: '\u227F',
		SuchThat: '\u220B',
		Sum: '\u2211',
		sum: '\u2211',
		sung: '\u266A',
		Sup: '\u22D1',
		sup: '\u2283',
		sup1: '\u00B9',
		sup2: '\u00B2',
		sup3: '\u00B3',
		supdot: '\u2ABE',
		supdsub: '\u2AD8',
		supE: '\u2AC6',
		supe: '\u2287',
		supedot: '\u2AC4',
		Superset: '\u2283',
		SupersetEqual: '\u2287',
		suphsol: '\u27C9',
		suphsub: '\u2AD7',
		suplarr: '\u297B',
		supmult: '\u2AC2',
		supnE: '\u2ACC',
		supne: '\u228B',
		supplus: '\u2AC0',
		Supset: '\u22D1',
		supset: '\u2283',
		supseteq: '\u2287',
		supseteqq: '\u2AC6',
		supsetneq: '\u228B',
		supsetneqq: '\u2ACC',
		supsim: '\u2AC8',
		supsub: '\u2AD4',
		supsup: '\u2AD6',
		swarhk: '\u2926',
		swArr: '\u21D9',
		swarr: '\u2199',
		swarrow: '\u2199',
		swnwar: '\u292A',
		szlig: '\u00DF',
		Tab: '\u0009',
		target: '\u2316',
		Tau: '\u03A4',
		tau: '\u03C4',
		tbrk: '\u23B4',
		Tcaron: '\u0164',
		tcaron: '\u0165',
		Tcedil: '\u0162',
		tcedil: '\u0163',
		Tcy: '\u0422',
		tcy: '\u0442',
		tdot: '\u20DB',
		telrec: '\u2315',
		Tfr: '\uD835\uDD17',
		tfr: '\uD835\uDD31',
		there4: '\u2234',
		Therefore: '\u2234',
		therefore: '\u2234',
		Theta: '\u0398',
		theta: '\u03B8',
		thetasym: '\u03D1',
		thetav: '\u03D1',
		thickapprox: '\u2248',
		thicksim: '\u223C',
		ThickSpace: '\u205F\u200A',
		thinsp: '\u2009',
		ThinSpace: '\u2009',
		thkap: '\u2248',
		thksim: '\u223C',
		THORN: '\u00DE',
		thorn: '\u00FE',
		Tilde: '\u223C',
		tilde: '\u02DC',
		TildeEqual: '\u2243',
		TildeFullEqual: '\u2245',
		TildeTilde: '\u2248',
		times: '\u00D7',
		timesb: '\u22A0',
		timesbar: '\u2A31',
		timesd: '\u2A30',
		tint: '\u222D',
		toea: '\u2928',
		top: '\u22A4',
		topbot: '\u2336',
		topcir: '\u2AF1',
		Topf: '\uD835\uDD4B',
		topf: '\uD835\uDD65',
		topfork: '\u2ADA',
		tosa: '\u2929',
		tprime: '\u2034',
		TRADE: '\u2122',
		trade: '\u2122',
		triangle: '\u25B5',
		triangledown: '\u25BF',
		triangleleft: '\u25C3',
		trianglelefteq: '\u22B4',
		triangleq: '\u225C',
		triangleright: '\u25B9',
		trianglerighteq: '\u22B5',
		tridot: '\u25EC',
		trie: '\u225C',
		triminus: '\u2A3A',
		TripleDot: '\u20DB',
		triplus: '\u2A39',
		trisb: '\u29CD',
		tritime: '\u2A3B',
		trpezium: '\u23E2',
		Tscr: '\uD835\uDCAF',
		tscr: '\uD835\uDCC9',
		TScy: '\u0426',
		tscy: '\u0446',
		TSHcy: '\u040B',
		tshcy: '\u045B',
		Tstrok: '\u0166',
		tstrok: '\u0167',
		twixt: '\u226C',
		twoheadleftarrow: '\u219E',
		twoheadrightarrow: '\u21A0',
		Uacute: '\u00DA',
		uacute: '\u00FA',
		Uarr: '\u219F',
		uArr: '\u21D1',
		uarr: '\u2191',
		Uarrocir: '\u2949',
		Ubrcy: '\u040E',
		ubrcy: '\u045E',
		Ubreve: '\u016C',
		ubreve: '\u016D',
		Ucirc: '\u00DB',
		ucirc: '\u00FB',
		Ucy: '\u0423',
		ucy: '\u0443',
		udarr: '\u21C5',
		Udblac: '\u0170',
		udblac: '\u0171',
		udhar: '\u296E',
		ufisht: '\u297E',
		Ufr: '\uD835\uDD18',
		ufr: '\uD835\uDD32',
		Ugrave: '\u00D9',
		ugrave: '\u00F9',
		uHar: '\u2963',
		uharl: '\u21BF',
		uharr: '\u21BE',
		uhblk: '\u2580',
		ulcorn: '\u231C',
		ulcorner: '\u231C',
		ulcrop: '\u230F',
		ultri: '\u25F8',
		Umacr: '\u016A',
		umacr: '\u016B',
		uml: '\u00A8',
		UnderBar: '\u005F',
		UnderBrace: '\u23DF',
		UnderBracket: '\u23B5',
		UnderParenthesis: '\u23DD',
		Union: '\u22C3',
		UnionPlus: '\u228E',
		Uogon: '\u0172',
		uogon: '\u0173',
		Uopf: '\uD835\uDD4C',
		uopf: '\uD835\uDD66',
		UpArrow: '\u2191',
		Uparrow: '\u21D1',
		uparrow: '\u2191',
		UpArrowBar: '\u2912',
		UpArrowDownArrow: '\u21C5',
		UpDownArrow: '\u2195',
		Updownarrow: '\u21D5',
		updownarrow: '\u2195',
		UpEquilibrium: '\u296E',
		upharpoonleft: '\u21BF',
		upharpoonright: '\u21BE',
		uplus: '\u228E',
		UpperLeftArrow: '\u2196',
		UpperRightArrow: '\u2197',
		Upsi: '\u03D2',
		upsi: '\u03C5',
		upsih: '\u03D2',
		Upsilon: '\u03A5',
		upsilon: '\u03C5',
		UpTee: '\u22A5',
		UpTeeArrow: '\u21A5',
		upuparrows: '\u21C8',
		urcorn: '\u231D',
		urcorner: '\u231D',
		urcrop: '\u230E',
		Uring: '\u016E',
		uring: '\u016F',
		urtri: '\u25F9',
		Uscr: '\uD835\uDCB0',
		uscr: '\uD835\uDCCA',
		utdot: '\u22F0',
		Utilde: '\u0168',
		utilde: '\u0169',
		utri: '\u25B5',
		utrif: '\u25B4',
		uuarr: '\u21C8',
		Uuml: '\u00DC',
		uuml: '\u00FC',
		uwangle: '\u29A7',
		vangrt: '\u299C',
		varepsilon: '\u03F5',
		varkappa: '\u03F0',
		varnothing: '\u2205',
		varphi: '\u03D5',
		varpi: '\u03D6',
		varpropto: '\u221D',
		vArr: '\u21D5',
		varr: '\u2195',
		varrho: '\u03F1',
		varsigma: '\u03C2',
		varsubsetneq: '\u228A\uFE00',
		varsubsetneqq: '\u2ACB\uFE00',
		varsupsetneq: '\u228B\uFE00',
		varsupsetneqq: '\u2ACC\uFE00',
		vartheta: '\u03D1',
		vartriangleleft: '\u22B2',
		vartriangleright: '\u22B3',
		Vbar: '\u2AEB',
		vBar: '\u2AE8',
		vBarv: '\u2AE9',
		Vcy: '\u0412',
		vcy: '\u0432',
		VDash: '\u22AB',
		Vdash: '\u22A9',
		vDash: '\u22A8',
		vdash: '\u22A2',
		Vdashl: '\u2AE6',
		Vee: '\u22C1',
		vee: '\u2228',
		veebar: '\u22BB',
		veeeq: '\u225A',
		vellip: '\u22EE',
		Verbar: '\u2016',
		verbar: '\u007C',
		Vert: '\u2016',
		vert: '\u007C',
		VerticalBar: '\u2223',
		VerticalLine: '\u007C',
		VerticalSeparator: '\u2758',
		VerticalTilde: '\u2240',
		VeryThinSpace: '\u200A',
		Vfr: '\uD835\uDD19',
		vfr: '\uD835\uDD33',
		vltri: '\u22B2',
		vnsub: '\u2282\u20D2',
		vnsup: '\u2283\u20D2',
		Vopf: '\uD835\uDD4D',
		vopf: '\uD835\uDD67',
		vprop: '\u221D',
		vrtri: '\u22B3',
		Vscr: '\uD835\uDCB1',
		vscr: '\uD835\uDCCB',
		vsubnE: '\u2ACB\uFE00',
		vsubne: '\u228A\uFE00',
		vsupnE: '\u2ACC\uFE00',
		vsupne: '\u228B\uFE00',
		Vvdash: '\u22AA',
		vzigzag: '\u299A',
		Wcirc: '\u0174',
		wcirc: '\u0175',
		wedbar: '\u2A5F',
		Wedge: '\u22C0',
		wedge: '\u2227',
		wedgeq: '\u2259',
		weierp: '\u2118',
		Wfr: '\uD835\uDD1A',
		wfr: '\uD835\uDD34',
		Wopf: '\uD835\uDD4E',
		wopf: '\uD835\uDD68',
		wp: '\u2118',
		wr: '\u2240',
		wreath: '\u2240',
		Wscr: '\uD835\uDCB2',
		wscr: '\uD835\uDCCC',
		xcap: '\u22C2',
		xcirc: '\u25EF',
		xcup: '\u22C3',
		xdtri: '\u25BD',
		Xfr: '\uD835\uDD1B',
		xfr: '\uD835\uDD35',
		xhArr: '\u27FA',
		xharr: '\u27F7',
		Xi: '\u039E',
		xi: '\u03BE',
		xlArr: '\u27F8',
		xlarr: '\u27F5',
		xmap: '\u27FC',
		xnis: '\u22FB',
		xodot: '\u2A00',
		Xopf: '\uD835\uDD4F',
		xopf: '\uD835\uDD69',
		xoplus: '\u2A01',
		xotime: '\u2A02',
		xrArr: '\u27F9',
		xrarr: '\u27F6',
		Xscr: '\uD835\uDCB3',
		xscr: '\uD835\uDCCD',
		xsqcup: '\u2A06',
		xuplus: '\u2A04',
		xutri: '\u25B3',
		xvee: '\u22C1',
		xwedge: '\u22C0',
		Yacute: '\u00DD',
		yacute: '\u00FD',
		YAcy: '\u042F',
		yacy: '\u044F',
		Ycirc: '\u0176',
		ycirc: '\u0177',
		Ycy: '\u042B',
		ycy: '\u044B',
		yen: '\u00A5',
		Yfr: '\uD835\uDD1C',
		yfr: '\uD835\uDD36',
		YIcy: '\u0407',
		yicy: '\u0457',
		Yopf: '\uD835\uDD50',
		yopf: '\uD835\uDD6A',
		Yscr: '\uD835\uDCB4',
		yscr: '\uD835\uDCCE',
		YUcy: '\u042E',
		yucy: '\u044E',
		Yuml: '\u0178',
		yuml: '\u00FF',
		Zacute: '\u0179',
		zacute: '\u017A',
		Zcaron: '\u017D',
		zcaron: '\u017E',
		Zcy: '\u0417',
		zcy: '\u0437',
		Zdot: '\u017B',
		zdot: '\u017C',
		zeetrf: '\u2128',
		ZeroWidthSpace: '\u200B',
		Zeta: '\u0396',
		zeta: '\u03B6',
		Zfr: '\u2128',
		zfr: '\uD835\uDD37',
		ZHcy: '\u0416',
		zhcy: '\u0436',
		zigrarr: '\u21DD',
		Zopf: '\u2124',
		zopf: '\uD835\uDD6B',
		Zscr: '\uD835\uDCB5',
		zscr: '\uD835\uDCCF',
		zwj: '\u200D',
		zwnj: '\u200C',
	});

	/**
	 * @deprecated
	 * Use `HTML_ENTITIES` instead.
	 * @see {@link HTML_ENTITIES}
	 */
	exports.entityMap = exports.HTML_ENTITIES; 
} (entities$1));

var sax$1 = {};

var conventions$2 = conventions$5;
var g = grammar;
var errors$2 = errors$4;

var isHTMLEscapableRawTextElement = conventions$2.isHTMLEscapableRawTextElement;
var isHTMLMimeType$1 = conventions$2.isHTMLMimeType;
var isHTMLRawTextElement = conventions$2.isHTMLRawTextElement;
var hasOwn = conventions$2.hasOwn;
var NAMESPACE$1 = conventions$2.NAMESPACE;
var ParseError$1 = errors$2.ParseError;
var DOMException = errors$2.DOMException;

//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0; //tag name offerring
var S_ATTR = 1; //attr name offerring
var S_ATTR_SPACE = 2; //attr name end and space offer
var S_EQ = 3; //=space?
var S_ATTR_NOQUOT_VALUE = 4; //attr value(no quot value only)
var S_ATTR_END = 5; //attr value end and no space(quot end)
var S_TAG_SPACE = 6; //(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7; //closed el<el />

function XMLReader$1() {}

XMLReader$1.prototype = {
	parse: function (source, defaultNSMap, entityMap) {
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap, (defaultNSMap = Object.create(null)));
		parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
		domBuilder.endDocument();
	},
};

/**
 * Detecting everything that might be a reference,
 * including those without ending `;`, since those are allowed in HTML.
 * The entityReplacer takes care of verifying and transforming each occurrence,
 * and reports to the errorHandler on those that are not OK,
 * depending on the context.
 */
var ENTITY_REG = /&#?\w+;?/g;

function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
	var isHTML = isHTMLMimeType$1(domBuilder.mimeType);
	if (source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0) {
		errorHandler.warning('Unicode replacement character detected, source encoding issues?');
	}

	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10),
				surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}

	function entityReplacer(a) {
		var complete = a[a.length - 1] === ';' ? a : a + ';';
		if (!isHTML && complete !== a) {
			errorHandler.error('EntityRef: expecting ;');
			return a;
		}
		var match = g.Reference.exec(complete);
		if (!match || match[0].length !== complete.length) {
			errorHandler.error('entity not matching Reference production: ' + a);
			return a;
		}
		var k = complete.slice(1, -1);
		if (hasOwn(entityMap, k)) {
			return entityMap[k];
		} else if (k.charAt(0) === '#') {
			return fixedFromCharCode(parseInt(k.substring(1).replace('x', '0x')));
		} else {
			errorHandler.error('entity not found:' + a);
			return a;
		}
	}

	function appendText(end) {
		//has some bugs
		if (end > start) {
			var xt = source.substring(start, end).replace(ENTITY_REG, entityReplacer);
			locator && position(start);
			domBuilder.characters(xt, 0, end - start);
			start = end;
		}
	}

	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /\r\n?|\n|$/g;
	var locator = domBuilder.locator;

	function position(p, m) {
		while (p >= lineEnd && (m = linePattern.exec(source))) {
			lineStart = lineEnd;
			lineEnd = m.index + m[0].length;
			locator.lineNumber++;
		}
		locator.columnNumber = p - lineStart + 1;
	}

	var parseStack = [{ currentNSMap: defaultNSMapCopy }];
	var unclosedTags = [];
	var start = 0;
	while (true) {
		try {
			var tagStart = source.indexOf('<', start);
			if (tagStart < 0) {
				if (!isHTML && unclosedTags.length > 0) {
					return errorHandler.fatalError('unclosed xml tag(s): ' + unclosedTags.join(', '));
				}
				if (!source.substring(start).match(/^\s*$/)) {
					var doc = domBuilder.doc;
					var text = doc.createTextNode(source.substring(start));
					if (doc.documentElement) {
						return errorHandler.error('Extra content at the end of the document');
					}
					doc.appendChild(text);
					domBuilder.currentElement = text;
				}
				return;
			}
			if (tagStart > start) {
				var fromSource = source.substring(start, tagStart);
				if (!isHTML && unclosedTags.length === 0) {
					fromSource = fromSource.replace(new RegExp(g.S_OPT.source, 'g'), '');
					fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'");
				}
				appendText(tagStart);
			}
			switch (source.charAt(tagStart + 1)) {
				case '/':
					var end = source.indexOf('>', tagStart + 2);
					var tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : undefined);
					if (!tagNameRaw) {
						return errorHandler.fatalError('end tag name missing');
					}
					var tagNameMatch = end > 0 && g.reg('^', g.QName_group, g.S_OPT, '$').exec(tagNameRaw);
					if (!tagNameMatch) {
						return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
					}
					if (!domBuilder.currentElement && !domBuilder.doc.documentElement) {
						// not enough information to provide a helpful error message,
						// but parsing will throw since there is no root element
						return;
					}
					var currentTagName =
						unclosedTags[unclosedTags.length - 1] ||
						domBuilder.currentElement.tagName ||
						domBuilder.doc.documentElement.tagName ||
						'';
					if (currentTagName !== tagNameMatch[1]) {
						var tagNameLower = tagNameMatch[1].toLowerCase();
						if (!isHTML || currentTagName.toLowerCase() !== tagNameLower) {
							return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
						}
					}
					var config = parseStack.pop();
					unclosedTags.pop();
					var localNSMap = config.localNSMap;
					domBuilder.endElement(config.uri, config.localName, currentTagName);
					if (localNSMap) {
						for (var prefix in localNSMap) {
							if (hasOwn(localNSMap, prefix)) {
								domBuilder.endPrefixMapping(prefix);
							}
						}
					}

					end++;
					break;
				// end element
				case '?': // <?...?>
					locator && position(tagStart);
					end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
					break;
				case '!': // <!doctype,<![CDATA,<!--
					locator && position(tagStart);
					end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
					break;
				default:
					locator && position(tagStart);
					var el = new ElementAttributes();
					var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
					//elStartEnd
					var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML);
					var len = el.length;

					if (!el.closed) {
						if (isHTML && conventions$2.isHTMLVoidElement(el.tagName)) {
							el.closed = true;
						} else {
							unclosedTags.push(el.tagName);
						}
					}
					if (locator && len) {
						var locator2 = copyLocator(locator, {});
						//try{//attribute position fixed
						for (var i = 0; i < len; i++) {
							var a = el[i];
							position(a.offset);
							a.locator = copyLocator(locator, {});
						}
						domBuilder.locator = locator2;
						if (appendElement$1(el, domBuilder, currentNSMap)) {
							parseStack.push(el);
						}
						domBuilder.locator = locator;
					} else {
						if (appendElement$1(el, domBuilder, currentNSMap)) {
							parseStack.push(el);
						}
					}

					if (isHTML && !el.closed) {
						end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
					} else {
						end++;
					}
			}
		} catch (e) {
			if (e instanceof ParseError$1) {
				throw e;
			} else if (e instanceof DOMException) {
				throw new ParseError$1(e.name + ': ' + e.message, domBuilder.locator, e);
			}
			errorHandler.error('element parse error: ' + e);
			end = -1;
		}
		if (end > start) {
			start = end;
		} else {
			//Possible sax fallback here, risk of positional error
			appendText(Math.max(tagStart, start) + 1);
		}
	}
}

function copyLocator(f, t) {
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @returns
 * end of the elementStartPart(end of elementEndPart for selfClosed el)
 * @see {@link #appendElement}
 */
function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
	/**
	 * @param {string} qname
	 * @param {string} value
	 * @param {number} startIndex
	 */
	function addAttribute(qname, value, startIndex) {
		if (hasOwn(el.attributeNames, qname)) {
			return errorHandler.fatalError('Attribute ' + qname + ' redefined');
		}
		if (!isHTML && value.indexOf('<') >= 0) {
			return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
		}
		el.addValue(
			qname,
			// @see https://www.w3.org/TR/xml/#AVNormalize
			// since the xmldom sax parser does not "interpret" DTD the following is not implemented:
			// - recursive replacement of (DTD) entity references
			// - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
			value.replace(/[\t\n\r]/g, ' ').replace(ENTITY_REG, entityReplacer),
			startIndex
		);
	}

	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG; //status
	while (true) {
		var c = source.charAt(p);
		switch (c) {
			case '=':
				if (s === S_ATTR) {
					//attrName
					attrName = source.slice(start, p);
					s = S_EQ;
				} else if (s === S_ATTR_SPACE) {
					s = S_EQ;
				} else {
					//fatalError: equal must after attrName or space after attrName
					throw new Error('attribute equal must after attrName'); // No known test case
				}
				break;
			case "'":
			case '"':
				if (
					s === S_EQ ||
					s === S_ATTR //|| s == S_ATTR_SPACE
				) {
					//equal
					if (s === S_ATTR) {
						errorHandler.warning('attribute value must after "="');
						attrName = source.slice(start, p);
					}
					start = p + 1;
					p = source.indexOf(c, start);
					if (p > 0) {
						value = source.slice(start, p);
						addAttribute(attrName, value, start - 1);
						s = S_ATTR_END;
					} else {
						//fatalError: no end quot match
						throw new Error("attribute value no end '" + c + "' match");
					}
				} else if (s == S_ATTR_NOQUOT_VALUE) {
					value = source.slice(start, p);
					addAttribute(attrName, value, start);
					errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
					start = p + 1;
					s = S_ATTR_END;
				} else {
					//fatalError: no equal before
					throw new Error('attribute value must after "="'); // No known test case
				}
				break;
			case '/':
				switch (s) {
					case S_TAG:
						el.setTagName(source.slice(start, p));
					case S_ATTR_END:
					case S_TAG_SPACE:
					case S_TAG_CLOSE:
						s = S_TAG_CLOSE;
						el.closed = true;
					case S_ATTR_NOQUOT_VALUE:
					case S_ATTR:
						break;
					case S_ATTR_SPACE:
						el.closed = true;
						break;
					//case S_EQ:
					default:
						throw new Error("attribute invalid close char('/')"); // No known test case
				}
				break;
			case '': //end document
				errorHandler.error('unexpected end of input');
				if (s == S_TAG) {
					el.setTagName(source.slice(start, p));
				}
				return p;
			case '>':
				switch (s) {
					case S_TAG:
						el.setTagName(source.slice(start, p));
					case S_ATTR_END:
					case S_TAG_SPACE:
					case S_TAG_CLOSE:
						break; //normal
					case S_ATTR_NOQUOT_VALUE: //Compatible state
					case S_ATTR:
						value = source.slice(start, p);
						if (value.slice(-1) === '/') {
							el.closed = true;
							value = value.slice(0, -1);
						}
					case S_ATTR_SPACE:
						if (s === S_ATTR_SPACE) {
							value = attrName;
						}
						if (s == S_ATTR_NOQUOT_VALUE) {
							errorHandler.warning('attribute "' + value + '" missed quot(")!');
							addAttribute(attrName, value, start);
						} else {
							if (!isHTML) {
								errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
							}
							addAttribute(value, value, start);
						}
						break;
					case S_EQ:
						if (!isHTML) {
							return errorHandler.fatalError('AttValue: \' or " expected');
						}
				}
				return p;
			/*xml space '\x20' | #x9 | #xD | #xA; */
			case '\u0080':
				c = ' ';
			default:
				if (c <= ' ') {
					//space
					switch (s) {
						case S_TAG:
							el.setTagName(source.slice(start, p)); //tagName
							s = S_TAG_SPACE;
							break;
						case S_ATTR:
							attrName = source.slice(start, p);
							s = S_ATTR_SPACE;
							break;
						case S_ATTR_NOQUOT_VALUE:
							var value = source.slice(start, p);
							errorHandler.warning('attribute "' + value + '" missed quot(")!!');
							addAttribute(attrName, value, start);
						case S_ATTR_END:
							s = S_TAG_SPACE;
							break;
						//case S_TAG_SPACE:
						//case S_EQ:
						//case S_ATTR_SPACE:
						//	void();break;
						//case S_TAG_CLOSE:
						//ignore warning
					}
				} else {
					//not space
					//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
					//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
					switch (s) {
						//case S_TAG:void();break;
						//case S_ATTR:void();break;
						//case S_ATTR_NOQUOT_VALUE:void();break;
						case S_ATTR_SPACE:
							if (!isHTML) {
								errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
							}
							addAttribute(attrName, attrName, start);
							start = p;
							s = S_ATTR;
							break;
						case S_ATTR_END:
							errorHandler.warning('attribute space is required"' + attrName + '"!!');
						case S_TAG_SPACE:
							s = S_ATTR;
							start = p;
							break;
						case S_EQ:
							s = S_ATTR_NOQUOT_VALUE;
							start = p;
							break;
						case S_TAG_CLOSE:
							throw new Error("elements closed character '/' and '>' must be connected to");
					}
				}
		} //end outer switch
		p++;
	}
}

/**
 * @returns
 * `true` if a new namespace has been defined.
 */
function appendElement$1(el, domBuilder, currentNSMap) {
	var tagName = el.tagName;
	var localNSMap = null;
	var i = el.length;
	while (i--) {
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if (nsp > 0) {
			var prefix = (a.prefix = qName.slice(0, nsp));
			var localName = qName.slice(nsp + 1);
			var nsPrefix = prefix === 'xmlns' && localName;
		} else {
			localName = qName;
			prefix = null;
			nsPrefix = qName === 'xmlns' && '';
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName;
		//prefix == null for no ns prefix attribute
		if (nsPrefix !== false) {
			//hack!!
			if (localNSMap == null) {
				localNSMap = Object.create(null);
				_copy(currentNSMap, (currentNSMap = Object.create(null)));
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = NAMESPACE$1.XMLNS;
			domBuilder.startPrefixMapping(nsPrefix, value);
		}
	}
	var i = el.length;
	while (i--) {
		a = el[i];
		if (a.prefix) {
			//no prefix attribute has no namespace
			if (a.prefix === 'xml') {
				a.uri = NAMESPACE$1.XML;
			}
			if (a.prefix !== 'xmlns') {
				a.uri = currentNSMap[a.prefix];
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if (nsp > 0) {
		prefix = el.prefix = tagName.slice(0, nsp);
		localName = el.localName = tagName.slice(nsp + 1);
	} else {
		prefix = null; //important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = (el.uri = currentNSMap[prefix || '']);
	domBuilder.startElement(ns, localName, tagName, el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if (el.closed) {
		domBuilder.endElement(ns, localName, tagName);
		if (localNSMap) {
			for (prefix in localNSMap) {
				if (hasOwn(localNSMap, prefix)) {
					domBuilder.endPrefixMapping(prefix);
				}
			}
		}
	} else {
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}

function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
	// https://html.spec.whatwg.org/#raw-text-elements
	// https://html.spec.whatwg.org/#escapable-raw-text-elements
	// https://html.spec.whatwg.org/#cdata-rcdata-restrictions:raw-text-elements
	// TODO: https://html.spec.whatwg.org/#cdata-rcdata-restrictions
	var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
	if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
		var elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
		var text = source.substring(elStartEnd + 1, elEndStart);

		if (isEscapableRaw) {
			text = text.replace(ENTITY_REG, entityReplacer);
		}
		domBuilder.characters(text, 0, text.length);
		return elEndStart;
	}
	return elStartEnd + 1;
}

function _copy(source, target) {
	for (var n in source) {
		if (hasOwn(source, n)) {
			target[n] = source[n];
		}
	}
}

/**
 * @typedef ParseUtils
 * @property {function(relativeIndex: number?): string | undefined} char
 * Provides look ahead access to a singe character relative to the current index.
 * @property {function(): number} getIndex
 * Provides read-only access to the current index.
 * @property {function(reg: RegExp): string | null} getMatch
 * Applies the provided regular expression enforcing that it starts at the current index and
 * returns the complete matching string,
 * and moves the current index by the length of the matching string.
 * @property {function(): string} getSource
 * Provides read-only access to the complete source.
 * @property {function(places: number?): void} skip
 * moves the current index by places (defaults to 1)
 * @property {function(): number} skipBlanks
 * Moves the current index by the amount of white space that directly follows the current index
 * and returns the amount of whitespace chars skipped (0..n),
 * or -1 if the end of the source was reached.
 * @property {function(): string} substringFromIndex
 * creates a substring from the current index to the end of `source`
 * @property {function(compareWith: string): boolean} substringStartsWith
 * Checks if `source` contains `compareWith`, starting from the current index.
 * @property {function(compareWith: string): boolean} substringStartsWithCaseInsensitive
 * Checks if `source` contains `compareWith`, starting from the current index,
 * comparing the upper case of both sides.
 * @see {@link parseUtils}
 */

/**
 * A temporary scope for parsing and look ahead operations in `source`,
 * starting from index `start`.
 *
 * Some operations move the current index by a number of positions,
 * after which `getIndex` returns the new index.
 *
 * @param {string} source
 * @param {number} start
 * @returns {ParseUtils}
 */
function parseUtils(source, start) {
	var index = start;

	function char(n) {
		n = n || 0;
		return source.charAt(index + n);
	}

	function skip(n) {
		n = n || 1;
		index += n;
	}

	function skipBlanks() {
		var blanks = 0;
		while (index < source.length) {
			var c = char();
			if (c !== ' ' && c !== '\n' && c !== '\t' && c !== '\r') {
				return blanks;
			}
			blanks++;
			skip();
		}
		return -1;
	}
	function substringFromIndex() {
		return source.substring(index);
	}
	function substringStartsWith(text) {
		return source.substring(index, index + text.length) === text;
	}
	function substringStartsWithCaseInsensitive(text) {
		return source.substring(index, index + text.length).toUpperCase() === text.toUpperCase();
	}

	function getMatch(args) {
		var expr = g.reg('^', args);
		var match = expr.exec(substringFromIndex());
		if (match) {
			skip(match[0].length);
			return match[0];
		}
		return null;
	}
	return {
		char: char,
		getIndex: function () {
			return index;
		},
		getMatch: getMatch,
		getSource: function () {
			return source;
		},
		skip: skip,
		skipBlanks: skipBlanks,
		substringFromIndex: substringFromIndex,
		substringStartsWith: substringStartsWith,
		substringStartsWithCaseInsensitive: substringStartsWithCaseInsensitive,
	};
}

/**
 * @param {ParseUtils} p
 * @param {DOMHandler} errorHandler
 * @returns {string}
 */
function parseDoctypeInternalSubset(p, errorHandler) {
	/**
	 * @param {ParseUtils} p
	 * @param {DOMHandler} errorHandler
	 * @returns {string}
	 */
	function parsePI(p, errorHandler) {
		var match = g.PI.exec(p.substringFromIndex());
		if (!match) {
			return errorHandler.fatalError('processing instruction is not well-formed at position ' + p.getIndex());
		}
		if (match[1].toLowerCase() === 'xml') {
			return errorHandler.fatalError(
				'xml declaration is only allowed at the start of the document, but found at position ' + p.getIndex()
			);
		}
		p.skip(match[0].length);
		return match[0];
	}
	// Parse internal subset
	var source = p.getSource();
	if (p.char() === '[') {
		p.skip(1);
		var intSubsetStart = p.getIndex();
		while (p.getIndex() < source.length) {
			p.skipBlanks();
			if (p.char() === ']') {
				var internalSubset = source.substring(intSubsetStart, p.getIndex());
				p.skip(1);
				return internalSubset;
			}
			var current = null;
			// Only in external subset
			// if (char() === '<' && char(1) === '!' && char(2) === '[') {
			// 	parseConditionalSections(p, errorHandler);
			// } else
			if (p.char() === '<' && p.char(1) === '!') {
				switch (p.char(2)) {
					case 'E': // ELEMENT | ENTITY
						if (p.char(3) === 'L') {
							current = p.getMatch(g.elementdecl);
						} else if (p.char(3) === 'N') {
							current = p.getMatch(g.EntityDecl);
						}
						break;
					case 'A': // ATTRIBUTE
						current = p.getMatch(g.AttlistDecl);
						break;
					case 'N': // NOTATION
						current = p.getMatch(g.NotationDecl);
						break;
					case '-': // COMMENT
						current = p.getMatch(g.Comment);
						break;
				}
			} else if (p.char() === '<' && p.char(1) === '?') {
				current = parsePI(p, errorHandler);
			} else if (p.char() === '%') {
				current = p.getMatch(g.PEReference);
			} else {
				return errorHandler.fatalError('Error detected in Markup declaration');
			}
			if (!current) {
				return errorHandler.fatalError('Error in internal subset at position ' + p.getIndex());
			}
		}
		return errorHandler.fatalError('doctype internal subset is not well-formed, missing ]');
	}
}

/**
 * Called when the parser encounters an element starting with '<!'.
 *
 * @param {string} source
 * The xml.
 * @param {number} start
 * the start index of the '<!'
 * @param {DOMHandler} domBuilder
 * @param {DOMHandler} errorHandler
 * @param {boolean} isHTML
 * @returns {number | never}
 * The end index of the element.
 * @throws {ParseError}
 * In case the element is not well-formed.
 */
function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
	var p = parseUtils(source, start);

	switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
		case '-':
			// should be a comment
			var comment = p.getMatch(g.Comment);
			if (comment) {
				domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length);
				return p.getIndex();
			} else {
				return errorHandler.fatalError('comment is not well-formed at position ' + p.getIndex());
			}
		case '[':
			// should be CDATA
			var cdata = p.getMatch(g.CDSect);
			if (cdata) {
				if (!isHTML && !domBuilder.currentElement) {
					return errorHandler.fatalError('CDATA outside of element');
				}
				domBuilder.startCDATA();
				domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length);
				domBuilder.endCDATA();
				return p.getIndex();
			} else {
				return errorHandler.fatalError('Invalid CDATA starting at position ' + start);
			}
		case 'D': {
			// should be DOCTYPE
			if (domBuilder.doc && domBuilder.doc.documentElement) {
				return errorHandler.fatalError('Doctype not allowed inside or after documentElement at position ' + p.getIndex());
			}
			if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START)) {
				return errorHandler.fatalError('Expected ' + g.DOCTYPE_DECL_START + ' at position ' + p.getIndex());
			}
			p.skip(g.DOCTYPE_DECL_START.length);
			if (p.skipBlanks() < 1) {
				return errorHandler.fatalError('Expected whitespace after ' + g.DOCTYPE_DECL_START + ' at position ' + p.getIndex());
			}

			var doctype = {
				name: undefined,
				publicId: undefined,
				systemId: undefined,
				internalSubset: undefined,
			};
			// Parse the DOCTYPE name
			doctype.name = p.getMatch(g.Name);
			if (!doctype.name)
				return errorHandler.fatalError('doctype name missing or contains unexpected characters at position ' + p.getIndex());

			if (isHTML && doctype.name.toLowerCase() !== 'html') {
				errorHandler.warning('Unexpected DOCTYPE in HTML document at position ' + p.getIndex());
			}
			p.skipBlanks();

			// Check for ExternalID
			if (p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
				var match = g.ExternalID_match.exec(p.substringFromIndex());
				if (!match) {
					return errorHandler.fatalError('doctype external id is not well-formed at position ' + p.getIndex());
				}
				if (match.groups.SystemLiteralOnly !== undefined) {
					doctype.systemId = match.groups.SystemLiteralOnly;
				} else {
					doctype.systemId = match.groups.SystemLiteral;
					doctype.publicId = match.groups.PubidLiteral;
				}
				p.skip(match[0].length);
			} else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
				// https://html.spec.whatwg.org/multipage/syntax.html#doctype-legacy-string
				p.skip(g.SYSTEM.length);
				if (p.skipBlanks() < 1) {
					return errorHandler.fatalError('Expected whitespace after ' + g.SYSTEM + ' at position ' + p.getIndex());
				}
				doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral);
				if (!doctype.systemId) {
					return errorHandler.fatalError(
						'Expected ' + g.ABOUT_LEGACY_COMPAT + ' in single or double quotes after ' + g.SYSTEM + ' at position ' + p.getIndex()
					);
				}
			}
			if (isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId)) {
				errorHandler.warning('Unexpected doctype.systemId in HTML document at position ' + p.getIndex());
			}
			if (!isHTML) {
				p.skipBlanks();
				doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler);
			}
			p.skipBlanks();
			if (p.char() !== '>') {
				return errorHandler.fatalError('doctype not terminated with > at position ' + p.getIndex());
			}
			p.skip(1);
			domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset);
			domBuilder.endDTD();
			return p.getIndex();
		}
		default:
			return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
	}
}

function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
	var match = source.substring(start).match(g.PI);
	if (!match) {
		return errorHandler.fatalError('Invalid processing instruction starting at position ' + start);
	}
	if (match[1].toLowerCase() === 'xml') {
		if (start > 0) {
			return errorHandler.fatalError(
				'processing instruction at position ' + start + ' is an xml declaration which is only at the start of the document'
			);
		}
		if (!g.XMLDecl.test(source.substring(start))) {
			return errorHandler.fatalError('xml declaration is not well-formed');
		}
	}
	domBuilder.processingInstruction(match[1], match[2]);
	return start + match[0].length;
}

function ElementAttributes() {
	this.attributeNames = Object.create(null);
}

ElementAttributes.prototype = {
	setTagName: function (tagName) {
		if (!g.QName_exact.test(tagName)) {
			throw new Error('invalid tagName:' + tagName);
		}
		this.tagName = tagName;
	},
	addValue: function (qName, value, offset) {
		if (!g.QName_exact.test(qName)) {
			throw new Error('invalid attribute:' + qName);
		}
		this.attributeNames[qName] = this.length;
		this[this.length++] = { qName: qName, value: value, offset: offset };
	},
	length: 0,
	getLocalName: function (i) {
		return this[i].localName;
	},
	getLocator: function (i) {
		return this[i].locator;
	},
	getQName: function (i) {
		return this[i].qName;
	},
	getURI: function (i) {
		return this[i].uri;
	},
	getValue: function (i) {
		return this[i].value;
	},
	//	,getIndex:function(uri, localName)){
	//		if(localName){
	//
	//		}else{
	//			var qName = uri
	//		}
	//	},
	//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
	//	getType:function(uri,localName){}
	//	getType:function(i){},
};

sax$1.XMLReader = XMLReader$1;
sax$1.parseUtils = parseUtils;
sax$1.parseDoctypeCommentOrCData = parseDoctypeCommentOrCData;

var conventions$1 = conventions$5;
var dom$1 = dom$2;
var errors$1 = errors$4;
var entities = entities$1;
var sax = sax$1;

var DOMImplementation = dom$1.DOMImplementation;

var hasDefaultHTMLNamespace = conventions$1.hasDefaultHTMLNamespace;
var isHTMLMimeType = conventions$1.isHTMLMimeType;
var isValidMimeType = conventions$1.isValidMimeType;
var MIME_TYPE = conventions$1.MIME_TYPE;
var NAMESPACE = conventions$1.NAMESPACE;
var ParseError = errors$1.ParseError;

var XMLReader = sax.XMLReader;

/**
 * Normalizes line ending according to <https://www.w3.org/TR/xml11/#sec-line-ends>,
 * including some Unicode "newline" characters:
 *
 * > XML parsed entities are often stored in computer files which,
 * > for editing convenience, are organized into lines.
 * > These lines are typically separated by some combination
 * > of the characters CARRIAGE RETURN (#xD) and LINE FEED (#xA).
 * >
 * > To simplify the tasks of applications, the XML processor must behave
 * > as if it normalized all line breaks in external parsed entities (including the document entity)
 * > on input, before parsing, by translating the following to a single #xA character:
 * >
 * > 1. the two-character sequence #xD #xA,
 * > 2. the two-character sequence #xD #x85,
 * > 3. the single character #x85,
 * > 4. the single character #x2028,
 * > 5. the single character #x2029,
 * > 6. any #xD character that is not immediately followed by #xA or #x85.
 *
 * @param {string} input
 * @returns {string}
 * @prettierignore
 */
function normalizeLineEndings(input) {
	return input.replace(/\r[\n\u0085]/g, '\n').replace(/[\r\u0085\u2028\u2029]/g, '\n');
}

/**
 * @typedef Locator
 * @property {number} [columnNumber]
 * @property {number} [lineNumber]
 */

/**
 * @typedef DOMParserOptions
 * @property {typeof assign} [assign]
 * The method to use instead of `conventions.assign`, which is used to copy values from
 * `options` before they are used for parsing.
 * @property {typeof DOMHandler} [domHandler]
 * For internal testing: The class for creating an instance for handling events from the SAX
 * parser.
 * *****Warning: By configuring a faulty implementation, the specified behavior can completely
 * be broken.*****.
 * @property {Function} [errorHandler]
 * DEPRECATED! use `onError` instead.
 * @property {function(level:ErrorLevel, message:string, context: DOMHandler):void}
 * [onError]
 * A function invoked for every error that occurs during parsing.
 *
 * If it is not provided, all errors are reported to `console.error`
 * and only `fatalError`s are thrown as a `ParseError`,
 * which prevents any further processing.
 * If the provided method throws, a `ParserError` is thrown,
 * which prevents any further processing.
 *
 * Be aware that many `warning`s are considered an error that prevents further processing in
 * most implementations.
 * @property {boolean} [locator=true]
 * Configures if the nodes created during parsing will have a `lineNumber` and a `columnNumber`
 * attribute describing their location in the XML string.
 * Default is true.
 * @property {(string) => string} [normalizeLineEndings]
 * used to replace line endings before parsing, defaults to exported `normalizeLineEndings`,
 * which normalizes line endings according to <https://www.w3.org/TR/xml11/#sec-line-ends>,
 * including some Unicode "newline" characters.
 * @property {Object} [xmlns]
 * The XML namespaces that should be assumed when parsing.
 * The default namespace can be provided by the key that is the empty string.
 * When the `mimeType` for HTML, XHTML or SVG are passed to `parseFromString`,
 * the default namespace that will be used,
 * will be overridden according to the specification.
 * @see {@link normalizeLineEndings}
 */

/**
 * The DOMParser interface provides the ability to parse XML or HTML source code from a string
 * into a DOM `Document`.
 *
 * ***xmldom is different from the spec in that it allows an `options` parameter,
 * to control the behavior***.
 *
 * @class
 * @param {DOMParserOptions} [options]
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
 */
function DOMParser(options) {
	options = options || {};
	if (options.locator === undefined) {
		options.locator = true;
	}

	/**
	 * The method to use instead of `conventions.assign`, which is used to copy values from
	 * `options`
	 * before they are used for parsing.
	 *
	 * @type {conventions.assign}
	 * @private
	 * @see {@link conventions.assign}
	 * @readonly
	 */
	this.assign = options.assign || conventions$1.assign;

	/**
	 * For internal testing: The class for creating an instance for handling events from the SAX
	 * parser.
	 * *****Warning: By configuring a faulty implementation, the specified behavior can completely
	 * be broken*****.
	 *
	 * @type {typeof DOMHandler}
	 * @private
	 * @readonly
	 */
	this.domHandler = options.domHandler || DOMHandler;

	/**
	 * A function that is invoked for every error that occurs during parsing.
	 *
	 * If it is not provided, all errors are reported to `console.error`
	 * and only `fatalError`s are thrown as a `ParseError`,
	 * which prevents any further processing.
	 * If the provided method throws, a `ParserError` is thrown,
	 * which prevents any further processing.
	 *
	 * Be aware that many `warning`s are considered an error that prevents further processing in
	 * most implementations.
	 *
	 * @type {function(level:ErrorLevel, message:string, context: DOMHandler):void}
	 * @see {@link onErrorStopParsing}
	 * @see {@link onWarningStopParsing}
	 */
	this.onError = options.onError || options.errorHandler;
	if (options.errorHandler && typeof options.errorHandler !== 'function') {
		throw new TypeError('errorHandler object is no longer supported, switch to onError!');
	} else if (options.errorHandler) {
		options.errorHandler('warning', 'The `errorHandler` option has been deprecated, use `onError` instead!', this);
	}

	/**
	 * used to replace line endings before parsing, defaults to `normalizeLineEndings`
	 *
	 * @type {(string) => string}
	 * @readonly
	 */
	this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings;

	/**
	 * Configures if the nodes created during parsing will have a `lineNumber` and a
	 * `columnNumber`
	 * attribute describing their location in the XML string.
	 * Default is true.
	 *
	 * @type {boolean}
	 * @readonly
	 */
	this.locator = !!options.locator;

	/**
	 * The default namespace can be provided by the key that is the empty string.
	 * When the `mimeType` for HTML, XHTML or SVG are passed to `parseFromString`,
	 * the default namespace that will be used,
	 * will be overridden according to the specification.
	 *
	 * @type {Readonly<Object>}
	 * @readonly
	 */
	this.xmlns = this.assign(Object.create(null), options.xmlns);
}

/**
 * Parses `source` using the options in the way configured by the `DOMParserOptions` of `this`
 * `DOMParser`. If `mimeType` is `text/html` an HTML `Document` is created,
 * otherwise an XML `Document` is created.
 *
 * __It behaves different from the description in the living standard__:
 * - Uses the `options` passed to the `DOMParser` constructor to modify the behavior.
 * - Any unexpected input is reported to `onError` with either a `warning`,
 * `error` or `fatalError` level.
 * - Any `fatalError` throws a `ParseError` which prevents further processing.
 * - Any error thrown by `onError` is converted to a `ParseError` which prevents further
 * processing - If no `Document` was created during parsing it is reported as a `fatalError`.
 * *****Warning: By configuring a faulty DOMHandler implementation,
 * the specified behavior can completely be broken*****.
 *
 * @param {string} source
 * The XML mime type only allows string input!
 * @param {string} [mimeType='application/xml']
 * the mimeType or contentType of the document to be created determines the `type` of document
 * created (XML or HTML)
 * @returns {Document}
 * The `Document` node.
 * @throws {ParseError}
 * for any `fatalError` or anything that is thrown by `onError`
 * @throws {TypeError}
 * for any invalid `mimeType`
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
 * @see https://html.spec.whatwg.org/#dom-domparser-parsefromstring-dev
 */
DOMParser.prototype.parseFromString = function (source, mimeType) {
	if (!isValidMimeType(mimeType)) {
		throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
	}
	var defaultNSMap = this.assign(Object.create(null), this.xmlns);
	var entityMap = entities.XML_ENTITIES;
	var defaultNamespace = defaultNSMap[''] || null;
	if (hasDefaultHTMLNamespace(mimeType)) {
		entityMap = entities.HTML_ENTITIES;
		defaultNamespace = NAMESPACE.HTML;
	} else if (mimeType === MIME_TYPE.XML_SVG_IMAGE) {
		defaultNamespace = NAMESPACE.SVG;
	}
	defaultNSMap[''] = defaultNamespace;
	defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;

	var domBuilder = new this.domHandler({
		mimeType: mimeType,
		defaultNamespace: defaultNamespace,
		onError: this.onError,
	});
	var locator = this.locator ? {} : undefined;
	if (this.locator) {
		domBuilder.setDocumentLocator(locator);
	}

	var sax = new XMLReader();
	sax.errorHandler = domBuilder;
	sax.domBuilder = domBuilder;
	var isXml = !conventions$1.isHTMLMimeType(mimeType);
	if (isXml && typeof source !== 'string') {
		sax.errorHandler.fatalError('source is not a string');
	}
	sax.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap);
	if (!domBuilder.doc.documentElement) {
		sax.errorHandler.fatalError('missing root element');
	}
	return domBuilder.doc;
};

/**
 * @typedef DOMHandlerOptions
 * @property {string} [mimeType=MIME_TYPE.XML_APPLICATION]
 * @property {string | null} [defaultNamespace=null]
 */
/**
 * The class that is used to handle events from the SAX parser to create the related DOM
 * elements.
 *
 * Some methods are only implemented as an empty function,
 * since they are (at least currently) not relevant for xmldom.
 *
 * @class
 * @param {DOMHandlerOptions} [options]
 * @see http://www.saxproject.org/apidoc/org/xml/sax/ext/DefaultHandler2.html
 */
function DOMHandler(options) {
	var opt = options || {};
	/**
	 * The mime type is used to determine if the DOM handler will create an XML or HTML document.
	 * Only if it is set to `text/html` it will create an HTML document.
	 * It defaults to MIME_TYPE.XML_APPLICATION.
	 *
	 * @type {string}
	 * @see {@link MIME_TYPE}
	 * @readonly
	 */
	this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION;

	/**
	 * The namespace to use to create an XML document.
	 * For the following reasons this is required:
	 * - The SAX API for `startDocument` doesn't offer any way to pass a namespace,
	 * since at that point there is no way for the parser to know what the default namespace from
	 * the document will be.
	 * - When creating using `DOMImplementation.createDocument` it is required to pass a
	 * namespace,
	 * to determine the correct `Document.contentType`, which should match `this.mimeType`.
	 * - When parsing an XML document with the `application/xhtml+xml` mimeType,
	 * the HTML namespace needs to be the default namespace.
	 *
	 * @type {string | null}
	 * @private
	 * @readonly
	 */
	this.defaultNamespace = opt.defaultNamespace || null;

	/**
	 * @type {boolean}
	 * @private
	 */
	this.cdata = false;

	/**
	 * The last `Element` that was created by `startElement`.
	 * `endElement` sets it to the `currentElement.parentNode`.
	 *
	 * Note: The sax parser currently sets it to white space text nodes between tags.
	 *
	 * @type {Element | Node | undefined}
	 * @private
	 */
	this.currentElement = undefined;

	/**
	 * The Document that is created as part of `startDocument`,
	 * and returned by `DOMParser.parseFromString`.
	 *
	 * @type {Document | undefined}
	 * @readonly
	 */
	this.doc = undefined;

	/**
	 * The locator is stored as part of setDocumentLocator.
	 * It is controlled and mutated by the SAX parser to store the current parsing position.
	 * It is used by DOMHandler to set `columnNumber` and `lineNumber`
	 * on the DOM nodes.
	 *
	 * @type {Readonly<Locator> | undefined}
	 * @private
	 * @readonly (the
	 * sax parser currently sometimes set's it)
	 */
	this.locator = undefined;
	/**
	 * @type {function (level:ErrorLevel ,message:string, context:DOMHandler):void}
	 * @readonly
	 */
	this.onError = opt.onError;
}

function position(locator, node) {
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}

DOMHandler.prototype = {
	/**
	 * Either creates an XML or an HTML document and stores it under `this.doc`.
	 * If it is an XML document, `this.defaultNamespace` is used to create it,
	 * and it will not contain any `childNodes`.
	 * If it is an HTML document, it will be created without any `childNodes`.
	 *
	 * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
	 */
	startDocument: function () {
		var impl = new DOMImplementation();
		this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(false) : impl.createDocument(this.defaultNamespace, '');
	},
	startElement: function (namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
		var el = doc.createElementNS(namespaceURI, qName || localName);
		var len = attrs.length;
		appendElement(this, el);
		this.currentElement = el;

		this.locator && position(this.locator, el);
		for (var i = 0; i < len; i++) {
			var namespaceURI = attrs.getURI(i);
			var value = attrs.getValue(i);
			var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator && position(attrs.getLocator(i), attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr);
		}
	},
	endElement: function (namespaceURI, localName, qName) {
		this.currentElement = this.currentElement.parentNode;
	},
	startPrefixMapping: function (prefix, uri) {},
	endPrefixMapping: function (prefix) {},
	processingInstruction: function (target, data) {
		var ins = this.doc.createProcessingInstruction(target, data);
		this.locator && position(this.locator, ins);
		appendElement(this, ins);
	},
	ignorableWhitespace: function (ch, start, length) {},
	characters: function (chars, start, length) {
		chars = _toString.apply(this, arguments);
		//console.log(chars)
		if (chars) {
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if (this.currentElement) {
				this.currentElement.appendChild(charNode);
			} else if (/^\s*$/.test(chars)) {
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator, charNode);
		}
	},
	skippedEntity: function (name) {},
	endDocument: function () {
		this.doc.normalize();
	},
	/**
	 * Stores the locator to be able to set the `columnNumber` and `lineNumber`
	 * on the created DOM nodes.
	 *
	 * @param {Locator} locator
	 */
	setDocumentLocator: function (locator) {
		if (locator) {
			locator.lineNumber = 0;
		}
		this.locator = locator;
	},
	//LexicalHandler
	comment: function (chars, start, length) {
		chars = _toString.apply(this, arguments);
		var comm = this.doc.createComment(chars);
		this.locator && position(this.locator, comm);
		appendElement(this, comm);
	},

	startCDATA: function () {
		//used in characters() methods
		this.cdata = true;
	},
	endCDATA: function () {
		this.cdata = false;
	},

	startDTD: function (name, publicId, systemId, internalSubset) {
		var impl = this.doc.implementation;
		if (impl && impl.createDocumentType) {
			var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
			this.locator && position(this.locator, dt);
			appendElement(this, dt);
			this.doc.doctype = dt;
		}
	},
	reportError: function (level, message) {
		if (typeof this.onError === 'function') {
			try {
				this.onError(level, message, this);
			} catch (e) {
				throw new ParseError('Reporting ' + level + ' "' + message + '" caused ' + e, this.locator);
			}
		} else {
			console.error('[xmldom ' + level + ']\t' + message, _locator(this.locator));
		}
	},
	/**
	 * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning: function (message) {
		this.reportError('warning', message);
	},
	error: function (message) {
		this.reportError('error', message);
	},
	/**
	 * This function reports a fatal error and throws a ParseError.
	 *
	 * @param {string} message
	 * - The message to be used for reporting and throwing the error.
	 * @returns {never}
	 * This function always throws an error and never returns a value.
	 * @throws {ParseError}
	 * Always throws a ParseError with the provided message.
	 */
	fatalError: function (message) {
		this.reportError('fatalError', message);
		throw new ParseError(message, this.locator);
	},
};

function _locator(l) {
	if (l) {
		return '\n@#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
	}
}

function _toString(chars, start, length) {
	if (typeof chars == 'string') {
		return chars.substr(start, length);
	} else {
		//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if (chars.length >= start + length || start) {
			return new java.lang.String(chars, start, length) + '';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
'endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl'.replace(
	/\w+/g,
	function (key) {
		DOMHandler.prototype[key] = function () {
			return null;
		};
	}
);

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement(handler, node) {
	if (!handler.currentElement) {
		handler.doc.appendChild(node);
	} else {
		handler.currentElement.appendChild(node);
	}
}

/**
 * A method that prevents any further parsing when an `error`
 * with level `error` is reported during parsing.
 *
 * @see {@link DOMParserOptions.onError}
 * @see {@link onWarningStopParsing}
 */
function onErrorStopParsing(level) {
	if (level === 'error') throw 'onErrorStopParsing';
}

/**
 * A method that prevents any further parsing when any `error` is reported during parsing.
 *
 * @see {@link DOMParserOptions.onError}
 * @see {@link onErrorStopParsing}
 */
function onWarningStopParsing() {
	throw 'onWarningStopParsing';
}

domParser$1.__DOMHandler = DOMHandler;
domParser$1.DOMParser = DOMParser;
domParser$1.normalizeLineEndings = normalizeLineEndings;
domParser$1.onErrorStopParsing = onErrorStopParsing;
domParser$1.onWarningStopParsing = onWarningStopParsing;

var conventions = conventions$5;
lib.assign = conventions.assign;
lib.hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
lib.isHTMLMimeType = conventions.isHTMLMimeType;
lib.isValidMimeType = conventions.isValidMimeType;
lib.MIME_TYPE = conventions.MIME_TYPE;
lib.NAMESPACE = conventions.NAMESPACE;

var errors = errors$4;
lib.DOMException = errors.DOMException;
lib.DOMExceptionName = errors.DOMExceptionName;
lib.ExceptionCode = errors.ExceptionCode;
lib.ParseError = errors.ParseError;

var dom = dom$2;
lib.Attr = dom.Attr;
lib.CDATASection = dom.CDATASection;
lib.CharacterData = dom.CharacterData;
lib.Comment = dom.Comment;
lib.Document = dom.Document;
lib.DocumentFragment = dom.DocumentFragment;
lib.DocumentType = dom.DocumentType;
lib.DOMImplementation = dom.DOMImplementation;
lib.Element = dom.Element;
lib.Entity = dom.Entity;
lib.EntityReference = dom.EntityReference;
lib.LiveNodeList = dom.LiveNodeList;
lib.NamedNodeMap = dom.NamedNodeMap;
lib.Node = dom.Node;
lib.NodeList = dom.NodeList;
lib.Notation = dom.Notation;
lib.ProcessingInstruction = dom.ProcessingInstruction;
lib.Text = dom.Text;
lib.XMLSerializer = dom.XMLSerializer;

var domParser = domParser$1;
lib.DOMParser = domParser.DOMParser;
lib.normalizeLineEndings = domParser.normalizeLineEndings;
lib.onErrorStopParsing = domParser.onErrorStopParsing;
lib.onWarningStopParsing = domParser.onWarningStopParsing;

Object.defineProperty(utils, "__esModule", {
  value: true
});
utils.deepExploreArray = deepExploreArray;
utils.visitArrayItems = utils.parseXMLResponse = utils.encodeForBatch = void 0;
var _xpath = _interopRequireDefault$1(xpath);
var _xmldom = lib;
function _interopRequireDefault$1(e) { return e && e.__esModule ? e : { default: e }; }
const encodeForBatch = textList => {
  return textList.map((text, i) => `<pre><a i="${i}">${text}</a></pre>`);
};
utils.encodeForBatch = encodeForBatch;
const parseXMLResponse = text => {
  let doc;
  try {
    doc = new _xmldom.DOMParser().parseFromString(text, _xmldom.MIME_TYPE.XML_APPLICATION);
  } catch (err) {
    console.error(err);
    return null;
  }
  const nodesWithTranslation = _xpath.default.select('//pre/*[not(self::i)]', doc);
  if (!nodesWithTranslation) return null;
  if (!Array.isArray(nodesWithTranslation)) throw new Error('Unexpected XML parsed result');
  return nodesWithTranslation.map(node => {
    // Select text in child nodes or in self
    const textNodes = _xpath.default.select('descendant-or-self::*/text()', node);
    if (!Array.isArray(textNodes)) return '';
    if (textNodes.length > 1) {
      console.debug('More than one text node found');
    }
    return textNodes.length === 0 ? '' : textNodes.map(node => node.nodeValue).join(' ');
  }).join(' ');
};
utils.parseXMLResponse = parseXMLResponse;
function deepExploreArray(obj, depth) {
  let currentDepth = 0;
  let currentObj = obj;
  while (depth > currentDepth) {
    if (!Array.isArray(currentObj)) {
      throw new TypeError('Error while explore array on depth #' + String(currentDepth));
    }
    currentObj = currentObj[0];
    currentDepth++;
  }
  return currentObj;
}
/**
 * Visit each item in array recursively
 */
const visitArrayItems = (arr, visitor) => {
  arr.forEach(obj => {
    if (Array.isArray(obj)) {
      visitArrayItems(obj, visitor);
    } else {
      visitor(obj);
    }
  });
};
utils.visitArrayItems = visitArrayItems;

Object.defineProperty(GoogleTranslator$1, "__esModule", {
  value: true
});
var GoogleTranslatorTokenFree_1 = GoogleTranslator$1.GoogleTranslatorTokenFree = GoogleTranslator$1.GoogleTranslator = GoogleTranslator$1.AbstractGoogleTranslator = void 0;
var _queryString = _interopRequireDefault(require$$0);
var _BaseTranslator = BaseTranslator$1;
var _languages = languages;
var _token = token;
var _utils = utils;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __awaiter = function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
/**
 * Common class for google translator implementations
 */
class AbstractGoogleTranslator extends _BaseTranslator.BaseTranslator {
  static isSupportedAutoFrom() {
    return true;
  }
  static getSupportedLanguages() {
    return _languages.languageAliases.getAll();
  }
  getLengthLimit() {
    return 4000;
  }
  getRequestsTimeout() {
    return 300;
  }
}
/**
 * Translator implementation which use Google API with token from https://translate.google.com
 */
GoogleTranslator$1.AbstractGoogleTranslator = AbstractGoogleTranslator;
class GoogleTranslator extends AbstractGoogleTranslator {
  checkLimitExceeding(text) {
    if (Array.isArray(text)) {
      const encodedText = (0, _utils.encodeForBatch)(text).join('');
      const extra = encodedText.length - this.getLengthLimit();
      return extra > 0 ? extra : 0;
    } else {
      const extra = text.length - this.getLengthLimit();
      return extra > 0 ? extra : 0;
    }
  }
  translate(text, from, to) {
    return (0, _token.getToken)(text).then(({
      value: tk
    }) => {
      const apiPath = 'https://translate.google.com/translate_a/single';
      const data = {
        client: 't',
        sl: (0, _languages.getFixedLanguage)(from),
        tl: (0, _languages.getFixedLanguage)(to),
        hl: (0, _languages.getFixedLanguage)(to),
        dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
        ie: 'UTF-8',
        oe: 'UTF-8',
        otf: 1,
        ssel: 0,
        tsel: 0,
        kc: 7,
        q: text,
        tk
      };
      const url = apiPath + '?' + _queryString.default.stringify(data);
      return this.fetch(url, {
        responseType: 'json',
        method: 'GET',
        headers: this.options.headers
      }).then(rsp => rsp.data).then(rsp => {
        if (!(rsp instanceof Array) || !(rsp[0] instanceof Array)) {
          throw new Error('Unexpected response');
        }
        const translatedText = rsp[0].map(chunk => chunk instanceof Array && typeof chunk[0] === 'string' ? chunk[0] : '').join('');
        return translatedText;
      });
    });
  }
  translateBatch(text, from, to) {
    const preparedText = (0, _utils.encodeForBatch)(text);
    return (0, _token.getToken)(preparedText.join('')).then(({
      value: tk
    }) => {
      const apiPath = 'https://translate.googleapis.com/translate_a/t';
      const data = {
        anno: 3,
        client: 'te',
        v: '1.0',
        format: 'html',
        sl: (0, _languages.getFixedLanguage)(from),
        tl: (0, _languages.getFixedLanguage)(to),
        tk
      };
      const url = apiPath + '?' + _queryString.default.stringify(data);
      const body = preparedText.map(text => `&q=${encodeURIComponent(text)}`).join('');
      return this.fetch(url, {
        responseType: 'json',
        method: 'POST',
        headers: Object.assign({
          'Content-Type': 'application/x-www-form-urlencoded'
        }, this.options.headers),
        body
      }).then(rsp => rsp.data).then(rawResp => {
        try {
          if (!Array.isArray(rawResp)) {
            throw new Error('Unexpected response');
          }
          const isSingleResponseMode = text.length === 1;
          const result = [];
          (0, _utils.visitArrayItems)(rawResp, obj => {
            if (isSingleResponseMode && result.length === 1) return;
            if (typeof obj !== 'string') return;
            if (isSingleResponseMode) {
              const parsedText = (0, _utils.parseXMLResponse)(obj);
              result.push(parsedText || obj);
            } else {
              const parsedText = (0, _utils.parseXMLResponse)(obj);
              if (parsedText !== null) {
                result.push(parsedText);
              }
            }
          });
          if (result.length !== text.length) {
            throw new Error('Mismatching a lengths of original and translated arrays');
          }
          return result;
        } catch (err) {
          console.warn('Got response', rawResp);
          throw err;
        }
      });
    });
  }
}
GoogleTranslator$1.GoogleTranslator = GoogleTranslator;
GoogleTranslator.translatorName = 'GoogleTranslator';
/**
 * Translator implementation which use Google API without token
 */
class GoogleTranslatorTokenFree extends AbstractGoogleTranslator {
  constructor() {
    super(...arguments);
    this.translate = (text, from, to) => __awaiter(this, void 0, void 0, function* () {
      const [translation] = yield this.translateBatch([text], from, to);
      return translation;
    });
  }
  translateBatch(text, from, to) {
    const apiPath = 'https://translate.googleapis.com/translate_a/t';
    const data = {
      client: 'dict-chrome-ex',
      sl: (0, _languages.getFixedLanguage)(from),
      tl: (0, _languages.getFixedLanguage)(to),
      q: text
    };
    const url = apiPath + '?' + _queryString.default.stringify(data);
    return this.fetch(url, {
      responseType: 'json',
      method: 'GET',
      headers: Object.assign({
        'Content-Type': 'application/x-www-form-urlencoded'
      }, this.options.headers)
    }).then(rsp => rsp.data).then(rawResp => {
      try {
        if (!Array.isArray(rawResp)) {
          throw new Error('Unexpected response');
        }
        const intermediateTextsArray = [];
        (0, _utils.visitArrayItems)(rawResp, obj => {
          if (typeof obj === 'string') {
            intermediateTextsArray.push(obj);
          }
        });
        const result = [];
        const isSingleResponseMode = text.length === 1;
        const isOneToOneMappingMode = intermediateTextsArray.length === text.length;
        for (let idx = 0; idx < intermediateTextsArray.length; idx++) {
          const text = intermediateTextsArray[idx];
          if (isSingleResponseMode) {
            result.push(text);
            break;
          }
          // Each second text it's not translation if not 1-1 mapping
          const isTranslation = isOneToOneMappingMode || Number(idx) % 2 === 0;
          if (isTranslation) {
            result.push(text);
          }
        }
        if (result.length !== text.length) {
          console.warn('Translation result', result);
          throw new Error('Mismatching a lengths of original and translated arrays');
        }
        return result;
      } catch (err) {
        console.warn('Got response', rawResp);
        throw err;
      }
    });
  }
}
GoogleTranslatorTokenFree_1 = GoogleTranslator$1.GoogleTranslatorTokenFree = GoogleTranslatorTokenFree;
GoogleTranslatorTokenFree.translatorName = 'GoogleTranslatorTokenFree';

globalThis.translator = GoogleTranslatorTokenFree_1;
