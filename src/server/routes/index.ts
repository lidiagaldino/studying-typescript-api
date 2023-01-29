import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { usuarioController } from '../controllers/usuario'

const router = Router()

router.post('/usuario', usuarioController.createValidation, usuarioController.create)
router.get('/usuario', usuarioController.getAll)
router.get('/usuario/:id', usuarioController.getByIdValidation, usuarioController.getById)
router.delete('/usuario/:id', usuarioController.deleteValidation, usuarioController.deleteById)
router.put('/usuario/:id', usuarioController.updateValidation, usuarioController.updateUser)

export { router }

