/**
 * Test suite for index.js
 * Add your tests here to verify the functionality of your main code
 */

import { LinkedList } from "./index.js";

const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

test("toString", () => {
  expect(list.toString()).toBe(
    "( dog )-> ( cat )-> ( parrot )-> ( hamster )-> ( snake )-> ( turtle )-> null",
  );
});

test("size", () => {
  expect(list.size()).toBe(6);
});

test("tail", () => {
  expect(list.tail()).toBe("turtle");
});

test("at", () => {
  expect(list.at(2)).toBe("parrot");
});

test("contains", () => {
  expect(list.contains("cat")).toBe(true);
  expect(list.contains("lion")).toBe(false);
});

test("insertAt", () => {
  list.insertAt(2, "fish");
  expect(list.at(2)).toBe("fish");
  expect(list.at(3)).toBe("parrot");
});

test("removeAt", () => {
  list.removeAt(2);
  expect(list.at(2)).toBe("parrot");
});
