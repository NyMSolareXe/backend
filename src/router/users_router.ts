import express from 'express'
import { createUser, disableUser, enableUser, editUser, getUser, getAllUser } from '../controllers/users_controller'

const router = express.Router()
router.route('/create').post(createUser)
router.route('/edit').put(editUser)
router.route('/disable').delete(disableUser)
router.route('/enable').patch(enableUser)
router.route('/getUser').post(getUser)
router.route('/getAllUser').get(getAllUser)

export default router
