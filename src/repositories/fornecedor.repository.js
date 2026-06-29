import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS fornecedor(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cnpj TEXT NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )
`);

function findAllFornecedorRepository() {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM fornecedor`,
            [],
            (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}

function findFornecedorByIdRepository(id) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT
                *
            FROM fornecedor
            WHERE id = ?`,
            [id],
            (error, row) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

function createFornecedorRepository(novoFornecedor) {

    return new Promise((resolve, reject) => {

        const {
            cnpj,
            nome,
            email
        } = novoFornecedor;

        db.run(
            `INSERT INTO fornecedor(cnpj, nome, email)
             VALUES (?, ?, ?)`,
            [cnpj, nome, email],
            function(error) {

                if (error) {
                    reject(error);
                } else {

                    resolve({
                        id: this.lastID
                    });

                }

            }
        );

    });

}

function updateFornecedorRepository(id, fornecedor) {

    return new Promise((resolve, reject) => {

        const {
            cnpj,
            nome,
            email
        } = fornecedor;

        db.run(
            `UPDATE fornecedor
             SET
                cnpj = ?,
                nome = ?,
                email = ?
             WHERE id = ?`,
            [cnpj, nome, email, id],
            (error) => {

                if (error) {
                    reject(error);
                } else {

                    resolve({
                        id,
                        ...fornecedor
                    });

                }

            }

        );

    });

}

function deleteFornecedorRepository(id) {
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM fornecedor WHERE id = ?`,
            [id],
            (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        message: "Fornecedor excluído com sucesso."
                    })
                }
            }
        )
    })
}

export default {
    findAllFornecedorRepository,
    findFornecedorByIdRepository,
    createFornecedorRepository,
    updateFornecedorRepository,
    deleteFornecedorRepository
}