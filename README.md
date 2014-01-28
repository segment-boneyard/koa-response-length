
# koa-response-length

  Emit events about response lenghts.

## Example

```js
var responseLength = require('koa-response-length');

app.use(responseLength(app));

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

### responseLength(app)

  Create a middleware for `app` that makes it emit `response` events whenever a
  response is done, passing the total response length and koa context.

## License

  MIT
