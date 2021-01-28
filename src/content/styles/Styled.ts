import styled from 'styled-components'

export const GlobalStyled = styled.div`
body {
    font-family: Nunito, sans-serif;
    background-color: #25262a;
    color: white;
}

section {
    padding-top: 75px;
    padding-bottom: 75px;
    background-color: #25262a;
}

section:before {
    content: none !important;
}

h1 {
    margin-bottom: 30px;
}
`

export const TestStyled = styled.div`
.btn-green {
    color: #fff;
    border: solid 2px green;
    background: none;
    width: 100px;
    transition: 0.7s ease-in-out;
  }
  
  .btn-red {
    color: #fff;
    border: solid 2px red;
    background: none;
    width: 100px;
    transition: 0.7s ease-in-out;
  }

  .btn-green:hover {
    color: #fff;
    background-color: #00800040;
    transform: scale(1.2);
  }
  
  .btn-red:hover {
    color: #fff;
    background-color: #ff000040;
    transform: scale(1.2);
  }
`