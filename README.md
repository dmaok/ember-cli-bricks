# ember-cli-bricks

`ember-cli-bricks` wrapper around [bricks.js](http://callmecavs.com/bricks.js/)
and is a blazing fast masonry layout generator for fixed width elements for Ember.js.

How to use:
```es6
{{#bricks-grid as | grid |}}
  <!-- for using brick-div with some styles, use `item` namespace  -->
  {{#grid.item class="simple-brick"}}
    Hello, simple brick
  {{/grid.item}}

  <!-- for using brick with image, use `image namespace` -->
  {{#grid.item class="simple-image-brick"}}
    <img src="/path/to/image" />
  {{/grid.item}}
{{/bricks-grid}}
```

Installation
------------------------------------------------------------------------------

* `git clone <repository-url>` this repository
* `cd ember-cli-bricks`
* `npm install`


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
