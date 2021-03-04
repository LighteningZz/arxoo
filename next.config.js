const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

const baseConfig = {
    sassLoaderOptions: {
        includePaths: ["./node_modules"]
    },
    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        }
       
        return config
    }
}

module.exports = withSass(withCss(baseConfig));