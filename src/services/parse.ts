import convertToToken from "./convertToToken.ts";

function parse(yamlString: string) {
  const tokens = convertToToken(yamlString);
  // const tree = convertToJSON(tokens);
}

export default parse;
