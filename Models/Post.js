const db = require('./db.js')

const Post = db.sequelize.define('usuarios', {
    name: {type: db.Sequelize.STRING},
    email: {type: db.Sequelize.STRING},
    username: {type: db.Sequelize.STRING},
    password: {type: db.Sequelize.STRING}
});

module.exports = Post