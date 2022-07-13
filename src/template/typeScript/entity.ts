
export const entityTemplateClassProp = (name: string, desc: string, type: string, nullable: boolean) => {
  return `${desc}
  ${name}${nullable ? ':' : '?:'} ${type};`
}

export const entityTemplate = (type: string ,name: string, desc: string, propList: string) => {
  return `

  ${desc}
  export ${type} ${name} {
    ${propList}
  }`
}
