function isDelimiter(char) {
  return char === '.'
    || char === '['
    || char === ']';
}

function noop() {
  return;
}

/*
foo.bar[0] -> ['foo', 'bar', '0']
foo[0].bar -> ['foo', '0', 'bar']
*/
export default function parsePath(path) {
  const resultArr = [];
  let lastChar = '';

  let chunk = '';

  for (let i = 0; i < path.length; i++) {
    // If current char is a delimiter and the previous char ISN'T
    // a delimiter, push the current text chunk to results array.
    // This prevents setting chunks as empty strings in the case of
    // "]." situations.
    if (isDelimiter(path[i]) && !isDelimiter(path[i - 1])) {
      resultArr.push(chunk);
      chunk = '';

    // We have a delimiter that was preceded by another delimiter.
    } else if (isDelimiter(path[i])) {
      noop();
    
    // We're at the end of the string
    } else if (i === path.length - 1) {
      chunk += path[i];
      resultArr.push(chunk);

    // Build the chunk
    } else {
      chunk += path[i];
    }
  }

  return resultArr;
}
