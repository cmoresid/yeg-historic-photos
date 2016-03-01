var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
      'login_controller': path.join(__dirname, 'client', 'js', 'controllers', 'login.js')
    },
    output: {
      path: path.join(__dirname, 'client', 'js'),
      filename: '[name].bundle.js'
    },
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )
    ]
}
