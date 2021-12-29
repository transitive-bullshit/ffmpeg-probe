'use strict'

const execa = require('execa')

module.exports = async (input, opts = []) => {
  const { stdout } = await execa(process.env.FFPROBE_PATH || 'ffprobe', [
    '-print_format', 'json',
    '-show_error',
    '-show_format',
    '-show_streams',
    ...opts,
    input
  ])

  const probe = JSON.parse(stdout)

  if (probe.streams && probe.streams.length) {
    const stream = probe.streams
      .find((stream) => stream.codec_type === 'video') || probe.streams[0]

    probe.duration = Math.round(stream.duration * 1000)
    probe.rotate = stream.tags && stream.tags.rotate
      ? parseInt(stream.tags.rotate) : 0
    if ([90, 270].includes(Math.abs(probe.rotate))) {
      probe.width = stream.height
      probe.height = stream.width
    } else {
      probe.width = stream.width
      probe.height = stream.height
    }

    const fpsFraction = stream.avg_frame_rate.split('/')
    probe.fps = fpsFraction[0] / fpsFraction[1]
    probe.primaryStream = stream
  } else {
    probe.duration = undefined
    probe.width = undefined
    probe.height = undefined
  }

  return probe
}
