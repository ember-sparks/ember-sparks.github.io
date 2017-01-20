import Ember from 'ember';

const AUTHOR = "Tristan Edwards <tristan.edwards@me.com> (http://tristanedwards.me)";
const REPO   = "https://github.com/ember-sparks/ember-sparks";

export default Ember.Route.extend({

  model() {
    return {
      author: AUTHOR,
      githubURL: REPO,
    };
  },

});
