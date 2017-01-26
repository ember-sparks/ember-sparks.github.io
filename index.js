/* jshint node: true */
'use strict';

/*
 * PostCSS plugins
 * (for Spark pages)
 */
var nesting = require('postcss-nesting');
var autoprefixer = require('autoprefixer');

// For copying public assets:
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-sparks-web',

  /*
  isDevelopingAddon: function() {
    return true;
  },
  */

  googleFonts: [
    'Lato:100,300,400',
    'Inconsolata:400'
  ],

  /*
   * Add this addon's public assets to the project's public dir:
   */
  treeForPublic: function(tree) {
    let projPublicPath = tree._directoryPath;

    var assetsTree = new Funnel(projPublicPath);
    return mergeTrees([tree, assetsTree], {
      overwrite: true
    });
  },

  options: {
    cssModules: {
      plugins: [
        nesting(),
        autoprefixer('last 2 versions'),
      ]
    },
  },

};
