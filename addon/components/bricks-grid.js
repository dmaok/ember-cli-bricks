import Component from '@ember/component';
import {computed} from '@ember/object';
import {assign} from '@ember/polyfills';
import Bricks from 'bricks';
import template from '../templates/components/bricks-grid';
import { layout } from '@ember-decorators/component';
import {observes} from '@ember-decorators/object';

export default @layout(template)
class BrickGrid extends Component {
  packed = 'packed';
  resize = true;
  position = true;
  isPacked = false;
  instance = null;
  fullReload = false;

  sizes = (() => [{columns: 2, gutter: 10}])();

  @computed()
  get gridContainer() {
    return this.element.querySelector('.bricks-container');
  }

  @computed()
  get brickInstance() {
    return this.instance || this.instantiate();
  }
  set brickInstance(value) {
    this.instance = value;
  }

  @observes('sizes.[]')
  repackByOptions() {
    this.disable();
    this.instantiate();
  }

  disable() {
    const brickInstance = this.get('brickInstance');

    if (brickInstance) {
      brickInstance.off('pack');
      brickInstance.off('update');
      brickInstance.off('resize');
    }
  }

  instantiate() {
    const {
      position,
      packed,
      sizes,
      resize
    } = this.getProperties(
      'position',
      'packed',
      'sizes',
      'resize'
    );

    const instance = Bricks({
      container: this.get('gridContainer'),
      position,
      packed,
      sizes: sizes.map((s) => assign({}, s, {
        columns: Number(s.columns),
        gutter: Number(s.gutter)
      }))
    });

    instance.on('pack', () => {
      if (typeof this.pack === 'function') this.pack();
    });
    instance.on('update', () => {
      if (typeof this.update === 'function') this.update();
    });
    instance.on('resize', size => {
      if (typeof this.resize === 'function') this.resize(size);
    });
    instance.resize(resize);

    this.set('brickInstance', instance);

    instance.pack();

    return instance;
  }

  repack() {
    const {
      fullReload,
      brickInstance,
      isPacked,
      isDestroyed
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
  }
}
