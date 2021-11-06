export default function ShowCountryButton({text, setToggle, active}) {
  return (
    <button
      className={`button ${active ? "button-active" : ""}`}
      onClick={setToggle}
    >
      {text}
    </button>
  );
}
