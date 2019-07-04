module.exports = {
  skull: {
    name: 'sl',
    path: 'skull',
    type: 'head'
  },
  body: {
    name: 'bo',
    path: 'body',
    type: 'body'
  },
  fallDamage: {
    min: 3,
    lives: function(n) {
      return (n - this.min + 1) * 1.5;
    }
  }
};