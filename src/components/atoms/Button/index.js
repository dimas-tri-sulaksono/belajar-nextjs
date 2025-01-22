function Button(props) {
  return (
    <button
      className={`h-10 px-6 font-semibold text-white ${props.buttonClassName}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
