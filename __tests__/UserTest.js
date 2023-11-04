import { Console } from "@woowacourse/mission-utils";
import User from "../src/modules/User.js";
import { NAME_INPUT_ERROR, TRY_INPUT_ERROR } from "../src/modules/Constants.js";

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe("경주할 자동차의 이름을 입력하는 기능 테스트", () => {
  const nullCarNames = "";
  const emptyCarNames = ",";
  const longCarNames = "bugyeom,suyeon";
  const validCarNames = "gyeom,yeon";

  test("아무 입력을 안하고 엔터", async () => {
    mockQuestions([nullCarNames]);

    await expect(User.enterNames()).rejects.toThrow(`${NAME_INPUT_ERROR.null}`);
  });

  test("쉼표(,)만 입력", async () => {
    mockQuestions([emptyCarNames]);

    await expect(User.enterNames()).rejects.toThrow(
      `${NAME_INPUT_ERROR.empty}`
    );
  });

  test("글자 수가 5자 초과", async () => {
    mockQuestions([longCarNames]);

    await expect(User.enterNames()).rejects.toThrow(`${NAME_INPUT_ERROR.long}`);
  });

  test("올바른 이름을 입력", async () => {
    mockQuestions([validCarNames]);

    const result = await User.enterNames();

    expect(result).toEqual(validCarNames.split(","));
  });
});

describe("이동 시도 횟수 입력", () => {
  const nullTryCounts = "";
  const blankTryCounts = "1 2";
  const charTryCounts = "1a8";
  const validTryCounts = "5";

  test("아무 입력을 안하고 엔터", async () => {
    mockQuestions([nullTryCounts]);

    await expect(User.enterTryCounts()).rejects.toThrow(
      `${TRY_INPUT_ERROR.null}`
    );
  });

  test("숫자 입력 O, 공백 존재", async () => {
    mockQuestions([blankTryCounts]);

    await expect(User.enterTryCounts()).rejects.toThrow(
      `${TRY_INPUT_ERROR.blank}`
    );
  });

  test("문자(공백 포함) 입력(숫자 + 문자 포함)", async () => {
    mockQuestions([charTryCounts]);

    await expect(User.enterTryCounts()).rejects.toThrow(
      `${TRY_INPUT_ERROR.char}`
    );
  });

  test("올바른 시도 횟수를 입력", async () => {
    mockQuestions([validTryCounts]);

    const result = await User.enterTryCounts();

    expect(result).toEqual(validTryCounts);
  });
});
