import styled from 'styled-components'

export const MediaGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  overflow-y: scroll;
  height: calc(100vh - 120px);
  width: clamp(100px, calc(100vw - 4rem), 2000px);

  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    height: calc(100vh);
    width: 100vw;
    grid-gap: 0;
    padding: 0;
  }
`

export const MediaGridItem = styled.img`
  width: 100%;
  height: 100%;
  max-height: 327px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  border-radius: 0.5rem;

  &:hover {
    transform: scale(1.05);
    border: 1px solid #fff;
  }

  @media only screen and (max-width: 600px) {
    border-radius: 0;
    max-height: 100%;
  }
`

export const MediaCentered = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`
