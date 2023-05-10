export default function Header({
  left,
  center,
  right,
  registerModal,
  recordModal,
  editModal,
}) {
  return (
    <div
      className="Header"
      style={
        registerModal || recordModal || editModal
          ? { display: "none" }
          : { display: "flex" }
      }
    >
      <div className="header_left">{left}</div>
      <div className="header_center">{center}</div>
      <div className="header_right">{right}</div>
    </div>
  );
}
