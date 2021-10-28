import express from 'express'
import { createCustomers, deleteCustomers, editCustomers, getCustomers, getAllCustomers } from '../controllers/customers_controller'

const router = express.Router()
router.route('/create').post(createCustomers)
router.route('/edit').put(editCustomers)
router.route('/delete').delete(deleteCustomers)
router.route('/getCustomer').post(getCustomers)
router.route('/getAllCustomer').get(getAllCustomers)

export default router
