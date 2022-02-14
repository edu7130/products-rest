import { Request, Response } from "express";
import Category from "../models/category";

export const readCategories = async (req: Request, res: Response) => {

    try {
        const categories = await Category.findAll({
            include: {
                association: 'Products',

            },

        });
        res.json(categories)
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador de sistema',
            error
        })
    }
}

export const readCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const category = await Category.findByPk(id, {
            include: {
                association: 'Products'
            },
        })
        if (!category) {
            return res.status(404).json({
                msg: 'No se ha encontrado la categoria con el id ' + id
            })
        }
        res.json(category)

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador de sistema',
            error
        })
    }
}

export const createCategory = async (req: Request, res: Response) => {
    const { body } = req
    try {
        const category = await Category.create(body)
        res.json(category)
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador de sistema',
            error
        })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req;
    try {
        const category = await Category.findByPk(id)
        category?.update(body);
        res.json(category)
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador de sistema',
            error
        })
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const category = await Category.findByPk(id);
        await category?.destroy()
        res.json(category)
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador de sistema',
            error
        })
    }
}