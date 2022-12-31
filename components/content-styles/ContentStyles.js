export const Container = ({ children ,props}) => {
  return <div className={`px-4 md:px-8 lg:px-16 xl:px-24 ${props}`}>{children}</div>;
};

export const SubHeading = ({ props }) => {
  return (
    <div className="flex flex-col justify-center items-center  ">
      <h2 className="md:text-3xl uppercase font-medium text-center leading-5 text-gray-700 text-xl mb-2">
        {props}
      </h2>
      <span className=" flex w-16 h-0.5 bg-gray-500"></span>
    </div>
  );
};
export const Text = ({props}) => {
  return <p className="bg-black text-teal-300">{props}</p>;
};
export const Button = ({ children, props }) => {
  return (
    <button
      className={`bg-black text-white px-8 py-3 uppercase font-medium text-md ${props}`}
    >
      {children}
    </button>
  );
};
