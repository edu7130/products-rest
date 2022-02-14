import Category from "../models/category"
import Product from "../models/product"


export const existCategoryWithName = async (name: string) => {
    const category = await Category.findOne({
        where: {
            name
        },
    })
    if (category) {
        throw new Error(`ya existe la categoria con el nombre: ${name}`)
    }
}

export const existCategoryWithId = async (id: string) => {
    const category = await Category.findByPk(id)
    if (!category) {
        throw new Error(`No existe la categoria con el ID: ${id}`)
    }
}


export const existProductWithId = async (id: string) => {
    const product = await Product.findByPk(id)
    if (!product) {
        throw new Error(`No existe el producto con el ID: ${id}`)
    }
}

export const existProductWithBarcode = async (code: number) => {
    const product = await Product.findOne({
        where: {
            barcode: code
        }
    })
    if (!product) {
        throw new Error(`No existe el producto con el código: ${code}`)
    }
}

export const allowedCollections = (collection: string, allowed: Array<string>) => {

    if (!allowed.includes(collection)) {
        throw new Error(`The collection: ${collection} is not allowed`)
    }
    return true;
}

