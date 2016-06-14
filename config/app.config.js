const path = require('path');
const CONFIG = require('./env.config');
module.exports = {
    ALL: {
        src: [path.join(CONFIG.src, CONFIG.files),
            CONFIG.typescripts
        ],
        dist: CONFIG.dist,
        test: path.join(CONFIG.dist, CONFIG.testFiles),
        lint_src: path.join(CONFIG.src, CONFIG.files)
    },
    BASIC_INVENTORY: {
        src: [path.join(CONFIG.src, 'basic-inventory', CONFIG.files),
            CONFIG.typescripts
        ],
        dist: path.join(CONFIG.dist, 'basic-inventory'),
        test: path.join(CONFIG.dist, 'basic-inventory', CONFIG.testFiles),
        src_lint: path.join(CONFIG.src, 'basic-inventory', CONFIG.files)
    },
    SERVER: {
        main: path.join(CONFIG.dist, 'index.js')
    }
}