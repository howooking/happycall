import { useParams } from "react-router-dom";

export default function Test() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h2>Test</h2>
    </div>
  );
}
