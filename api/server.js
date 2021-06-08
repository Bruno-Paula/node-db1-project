const express = require('express')
const accountController = require('./accounts/accounts-router')
const server = express()

server.use(express.json())
server.use('/api/accounts', accountController)

module.exports = server
