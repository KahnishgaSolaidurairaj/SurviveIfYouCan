import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Jumpscare() {
  const navigate = useNavigate();

  return (
   
    <div>
        <video
        className="scene-bg"
        src="/videos/jumpScareVid.mp4" 
        autoPlay
        muted
        playsInline 
        onEnded={() => navigate('/afterJumpScare')}
      />
    </div>
  );
}