const path = require('path');
const webpack = require('webpack');

module.exports =(env)=>{
  const isProduction = env==="production";
    return {
      entry: ['./Server/App/src/app.js','webpack-hot-middleware/client'],
      hot: true,
      output: {
        path: path.join(__dirname,'Server', 'public'),
        filename: 'bundle.js'
      },
      module: {
        rules: [{
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        }, {
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }]
      },
      devtool: isProduction? 'source-map': 'cheap-module-eval-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
      },plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ],

    };
};
