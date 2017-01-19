import Ember from 'ember';

import layout from './template';
import styles from './styles';

export default Ember.Component.extend({
  layout,
  styles,

  localClassNames: 'footer',

  authorData: Ember.computed('config', function() {
    return this.get('config.author');
  }),

  authorName: Ember.computed('authorData', function() {
    /*
     * Get only the name, not website link or email:
     */
    let npmRegex = /[^(<]*/g;

    let authorData = this.get('authorData');
    let authorNameList = npmRegex.exec(authorData);

    let authorName = authorNameList && authorNameList[0];

    if (authorName === "undefined") {
      return null;
    }

    return authorName;
  }),

  authorLink: Ember.computed('authorData', function() {
    // Get only the author's website (if there is one):
    let linkRegex = /\((.*?)\)/g;

    let authorData = this.get('authorData');
    let authorLink = linkRegex.exec(authorData);

    if (!authorLink) {
      return false; 
    }

    return authorLink[1];
  }),

});

