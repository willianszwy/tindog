import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
html, body {
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
}
*, *::after, *::before {
    box-sizing: border-box;
}
body {
    
    
    height: 100vh;
    
    background: hsl(220, 20%, 95%);
    // background: linear-gradient(90deg, rgb(160, 222, 219),rgb(3, 165, 209)); 

    // background: #EECDA3;  /* fallback for old browsers */
    // background: -webkit-linear-gradient(to top, #EF629F, #EECDA3);  /* Chrome 10-25, Safari 5.1-6 */
    // background: linear-gradient(to top, #EF629F, #EECDA3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    

    background-attachment: fixed;
    font-family: Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    
    text-rendering: optimizeLegibility;
}`;