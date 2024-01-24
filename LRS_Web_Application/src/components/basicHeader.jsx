import Icon from '../assets/Icon.png'

export function BHeader(){
    return(
        <div className="Header">
                    <div className='LRS-Banner'>
                        <img id='LRS_Header-Icon' src={Icon}/>
                        <h2 id="HeaderTitle">Computer Lab Reservation System</h2>
                    </div>
                </div>
    )
}