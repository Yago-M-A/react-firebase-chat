import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html{
    font-size: 62.5%;
  }

  body {
    background-color: #17181F;
    color: white;
  }
`

export default GlobalStyle
