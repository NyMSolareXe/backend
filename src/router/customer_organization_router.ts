import express from 'express'
import { addCustomerToOrganization, deleteCustomerFromOrganization, getAllCustomerForOrganization, getAllCustomersWithOrganization } from '../controllers/customers_organization_controller'

const router = express.Router()
router.route('/create').post(addCustomerToOrganization)
router.route('/deleteCustomerFromOrganization').delete(deleteCustomerFromOrganization)
router.route('/getAllCustomerForOrganization').post(getAllCustomerForOrganization)
router.route('/getAllCustomersWithOrganization').get(getAllCustomersWithOrganization)
// router.route('/edit').put(editOrganization)
// router.route('/getOrganization').post(getOrganization)

export default router
