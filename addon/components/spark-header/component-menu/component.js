import Ember from 'ember';

import layout from './template';
import styles from './styles';

// Offline backup:
import COMPONENT_NAMES from 'ember-sparks-web/sparks-list';

const DOMAIN = 'http://ember-sparks.com/';

export default Ember.Component.extend({
  layout,
  styles,

  localClassNames: 'bg',

  localClassNameBindings: [
    'show',
  ],

  ajax: Ember.inject.service(),

  willInsertElement() {
    this.get('ajax').request(DOMAIN + 'SPARK_LIST.json')
    .then((components) => {
      this.set('sparkComponents', components);
    })
    .catch((err) => {
      console.error("Couldn't fetch list of components", err);
    });
  },

  domain: DOMAIN,
  sparkComponents: COMPONENT_NAMES,
});
