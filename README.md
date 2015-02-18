# cahoots-api-client

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

function onFind (err, organizations) {
    if (err) {
        return console.error(err);
    }

    console.log(organizations);
}

service.findByAll(onFind);
```

## Authors

  * [Jonas Bergmeier](mailto:jonas.bergmeier@gmail.com)
  * [Alexander Barnickel](mailto:alex@alba.io)
  * [André König](mailto:andre.koenig@posteo.de)
