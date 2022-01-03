const fs = require('fs');
const path = require('path');
const bcrypt = require ('bcrypt')

let model = function(tableName) {
    return {
        filePath: path.join(__dirname, '../database/' + tableName + '.json'),
        readFile() {
            let fileContents = fs.readFileSync(this.filePath, 'utf8');
        
            if(fileContents) {
                return JSON.parse(fileContents);
            }
        
            return [];
        },
        writeFile(contents) {
            let fileContents = JSON.stringify(contents, null, " ");
            fs.writeFileSync(this.filePath, fileContents);
        },
        nextId() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            if (lastRow) {
                return ++lastRow.id;
            }

            return 1;
        },
        all() {
            return this.readFile();
        },
        find(id) {
            let rows = this.readFile();
            return rows.find(row => row.id == id)
        },
        createUser(row, req) {
            let rows = this.readFile();
            row.id = this.nextId();
            row.validarPassword = this.ignore();
            row.avatar =req.file ? req.file.filename : 'sr-x.jpg';
            row.password = this.encrypt(row.password);
            rows.push(row);

            this.writeFile(rows);

            return row.id;
        },
        createProduct(row, req) {
            let rows = this.readFile();
            row.id = this.nextId();
            row.image = req.file ? req.file.filename : 'img-rick-morty.jpg';
            row.isOffer = req.body.isOffer? req.body.isOffer == 'ofertado' ? true : false : false;
            row.discount = req.body.discount ? parseInt(req.body.discount) : 0;

            rows.push(row);

            this.writeFile(rows);

            return row.id;
        },
        encrypt(password){
            return bcrypt.hashSync(password,10);
        },
        ignore(){
            //ignore one row
        },
        updateProduct(row, req, keepImage, IdProduct) {
            let rows = this.readFile();
            row.id = IdProduct;
            row.image = req.file ? req.file.filename : `${keepImage}`;
            row.isOffer = req.body.isOffer? req.body.isOffer == 'ofertado' ? true : false : false;
            row.discount = req.body.discount ? parseInt(req.body.discount) : 0;

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            }); 

            this.writeFile(updatedRows);

            return row.id;
        },
        updateUser(row, req, keepImage, Iduser) {
            let rows = this.readFile();
            row.id = Iduser;
            row.validarPassword = this.ignore();
            row.avatar =req.file ? req.file.filename : `${keepImage}`;
            row.password = this.encrypt(row.password);

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            }); 

            this.writeFile(updatedRows);

            return row.id;
        },
        delete(id) {
            let rows = this.readFile();
            let updatedRows = rows.filter(oneRow => oneRow.id != id); 

            this.writeFile(updatedRows);
        }
    }
}

module.exports = model;