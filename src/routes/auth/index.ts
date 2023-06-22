import { Router } from 'express'
import { AuthController } from '../../controllers'

const controller = new AuthController()

const router = Router()

router.post('/registration', async (req, res) => {
  await controller.registration(req, res)
})
router.post('/login', async (req, res) => {
  await controller.login(req, res)
})

export { router as authRouter }
