'use strict';

let path = require('path');
let Funnel = require('broccoli-funnel');
let MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    let vendor = this.treePaths.vendor;

    app.import(vendor + '/bricks.js', { prepend: true });
    app.import(vendor + '/shims/bricks-shim.js');
  },

  treeForVendor(vendorTree) {
    let momentTree = new Funnel(path.join(this.project.root, 'node_modules', 'bricks.js', 'dist'), {
      files: ['bricks.js']
    });

    return new MergeTrees([vendorTree, momentTree]);
  },
};
