const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      //为不同的前缀配置不同的代理，该前缀位于代理服务器
      '/api': {
        target: 'https://music.163.com/song/media/outer/url',
        //重写路由，将代理服务的前缀移除，避免向目标服务器请求时携带该前缀
        pathRewrite: {
          '/^/api/': ''
        },
        //该选项设为true时，服务端将收到服务器的同源请求，将请求头的host值设置为与服务器端的一致。
        changeOrigin: true
      }
    }
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