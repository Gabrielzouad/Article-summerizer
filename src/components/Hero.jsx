import React from "react"
import { logo } from "../assets"

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='AI logo' className='w-28 object-contain' />
        <button type='button' onClick={() => window.open("https://github.com/adrianhajdin/project_ai_summarizer/blob/main/package.json")}>
          Github
        </button>
      </nav>
      <h1 className='head_text'>
        Oppsummer tekst og artikler med <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>Gjør det lettere å oppsummere tekster og artikkler med openAI</h2>
    </header>
  )
}

export default Hero
