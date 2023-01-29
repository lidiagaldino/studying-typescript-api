import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import { validation } from "../../shared/middleware"
import * as yup from 'yup'
import * as usuario from '../../model/DAO/usuario'
import { IUsuario } from "../../model/usuario"

interface IBodyProps extends Omit<IUsuario, 'id'> { }

interface IParamProps {
    id?: number;
}

const paramsValidation: yup.SchemaOf<IParamProps> = yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
})


const bodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({
    nome: yup.string().required().min(3)
})

export const updateValidation = validation({
    body: bodyValidation,
    params: paramsValidation
})

export const updateUser = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await usuario.updateUserById(req.params.id, req.body)

    if (result) {
        return res.status(StatusCodes.OK).json({message: 'Item atualizado com sucesso'})
    } else{
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Não foi possível atualizar'})
    }
}