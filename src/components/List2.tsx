import React from "react";

type List2Props = {
  // TODO
};
const List2 = (props: List2Props) => {
  return (
    <div data-testid="list2">
      <h3 data-testid="list2-label">{/* Label */}</h3>

      {/* Iterate List and wrap the element div below inside */}
      <div data-testid="list2-element">{/* Each element in a list */}</div>

      <input data-testid="list2-input" />
      <button data-testid="list2-btn-append-end">
        {/* Button to append new number to the end of the list */}
      </button>
      <button data-testid="list2-btn-pop-start">
        {/* Button to  pop first element of the list */}
      </button>
      <button data-testid="list2-btn-clear">
        {/* Button to  clear the list */}
      </button>
      <button data-testid="list2-btn-reset">
        {/* Button to  reset the list to initialValue */}
      </button>
    </div>
  );
};

export default List2;
