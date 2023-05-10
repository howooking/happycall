export default function Footer({ left, center, right }) {
  return (
    <div className="Footer">
      <div className="footer_left">{left}</div>
      <div className="footer_center">{center}</div>
      <div className="footer_right">{right}</div>
    </div>
  );
}
