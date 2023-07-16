type propsType = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ text, onClick, disabled }: propsType) => {
  return (
    <button
      className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
