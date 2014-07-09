var nameFunction = require('../')

var test = require('tape')

test('can name anonymous functions', function(t) {
  var fn = nameFunction('NewName', function() {})
  t.equal('NewName', fn.name)
  t.end()
})

test('can name named functions', function(t) {
  var fn = nameFunction('NewName', function oldName() {})
  t.equal('NewName', fn.name)
  t.end()
})

test('maintains arity', function(t) {
  var oldFn = function(a,b,c,d) {}
  var fn = nameFunction('NewName', oldFn)
  t.equal(fn.length, oldFn.length)
  t.end()
})

test('maintains behaviour', function(t) {
  var oldFn = function(a,b,c,d) {
    return a + b + c + d
  }
  var fn = nameFunction('NewName', oldFn)
  t.equal(fn(1,2,3,4), oldFn(1,2,3,4))
  t.end()
})

test('maintains context', function(t) {
  var user = {
    name: 'Bob',
    getName: function() {
      return this.name
    }
  }
  user.getName = nameFunction('getName', user.getName)
  t.equal(user.getName(), user.name)
  t.end()
})

test('maintains prototype', function(t) {
  var proto = {}
  function User() {}
  User.prototype = proto
  var NewUser = nameFunction('NewUser', User)
  t.equal(NewUser.prototype, proto)
  t.end()
})

test('maintains other properties', function(t) {
  function User() {User.count++}
  User.count = 0
  var NewUser = nameFunction('NewUser', User)
  t.equal(NewUser.count, 0)
  NewUser()
  t.equal(NewUser.count, 1)
  t.end()
})

test('can get new context', function(t) {
  var user1 = {
    name: 'Bob',
    getName: function() {
      return this.name
    }
  }
  var user2 = {
    name: 'Bill',
    getName: nameFunction('BillsGetName', user1.getName)
  }

  t.equal(user2.getName.name, 'BillsGetName')
  t.equal(user1.getName(), user1.name)
  t.equal(user2.getName(), user2.name)
  t.end()
})

test('executes in correct scope', function(t) {
  var getItem = (function() {
    var item = {name: 'Mary'}
    return function() {
      return item
    }
  })()

  var newGetItem = nameFunction('newGetItem', getItem)
  t.strictEqual(getItem(), newGetItem())
  t.strictEqual(getItem().name, newGetItem().name)
  t.end()
})

test('kills special characters', function(t) {
  var fn = nameFunction('New(*^*&Name()', function oldName() {})
  t.equal('NewName', fn.name)
  t.end()
})
