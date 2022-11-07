import { fireEvent, render, screen } from "@testing-library/react";
import List1 from "../../components/List1";

let initialValues = [1, 2, 3];

describe("Testing routing Application", () => {
  describe("App component should", () => {
    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(<List1 label="List-#1" initialValues={initialValues} />);
      initialValues = [1, 2, 3];
    });

    it("render List1 and check structure", async () => {
      expect(screen.getByTestId("list1-label")).toBeInTheDocument();
      expect(screen.getByTestId("list1-input")).toBeInTheDocument();
      expect(screen.getByTestId("list1-btn-append-start")).toBeInTheDocument();
      expect(screen.getByTestId("list1-btn-pop-end")).toBeInTheDocument();
    });

    it("Check Data Rendering", async () => {
      expect(screen.getAllByTestId("list1-element").length).toBe(
        initialValues.length
      );

      initialValues.forEach((num, index) => {
        expect(screen.getAllByTestId("list1-element")[index]).toHaveTextContent(
          num.toString()
        );
      });
    });

    it("Check appendStart", () => {
      expect(screen.getAllByTestId("list1-element").length).toBe(
        initialValues.length
      );
      let input = screen.getByTestId("list1-input");
      fireEvent.change(input, { target: { value: "10" } });
      fireEvent.click(screen.getByTestId("list1-btn-append-start"));

      expect(screen.getAllByTestId("list1-element").length).toBe(
        initialValues.length + 1
      );
      expect(screen.getAllByTestId("list1-element")[0]).toHaveTextContent("10");
    });

    it("Check PopEnd", () => {
      expect(screen.getAllByTestId("list1-element").length).toBe(
        initialValues.length
      );
      fireEvent.click(screen.getByTestId("list1-btn-pop-end"));
      expect(screen.getAllByTestId("list1-element").length).toBe(
        initialValues.length - 1
      );
    });

    it("Check Clear", () => {
      expect(screen.getAllByTestId("list1-element").length).toBe(
        initialValues.length
      );
      fireEvent.click(screen.getByTestId("list1-btn-clear"));
      expect(screen.queryByTestId("list1-element")).not.toBeInTheDocument();
    });

    it("Check reset", () => {
      expect(screen.getAllByTestId("list1-element").length).toBe(
        initialValues.length
      );
      fireEvent.click(screen.getByTestId("list1-btn-reset"));
      expect(screen.getAllByTestId("list1-element").length).toBe(
        initialValues.length
      );
    });
  });
});
