import Ember from 'ember';

import layout from './template';
import styles from './styles';

const COMPONENT_NAMES = [
  "input-spark",
  "button-spark",
  "modal-spark",
];

export default Ember.Component.extend({
  layout,
  styles,

  localClassNames: 'bg',

  localClassNameBindings: [
    'show',
  ],

  sparkComponents: COMPONENT_NAMES,
});
