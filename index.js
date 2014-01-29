
/**
 * Module dependencies.
 */

var Counter = require('passthrough-counter');

/**
 * Response length middleware.
 *
 * @return {Function}
 * @api public
 */

module.exports = function(){
  return function*(next){
    yield next;
    
    var app = this.app;
    var ctx = this;
    if ('HEAD' == ctx.method) return emit(0);
    if (ctx.length) return emit(ctx.length);
    if (ctx.body && ctx.body.length) return emit(ctx.body.length);
    if (!ctx.body) return emit(0);
    
    var counter;
    
    if (ctx.body.readable) {
      ctx.body = ctx.body
        .pipe(counter = Counter())
        .on('error', ctx.onerror);
    }
    
    var end = ctx.res.end;
    ctx.res.end = function(body){
      ctx.res.end = end;
      
      if (counter) {
        emit(counter.length);
      } else if (body) {
        emit(Buffer.byteLength(body));
      }
      
      ctx.res.end(body);
    }
    
    function emit(len){
      app.emit('response', len, ctx);
    }
  };
};
