import { useNavigate } from "react-router-dom";
//import AddIcon from '@mui/icons-material/Add';

const Buttons =() =>{
    const navigate = useNavigate();
    return ( 
    <div>
 <button onClick={() => navigate("/Dashboard")}>
        SAPO2
      </button>
      <div className="apuestaTotal">
        <h2> APUESTA </h2>
        <div className="ValorApuesta">
        <p onClick={() => navigate("/Dashboard")} > + </p>
        <p>750</p>
        <p onClick={() => navigate("/Dashboard")} > - </p>
        </div>
      </div>
    </div>
    )
}
export default Buttons;