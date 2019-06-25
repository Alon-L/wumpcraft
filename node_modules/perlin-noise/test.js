var perlin = require('./');
var assert = require('assert');

var noise = perlin.generateWhiteNoise(10, 10);
assert.strictEqual(noise.length, 10 * 10);
for (var i = 0; i < noise.length; i++ ) {
  assert.strictEqual(typeof noise[i], 'number');
}

noise = perlin.generatePerlinNoise(25, 5);
assert.strictEqual(noise.length, 25 * 5);
for (var i = 0; i < noise.length; i++ ) {
  assert.strictEqual(typeof noise[i], 'number');
}

noise = perlin.generatePerlinNoise(100, 100, {
  amplitude: 0.5,
  octaveCount: 8,
  persistence: 0.2,
});
assert.strictEqual(noise.length, 100 * 100);
for (var i = 0; i < noise.length; i++ ) {
  assert.strictEqual(typeof noise[i], 'number');
}

