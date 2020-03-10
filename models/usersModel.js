const db = require('./conn'),
    bcrypt = require('bcryptjs');

class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    //instance method
    checkPassword(hashedPassword) {
        // checks entered password against hashed password
        return bcrypt.compareSync(this.password, hashedPassword);
        
    }

    //instance method
    async addUser() {
        //every async / await needs try/catch
        try {
            //RETURNING id => db.one needs to return one thing
            const response = await db.one('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
            [this.first_name, this.last_name, this.email, this.password]);
            return response;

        } catch (error) { 

            return error.message;

        };
    };

    //instance method
    async login() {
        try {
            const response = await db.one(`SELECT id, first_name, last_name, password FROM users WHERE email=$1;`, [this.email]);

            const isValid = this.checkPassword(response.password);

            if (!!isValid) {
                const { id, first_name, last_name } = response;
                return { isValid, user_id: id, first_name, last_name };
            } else {
                console.log('GO AWAY!!!');
            }
        } catch (error) {
            console.log('error :', error);
            return error
        }
    }
};

module.exports = User;