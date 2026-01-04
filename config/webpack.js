"use strict";
/**
 * Webpack Configuration
 * (sails.config.webpack)
 *
 * Configuration for webpack asset bundling.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const topDir = path.resolve(process.cwd());
const outputDir = path.resolve(topDir, './.tmp/public');
const pickFirstExisting = (candidates) => candidates.find((candidate) => fs.existsSync(path.resolve(topDir, candidate)));
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
const optionalVendorPatterns = [];
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
const webpackConfig = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2ludGVybmFsL3NhaWxzLXRzL2NvbmZpZy93ZWJwYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFFSCxNQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUVuRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRXhELE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxVQUFvQixFQUFFLEVBQUUsQ0FDakQsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFakYsTUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztJQUN6QyxvRkFBb0Y7SUFDcEYsd0ZBQXdGO0lBQ3hGLCtFQUErRTtDQUNoRixDQUFDLENBQUM7QUFFSCxNQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO0lBQ3pDLCtFQUErRTtJQUMvRSxvRkFBb0Y7SUFDcEYsd0ZBQXdGO0NBQ3pGLENBQUMsQ0FBQztBQUVILE1BQU0sc0JBQXNCLEdBQXdDLEVBQUUsQ0FBQztB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