module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/tictactoe-vue/" : "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Vue Tic Tac Toe";
      return args;
    });
  },
};
