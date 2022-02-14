import { Router } from 'express'
import { check } from 'express-validator'
const router = Router();

import {
    createCategory,
    deleteCategory,
    readCategories,
    readCategory,
    updateCategory
} from '../controllers/category';

import { existCategoryWithId, existCategoryWithName } from '../middlewares/db-validator';
import { validateFields } from '../middlewares/validate-fields';


router.get('/', readCategories)

router.get('/:id', readCategory)

router.post('/', [
    check('name').custom(existCategoryWithName),
    validateFields
], createCategory)


router.put('/:id', [
    check('id').custom(existCategoryWithId),
    check('name', 'El name es requerido').notEmpty(),
    validateFields,
    check('name').custom(existCategoryWithName),
    validateFields
], updateCategory)


router.delete('/:id', [
    check('id').custom(existCategoryWithId),
    validateFields
], deleteCategory)

export default router;