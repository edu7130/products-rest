import { Router } from 'express'
import { check } from 'express-validator'
import { getImage, uploadImage } from '../controllers/uploads'
import { allowedCollections } from '../middlewares/db-validator'
import { validateFields } from '../middlewares/validate-fields'
import { validateFileUpload } from '../middlewares/validate-file-upload'

const router = Router()

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'El id es requerido').notEmpty(),
    check('collection').custom(c => allowedCollections(c, ['products', 'categories'])),
    validateFields
], uploadImage)
//], uploadImage)


router.get('/:collection/:id', [
    check('id', 'El Id es requerido').notEmpty(),
    check('collection').custom(c => allowedCollections(c, ['products', 'categories'])),
    validateFields
], getImage)


export default router