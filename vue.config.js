module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://fppapi.icu',
        ws: true,
        changeOrigin: true
      }
    }
  }
}