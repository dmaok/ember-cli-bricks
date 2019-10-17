import Component from '@ember/component';
import { next, schedule } from '@ember/runloop';
import layout from '../../templates/components/bricks-grid/item';

export default class Item extends Component {
  layout = layout;

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.repack();
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    next(() => schedule('afterRender', () => this.repack()));
  }
}
