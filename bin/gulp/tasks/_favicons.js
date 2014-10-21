var favicons = require('favicons');

favicons({
    // I/O
    source: 'logo.png',
    dest: 'images',

    // Icon Types
    android: true,
    apple: true,
    coast: true,
    favicons: true,
    firefox: true,
    opengraph: true,
    windows: true,

    // Miscellaneous
    html: null,
    background: '#1d1d1d',
    tileBlackWhite: false,
    manifest: null,
    trueColor: false,
    url: null,
    logging: false,
    callback: null
});
