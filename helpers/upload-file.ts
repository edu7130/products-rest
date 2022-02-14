//const path = require('path')
import path from 'path'
import { v4 as uuid } from 'uuid'


export const uploadFile = (files: any, validExtensions: Array<string>, folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files

        const nameSplitted = file.name.split('.')
        const extension = nameSplitted[nameSplitted.length - 1]

        const newName = uuid() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', folder, newName)


        if (!validExtensions.includes(extension)) {
            return reject(`Invalid extension: ${extension}`)
        }

        file.mv(uploadPath, function (err: string) {
            if (err) {
                reject(err)
            }
            resolve(newName)
        });
    });
}
