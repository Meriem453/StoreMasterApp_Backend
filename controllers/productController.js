const db = require('../models')



// create main Model
const Product = db.products
const Category=db.category
const Command=db.command
const ExpDate=db.expdate
const ProductGroup=db.productgroup
const Supplier=db.supplier

const { sequelize } = require('../models'); // Import the Sequelize instance
const { QueryTypes } = require('sequelize');
// main work

// 1. create product



const addProduct = async (req, res) => {
    try {
        const { name, price, quantity, benefit,barcode,supplier} = req.body;

        const query = `
            INSERT INTO products (name, price, quantity, benefit,barcode,supplier)
            VALUES (:name, :price, :quantity, :benefit,:barcode,:supplier)
        `;

        const values = {name, price, quantity, benefit,barcode,supplier };

        // Execute the raw SQL query
        const [product] = await sequelize.query(query, {
            replacements: values,
            type: QueryTypes.INSERT,
            raw: true,
        });

        console.log('Product:', product);

        res.status(200).json({ product }); // Send the product data as JSON
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Internal Server Error');
    }
};







// 2. get all products

const getAllProducts = async (req, res) => {
    try {
        const query = 'SELECT * FROM products';
        const products = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        res.status(200).send(products);
        console.log(products)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};

// 3. get single product
const getProductOfSupp = async (req, res) => {
    try {
        const id = req.query.id;
        const query = 'SELECT * FROM products WHERE supplier = :id';
        const product = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id: id },
        });

        if (product.length === 0) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send(product);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }

}
const getProductOfBarcode = async (req, res) => {
    try {
        const barcode = req.query.barcode;
        const query = 'SELECT * FROM products WHERE barcode= :barcode';
        const product = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { barcode: barcode },
        });

        if (product.length === 0) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send(product[0]);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }

}

const getProductOfCategory = async (req, res) => {
    try {
        const id = req.query.id;
        const query = 'SELECT products.* FROM products JOIN suppliers ON products.supplier= suppliers.id JOIN categories ON suppliers.category = categories.id WHERE categories.id = :id';
        const product = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id: id },
        });

        if (product.length === 0) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send(product[0]);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }

}

const getOneProduct = async (req, res) => {

    try {
        const id = req.params.id;
        const query = 'SELECT * FROM products WHERE id = :id';
        const product = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id: id },
        });

        if (product.length === 0) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send(product[0]);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }

}

// 4. update Product

