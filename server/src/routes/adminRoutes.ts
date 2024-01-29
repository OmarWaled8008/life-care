import express, { Router } from 'express'
const router : Router = express.Router()

import { adminLogin, adminLogout, getAllUsers, getAllDoctors } from '../controllers/adminController'
import { createDoctor } from '../controllers/adminController'
import { authenticationUser} from '../middlewares/authentication'
import { isAdminMiddleware } from '../middlewares/authorization'
import { validateEmail } from '../middlewares/emailValidator'
import { cache } from '../middlewares/cache'


router.route('/loginAdmin').post(adminLogin)
router.post('/doctorCreation', authenticationUser, isAdminMiddleware, validateEmail,createDoctor)
router.get('/getAllUsers',authenticationUser, isAdminMiddleware, cache,getAllUsers )
router.get('/getAllDoctors',authenticationUser, isAdminMiddleware,cache ,getAllDoctors )
router.get("/logoutAdmin", authenticationUser, adminLogout)




export = router