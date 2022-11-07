import React from "react";

type List1Props = {
  // TODO
};
const List1 = (props: List1Props) => {
  return (
    <div data-testid="list1">
      <h3 data-testid="list1-label">{/* Label */}</h3>
      {/* Iterate List and wrap the element div below inside */}
      <div data-testid="list1-element">{/* Each element in a list */}</div>
      

      
      <input data-testid="list1-input" />
      <button data-testid="list1-btn-append-start">
        {/* Append to start of list btn */}
      </button>
      <button data-testid="list1-btn-pop-end">
        {/* po last element btn */}
      </button>
      <button data-testid="list1-btn-clear">
        {/* clear list and set empty button */}
      </button>
      <button data-testid="list1-btn-reset">
        {/* Reset list to default value btn */}
      </button>
    </div>
  );
};

export default List1;
