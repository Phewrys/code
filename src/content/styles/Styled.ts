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
.shadow {
    border: solid 2px #00ffd0;
}
`