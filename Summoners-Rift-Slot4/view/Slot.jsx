
import SlotMachine from "../src/components/SlotMachine.jsx";
const Slot = () =>{
    return( 
        <div>
        <div>
        <SlotMachine />
        </div>
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: `url('src/assets/img/slot_base.png')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,}}>

        </div>
      </div>
    )
}
export default Slot;