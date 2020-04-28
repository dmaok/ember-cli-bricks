import Component from '@ember/component';
import { next, schedule } from '@ember/runloop';
import layout from '../../templates/components/bricks-grid/item';

export default Component.extend({
  layout,

  didInsertElement() {
    this._super(...arguments);
    this.repack();
  },

  willDestroyElement() {
    this._super(...arguments);
    next(() => schedule('afterRender', () => this.repack()));
  }
});
