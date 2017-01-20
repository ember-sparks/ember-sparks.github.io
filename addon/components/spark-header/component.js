import Ember from 'ember';
const $ = Ember.$;

import layout from './template';
import styles from './styles';

/*
 * Turn header transparent after scrolling
 * down a few pixels:
 */
const HEADER_OFFSET = 60;

export default Ember.Component.extend({
  layout,
  styles,

  tagName: 'nav',
  localClassNames: 'nav',
  localClassNameBindings: [
    'isSmall',
    'invert',
    'showComponents',
  ],

  isSmall: false,
  componentsTitle: "More components",
  showComponents: false,

  invertLogoColors: Ember.computed('isSmall', 'invert', function() {
    return !this.get('isSmall') && !this.get('invert');
  }),

  githubURL: Ember.computed('config', function() {
    return this.get('config.githubURL');
  }),

  _scrollListener: null,

  didInsertElement() {
    this._scrollListener = Ember.run.bind(this, this.didScroll);

    $(window).on('scroll', this._scrollListener);
  },

  willDestroyElement() {
    if (this._scrollListener) {
      $(window).off('scroll', this._scrollListener);
    }
  },

  didScroll() {
    let scrollPos = $(window).scrollTop();

    let reachedOffset = (scrollPos > HEADER_OFFSET);

    this.set('isSmall', reachedOffset);
  },

  /*
   * Determine if the user is on a touch device:
   */
  hasTouch: Ember.computed(function() {
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  }),

  actions: {
    toggleComponents(value) {
      let hasTouch = this.get('hasTouch');

      if (value !== undefined && hasTouch) {
        // Hover is only for non-touch devices:
        return;
      }

      if (value !== undefined) {
        this.set('showComponents', value);
      } else {
        this.toggleProperty('showComponents');
      }
    },
  },
});
