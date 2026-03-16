const BtnPrimary = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`bg-blue-500 px-6 py-2 rounded text-gray-200 hover:bg-blue-600 active:bg-blue-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const BtnSecondary = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`bg-gray-300 px-6 py-2 rounded hover:bg-gray-400 active:bg-gray-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const BtnEdit = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`bg-yellow-500 px-6 py-2 rounded text-gray-200 hover:bg-yellow-600 active:bg-yellow-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const BtnDelete = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`bg-red-500 px-6 py-2 rounded text-gray-200 hover:bg-red-600 active:bg-red-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Button = {
  BtnPrimary,
  BtnSecondary,
  BtnEdit,
  BtnDelete,
};
export default Button;
