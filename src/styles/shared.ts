import styled from 'styled-components'

export const GlobalContainer = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'header'
    'main';
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`
