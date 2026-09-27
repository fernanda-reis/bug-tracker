module.exports = {
  devServer: {
    proxy: {
      "/bugs": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
};