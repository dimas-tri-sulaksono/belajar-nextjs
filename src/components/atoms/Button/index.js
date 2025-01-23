function Button({ buttonClassName, type, children, onClick = () => {} }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`h-10 px-6 font-semibold text-white ${buttonClassName}`}
    >
      {children}
    </button>
  );
}

export default Button;

// fungsi kosong, fungsi yang tidak melakukan apa-apa
// onClick = () => {} }
