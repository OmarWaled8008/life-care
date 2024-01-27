import express, { Router } from 'express'
const router: Router = express.Router()
import { 
    registerUser,
    loingUser, 
    logoutUser, 
    getUserrDataById, 
    createAppointment, 
    getNotifications 
} from '../controllers/userController'
import { authenticationUser } from '../middlewares/authentication'
import { isUserMiddleware } from '../middlewares/authorization'
import { validateEmail } from '../middlewares/emailValidator'

router.post("/registerUser",validateEmail,registerUser)
router.route("/loginUser").post(loingUser)
router.use(authenticationUser, isUserMiddleware)
router.get('/profile/:id',getUserrDataById)
router.get('/notifications/:id', getNotifications)
router.post('/appointments', createAppointment)
router.get("/logoutUser", logoutUser)



export = router