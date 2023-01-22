import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
  }

  html,
  body {
    max-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
  }
  
  html::-webkit-scrollbar {
    display: none;
  }


  body {
    background: #121212;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`

export default GlobalStyles
