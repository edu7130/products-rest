import path from 'path'
import fs from 'fs'
import { Request, Response } from 'express';
import Category from '../models/category';
import Product from '../models/product';
import { uploadFile as uploadFileHelper } from '../helpers/upload-file';


export const uploadImage = async (req: Request, res: Response) => {
    try {
        const { collection, id } = req.params

        let model: any;
        switch (collection) {
            case 'category':
                model = await Category.findByPk(id)
                break;
            case 'products':
                model = await Product.findByPk(id)
                break;
            default:
                return res.status(500).json({
                    msg: 'Function not implemented yet'
                });
        }

        if (model.img) {
            const imagePath = path.join(__dirname, '../uploads', collection, model.img)
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }

        const name = await uploadFileHelper(req.files, ['png', 'jpg', 'jpeg', 'gif'], collection)

        model.img = name
        await model.save()

        res.json(model)
    } catch (error) {
        console.log(`ERROR AL SUBIR IMAGEN ${error}`);

    }
}

export const getImage = async (req: Request, res: Response) => {
    const { collection, id } = req.params

    let model: any;

    switch (collection) {
        case 'categories':
            model = await Category.findByPk(id)
            break;
        case 'products':
            model = await Product.findByPk(id)
            break;
        default:
            return res.status(500).json({
                msg: 'Function not implemented yet'
            });
    }
    if (model!.img) {
        const imagePath = path.join(__dirname, '../uploads', collection, model.img)
        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath)
        }
    }
    const placeholderPath = path.join(__dirname, '../assets/error_image.png')
    res.sendFile(placeholderPath)
}


/*
const uploadFile = async (req: Request, res: Response) => {
    try{
        console.log('UPLOADING FILE');
        const name = await uploadFileHelper(req.files,[ 'png', 'jpg', 'jpeg', 'gif'],'png')
        res.json({ name })
    }
    catch(error){
        res.status(400).json({error})
    }

}
*/


/*
 * CLOUDNARY
 */
/*

const uploadImageCloudinary = async (req: Request, res : Response) => {
    const { collection, id } = req.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            break;
        case 'products':
            model = await Product.findById(id)
            break;
        default:
            return res.status(500).json({
                msg: 'Function not implemented yet'
            });
    }

    if(model.img){
        const imgSplitted = model.img.split('/')
        const [ public_name ] = imgSplitted[imgSplitted.length - 1].split('.')
        await cloudinary.uploader.destroy(public_name)
    }

    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    model.img = secure_url
    await model.save()

    res.json(model)
}

const getImageCloudinary = async (req: Request, res : Response) => {
    const { collection, id } = req.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            break;
        case 'products':
            model = await Product.findById(id)
            break;
        default:
            return res.status(500).json({
                msg: 'Function not implemented yet'
            });
    }
    if(model.img){

        //return res.sendFile(file_reader.path)
    }
    const placeholderPath = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(placeholderPath)
}
*/