module.exports = {
    mode: 'development',

    entry: './app/react-components/index.js',
    output: {
        filename: './app/react-components/react-webpack.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    }
};
