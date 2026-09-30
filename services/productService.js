const db = require('../database/db');

async function getAllProducts() {
    return await db.getAll();
}

async function getProductById(id) {
    return await db.getById(id);
}

async function createProduct(productData) {
    return await db.create(productData);
}

async function updateProduct(id, productData) {
    return await db.update(id, productData);
}

async function patchProduct(id, updates) {
    return await db.patch(id, updates);
}

async function deleteProduct(id) {
    return await db.remove(id);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
