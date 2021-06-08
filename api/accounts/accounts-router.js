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

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

// Error Handler
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message})
})

module.exports = router
