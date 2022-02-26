const path = require('path')

const tsConfigPath = path.resolve(__dirname, '../tsconfig.json')

const htmlPath = path.resolve(__dirname, '../public/index.ejs')

const dllFilePath = path.resolve(__dirname, '../dll/vendor.dll.js')

const dllJsonPath = `${path.resolve(__dirname, '../dll')}/dll.mainfest.json`

const appSrc = path.resolve(__dirname, '../src')

const appIndexJs = path.resolve(__dirname, '../src/index')

module.exports = { tsConfigPath, htmlPath, dllFilePath, dllJsonPath, appSrc, appIndexJs }
