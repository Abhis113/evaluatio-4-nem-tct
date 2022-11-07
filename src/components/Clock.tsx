import React from "react";

type Props = {
  //  TODO
};

const Clock = (props: Props) => {
  return (
    <div data-testid="clock">
      <h4 data-testid="clock-label">
        {/* Label */}
      </h4>
      <span data-testid="clock-hours">
        {/* Hours */}
        </span>
        :
      <span data-testid="clock-minutes">
        {/* Minutes */}
      </span>
       :
      <span data-testid="clock-seconds">
        {/* Seconds */}
        </span>
    </div>
  );
};

export default Clock;