const updateProduct = async (req, res) => {
    try {

        const updatedData = req.body;

        const query = `
            UPDATE products
            SET name = ?, price = ?, quantity = ?, benefit = ?,barecode = ?
            WHERE id = ?
        `;

        const [rowsUpdated, _] = await sequelize.query(query, {
            replacements: [updatedData.name, updatedData.price, updatedData.quantity, updatedData.benefit,updatedData.barecode, updatedData.id],
            type: sequelize.QueryTypes.UPDATE,
            returning: true,
        });

        if (rowsUpdated === 0) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send('Product updated successfully');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
}

// 5. delete product by id

const deleteProduct = async (req, res) => {

    try {
        const id = req.query.id;


        const deleteProductsQuery = 'DELETE FROM products WHERE id = ?';
        const rowsDeleted=await sequelize.query(deleteProductsQuery, {
            replacements: [id],
            type: sequelize.QueryTypes.DELETE,
        });

        if (rowsDeleted === 0) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send('Product is deleted!');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getAllSuppliers = async (req, res) => {
    try {
        const query = 'SELECT suppliers.*, categories.name AS category_name FROM suppliers INNER JOIN categories ON suppliers.category = categories.id';
        const suppliers = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT,nest: true });

        res.status(200).send(suppliers);
        console.log(suppliers)
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllCategories = async (req, res) => {
    try {
        const query = 'SELECT * FROM categories';
        const categories= await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        res.status(200).send(categories);
        console.log(categories)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
};
const addSupplier = async (req, res) => {
    let catid=0
    try {
        //


        const name_ = req.body.category;
        const query1 = 'SELECT * FROM categories WHERE name = :name';
        const id= await sequelize.query(query1, {
            type: sequelize.QueryTypes.SELECT,
            replacements: {name: name_},
        });

        if (id.length === 0) {
            const query2 = `
            INSERT INTO categories (name)
            VALUES (:name)
        `;

            // Execute the raw SQL query
            const cat_id = await sequelize.query(query2, {
                replacements: {name: name_},
                type: QueryTypes.INSERT,
                raw: true,
            });

            catid=cat_id[0]
        }else {catid=id[0].id}
        console.log('id', catid);
        //
        const { name,contact } = req.body;
        const query = `
            INSERT INTO suppliers (name,contact,category)
            VALUES (:name,:contact,:catid)
                `;

        const values = {name,contact,catid};

        // Execute the raw SQL query
        const [supplier] = await sequelize.query(query, {
            replacements: values,
            type: QueryTypes.INSERT,
            raw: true,
        });

        console.log('supplier:', supplier);

        res.status(200).json({supplier});

        // Send the product data as JSON
    } catch (error) {
        console.error('Error adding supplier:', error);
        res.status(500).send('Internal Server Error');
    }
};
const getCommandsOfSupplier = async (req, res) => {
    try {
        const id = req.query.id;
        const query = 'SELECT * FROM commands WHERE supplier= :id';
        const command = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
            replacements: { id: id },
        });

            res.status(200).send(command);

    } catch (error) {
        console.error('Error fetching commands:', error);
        res.status(500).send('Internal Server Error');
    }

}

const addCommand = async (req, res) => {
    let expid=0
    try {
        //


        const date = req.body.expdate;
        const query1 = 'SELECT * FROM expdates WHERE date = :date';
        const id= await sequelize.query(query1, {
            type: sequelize.QueryTypes.SELECT,
            replacements: {date: date},
        });

        if (id.length === 0) {
            const query2 = `
            INSERT INTO expdates (date)
            VALUES (:date)
        `;

            // Execute the raw SQL query
            const expdate_id = await sequelize.query(query2, {
                replacements: {date: date},
                type: QueryTypes.INSERT,
                raw: true,
            });

            expid=expdate_id[0]
        }else {expid=id[0].id}
        //console.log('id', id[0].id);
        //
        const { datetime,supplier } = req.body;
        const query = `
            INSERT INTO commands (datetime,supplier,expdate)
            VALUES (:datetime,:supplier,:expid)
                `;

        const values = {datetime, supplier,expid};

        // Execute the raw SQL query
        const [command] = await sequelize.query(query, {
            replacements: values,
            type: QueryTypes.INSERT,
            raw: true,
        });

        console.log('command:', command);

        res.status(200).json({command});


    } catch (error) {
        console.error('Error adding command:', error);
        res.status(500).send('Internal Server Error');
    }
};

const editSupplier = async (req, res) => {


        let catid=0
        try {
            //


            const _category = req.body.category;
            const query1 = 'SELECT * FROM categories WHERE name = :category';
            const id= await sequelize.query(query1, {
                type: sequelize.QueryTypes.SELECT,
                replacements: {category: _category},
            });
           console.log("id",id)
            if (id.length === 0) {
                const query2 = `
            INSERT INTO categories (name)
            VALUES (:_category)
        `;

                // Execute the raw SQL query
                const cat_id = await sequelize.query(query2, {
                    replacements: {_category: _category},
                    type: QueryTypes.INSERT,
                    raw: true,
                });

                catid=cat_id[0]
            }else {catid=id[0].id}


        const updated = req.body;

        const query = `
            UPDATE suppliers
            SET name = ?, contact = ?,category = ? WHERE id = ?`;

        const [rowsUpdated, _] = await sequelize.query(query, {
            replacements: [updated.name, updated.contact,catid,updated.id],
            type: sequelize.QueryTypes.UPDATE,
            returning: true,
        });

        if (rowsUpdated === 0) {
            res.status(404).send('Supp not found');
        } else {
            res.status(200).send('Supp updated successfully');
        }
    } catch (error) {
        console.error('Error updating supplier:', error);
        res.status(500).send('Internal Server Error');
    }}

const deleteSupplier = async (req, res) => {

    try {
        const id = req.query.id;
        console.log("id",id)
        const deleteSupplierQuery = 'DELETE FROM suppliers WHERE id = :id';
        const rowsDeleted=await sequelize.query(deleteSupplierQuery, {
            replacements: {id: id},
            type: sequelize.QueryTypes.DELETE,
        });

        if (rowsDeleted === 0) {
            res.status(404).send('Supplier not found');
        } else {
            res.status(200).send('Supplier  is deleted!');
        }
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).send('Internal Server Error');
    }
}

const addProductGroups = async (req, res) => {
    const productgroupList = req.body;
    try {
        // Assuming productList is an array of product objects
        const query = `
      INSERT INTO productgroups (quantity, product, command)
      VALUES ${productgroupList.map(productgroups => `('${productgroups.quantity}', ${productgroups.product}, ${productgroups.command})`).join(', ')};
    `;

        await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });

        res.json({ message: 'Product group successfully inserted.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}



// 6. get published product

/*const getPublishedProduct = async (req, res) => {

    try {
        const query = 'SELECT * FROM products where published = True';
        const publishedProducts = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        res.status(200).send(publishedProducts);
        console.log(publishedProducts)
    } catch (error) {
        console.error('Error fetching published products:', error);
        res.status(500).send('Internal Server Error');
    }

}*/

// 7. connect one to many relation Product and Reviews

/*const getProductReviews =  async (req, res) => {

    try {
        const id = req.params.id;

        const query = `
            SELECT products.*, reviews.*
            FROM products
            INNER JOIN reviews ON products.id = reviews.product_id
            WHERE products.id = :id
        `;

        const data = await sequelize.query(query, {
            replacements: { id: id },
            type: sequelize.QueryTypes.SELECT,
            nest: true, //nested structure with reviews
        });

        res.status(200).send(data);
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        res.status(500).send('Internal Server Error');
    }

}*/







module.exports = {
    addProductGroups,
    getCommandsOfSupplier,
    getAllCategories,
    getAllSuppliers,
    deleteSupplier,
    editSupplier,
    addCommand,
    addSupplier,
    getProductOfCategory,
    getProductOfBarcode,
    getProductOfSupp,
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    //getOneProduct,

    //getPublishedProduct,
    //getProductReviews,
    
}