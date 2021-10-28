import express from 'express'
import { createOrganization, deleteOrganization, editOrganization, getOrganization, getAllOrganization } from '../controllers/organizations_controller'

const router = express.Router()
router.route('/create').post(createOrganization)
router.route('/edit').put(editOrganization)
router.route('/delete').delete(deleteOrganization)
router.route('/getOrganization').post(getOrganization)
router.route('/getAllOrganization').get(getAllOrganization)

export default router
