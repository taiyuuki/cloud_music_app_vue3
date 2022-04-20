const path = require('path');

const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8080
  },
  configureWebpack: config => {
    config.devtool = isProd ? 'nosources-source-map' : 'eval-source-map';
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => /^marquee/.test(tag)
        };
        return options;
      });
  }
};