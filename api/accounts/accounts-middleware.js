const db = require('../../data/db-config')
const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  let {name, budget} = req.body
  budget = Number(budget)
  if (!name || !budget) {
    next({status: 400, message: 'name and budget are required'})
  } else if (typeof name !== 'string') {
    next({status: 400, message: 'name of account must be a string'})
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    next({status: 400, message: 'budget of account must be a number'})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({status: 400, message: 'name of account must be between 3 and 100'})
  } else if (budget < 0 || budget > 1000000) {
    next({status: 400, message: 'budget of account is too large or too small'})
  } else {
    req.data = {
      name: name.trim(),
      budget: budget,
    }
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts')
      .where('name', req.body.name.trim())
      .first()
    if (existing) {
      next({status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const accountId = await Account.getById(req.params.id)
    if (!accountId) {
      next({status: 404, message: 'account not found'})
    } else {
      req.data = accountId
      next()
    }
  } catch (error) {
    next({status: 500, message: 'Account ID server error...'})
  }
}
