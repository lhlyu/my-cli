const pk = require('../../package.json')
const templates = require('../config')

const path = require('path')
// 文件系统模块
const fs = require('fs')
// 命令行交互
const inquirer = require('inquirer')
// 控制终端颜色输出
const chalk = require('chalk')
// 校验名字是否符合npm规范
const validateProjectName = require('validate-npm-package-name')

