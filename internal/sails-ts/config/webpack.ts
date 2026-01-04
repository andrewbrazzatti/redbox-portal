/**
 * Webpack Configuration
 * (sails.config.webpack)
 *
 * Configuration for webpack asset bundling.
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const topDir = path.resolve(process.cwd());
const outputDir = path.resolve(topDir, './.tmp/public');

const pickFirstExisting = (candidates: string[]) =>
  candidates.find((candidate) => fs.existsSync(path.resolve(topDir, candidate)));

const datepickerSource = pickFirstExisting([
  './angular-legacy/node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
  './angular-legacy/node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
  './angular-legacy/node_modules/bootstrap-datepicker/js/bootstrap-datepicker.js',
]);

const timepickerSource = pickFirstExisting([
  './angular-legacy/node_modules/bootstrap-timepicker/js/bootstrap-timepicker.js',
  './angular-legacy/node_modules/bootstrap-timepicker/dist/js/bootstrap-timepicker.js',
  './angular-legacy/node_modules/bootstrap-timepicker/dist/js/bootstrap-timepicker.min.js',
]);

const optionalVendorPatterns: Array<{ from: string; to: string }> = [];
if (datepickerSource) {
  optionalVendorPatterns.push({
    from: datepickerSource,
    to: './default/default/js/'
  });
}
if (timepickerSource) {
  optionalVendorPatterns.push({
    from: timepickerSource,
    to: './default/default/js/'
  });
}

import { WebpackConfig } from '@researchdatabox/redbox-core-types';

const webpackConfig: WebpackConfig = {
  config: [
    {
      stats: {
        loggingDebug: ["sass-loader"],
      },
      // webpack no longer runs in production mode, assume non-'docker' values to be production mode
      mode: process.env.NODE_ENV === 'docker' ? 'development' : 'production',
      devtool: process.env.NODE_ENV === 'docker' ? 'inline-cheap-source-map' : undefined,
      entry: './assets/default/default/js/client-script.js',
      output: {
        filename: './default/default/js/index.bundle.js',
        path: outputDir,
        library: 'redboxClientScript',
        publicPath: '/',
        clean: true,
      },
      plugins: [
        new MiniCssExtractPlugin({
          // Relative to 'output.path' above!
          filename: './default/default/styles/style.min.css',
        }),
        new CopyPlugin({
          patterns: [
            {
              // Copy files directly to the output folder, in the same folder structure.
              from: './assets',
              // The 'to' property is relative to 'output.path' above!
              to: './',
              globOptions: {
                // Ignore files that shouldn't be copied.
                ignore: [
                  '*js/**/*',
                  '**/*.gitkeep',
                  '**/*.scss',
                  '**/*.less',
                ]
              }
            },
            // Copy vendor scripts directly to specific output path.
            {
              from: './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
              to: './default/default/js/'
            },
            {
              from: './node_modules/jquery/dist/jquery.min.js',
              to: './default/default/js/'
            },
            ...optionalVendorPatterns
          ],
        }),
      ],
      module: {
        rules: [
          {
            // Compile scss files referenced in entry file to css files.
            test: /\.(sa|sc|c)ss$/,
            exclude: /\.\.\/angular/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            include: [path.resolve(topDir, './assets/styles'), path.resolve(topDir, './assets/default/default/styles')]
          },
          {
            // Compile referenced font files referenced in entry file to a separate file and exports the URL
            test: /\.(woff2?|ttf|otf|eot|svg)$/,
            type: 'asset/resource',
            exclude: /\.\.\/angular/
          },
          {
            // extract inline svg files to separate resources (needed for bootstrap and the redbox loading svg)
            mimetype: 'image/svg+xml',
            scheme: 'data',
            type: 'asset/resource',
            generator: {
              filename: 'icons/[hash].svg'
            }
          },
        ]
      },
      optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
        // disabled by default for local development
        minimize: false,
      },
      ignoreWarnings: [
        {
          // ignore warnings from sass-loader raised by files in node_modules
          message: /Deprecation Warning on [^\n]*? of file[^\n]*?\/node_modules\/[^\n]*?:/,
          module: /sass-loader/,
        }
      ],
    }
  ],
  watch: false,
  watchOptions: {
    ignored: [
      "support/**/*",
      "node_modules/**/*"
    ]
  }
};

module.exports.webpack = webpackConfig;
