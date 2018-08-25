// keys.js - return correct set of keys depending on the environment (Development, Production)

if(process.env.NODE_ENV === 'production'){
    // production environment detected
    module.exports = require('./prod');
} else {
    // must be development environment
    module.exports= require('./dev');
}