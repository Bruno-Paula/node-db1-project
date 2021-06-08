const router = require('express').Router()
const Account = require('./accounts-model')
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const account = await Account.getAll()

    res.status(200).json(account)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  res.status(200).json(req.data)
})

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Account.create(req.data)
      res.status(201).json(newAccount)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/:id',
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updatedAccount = await Account.updateById(req.params.id, req.data)
      res.status(200).json(updatedAccount)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.status(200).json({message: 'Account Deleted'})
  } catch (error) {
    next(error)
  }
})

// Error Handler
router.use((err, req, res, next) => {
  res.status(err.status).json({message: err.message})
})

module.exports = router
