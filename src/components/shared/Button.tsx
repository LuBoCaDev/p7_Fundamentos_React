import styled from "styled-components";

const accentColor = "rgb(var(--color-nodepop))";

const Button = styled.button<{ $variant: "primary" | "secondary" }>`
  cursor: pointer;
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  background-color: ${(props) =>
    props.$variant === "primary" ? accentColor : "white"};
  border-color: ${accentColor};
  color: ${(props) => (props.$variant === "primary" ? "white" : accentColor)};
  display: inline-flex;
  align-items: center;
  font: inherit;
  font-weight: bold;
  min-height: 36px;
  justify-content: center;
  min-width: 72px;
  outline-style: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 0 30px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  text-decoration: none;
  transition:
    background-color 0.2s ease-in-out,
    transform 0.1s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary"
        ? "rgb(26, 145, 218)"
        : "rgba(var(--color-nodepop), 0.1)"};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
  }

  &:focus {
    outline: 2px solid ${accentColor};
  }
`;

export default Button;

