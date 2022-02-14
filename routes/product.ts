import { Router } from 'express'
import { check } from 'express-validator';
const router = Router();
import {
    createProduct,
    deleteProduct,
    readProduct,
    readProductBarcode,
    readProducts,
    updateProduct
} from '../controllers/product';
import { existProductWithBarcode, existProductWithId } from '../middlewares/db-validator';
import { validateFields } from '../middlewares/validate-fields';

router.get('/', readProducts)

router.get('/:id', [
    check('id').custom(existProductWithId),
    validateFields
], readProduct)

router.get('/barcode/:barcode', [
    check('barcode').custom(existProductWithBarcode),
    validateFields
], readProductBarcode)



router.post('/', createProduct)


router.put('/:id', [
    check('id').custom(existProductWithId),
    validateFields
], updateProduct)


router.delete('/:id', [
    check('id').custom(existProductWithId),
    validateFields
], deleteProduct)



export default router;




