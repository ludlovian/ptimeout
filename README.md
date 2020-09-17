# ptimeout
Promise timeout

## API

### PTimeout
`const pt = new PTimeout(ms, val)`

creates a new timeout object which will resolve after `ms` with value `val`

### .cancel
`pt.cancel()`

Cancels the timeout if not yet resolved. The promise will remain unresolved
