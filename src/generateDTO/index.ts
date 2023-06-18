import { Enum, Interface } from "../typings";
import { replaceSpecialChars, useDescription, wordToUpperCase } from "../utils";
import { interfaceToType } from "./interfaceToType";

type PropList = {
  name: string;
  description: string;
  type: string;
};

const generateDTO = (enumList: Enum[] = [], interfaceList: Interface[] = []) => {
  const generateEnumList = enumList.map(item => {
    item.description = useDescription(item.description);
    item.name = wordToUpperCase(replaceSpecialChars(item.name));
    // item.enumList = item.enumList.map(enumItem => `"${enumItem}" = "${enumItem}"`);
    return item;
  });

  const generateInterfaceList = interfaceList.map(item => {
    const description = useDescription(item.description);
    const name = wordToUpperCase(replaceSpecialChars(item.name));
    if (name === "0") {
      console.log(name);
    }
    const propList: PropList[] = item.propList.map(property => {
      return {
        name: replaceSpecialChars(property.name),
        description: useDescription(property.description),
        type: interfaceToType(property),
      };
    });
    return { name, description, propList };
  });

  return { generateEnumList, generateInterfaceList };
};

export { generateDTO };
