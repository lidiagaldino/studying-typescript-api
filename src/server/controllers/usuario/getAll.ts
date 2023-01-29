import { Request, RequestHandler, Response } from "express"
import { StatusCodes } from 'http-status-codes'
import * as usuario from '../../model/DAO/usuario'
import { IUsuario } from "../../model/usuario"

export const getAll = async (req: Request<{}, {}, IUsuario>, res: Response) => {

    const result = await usuario.getAllUsers()

    if (result.length > 0) {
        return res.status(StatusCodes.OK).json({message: result})
    } else{
        return res.status(StatusCodes.NOT_FOUND).send("Não encontrado")
    }
}
