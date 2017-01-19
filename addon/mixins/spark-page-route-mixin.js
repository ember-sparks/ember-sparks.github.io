import Ember from 'ember';
import { 
  getProperties,
  getActions,
  getTheming,
  getTitle,
  getDesc,
} from './html-to-json';

import md from 'npm:markdown-it';

export default Ember.Mixin.create({
  ajax: Ember.inject.service(),

  /*
   * Fetch data from the README.md file
   * and convert it to JS objects:
   */
  model() {
    return Ember.RSVP.hash({
      readme: this.get('ajax').request('/README.md', {
        dataType: 'text',
      }),
      npm: this.get('ajax').request('/package.json'),
    })
    .then((data) => {
      let readMeHtml = md().render(data.readme);
      let npmData    = data.npm;

      let json = {};
      json.name       = getTitle(readMeHtml);
      json.desc       = getDesc(readMeHtml);
      json.properties = getProperties(readMeHtml);
      json.actions    = getActions(readMeHtml);
      json.theming    = getTheming(readMeHtml);

      json.author     = npmData.author;

      return json;
    })
    .catch((err) => {
      console.error(err);
    });
  },

});
