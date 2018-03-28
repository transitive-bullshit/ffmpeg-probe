# ffmpeg-probe

> Wrapper around [ffprobe](https://www.ffmpeg.org/ffprobe.html) for getting info about media files such as width, height, and duration.

[![NPM](https://img.shields.io/npm/v/ffmpeg-probe.svg)](https://www.npmjs.com/package/ffmpeg-probe) [![Build Status](https://travis-ci.org/transitive-bullshit/ffmpeg-probe.svg?branch=master)](https://travis-ci.org/transitive-bullshit/ffmpeg-probe) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is a helpful wrapper around  for getting common media info 

## Install

```bash
npm install --save ffmpeg-probe
# or
yarn add ffmpeg-probe
```

## Usage

```js
const ffmpeg = require('fluent-ffmpeg')
const ffmpegProbe = require('ffmpeg-probe')

const info = await ffmpegProbe('input.mp4')

console.log(`size=${info.width}x${info.height}px duration=${info.duration}ms`)
// => size=640x360 duration=4000ms

console.log(info.streams) // extra ffprobe details
// => array of ffprobe streams info (verbose)
```

## API

### probe(input)

Returns a `Promise` for the [probe](https://www.ffmpeg.org/ffprobe.html) information augmented with the first stream's `width`, `height`, and `duration` in milliseconds.

#### input

Type: `String`

Path or URL to a media file.

## Related

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
