module.exports = {
  skull: {
    name: 'sl',
    id: '593479734671835146',
    type: 'head'
  },
  body: {
    name: 'bo',
    id: '593479674861060121',
    type: 'body'
  },
  fallDamage: {
    min: 3,
    lives: function(n) {
      return (n - this.min + 1) * 1.5;
    }
  }
};