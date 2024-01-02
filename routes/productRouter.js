// import controllers review, products
const productController = require('../controllers/productController.js')



// router
const router = require('express').Router()


// use routers
router.post('/addProduct',  productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.post('/editProduct', productController.updateProduct)

router.delete('/deleteProduct', productController.deleteProduct)

router.post('/addSupplier',productController.addSupplier)

router.post('/addCommand',productController.addCommand)

router.post('/editSupplier',productController.editSupplier)

router.post('/addProductgroups',productController.addProductGroups)

router.delete('/deleteSupplier',productController.deleteSupplier)

router.get('/allSuppliers', productController.getAllSuppliers)

router.get('/allCategories', productController.getAllCategories)

router.get('/getProductOfSupplier', productController.getProductOfSupp)

router.get('/getProductOfBarcode', productController.getProductOfBarcode)

router.get('/getProductOfCategory', productController.getProductOfCategory)

router.get('/getCommandsOfSupplier', productController.getCommandsOfSupplier)



module.exports = router
