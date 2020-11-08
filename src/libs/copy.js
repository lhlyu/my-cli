const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const utils = require('../utils')

async function copy( { from, to, renderData, ingores = [] } ) {
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

    // 遍历文件
    files.forEach(file => {
        if ( ingores.some(v => v === file) ) {
            return
        }
        let content = fs.readFileSync(path.resolve(from, file), 'utf-8')
        // 如果是ejs模板文件，则进行数据渲染，并修改文件后缀
        if ( /ejs$/.test(file) ) {
            content = ejs.render(content, renderData)
            file = file.replace('.ejs', '')
        }
        fs.writeFileSync(path.resolve(to, file), content)
    })

    // 遍历目录
    dirs.forEach(dir => {
        if (ingores.some(v => v === dir)) {
            return
        }
        const fromDir = path.resolve(from, dir)
        const toDir = path.resolve(to, dir)
        if ( !utils.hasDir(toDir) ) {
            fs.mkdirSync(toDir)
        }
        copy( {
            from: fromDir,
            to: toDir,
            renderData,
            ingores
        } )
    })
}

module.exports = copy