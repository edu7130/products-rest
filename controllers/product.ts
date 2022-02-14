import { Request, Response } from "express";
import Product from "../models/product";

export const readProducts = async (req: Request, res: Response) => {

    const products = await Product.findAll({
        include: {
            association: 'Category',
            attributes: [
                'name'
            ]
        }
    });
    res.json(products)
}



export const readProduct = async (req: Request, res: Response) => {
    const { id } = req.params

    const product = await Product.findByPk(id, {
        include: {
            association: 'Category',
            attributes: [
                'name'
            ]
        }
    })
    if (!product) {
        return res.status(404).json({
            msg: `No se encontró un producto con el ID: ${id}`
        })
    }

    res.json(product)
}

export const readProductBarcode = async (req: Request, res: Response) => {
    const { barcode } = req.params

    const product = await Product.findOne({
        where: {
            barcode
        },
        include: {
            association: 'Category',
            attributes: [
                'name'
            ]
        }
    })
    if (!product) {
        return res.status(404).json({
            msg: `No se encontró un producto con el Código: ${barcode}`
        })
    }

    res.json(product)
}

export const createProduct = async (req: Request, res: Response) => {
    const { id, createdAt, updatedAt, deletedAt, ...body } = req.body;
    console.log(body);

    try {

        const product = await Product.create(body)
        res.json(product)
    } catch (error) {
        res.json(error)
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const product = await Product.findByPk(id);
        await product?.update(req.body);
        res.json(product);

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador de sistema',
            error
        })
    }

}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id);
    await product?.destroy();
    res.json(product)
}