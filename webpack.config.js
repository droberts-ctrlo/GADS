const path = require('path');
const { ProvidePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sass = require('sass');
const TerserPlugin = require('terser-webpack-plugin');

const fullpath = path.resolve(__dirname, 'src', 'frontend', 'components');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
const excludes = [/node_modules/, /test/, /definitions/];

const plugins = [
    new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [{
            from: 'node_modules/summernote/dist/font',
            to: '../css/font'
        },
        {
            from: '*.json',
            context: path.resolve(__dirname, "src", "frontend", "js", "lib", "plotly"),
        }]
    })
]

module.exports = (env) => {
    return {
        mode: env.development ? 'development' : 'production',
        devtool: env.development ? 'source-map' : false,
        entry: {
            site: path.resolve(__dirname, 'src', 'frontend', 'js', 'site.js'),
            '../css/general': path.resolve(__dirname, 'src', 'frontend', 'css', 'stylesheets', 'general.scss'),
            '../css/external': path.resolve(__dirname, 'src', 'frontend', 'css', 'stylesheets', 'external.scss'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [...excludes, /\.test\.js$/],
                    use: ['babel-loader'],
                },
                {
                    test: /\.tsx?$/,
                    exclude: [...excludes, /\.test\.tsx?$/],
                    use: ['babel-loader', 'ts-loader'],
                },
                {
                    test: /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/,
                    type: 'asset'
                },
                {
                    test: /\.(s?css)$/,
                    use: [
                        {
                            loader: stylesHandler,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                sourceMap: env.development,
                                modules: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        'autoprefixer',
                                    ],
                                },
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: sass,
                                sourceMap: env.development,
                                sassOptions: {
                                    includePaths: [
                                        fullpath,
                                    ],
                                },
                            },
                        }
                    ]
                }
            ],
        },
        optimization: {
            minimize: env.development ? false : true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ],
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'public', 'js'),
            chunkFilename: "[name].[chunkhash].js",
        },

        resolve: {
            alias: {
                components: path.resolve(__dirname, 'src', 'frontend', 'components'),
                jQuery: path.resolve(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js'),
            },
            extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
            fallback: {
                fs: false,
            },
            modules: [
                path.resolve(__dirname, 'src', 'frontend', 'js', 'lib'),
                path.resolve(__dirname, 'node_modules'),
            ]
        },
    }
};