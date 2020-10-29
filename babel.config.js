module.exports = {
    babelrcRoots: [
        '.',
        'static/project-b/*'
    ],
    presets: [
        ['@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ]
    ],
    plugins: ['@babel/plugin-proposal-class-properties']

};
