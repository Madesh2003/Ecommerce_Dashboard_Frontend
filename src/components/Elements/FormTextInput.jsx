import PropTypes from "prop-types";

export default function FormTextInput({
  id = "",
  name = "",
  value = "",
  type = "",
  label = "",
  placeholder = "",
  onChange = () => {},
  onBlur = () => {},
  error,
  touched = false,
}) {
  return (
    <div className="my-4">
    <div className="flex flex-wrap justify-center">
      <input
        type={type || "text"}
        className="block border-gray-500 w-96 capitalize shadow-sm border-b-1 focus:border-blue-600 hover:border-blue-600 duration-700 before:border-blue-500 outline-none placeholder:text-start placeholder:font-semibold py-1 max-sm:w-56 sm:w-60 lg:w-72 xl:w-400 md:w-56" 
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={0}
      />
    </div>
  </div>
  );
}

FormTextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
};
