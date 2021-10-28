import express from 'express'
import { createUser, disableUser, enableUser, editUser, getUser, getAllUser, reseedDatabase } from '../controllers/users_controller'

const router = express.Router()
router.route('/create').post(createUser)
router.route('/edit').put(editUser)
router.route('/disable').delete(disableUser)
router.route('/enable').patch(enableUser)
router.route('/getUser').post(getUser)
router.route('/getAllUser').get(getAllUser)
router.route('/reseedDatabase').get(reseedDatabase)

export default router
