const productService = require('../services/productService');

async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        return res.json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createProduct(req, res) {
    try {
        const newProduct = await productService.createProduct(req.body);
        return res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const updated = await productService.updateProduct(id, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function patchProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const patched = await productService.patchProduct(id, req.body);
        if (!patched) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(patched);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const deleted = await productService.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json({ message: 'Product deleted successfully', product: deleted });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
