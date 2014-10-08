var path = require("path"),
    basePathRel = "..",
    relPaths = {
      base: basePathRel,
      bin: basePathRel + '/bin',
      tmp: basePathRel + '/tmp',
      src: basePathRel + '/src',
      libs: basePathRel + '/libs',
      dest: basePathRel
    },
    paths = {};

for (var key in relPaths) {
  if (relPaths.hasOwnProperty(key)) {
    paths[key] = path.resolve(__dirname, relPaths[key]);
  }
}

module.exports = {
  server: {
    host: "localhost",
    port: 8000,
    basePath: paths.base
  },
  gulp: {
    less: {
      watch: relPaths.src + "/less/**/*.less",
      files: "/main.less",
      src: paths.src + "/less",
      dest: paths.dest + "/css",
      filename: "main.css"
    },
    images: {
      watch: relPaths.src + "/img/**/*",
      files: "/**/*",
      src: paths.src + "/img",
      dest: paths.dest + "/img"
    },
    templates: {
      watch: relPaths.src + "/templates/**/*",
      files: "/*.jade",
      src: paths.src + "/templates",
      dest: paths.dest + ""
    },
    plugins: {
      watch: relPaths.base + "/js/vendor/**/*",
      files: [
        "/plugins.js",
        "/*.min.js",
        "/!jquery-*.js",
        "/!modernizr-*.js",
        "/fotorama.js",
        "/fastclick.js"
      ],
      src: paths.dest + "/js/vendor",
      dest: paths.dest + "/js",
      filename: "plugins.js"
    },
    jsmin: {
      files: [
        "/*.js",
        "/!*.min.js"
      ],
      paths:"js"
    },
  	csscompile: {
      files: [
  	    "/normalize.css",
    		//"/vendor/fancybox/jquery.fancybox.css",
    		"/bp-begin.css",
    		"/main.css",
    		"/bp-tail.css"
  	  ],
  	  paths:"css",
      filename: "app.min.css"
  	},
    js: {
      src: paths.dest + "/js",
      dest: paths.dest + "/js"
    },
    css: {
      src: paths.dest + "/css",
      dest: paths.dest + "/css"
    },
    jshint: {
      files:[
        '/../bin/gulpfile.js',
        '/../bin/config.js',
        '/main.js'/*,
        '/*.js',
        '/!*.min.js'*/
      ],
      paths:"js"
    },
    uglify: {
      files: [
        "/*.js",
        "!/*.min.js"
      ],
      paths:"js"
    },
    uglifyapp: {
      depends: ["uglify"],
      files: [
        "/plugins.min.js",
        "/main.min.js"/*,
        "/!*.min.js"*/
      ],
      paths:"js",
      filename: "app.min.js"
    }
  },
  // libs: {
  //   html5boilerplate: paths.libs + "/html5boilerplate",
  //   bootstrap: paths.libs + "/bootstrap"
  // },
  tmp: {
    path: paths.tmp,
    lastUpdate: paths.tmp + '/lastupdate'
  }
};
