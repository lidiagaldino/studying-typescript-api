import * as create from './create'
import * as getAll from './getAll'
import * as getById from './getById'
import * as deleteUser from './delete'
import * as updateUser from './update'

export const usuarioController = {
    ...create,
    ...getAll,
    ...getById,
    ...deleteUser,
    ...updateUser,
}