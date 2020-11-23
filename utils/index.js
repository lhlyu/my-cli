var fs = require('fs')

function isDir(path) {
    const stat = fs.lstatSync(path)
    return stat.isDirectory()
}

function hasDir(path) {
    return fs.existsSync(path)
}

function delDir(path) {
    var files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(function (file, index) {
            var curPath = path + '/' + file
            if (fs.statSync(curPath).isDirectory()) {
                deleteall(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(path)
    }
}

function getFullYear() {
    return new Date().getFullYear()
}

module.exports = {
    isDir,
    hasDir,
    delDir,
    getFullYear
}
