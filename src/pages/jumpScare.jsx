import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Jumpscare() {
  const navigate = useNavigate();

  return (
   
    <div>
        {/* {current.background?.type === "video" && ( */}
        <video
        //   className="scene-bg"
          src="/videos/jumpScareVid.mp4"
          autoPlay
          muted
          style={{ width: "100vw", height: "100vh", background: "black" }}
          onEnded={() => navigate("/afterJumpScare")}
        />
    {/* //   )} */}
    </div>
  );
}