
const CardSm = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 w-sm flex flex-col gap-5 ${className}`}>
      {children}
    </div>
  );
};

const CardMd = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 w-md flex flex-col gap-5 ${className}`}>
      {children}
    </div>
  );
};

const CardFluid = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 flex flex-col gap-5 ${className}`}>
      {children}
    </div>
  );
};

const Card = {
  CardSm,
  CardMd,
  CardFluid,
};

export default Card;
