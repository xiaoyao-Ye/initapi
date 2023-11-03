import { it, expect, describe } from "vitest";
import { mock_collect_input, mock_collect_output } from "../_test_/collect_dto_input";
import { collectDto } from "./dto";

describe("Collect DTO info", () => {
  it("Should return enum info when input is enum", () => {
    const { IdentityType, Category } = mock_collect_input;
    const mock_input = { IdentityType, Category };

    const { enumList, enumNameList } = collectDto(mock_input);

    expect(enumNameList).toEqual(["IdentityType", "Category"]);
    expect(enumList).toEqual([
      {
        name: "IdentityType",
        description: undefined,
        enumList: ["邮箱", "微信"],
      },
      {
        name: "Category",
        description: undefined,
        enumList: ["收入", "支出"],
      },
    ]);
  });

  it("Should return interface names when input is DTO", () => {
    const { WeChatSignInDto, TagItemsVo, QueryBillsVo } = mock_collect_input;
    const mock_input = { WeChatSignInDto, TagItemsVo, QueryBillsVo };

    const { interfaceNameList } = collectDto(mock_input);

    expect(interfaceNameList).toEqual(["WeChatSignInDto", "TagItemsVo", "QueryBillsVo"]);
  });

  it("Should return interface info when input is DTO", () => {
    const { WeChatSignInDto, TagItemsVo, QueryBillsVo } = mock_collect_input;
    const mock_input = { WeChatSignInDto, TagItemsVo, QueryBillsVo };

    const { interfaceList } = collectDto(mock_input);

    expect(interfaceList).toEqual(mock_collect_output);
  });
});
