'use strict'

const execa = require('execa')

module.exports = async (input) => {
  const { stdout } = await execa('ffprobe', [
    '-print_format', 'json',
    '-show_error',
    '-show_format',
    '-show_streams',
    input
  ])

  const probe = JSON.parse(stdout)
  if (probe.streams && probe.streams[0]) {
    const stream = probe.streams[0]

    probe.duration = Math.round(stream.duration * 1000)
    probe.width = stream.width
    probe.height = stream.height

    const fpsFraction = stream.avg_frame_rate.split('/')
    probe.fps = fpsFraction[0] / fpsFraction[1]
  } else {
    probe.duration = undefined
    probe.width = undefined
    probe.height = undefined
  }

  return probe
}
