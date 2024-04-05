import PropTypes from "prop-types";

export default function TextInput2({
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
    <div className="flex flex-wrap justify-between gap-10 items-baseline">
      <label htmlFor={id} className="font-semibold">{label}</label>
      <input
        type={type || "text"}
        className="block border-gray-500 w-44 capitalize shadow-sm border-b-1 focus:border-blue-600 hover:border-blue-600 duration-700 before:border-blue-500 outline-none placeholder:text-start placeholder:font-semibold pb-1" 
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={0}
        required
      />
    </div>
  </div>
  );
}

TextInput2.propTypes = {
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
