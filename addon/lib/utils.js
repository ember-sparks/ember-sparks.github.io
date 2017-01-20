export function getStrBetweenChars(str, firstChar, secondChar) {
  var startPos = str.indexOf(firstChar) + firstChar.length;
  var endPos = str.indexOf(secondChar, startPos);
  var newStr = str.substring(startPos, endPos);
  return newStr.trim();
}

export function dashToCamelCase(str) {
  return str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
}

