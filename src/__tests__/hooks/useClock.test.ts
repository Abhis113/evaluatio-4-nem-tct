import { renderHook } from "@testing-library/react";
import useClock from "../../hooks/useClock";

test("useClock Hook", () => {
  const time = new Date();
  const { result } = renderHook(() => useClock());
  expect(result.current.hours).toEqual(time.getHours());
  expect(result.current.minutes).toEqual(time.getMinutes());
});
