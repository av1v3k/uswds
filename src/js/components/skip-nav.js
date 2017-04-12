'use strict';
const behavior = require('../utils/behavior');
const once = require('receptor/once');

const PREFIX = require('../config').prefix;

const setTabindex = function (event) {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  const id = this.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    target.setAttribute('tabindex', 0);
    this.addEventListener('blur', once(event => {
      target.setAttribute('tabindex', -1);
    }));
  } else {
    // throw an error?
  }
};

module.exports = behavior({
  'click': {
    [ `.${PREFIX}-skipnav[href^="#"]` ]: setTabindex,
  },
});
