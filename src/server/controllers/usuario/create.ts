import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import { validation } from "../../shared/middleware"
import * as yup from 'yup'
import * as usuario from '../../model/DAO/usuario'
import { IUsuario } from "../../model/usuario"

interface IBodyProps extends Omit<IUsuario, 'id'> { }

const bodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3)
})

export const createValidation = validation({
    body: bodyValidation,
})

export const create = async (req: Request<{}, {}, IUsuario>, res: Response) => {

    const resultCreate: boolean = await usuario.newUser(req.body)

    if (resultCreate) {
        return res.status(StatusCodes.CREATED).send('Criado com sucesso')
    } else{
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro interno')
    }

}