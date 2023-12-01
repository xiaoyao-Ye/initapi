import { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";
import { Interface, Enum, InterfaceProp, isReferenceObject } from "../typings";

type Properties = Record<string, SchemaObject | ReferenceObject>;

const getInterfaceProp = (properties: Properties = {}, required: string[] = []): InterfaceProp[] => {
  const interfacePropList: InterfaceProp[] = [];
  for (const [interfacePropName, interfaceProp] of Object.entries(properties)) {
    if (!properties.hasOwnProperty(interfacePropName)) continue;

    let interfacePropItem: InterfaceProp;

    // required 是否必填, 意味着是否必须传递这个属性.
    // nullable 是否允许为 null, 意味着值是否允许为 null
    // const isRequired = required.includes(interfacePropName) || !interfaceProp.nullable!;
    const isRequired = required.includes(interfacePropName);

    if (isReferenceObject(interfaceProp)) {
      const { $ref, description } = interfaceProp;
      interfacePropItem = { name: interfacePropName, description, $ref, required: isRequired };
    } else {
      if (Array.isArray(interfaceProp.type)) continue;
      const { type, description, items, additionalProperties, allOf, oneOf, anyOf } = interfaceProp;
      interfacePropItem = {
        name: interfacePropName,
        description,
        type,
        items,
        additionalProperties,
        required: isRequired,
      };

      if (interfaceProp.enum) interfacePropItem.enum = interfaceProp.enum;

      //   if (allOf || oneOf || anyOf) {
      if (isReferenceObject(allOf?.[0])) interfacePropItem.$ref = allOf?.["0"].$ref;
      else if (isReferenceObject(oneOf?.[0])) interfacePropItem.$ref = oneOf?.["0"].$ref;
      else if (isReferenceObject(anyOf?.[0])) interfacePropItem.$ref = anyOf?.["0"].$ref;
      //   }
      if (interfaceProp.properties) interfacePropItem.propList = getInterfaceProp(interfaceProp.properties);
    }

    interfacePropList.push(interfacePropItem);
  }

  return interfacePropList;
};

const collectDto = (schemas: { [schema: string]: SchemaObject | ReferenceObject } = {}) => {
  const enumList: Enum[] = [];
  const enumNameList: string[] = [];
  const interfaceList: Interface[] = [];
  const interfaceNameList: string[] = [];

  for (const [dtoName, dto] of Object.entries(schemas)) {
    if (!schemas.hasOwnProperty(dtoName)) continue;
    if (isReferenceObject(dto)) continue;

    if (dto.type === "string") {
      const enumItem: Enum = {
        name: dtoName,
        description: dto.description,
        enumList: dto.enum ?? [],
      };
      enumList.push(enumItem);
      enumNameList.push(dtoName);
    } else if (dto.type === "object") {
      const InterfaceItem: Interface = {
        name: dtoName,
        description: dto.description,
        propList: getInterfaceProp(dto.properties, dto.required),
      };
      interfaceList.push(InterfaceItem);
      interfaceNameList.push(dtoName);
    }
  }

  return { enumList, enumNameList, interfaceList, interfaceNameList };
};

export { collectDto };
