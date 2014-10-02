var basePath = __dirname + "/..",
    binPath = basePath + "/bin",
    tmpPath = basePath + "/tmp",
    src  = basePath + '/src',
    libs  = basePath + '/libs',
    dest = basePath + "";

module.exports = {
  server: {
    port: 8000
  },
  gulp: {
    less: {
      src: src + "/less"
    },
    css: {
      src: dest + "/css",
      dest: dest + "/css"
    },
    images: {
      src: src + "/img",
      dest: dest + "/img"
    },
    js: {
      //src: src + "/js",
      pluginsrc: dest + "/js/vendor",
      dest: dest + "/js"
    },
    templates: {
      src: src + "/templates",
      dest: dest + ""
    }
  },
  libs: {
    html5boilerplate: libs + "/html5boilerplate",
    bootstrap: libs + "/bootstrap"
  },
  tmp: {
    path: tmpPath,
    longpoll: tmpPath + '/longpolldate'
  }
}