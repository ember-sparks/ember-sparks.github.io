import Ember from 'ember';

import layout from './template';
import styles from './styles';

export default Ember.Component.extend({
  layout,
  styles,

  localClassNames: 'option',

  typeOfValue: Ember.computed(function() {
    let value = this.get('value');
    return typeof value;
  }),

  valueIsBoolean: Ember.computed('typeOfValue', function() {
    let type = this.get('typeOfValue');
    return type === "boolean";
  }),

  valueDidChange: Ember.observer('value', function() {
    let key = this.get('key');
    let value = this.get('value');

    this.attrs.didUpdate(key, value);
  }),

  actions: {
    toggleBoolValue() {
      this.toggleProperty('value');
    },
  },

});

