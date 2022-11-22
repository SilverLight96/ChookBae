import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";  // style-reset 패키지

const GlobalStyles = createGlobalStyle` 
    ${reset}
    body {
        padding: 0px;
        margin: 0px;
    }
`;

export default GlobalStyles;
