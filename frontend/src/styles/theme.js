const colors = {
    mainRed: '#760D27',
    subRed: '#914154',
    Pink: '#BC959F',
    white: '#E5E5E5',
    mainBlack: '#1D1D1D',
    pointBlack: '#393838',
    subBlack: '#2F2B2B',
    mainBlue: '#2A3A4F',
    pointBlue: '#0075FF',
    mainOrange: '#B74A40',   
    pointGray: '#5C5C5C',
    disabledGray: '#999999',
    textGray: '#C0C0C0',
  };
  
  const pixelToRem = (size) => `${size / 16}rem`;
  
  const fontSizes = {
    h1: pixelToRem(38),
    h2: pixelToRem(28), 
    h3: pixelToRem(22),
    h4: pixelToRem(20),
    h5: pixelToRem(16),
    p: pixelToRem(14), 
    small: pixelToRem(10),
    page: pixelToRem(30),
  };
  
  export const theme = {
    colors,
    fontSizes,
  };