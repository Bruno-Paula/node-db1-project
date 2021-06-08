const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  let {name, budget} = req.body

  if (!name || !budget) {
    console.log('!budger')
    next({status: 400, message: 'name and budget are required'})
  }
  if (typeof name !== 'string') {
    console.log('not string')
    next({status: 400, message: 'must be a string'})
  }

  if (name.length <= 3 || name.length >= 100) {
    console.log(' 3 = 100')
    next({status: 400, message: 'name of account must be between 3 and 100'})
  }

  req.data = {
    name: name.trim(),
    budget: Number(budget),
  }

  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
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
