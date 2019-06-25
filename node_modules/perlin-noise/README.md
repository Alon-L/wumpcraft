# perlin noise generator for node.js

## Usage

```js
var perlin = require('perlin-noise');

perlin.generatePerlinNoise(480, 480);
```

## Documentation

### generatePerlinNoise(width, height, options)

Returns a one-dimensional of length `width * height` in
*row-major order*. That is, `index = y * width + height`.

Each value in the array will be between 0 and 1.

 * `options` (optional)
   - `octaveCount` - defaults to 4
   - `amplitude` - defaults to 0.1
   - `persistence` - defaults to 0.2

### generateWhiteNoise(width, height)

Returns a one-dimensional of length `width * height` in
*row-major order*. That is, `index = y * width + height`.

Each value in the array will be between 0 and 1.

