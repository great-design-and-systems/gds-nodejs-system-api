const path = require('path');
const CONFIG = require('./env.config');
module.exports = {
    ALL: {
        src: path.join(CONFIG.src, CONFIG.files),
        dist: CONFIG.dist
    },
    BASIC_INVENTORY: {
        src: path.join(CONFIG.src, 'basic-inventory', CONFIG.files),
        dist: path.join(CONFIG.dist, 'basic-inventory')
    }
}