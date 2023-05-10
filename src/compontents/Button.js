export default function Button({ text, type, onClick }) {
  const btnType = ["main", "sub"].includes(type) ? type : "defalt";
  return (
    <button className={["btn", `btn_${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  );
}
