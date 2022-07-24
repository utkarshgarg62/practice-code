import React from 'react'
import '../App.css'

export default function Home() {
  return (
    <>
      {/* <h2>URL SHORTNER</h2> */}
      <div class="container" id="container">
        <div class="form-container sign-in-container">


          {/* PROCESS */}
          <form action="#">
            <h1>Enter a long url</h1>
            <span>to make it short</span>
            <input type="text" placeholder="Long Url" />
            <input type="text" placeholder="Short Url" readOnly/>
            <button>Make It Short</button>
          </form>



        </div>

        {/* DESCRIPTION OF PROJECTS */}
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Created a Url shortening service like Bitly and tinyurl for easy sharing of long urls, also implemented caching to deliver quick responses.</p>
              <a href="https://github.com/utkarshgarg62" class="github">github</a>.
            </div>
          </div>
        </div>



      </div>

      {/* FOOTER with DETAILS */}

      <footer>
        <p>
          Created By -  <i class="fa fa-heart"></i>
          <a href="https://www.linkedin.com/in/utkarshgarg62/">Utkarsh Garg</a> and 
          <a href="https://www.linkedin.com/in/monisha-mittal-848581238/"> Monisha Mittal </a>
           - Read how I created this and you can see backend repository -
          <a href="https://github.com/utkarshgarg62/project-urlShortner"> HERE </a>.
        </p>
      </footer>


    </>
  )
}
