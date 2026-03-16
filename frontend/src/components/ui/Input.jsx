const InputText = ({ children, placeholder, className = "" }) => {
  return (
    <input
      className={`bg-gray-300 px-6 py-2 rounded w-full shadow hover:shadow-lg ${className}`}
      type="text"
      placeholder={placeholder}
    />
  );
};

const InputEmail = ({ children, placeholder, className = "" }) => {
  return (
    <input
      className={`bg-gray-300 px-6 py-2 rounded w-full shadow hover:shadow-lg ${className}`}
      type="email"
      placeholder={placeholder}
    />
  );
};

const InputPassword = ({ children, placeholder, className = "" }) => {
  return (
    <input
      className={`bg-gray-300 px-6 py-2 rounded w-full shadow hover:shadow-lg ${className}`}
      type="password"
      placeholder={placeholder}
    />
  );
};

const InputDate = ({ children, placeholder, className = "" }) => {
  return (
    <input
      className={`bg-gray-300 px-6 py-2 rounded w-full shadow hover:shadow-lg ${className}`}
      type="date"
      placeholder={placeholder}
    />
  );
};

const Input = {
  InputText,
  InputEmail,
  InputPassword,
  InputDate,
};
export default Input;
