const copy = require('recursive-copy');

/* eslint-disable no-console */
copy('src', 'lib', {
    overwrite: true,
    filter: [/^((?!(stories|tests)).)*\.js$/gm],
    rename: filePath => `${filePath}.flow`
})
    .then(results => {
        console.info(`${results.length} flow file(s) copied`);
    })
    .catch(error => {
        return console.error(`Copy flow failed: ${error}`);
    });
/* eslint-enable no-console */
