import Item from './item';

export default class Image extends Item {
  didInsertElement() {
    super.didInsertElement(...arguments);

    const img = this.element.querySelector('img');
    if (!img) return;

    img.onload = () => {
      if (!this.get('isDestroyed')) {
        this.repack();
      }
    };
    this.repack();
  }
}
