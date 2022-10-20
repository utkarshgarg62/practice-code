import Logo_Image from './assets/logo.png'
import Mic_Image from './assets/mic.png'
import "./App.css"

const Logo = () => {
    return (
        <div className='section-1'>
            <img src={Logo_Image} class="logo" alt='logo'/>
        </div>
    )
}

const WordBox = () => {
    return (
        <div className="s-box">
      			<input type="text" className="s-input"/>
      			<img src={Mic_Image} className="vs-icon" alt='mic'/>
      	</div>
    )
}

const Button = () => {
    return (
        <div className='s-box'>
            <SearchButton/>
            <LuckyButton/>
        </div>
    )
}

const SearchButton = () =>{
    return (
            <input type="submit" className="s-btn" value="Google Search"/>
    )
}
const LuckyButton = () =>{
    return (
            <input type="submit" className="s-btn" value="I'm Feeling Lucky"/>
    )
}

const LanguageNote = () => {
    return (
        <div className="lang">
            Google offered in:
            <a href="https://github.com/utkarshgarg62">Github</a>
            <a href="https://www.linkedin.com/in/utkarshgarg62/">Linkedin</a>
        </div>
    )
}

const App = () => {
    return (
        <div className='container'>
            <Logo/> 
            <br></br>
            <br></br>
            <WordBox/>
            <Button/>
            <LanguageNote/>
        </div>
    )
}


export default App