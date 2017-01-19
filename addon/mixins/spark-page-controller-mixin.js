import Ember from 'ember';

import env from 'dummy/config/environment';

const initDemo = env.sparks && env.sparks.demo;

export default Ember.Mixin.create({

  /* styleClasses comes from blueprint */

  config: Ember.computed('demo', 'model', 'styleClasses', function() {
    let config = this.get('model');
    let demo = this.get('demo');
    let styleClasses = this.get('styleClasses');

    if (config) {
      config.demo = demo;
    }

    if (styleClasses) {
      config.styleClasses = styleClasses;
    }

    return config;
  }),

  demo: initDemo,

});
