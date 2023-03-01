
import { ReferenceObject, SchemaObject } from "openapi3-ts/dist/mjs";
import { EntityInfo, EnumInfo, EntityPropInfo, isReferenceObject, isSchemaObjectTypeArray } from '../type';
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
    if (isReferenceObject(obj)) {
      console.log('untreated type: 3', obj);
      continue;
    }

    // entity
    if (obj.type === 'object') {
      entityNameList.push(schemaName)
      if (schemaName == 'BillItemsVo') {
        console.log('111');
      }
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
    // TODO: 为了便于类型转换成 propList 先强行转类型 
    const obj = properties[propName] as SchemaObject & ReferenceObject;
    let prop: EntityPropInfo;

    // // ReferenceObject 类型优先处理(排除) 
    // if (isReferenceObject(obj)) {
    //   prop = {
    //     $ref: obj.$ref,
    //     name: propName,
    //     desc: clearCRLF((obj as any)?.description ?? ""), // TODO: 实际可能是有description的, 可能是类型定义错了
    //   }
    // } else {
    //   // SchemaObject
    //   prop = {
    //     name: propName,
    //     desc: clearCRLF(obj.description ?? ""),
    //     type: obj.type ?? "",
    //     nullable: obj.nullable ?? false,
    //     items: obj.items,
    //     additionalProperties: obj.additionalProperties,
    //   }
    // }
    if (isSchemaObjectTypeArray(obj.type)) {
      console.log('untreated type: 4', obj);
      continue;
    }
    prop = {
      $ref: obj?.$ref,
      name: propName,
      desc: clearCRLF(obj?.description ?? ""),
      type: obj?.type ?? "",
      nullable: obj?.nullable ?? false,
      items: obj?.items,
      additionalProperties: obj?.additionalProperties,
    }
    if (obj.allOf || obj.oneOf || obj.anyOf) {
      console.log('untreated type: 8', obj);
      if (isReferenceObject(obj.allOf['0'])) {
        prop.$ref = obj.allOf['0'].$ref;
      } else {
        console.log('untreated type: 9', obj.allOf['0']);
      }
    }

    if (obj.properties) {
      console.log('untreated type: 6', obj);
      continue;
    }

    propList.push(prop)
  }

  return propList;
}

