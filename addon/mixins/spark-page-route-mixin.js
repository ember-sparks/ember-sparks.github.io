import Ember from 'ember';
import { 
  getProperties,
  getActions,
  getTheming,
  getTitle,
  getDesc,
} from '../lib/html-to-json';

import {
  getGithubURL,
} from '../lib/parse-packagejson';

import md from 'npm:markdown-it';

export default Ember.Mixin.create({
  ajax: Ember.inject.service(),

  /*
   * Fetch data from the README.md file
   * and convert it to JS objects:
   */
  model() {
    const config = Ember.getOwner(this).resolveRegistration('config:environment');

    /*
     * This is mostly for GitHub pages to work:
     */
    let namespace;
    let rootURL = config && config.rootURL;

    if (rootURL) {
      namespace = rootURL;
    }

    return Ember.RSVP.hash({
      readme: this.get('ajax').request('README.md', {
        dataType: 'text',
        namespace,
      }),
      npm: this.get('ajax').request('package.json', {
        namespace,
      }),
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
      json.githubURL  = getGithubURL(npmData.repository);

      return json;
    })
    .catch((err) => {
      console.error(err);
    });
  },

});
