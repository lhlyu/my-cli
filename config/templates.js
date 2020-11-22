const TemplateJsPackageEasy = require('../lib/template_js_package_esay')
const TemplateJsDocEasy = require('../lib/template_js_doc_easy')
const TemplateJsViteEasy = require('../lib/template_js_vite_esay')

const tmps = [
    new TemplateJsPackageEasy(),
    new TemplateJsDocEasy(),
    new TemplateJsViteEasy()
]

const langs = (function () {
    const items = []
    for (let i = 0; i < tmps.length; i++) {
        console.log(tmps[i])
        if (items.indexOf(tmps[i].lang) === -1) {
            items.push(tmps[i].lang)
        }
    }
    return items
})()

const templates = (function () {
    const items = []
    for (let i = 0; i < tmps.length; i++) {
        items.push(tmps[i].props)
    }
})()

console.log(langs)
console.log(templates)

