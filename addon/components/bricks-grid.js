import Component from '@ember/component';
import {computed, observer} from '@ember/object';
import {assign} from '@ember/polyfills';
import Bricks from 'bricks';
import { tryInvoke } from '@ember/utils';
import layout from '../templates/components/bricks-grid';

export default Component.extend({
  layout,

  packed: 'packed',
  position: true,
  fullReload: false,
  resize: true,
  isPacked: false,

  _sizes: computed('sizes', function() {
    return this.get('sizes') || [
      { columns: 2, gutter: 10 }
    ];
  }),

  gridContainer: computed(function() {
    return this.element.querySelector('.bricks-container');
  }),

  _brickInstance: undefined,
  brickInstance: computed(function() {
    return this._brickInstance || this.instantiate();
  }),

  repackByOptions: observer('_sizes.[]', function() {
    this.disable();
    this.instantiate();
  }),

  disable() {
    const brickInstance = this.get('brickInstance');

    if (brickInstance) {
      brickInstance.off('pack');
      brickInstance.off('update');
      brickInstance.off('resize');
    }
  },

  instantiate() {
    const {
      position,
      packed,
      _sizes,
      resize
    } = this.getProperties(
      'position',
      'packed',
      '_sizes',
      'resize'
    );

    const instance = Bricks({
      container: this.get('gridContainer'),
      position,
      packed,
      sizes: _sizes.map((s) => assign({}, s, {
        columns: Number(s.columns),
        gutter: Number(s.gutter),
      })),
    });

    instance.on('pack', () => tryInvoke(this, 'pack'));
    instance.on('update', () => tryInvoke(this, 'update'));
    instance.on('resize', size => tryInvoke(this, 'resize', [size]));
    instance.resize(resize);

    this.set('_brickInstance', instance);

    instance.pack();

    return instance;
  },

  repack() {
    const {
      fullReload,
      brickInstance,
      isPacked,
      isDestroyed,
    } = this.getProperties(
      'brickInstance',
      'fullReload',
      'isPacked',
      'isDestroyed'
    );

    if (!brickInstance || isDestroyed) {
      return;
    }

    if (fullReload || !isPacked) {
      brickInstance.pack();

      this.set('isPacked', true);
    } else {
      brickInstance.update();
    }
  },
});
