'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-icon-select')
      .service('myService')
      .getWelcomeMessage();
  },
});
