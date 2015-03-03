# cahoots-api-client [![Build Status](https://travis-ci.org/cahoots-extension/api-client.svg?branch=master)](https://travis-ci.org/cahoots-extension/api-client)

This JavaScript library provides an easy-to-use access to the [cahoots.pw](http://cahoots.pw) RESTful API for the browser or [io.js](https://iojs.org) / [Node.js](https://nodejs.org) environment.

## Installation

### Browser

Grab the minified version from the `build` directory (bower and component support is coming soon) and reference it in your HTML file:

```html
<script src="cahoots-api-client.min.js"></script>
```

### io.js / Node.js

Easy peasy, just perform a:

```bash
npm i --save cahoots-api-client
```

## API

### General

The library provides a factory-like interface which is accessible in two flavors (depending on your runtime environment).

#### Browser

```js
var services = cahoots.api;

var service = cahoots.api('person');
```

#### io.js / Node.js

```js
var services = require('cahoots-api-client');

var service = services('person');
```

### Error types

Every error that can be thrown comes with a `name` attribute with which you can distinguish between the different meanings.

| Name  | Meaning |
| ------------- | ------------- |
| `ValidationError`  | Your input parameters are invalid (e.g. wrong login, etc.) |
| `UnauthorizedError` | You're not authorized therefore not able to perform the action. |
| `InvalidTokenError` | Your access token is invalid. Please perform a new login. |
| `NotFoundError` | You asked for a resource that is not available. |
| `APIUnavailableError` | Autsch! The cahoots API is not available. |
| `ParseError` | Autsch again! The API sent a response which is not processable by the client. |
| `NetworkError` | You do not have an Internet connection. |

### Services

#### Person

The person provides access to the persons. In the context of `cahoots` a person is a journalist.

##### findAll(callback)

Returns an `array` with all available persons.

```js
var service = services('person');

function onFindAll (err, persons) {
    if (err) {
        return console.error(err);
    }

    console.log(persons);
}

service.findAll(onFindAll);
```

##### findById(id, callback)

Finds one particular person by `id` (`string`).

```js
var service = services('person');

function onFind (err, person) {
    if (err) {
        return console.error(err);
    }

    console.log(person);
}

service.findById('ad02fa9db0d3a22e1c7827060ac3fb0107495f0f', onFind);
```

#### Organization

An organization represents an entity to which the persons can have relationships. Those relationships are defined within the respective person objects as `id's` (see the [`cahoots`](https://github.com/cahoots-extension/api/wiki#persons) attribute for further information).

##### findAll(callback)

Returns an `array` with all available organizations.

```js
var service = services('organization');

function onFindAll (err, organizations) {
    if (err) {
        return console.error(err);
    }

    console.log(organizations);
}

service.findAll(onFindAll);
```

##### findById(id, callback)

Find one particular organization by `id` (`string`).

```js
var service = services('organization');

function onFind (err, organization) {
    if (err) {
        return console.error(err);
    }

    console.log(organization);
}

service.findById('6ab7d6a6c761850afc9bc368b2212747c218c22c', onFind);
```

##### findByIds(ids, callback)

Finds organizations by multiple `ids` (`array`).

```js
var service = services('organization');
var ids = [
    '8977034895245ffe9cce3ad67cb059134e4315f0',
    '4989fe0c29e810b63235bf4a30ebab976c45252d'
];

function onFind (err, organizations) {
    if (err) {
        return console.error(err);
    }

    console.log(organizations);
}

service.findByIds(ids, onFind);
```

## License

The MIT License (MIT)

Copyright (c) 2014-2015 cahoots.pw, Germany <info@cahoots.pw>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
