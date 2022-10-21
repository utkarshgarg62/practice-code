import Mic_Image from '../assets/mic.png'
import "../index.css"

const WordBox = () => {
    return (
        <div className="s-box">
      			<input type="text" className="s-input"/>
      			<img src={Mic_Image} className="vs-icon" alt='mic'/>
      	</div>
    )
}
export default WordBox