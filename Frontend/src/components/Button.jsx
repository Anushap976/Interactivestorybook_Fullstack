// Reusable Button component with customizable props
const Button = ({ text, onClick, type = "button", className = "" , disabled = false }) => {
  return (
    // Renders a native <button> element
    //'type' defaults to "button", 'onClick' handles button click event 'className' allows css styling
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
       {/* Displays the button text passed as a prop */}
      {text}
    </button>
  );
};

export default Button;