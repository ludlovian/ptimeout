import test from 'ava'
import promiseGoodies from 'promise-goodies'
import PTimeout from '../src'

promiseGoodies()

test('construction', async t => {
  const pt = new PTimeout()
  t.true(pt instanceof Promise)
  t.true(typeof pt.cancel === 'function')
})

test('timeout', async t => {
  const v = {}
  const pt = new PTimeout(100, v)
  t.false(await pt.isResolved())

  await Promise.delay(150)

  t.true(await pt.isResolved())
  t.is(await pt, v)
})

test('cancel before resolve', async t => {
  const v = {}
  const pt = new PTimeout(100, v)
  t.false(await pt.isResolved())

  await Promise.delay(50)
  t.false(await pt.isResolved())

  pt.cancel()
  await Promise.delay(100)

  t.false(await pt.isResolved())
})

test('cancel after resolve', async t => {
  const v = {}
  const pt = new PTimeout(100, v)
  t.false(await pt.isResolved())

  await Promise.delay(150)
  pt.cancel()

  t.true(await pt.isResolved())
  t.is(await pt, v)
})

test('cancel twice', async t => {
  const v = {}
  const pt = new PTimeout(100, v)
  t.false(await pt.isResolved())

  await Promise.delay(50)
  t.false(await pt.isResolved())

  pt.cancel()
  pt.cancel()
  await Promise.delay(100)

  t.false(await pt.isResolved())
})
