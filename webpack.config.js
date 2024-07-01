const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development', // Definir o modo para 'development' ou 'production'
    entry:'./public/js/index.js', 
    output: {
        filename: 'bundle.js', // Nome do arquivo JavaScript agrupado
        path: path.resolve(__dirname, 'public'), // Diretório de saída para o arquivo agrupado
    },
    resolve: {
        alias: {
          '@src': path.resolve(__dirname, './src'), // Caminho absoluto para o diretório 'src'
        },
      },
    module: {
        rules: [
            {
                test: /\.js$/, // Corresponder a todos os arquivos JavaScript
                exclude: /node_modules/, // Excluir o diretório 'node_modules'
                use: {
                    loader: 'babel-loader', // Usar o loader Babel para transpilar código ES6+
                    options: {
                        presets: ['@babel/preset-env'], // Usar a predefinição para navegadores modernos
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Ativar Hot Module Replacement
    ],
    devServer: {
        hot: true, // Ativar recarregar a quente
        open: true, // Abrir o navegador automaticamente
        port: 3000, // Definir a porta do servidor de desenvolvimento (padrão: 3000)
    },
};