import { fireEvent, render, screen } from "@testing-library/react";
import List2 from "../../components/List2";

let initialValues = [1, 2, 3];

describe("Testing routing Application", () => {
  describe("App component should", () => {
    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(<List2 label="List-#1" initialValues={initialValues} />);
      initialValues = [1, 2, 3];
    });

    it("render List2 and check structure", async () => {
      expect(screen.getByTestId("list2-label")).toBeInTheDocument();
      expect(screen.getByTestId("list2-input")).toBeInTheDocument();
      expect(screen.getByTestId("list2-btn-append-end")).toBeInTheDocument();
      expect(screen.getByTestId("list2-btn-pop-start")).toBeInTheDocument();
    });

    it("Check Data Rendering", async () => {
      expect(screen.getAllByTestId("list2-element").length).toBe(
        initialValues.length
      );

      initialValues.forEach((num, index) => {
        expect(screen.getAllByTestId("list2-element")[index]).toHaveTextContent(
          num.toString()
        );
      });
    });

    it("Check appendEnd", () => {
      expect(screen.getAllByTestId("list2-element").length).toBe(
        initialValues.length
      );
      let input = screen.getByTestId("list2-input");
      fireEvent.change(input, { target: { value: "10" } });
      fireEvent.click(screen.getByTestId("list2-btn-append-end"));

      expect(screen.getAllByTestId("list2-element").length).toBe(
        initialValues.length + 1
      );
      expect(
        screen.getAllByTestId("list2-element")[initialValues.length]
      ).toHaveTextContent("10");
    });

    it("Check PopStart", () => {
      expect(screen.getAllByTestId("list2-element").length).toBe(
        initialValues.length
      );
      fireEvent.click(screen.getByTestId("list2-btn-pop-start"));
      expect(screen.getAllByTestId("list2-element").length).toBe(
        initialValues.length - 1
      );
      expect(screen.getAllByTestId("list2-element")[0]).toHaveTextContent(
        initialValues[1].toString()
      );
    });

    it("Check Clear", () => {
      expect(screen.getAllByTestId("list2-element").length).toBe(
        initialValues.length
      );
      fireEvent.click(screen.getByTestId("list2-btn-clear"));
      expect(screen.queryByTestId("list2-element")).not.toBeInTheDocument();
    });

    it("Check reset", () => {
      expect(screen.getAllByTestId("list2-element").length).toBe(
        initialValues.length
      );
      fireEvent.click(screen.getByTestId("list2-btn-reset"));
      expect(screen.getAllByTestId("list2-element").length).toBe(
        initialValues.length
      );
    });
  });
});
