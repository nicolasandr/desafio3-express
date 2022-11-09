const fs = require('fs').promises;

class Contenedor {
    constructor(path) {
        this.path = path;
    }

    async save(objeto) {
        try {
            const leer = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(leer);
            let id;
            data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
            const newProduct = { ...objeto, id };
            data.push(newProduct);
            await fs.writeFile(
                this.path,
                JSON.stringify(data, null, 2),
                'utf-8'
            );
            return newProduct.id;
        } catch (e) {
            console.log(e);
        }
    }
    async getById(id) {
        try {
            const leer = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(leer);
            const obj = data.find((obj) => obj.id === id);
            if (!obj) {
                return null;
            }
            return obj;
        } catch (e) {
            console.log(e);
        }
    }

    async getAll() {
        const leer = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(leer);
    }
    async deleteById(id) {
        try {
            const leer = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(leer);
            const obj = data.map((obj, index) => {
                if (obj.id === id) {
                    //elimina un elemento del array data que se encuentra en la posicion
                    //del id enviado por parametro.
                    data.splice(index, 1);
                }
            });
            console.log(obj.length);

            if (obj.length === data.length) {
                console.log(
                    'no se encontro el id,no se pudo eliminar el objeto'
                );
                return null;
            } else {
                await fs.writeFile(
                    this.path,
                    JSON.stringify(data, null, 2),
                    'utf-8'
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2), 'utf-8');
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = Contenedor;
