import { useNavigate } from "react-router-dom";

export default function Jumpscare() {
  const navigate = useNavigate();

  return (
    <video
      src="/images/jumpScareVid.mp4"
      autoPlay
      onEnded={() => navigate("/afterJumpScare")}
      style={{ width: "100%" }}
    />
  );
}