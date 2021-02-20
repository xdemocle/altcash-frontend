const reactHotReloadPlugin = require('craco-plugin-react-hot-reload')

module.exports = {
  // style: {
  //   postcss: {
  //     plugins: [require('tailwindcss'), require('autoprefixer')]
  //   }
  // },
  plugins: [
    {
      plugin: reactHotReloadPlugin
    }
  ],
  webpack: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    configure: {
      module: {
        rules: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
          }
        ]
      }
    }
  }
}
