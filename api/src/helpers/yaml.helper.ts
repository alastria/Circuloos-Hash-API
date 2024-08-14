import fs from "fs";
import yaml from "yaml";
import path from "path";

export function readYamlFile(pathToFile: string) : any {
  try {
    const file = fs.readFileSync(path.resolve(pathToFile), "utf-8");
    return yaml.parse(file);
  } catch (error) {
    return {};
  }
}
