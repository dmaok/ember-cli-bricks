import Item from './item';

export default Item.extend({
  didInsertElement() {
    this._super(...arguments);
    const img = this.element.querySelector('img');

    if (!img) return;

    img.onload = () => {
      if (!this.get('isDestroyed')) {
        this.repack();
      }
    };

    this.repack();
  }
});
