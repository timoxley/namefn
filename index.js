"use strict"

module.exports = function namefn(newName, fn) {
  newName = newName.replace(/\s+/gmi, '_')
  newName = newName.replace(/[^\w\d\$_]/gmi, '')
  var arity = fn.length
  var args = Array.apply(null, {length: arity}).map(function(v,i) {return 'arg' + i})
  var newFn = new Function('fn', 'return function '+newName+'('+args.join(',')+') {return fn.apply(this, arguments)}')(fn)
  newFn.__proto__ = fn
  newFn.prototype = fn.prototype
  return newFn
}
