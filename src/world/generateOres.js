const { randNumberBetween, getInRange, longestArrayLength } = require('../utils/generalMethods');
const { blocksInRadius } = require('./blockMethods');
const generate = require('../configs/generate');

const maxOreLevel = 10;

/**
 * @desc Forbidden blocks to be around an ore block.
 * @type {*[]}
 */
const forbiddenBlocks = [
  'sky',
  'lava',
  'water',
  'bedrock',
  undefined
];

/**
 * @desc All the ore types that must be included in a world.
 * @type {string[]}
 */
const mustInclude = [
  'diamond',
  'iron'
];

/**
 * @desc Ore positions chart.
 * @type {{'1': (function(*): number), '2': (function(*): *), '3': (function(*): *)}}
 */
const oresRandom = {
  '1': (x) => x - 1,
  '2': (x) => x,
  '3': (x) => x + 1
};

/**
 * @desc Convert percentage chances into mathematical-based chances.
 * @type {[string, any]}
 */
const chances = Object.entries(generate.percentages)
  .reduce((acc, curr) => {
    acc.push([curr[0], (acc[acc.length - 1] || [null, 0])[1] + curr[1]]);
    return acc;
  }, []);

/**
 * @desc Generates random types of ores in the world below y = 10.
 * Finds for the environment around the randomly generated coordinate and checks if valid.
 * @param blocks
 */
function generateOres(blocks) {
  const height = Number(Object.keys(blocks)[Object.keys(blocks).length - 1]);
  const width = longestArrayLength(Object.values(blocks));

  const validBlocks = getInRange(1, maxOreLevel, blocks);
  const amountOfGroupedOres = randNumberBetween(9, 11);

  const generatedTypes = [];

  for (let i = 0; i < amountOfGroupedOres; i++) {
    const { x, y } = randomBlock();
    let ore;
    const mustIncludeName = mustInclude[amountOfGroupedOres - i - 1];
    if (i + mustInclude.length >= amountOfGroupedOres && !generatedTypes.includes(mustIncludeName)) {
      ore = mustIncludeName;
    } else {
      const rand = Math.random() * 100;
      for (const [type, value] of chances) {
        if (rand <= value) {
          ore = type;
          break;
        }
      }
    }
    generatedTypes.push(ore);

    const amountOfOres = randNumberBetween(1, 4);
    const oresCords = [{ x: x, y: y }];
    for (let i = 0; i < amountOfOres; i++) {
      (function findSpot() {
        const oreX = oresRandom[randNumberBetween(1, 3)](x);
        const oreY = oresRandom[randNumberBetween(1, 3)](y);
        if (oresCords.find(({ x, y }) => x === oreX && y === oreY)) return findSpot();
        oresCords.push({ x: oreX, y: oreY });
      })();
    }

    oresCords.forEach(({ x, y }) => {
      blocks[y][x] = { name: ore };
    });
  }

  /**
   * @desc Finds a valid random coordinate in the map for the ores to sit at.
   * @returns {{x, y}}
   */
  function randomBlock() {
    const y = randNumberBetween(1, validBlocks.length);
    const row = blocks[y];
    const x = randNumberBetween(1, Object.keys(row).length);
    const block = row[x];
    if (x <= 1 || x >= width - 1 || y <= 1 || y >= height - 1) return randomBlock();
    const inRadius = blocksInRadius(blocks, x, y, 1);
    if (inRadius.some(b => forbiddenBlocks.includes(b.block.name)) || forbiddenBlocks.includes(block.name)) return randomBlock();
    return { x, y };
  }
}

module.exports = generateOres;