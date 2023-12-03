import { atom } from "recoil";

export const urlSave = atom({
  key: "urlSave",
  default: "",
});
export const urlGet = atom({
  key: "urlGet",
  default: "",
});
export const nameState = atom({
  key: "nameState",
  default: "",
});

export const questionState = atom({
  key: "questionState",
  default: [],
});

export const answerState = atom({
  key: "answerState",
  default: [],
});
