'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://172.19.240.196:7300/mock/5fe1bea8ea92fe28397a9c59"',
})
