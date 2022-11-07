import { renderHook, act } from "@testing-library/react";
import useNumberList from "../../hooks/useNumberList";

test("useNumberList Hook", () => {
  const { result } = renderHook(() => useNumberList([1, 2, 3]));

  act(() => {
    result.current.appendEnd(4);
  });

  expect(result.current.list).toEqual([1, 2, 3, 4]);

  act(() => {
    result.current.appendStart(5);
  });

  expect(result.current.list).toEqual([5, 1, 2, 3, 4]);

  act(() => {
    result.current.popEnd();
  });

  expect(result.current.list).toEqual([5, 1, 2, 3]);

  act(() => {
    result.current.popStart();
  });

  expect(result.current.list).toEqual([1, 2, 3]);

  act(() => {
    result.current.clear();
  });

  expect(result.current.list).toEqual([]);

  act(() => {
    result.current.reset();
  });

  expect(result.current.list).toEqual([1, 2, 3]);
});
