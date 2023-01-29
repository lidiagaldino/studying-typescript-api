import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import { validation } from "../../shared/middleware"
import * as yup from 'yup'
import * as usuario from '../../model/DAO/usuario'

interface IParamProps {
    id?: number;
}

const paramsValidation: yup.SchemaOf<IParamProps> = yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
})

export const deleteValidation = validation({
    params: paramsValidation,
})

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await usuario.deleteUser(req.params.id)

    if (result) {
        return res.status(StatusCodes.OK).json({message: 'Item deletado com sucesso'})
    } else{
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Não foi possível deletar'})
    }
}