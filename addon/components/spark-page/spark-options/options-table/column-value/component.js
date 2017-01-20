import Ember from 'ember';

import layout from './template';
import styles from './styles';

export default Ember.Component.extend({
  layout,
  styles,

  tagName: '',

  hasCSS: Ember.computed('columnValue', 'isDemo', function() {
    let isDemo = this.get('isDemo');
    let cssValues = this.get('columnValue');
    let hasCSS = Object.keys(cssValues);

    return isDemo && hasCSS;
  }),

  styleClasses: Ember.computed('config.styleClasses', function() {
    return this.get('config.styleClasses');
  }),

  isCSSClass: Ember.computed('title', 'name', function() {
    let title = this.get('title');
    let name = this.get('name');

    return (title === "theming" && name === "name");
  }),

  /*
   * We want class names to have a "."
   * prepended to them for clarity:
   */
  columnValue: Ember.computed('value', 'isCSSClass', function() {
    let isCSSClass = this.get('isCSSClass');
    let value = this.get('value');

    // Don't show a "null" string, just keep the field empty:
    if (value === "null") {
      value = null;
    }

    return (isCSSClass) ? `.${value}` : value;
  }),

  isDemo: Ember.computed('name', function() {
    return this.get('name') === 'demo';
  }),

});

