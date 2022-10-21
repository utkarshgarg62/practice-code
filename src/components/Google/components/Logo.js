import Logo_Image from '../assets/logo.png'
import "../index.css"

const Logo = () => {
    return (
        <div className='section-1'>
            <img src={Logo_Image} class="logo" alt='logo'/>
        </div>
    )
}

export default Logo