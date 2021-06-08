const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = (id) => {
  return db('accounts').where('id', id).first()
}

const create = async (account) => {
  const [id] = await db('accounts').insert(account)
  const data = getById(id)
  return data
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id)
  return getById(id)
}

const deleteById = (id) => {
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
