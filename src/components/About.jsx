import React from 'react'

const About = () => {
  return (
    <div>
      <h4>About Us</h4>
      <p>Screener project is aimed at providing a learning platform to first time stock investors,
        learners and amateur investors who possess limited understanding of financial jargons and want
        to learn the basics of investing as well as pick or screen stocks of their choice.
        Screener provides the real time stock price of top canadian stocks, a brief profile of the 
        stock so that user can learn about it, search capability to quickly lookup the ticker symbol
        and basic information on financial topics eg. stock, financial markets, market capitalization, 
        TSX etc.
        To enhance the user experience, We also provide the capability to user to select the top 
        peroforming stocks in real time based on pre-defined metrices (like P/E ratio), thus making
        stock screening and selection easier for the new investors.
        Since our the crux of our project is rendering dynamic data we ensure that we are fetching the
        most updated data through reliable APIs and have checked it against other financial portals providing 
        similar information.
        The tech stack for this project is ReactJS, Tailwinds and Node.
      </p> 
    </div>
  )
}

export default About
