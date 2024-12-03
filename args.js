module.exports = (filters) => {
    let args = {};
    let argv = process.argv;
    argv.shift();
    argv.shift();

    argv.forEach((e, i) => {
        e = e.replace('--', '');

        if (filters.includes(e))
            args[e] = argv[i+1];
    });

    return args;
};