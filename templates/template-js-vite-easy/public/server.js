const http = require('http')
const fs = require('fs')
const path = require('path')

const root = './'

const contentTypeMap = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.gif': 'text/gif',
    '.jpg': 'text/jpg',
    '.png': 'text/png'
}

const handlerContentType = file => {
    const ext = path.extname(file)
    let type = contentTypeMap[ext]
    if (!type) {
        type = 'application/octet-stream'
    }
    return type + ';charset="utf-8"'
}

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    let url = request.url
    console.log('path => ', url)
    if (url === '/') {
        url = '/index.html'
    }
    const file = root + url
    fs.readFile(file, function (err, data) {
        if (err) {
            response.writeHead(404, {
                'content-type': 'text/html;charset="utf-8"'
            })
            response.write(`<h1>404</h1><br><p>${url}</p>`)
            response.end()
        } else {
            response.writeHead(200, {
                'content-type': handlerContentType(file)
            })
            response.write(data)
            response.end()
        }
    })
}).listen(8080)

console.log('Server running at http://127.0.0.1:8080/\n')
