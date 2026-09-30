const fs = require('fs/promises');
const path = require('path');

const filepath = path.join(__dirname, '..', 'db.json');

async function readData() {
    const data = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

async function delayReadData() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return await readData();
}

async function getAll() {
    return await delayReadData();
}

async function getById(id) {
    const products = await readData();
    return products.find((item) => item.id === id);
}

async function create(productData) {
    const products = await readData();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id || 0)) + 1 : 1;
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await writeData(products);
    return newProduct;
}

async function update(id, productData) {
    const products = await readData();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { id, ...productData };
    await writeData(products);
    return products[index];
}

async function patch(id, updates) {
    const products = await readData();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    await writeData(products);
    return products[index];
}

async function remove(id) {
    const products = await readData();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return false;
    const [deleted] = products.splice(index, 1);
    await writeData(products);
    return deleted;
}

module.exports = {
    readData,
    writeData,
    delayReadData,
    getAll,
    getById,
    create,
    update,
    patch,
    remove
};
