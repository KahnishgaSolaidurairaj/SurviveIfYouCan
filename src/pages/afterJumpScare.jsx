import { useNavigate } from "react-router-dom";

export default function AfterJumpScare() {
    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);

    const navigate = useNavigate();

        const story = {
            1: {
                text: "Did that scare you ;) hehehehe",
            },
        }

    return (
        <div>
        

        
        
        </div>
    
    
    
    );
}