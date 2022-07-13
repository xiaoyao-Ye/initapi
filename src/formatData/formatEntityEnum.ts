
import { ReferenceObject, SchemaObject } from "openapi3-ts";
import { EntityInfo, EnumInfo, EntityPropInfo, isReferenceObject } from '../type';
import { clearCRLF } from '../utils';

export const formatEntityEnum = (data: { [schema: string]: SchemaObject | ReferenceObject }) => {
  const entityInfoList: EntityInfo[] = [];
  const enumInfoList: EnumInfo[] = [];
  const entityNameList: string[] = [];
  const enumNameList: string[] = [];

  for (const schemaName in data) {
    if (!data.hasOwnProperty(schemaName)) continue;
    const obj = data[schemaName];
    // ReferenceObject 类型不需要格式化
    if (isReferenceObject(obj)) continue;

    // entity
    if (obj.type === 'object') {
      entityNameList.push(schemaName)
      entityInfoList.push({
        name: schemaName,
        desc: clearCRLF(obj.description ?? ""),
        propList: formatEntityPropList(obj.properties ?? {}),
      });
    }

    // enum
    if (obj.type === 'string') {
      enumNameList.push(schemaName)
      enumInfoList.push({
        name: schemaName,
        desc: clearCRLF(obj.description ?? ""),
        enumList: obj.enum ?? [],
      });
    }
  }

  return { entityInfoList, enumInfoList, entityNameList, enumNameList };
}


const formatEntityPropList = (properties: { [propertyName: string]: SchemaObject | ReferenceObject; }) => {
  const propList: Array<EntityPropInfo> = [];
  for (const propName in properties) {
    if (!properties.hasOwnProperty(propName)) continue;
    const obj = properties[propName];
    let prop: EntityPropInfo;

    // // ReferenceObject 类型优先处理(排除) 
    if (isReferenceObject(obj)) {
      prop = {
        $ref: obj.$ref,
        name: propName,
        desc: '',
        type: '',
        nullable: false,
      }
      continue;
    }

    // SchemaObject
    prop = {
      $ref: obj.$ref,
      name: propName,
      desc: clearCRLF(obj.description ?? ""),
      type: obj.type ?? "",
      nullable: obj.nullable ?? false,
      items: obj.items,
      additionalProperties: obj.additionalProperties,
    }

    propList.push(prop)
  }

  return propList;
}

