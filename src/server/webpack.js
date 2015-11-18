import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "../../config/webpack.config";

const PORT = process.env.DEV_PORT || 8080;

var server = new WebpackDevServer(webpack(config), {
  // webpack-dev-server options
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true },
});

server.listen(PORT, "localhost", function() {});

console.log('WEBPACK SERVER RUNNING', process.env.URL)
