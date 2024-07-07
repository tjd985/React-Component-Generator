function getIndent(line: string) {
  let indent = 0;

  for (const char of line) {
    if (char !== " ") {
      break;
    }

    indent++;
  }

  return indent;
}

export default getIndent;
