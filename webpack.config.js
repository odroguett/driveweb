let webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');


let path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname + "/dist"),
    publicPath: "/dist",
    filename: "bundle.js",
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': '@vue/runtime-dom',
      '@': path.join(__dirname, '..', 'src'),
    }
  },
  module: {
    rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        // this will apply to both plain `.js` files
        // AND `<script>` blocks in `.vue` files
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          },
          exclude:/node_modules/
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource',
          
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires sass-loader@^7.0.0
              options: {
                implementation: require('sass'),
                indentedSyntax: true // optional
              },
              // Requires >= sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  indentedSyntax: true // optional
                },
              },
            },
          ],
        },
       
        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      // make sure to include the plugin for the magic
      new VueLoaderPlugin()
    ],
  
  devServer: {
    open: {
        app: {
          name: 'chrome',
          arguments: ['--incognito', '--new-window'],
        },
  },
  performance: {
    hints:false
  },
  devtool: 'inline-source-map',
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  
}
};
