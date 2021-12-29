'use strict'

const { test } = require('ava')
const path = require('path')

const ffmpegProbe = require('.')

const fixturesPath = path.join(__dirname, `media`)

const fixtures = [
  {
    file: '0.mp4',
    width: 640,
    height: 360,
    duration: 4000,
    fps: 25,
    rotate: 0
  },
  {
    file: '1.mp4',
    width: 640,
    height: 360,
    duration: 4000,
    fps: 25,
    rotate: 0
  },
  {
    file: '2.mp4',
    width: 640,
    height: 360,
    duration: 4000,
    fps: 25,
    rotate: 0
  },
  {
    file: '3.MOV',
    width: 240,
    height: 426,
    duration: 5072,
    fps: 29.97002997002997,
    rotate: 90
  }
]

fixtures.forEach((fixture) => {
  const input = path.join(fixturesPath, fixture.file)

  test(fixture.file, async (t) => {
    const probe = await ffmpegProbe(input)
    t.deepEqual(probe.width, fixture.width)
    t.deepEqual(probe.height, fixture.height)
    t.deepEqual(probe.duration, fixture.duration)
    t.deepEqual(probe.fps, fixture.fps)
    t.deepEqual(probe.rotate, fixture.rotate)
  })
})
