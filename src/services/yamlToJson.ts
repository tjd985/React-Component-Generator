import yaml from "js-yaml";
import YamlStructure from "../types/YamlStructure.ts";
import parse from "./parse.ts";

async function parseYamlToJson(yamlText: string): Promise<YamlStructure> {
  const json = yaml.load(yamlText) as YamlStructure;

  return json;
}

export default parseYamlToJson;
