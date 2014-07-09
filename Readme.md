# namefn

Create an equivalent function with a new name.

```js
var nameFn = require('namefn')

function User() {

}

console.log(new User()) // User {}

var OtherUser = nameFn('OtherUser', User)

console.log(new OtherUser()) // OtherUser {}
```

The original function's properties, arity and prototype are maintained
with the newly named function.

## See Also

* [timoxley/beforefn](http://github.com/timoxley/beforefn)
* [timoxley/afterfn](http://github.com/timoxley/afterfn)
* [timoxley/guardfn](http://github.com/timoxley/guardfn)

## License

MIT
