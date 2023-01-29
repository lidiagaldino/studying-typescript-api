const { PrismaClient } = require('@prisma/client')
import { IUsuario } from "../usuario"

const prisma = new PrismaClient()

export const newUser = async (user: IUsuario): Promise<boolean> => {
    try {
        let sql = `insert into tbl_usuario(nome) values('${user.nome}')`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

export const getAllUsers = async (): Promise<IUsuario[]> => {
    let sql = `select * from tbl_usuario`

    const result = await prisma.$queryRawUnsafe(sql)

    return result
}

export const getUserById = async (id: number): Promise<IUsuario[]> => {

    let sql = `select * from tbl_usuario where id = ${id}`

    const result = prisma.$queryRawUnsafe(sql)

    return result
}

export const deleteUser = async (id: number): Promise<boolean> => {


    try {
        let sql = `delete from tbl_usuario where id = ${id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

export const updateUserById = async (id: number, usuario: Omit<IUsuario, 'id'>): Promise<boolean> => {

    try {
        let sql = `update tbl_usuario set nome = '${usuario.nome}' where id = ${id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }

    } catch (error) {
        return false
    }
}