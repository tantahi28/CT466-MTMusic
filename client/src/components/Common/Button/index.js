import React, { useState } from "react";
import styled from "styled-components";

// Define theme
// const theme = {
//   blue: {
//     default: "#3f51b5",
//     hover: "#283593",
//   },
//   pink: {
//     default: "#e91e63",
//     hover: "#ad1457",
//   },
// };

// Button styled component
export const Button = styled.button`
  background-color: var(--primary-color);    
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: var(--text-item-hover);
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue",
};

// ToggleButton styled component
const ButtonToggle = styled(Button)`
  opacity: 0.7;
  ${({ active }) =>
    active &&
    `
    opacity: 1; 
  `}
`;





// ToggleGroup component
export function ToggleGroup({ types }) {
  const [active, setActive] = useState(types[0]);
  return (
    <div>
      {types.map((type) => (
        <ButtonToggle active={active === type} onClick={() => setActive(type)}>
          {type}
        </ButtonToggle>
      ))}
    </div>
  );
}

// Parent component
export function ParentComponent({ isAuthenticated }) {
  const types = ["Cash", "Credit Card", "Bitcoin"];
  return (
    <div>
      {isAuthenticated ? (
        <Button >Logout</Button>
      ) : (
        <Button >Signin</Button>
      )}
      {/* <TabGroup types={types} /> */}
      <ToggleGroup types={types} />
    </div>
  );
}

// export default ParentComponent;
