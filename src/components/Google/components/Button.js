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

export default Button