import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import * as usuario from '../../model/DAO/usuario'
import * as yup from 'yup'
import { validation } from "../../shared/middleware"

interface IParamProps {
    id?: number
}

const paramsValidation: yup.SchemaOf<IParamProps> = yup.object().shape({
    id: yup.number().integer().moreThan(0).required()
})

export const getByIdValidation = validation({
    params: paramsValidation,
})


export const getById = async (req: Request<IParamProps>, res: Response) => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: {
            default: 'O parâmetro "id" precisa ser informado.'
          }
        });
      }

    const result = await usuario.getUserById(req.params.id)

    if (result.length > 0) {
        return res.status(StatusCodes.OK).json({message: result})
    } else{
        return res.status(StatusCodes.NOT_FOUND).json({message: 'Não encontrado'})
    }
}