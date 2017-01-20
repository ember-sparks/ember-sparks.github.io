import {
  getStrBetweenChars,
} from './utils';

export function getGithubURL(obj) {
  if (!obj) {
    return;
  }

  let url = obj;

  if (typeof obj === "object") {
    url = obj.url;
  }

  return parseGithubURL(url);
}

function parseGithubURL(url) {
  let protocolHint = url.substring(0, 3);

  if (protocolHint === "git") {
    // git@github.com...
    return buildLinkFromGitURL(url);
  } else {
    // https://github.com...
    return url;
  }
}

function buildLinkFromGitURL(url) {
  let owner = getStrBetweenChars(url, ":", "/");
  let repo  = getStrBetweenChars(url, "/", ".");

  return `https://github.com/${owner}/${repo}`;
}

