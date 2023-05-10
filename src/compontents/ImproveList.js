export default function ImproveList({
  improve_id,
  improve_img,
  improve_descript,
  onClick,
  isSelected,
}) {
  return (
    <div
      className={[
        "img_info_wrapper",
        isSelected ? `img_info_on_${improve_id}` : `img_info_off`,
      ].join(" ")}
      onClick={() => onClick(improve_id)}
    >
      <img src={improve_img} alt="상태" />
      <span>{improve_descript}</span>
    </div>
  );
}
