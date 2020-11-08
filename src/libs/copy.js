const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const utils = require('../utils')

async function copy({from, to, renderData, ingores = []}) {
    let resources = fs.readdirSync(from)
    const files = []
    const dirs = []
    for (const resource of resources) {
        if ( utils.isDir(path.resolve(from, resource)) ) {
            dirs.push(resource)
        } else {
            files.push(resource)
        }
    }

    files.forEach(file => {
        if (ingores.some(v => v === file)) {
            return
        }
        let content = fs.readFileSync(path.resolve(from, file), 'utf-8')
        // 如果是ejs模板文件
        if ( /ejs$/.test(file) ) {
            content = ejs.render(content, renderData)
            file = file.replace('.ejs', '')
        }

    })
}