
# koa-response-length

  Emit events about finished requests and their lengths.

  [![build status](https://secure.travis-ci.org/segmentio/koa-response-length.png)](http://travis-ci.org/segmentio/koa-response-length)

## Example

```js
var responseLength = require('koa-response-length');

app.use(responseLength());

app.use(function*(){
  this.body = someStream();
  // also works with strings, buffers, json etc
});

app.on('response', function(len, ctx){
  console.log('url: %s length: %s', ctx.url, len);
});
```

## Installation

```bash
$ npm install koa-response-length
```

## API

### responseLength()

  Create a middleware that makes the koa app emit `response` events whenever a
  response is done, passing both the total response length and it's koa context.

## License

  MIT
