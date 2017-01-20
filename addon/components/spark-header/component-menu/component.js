import Ember from 'ember';

import layout from './template';
import styles from './styles';

import COMPONENT_NAMES from 'ember-sparks-web/sparks-list';

const DOMAIN = 'http://ember-sparks.com/';

export default Ember.Component.extend({
  layout,
  styles,

  localClassNames: 'bg',

  localClassNameBindings: [
    'show',
  ],

  domain: DOMAIN,
  sparkComponents: COMPONENT_NAMES,
});
