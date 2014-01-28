
var responseLength = require('./');
var koa = require('koa');
var request = require('supertest');
var equal = require('assert').equal;
var noop = function(){};
var Readable = require('stream').Readable;

describe('responseLength()', function(){
  it('should handle empty bodies', function(done){
    var app = koa();
    app.use(responseLength(app));
    app.use(function*(){
      this.status = 302;
    });
    
    app.on('response', function(len){
      equal(len, 0);
      done();
    });
    
    request(app.listen())
    .get('/')
    .expect(302, noop);
  });

  it('should handle buffers', function(done){
    var app = koa();
    app.use(responseLength(app));
    app.use(function*(){
      this.body = new Buffer('foobar');
    });
    
    app.on('response', function(len){
      equal(len, 6);
      done();
    });
    
    request(app.listen())
    .get('/')
    .expect(302, noop);
  });

  it('should handle strings', function(done){
    var app = koa();
    app.use(responseLength(app));
    app.use(function*(){
      this.body = 'foobar';
    });
    
    app.on('response', function(len){
      equal(len, 6);
      done();
    });
    
    request(app.listen())
    .get('/')
    .expect(302, noop);
  });
  
  it('should handle streams', function(done){
    var app = koa();
    app.use(responseLength(app));
    app.use(function*(){
      this.body = Readable();
      this.body._read = function(){
        this.push('foo');
        this.push('bar');
        this.push(null);
      }
    });
    
    app.on('response', function(len){
      equal(len, 6);
      done();
    });
    
    request(app.listen())
    .get('/')
    .expect(302, noop);
  });
  
  it('should handle json', function(done){
    var app = koa();
    app.use(responseLength(app));
    app.use(function*(){
      this.body = { foo: 'bar' };
    });
    
    app.on('response', function(len){
      equal(len, 18);
      done();
    });
    
    request(app.listen())
    .get('/')
    .expect(302, noop);
  });
  
  it('should handle HEAD requests', function(done){
    var app = koa();
    app.use(responseLength(app));
    app.use(function*(){
      this.body = { foo: 'bar' };
    });
    
    app.on('response', function(len){
      equal(len, 0);
      done();
    });
    
    request(app.listen())
    .head('/')
    .expect(302, noop);
  });
  
  it('should pass the context', function(done){
    var ctx;
    var app = koa();
    app.use(responseLength(app));
    app.use(function*(){
      ctx = this;
    });
    
    app.on('response', function(len, _ctx){
      equal(_ctx, ctx);
      done();
    });
    
    request(app.listen())
    .get('/')
    .expect(302, noop);
  });
});