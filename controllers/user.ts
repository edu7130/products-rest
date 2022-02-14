import { Request, Response } from 'express'
import User from '../models/user'

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    console.log(users);

    res.json(users)
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.json(user)
}

export const postUser = async (req: Request, res: Response) => {
    const { active, ...body } = req.body

    const user = await User.create(body)
    res.json(user)
}

export const putUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: 'No se ha encontrado un usuario con el ID: ' + id
        })
    }

    await user!.update(body);
    res.json(user)
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await User.findByPk(id)

    await user?.destroy();

    res.json(user)

}