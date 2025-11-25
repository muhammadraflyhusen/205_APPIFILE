const db = require('../models');

async function connectDataBase() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await db.sequelize.sync();
        console.log('Database synchronized');

    } catch (err) {
        console.error(' Database connection failed:', err.message);
        process.exit(1);
    }   
}

module.exports = connectDataBase;