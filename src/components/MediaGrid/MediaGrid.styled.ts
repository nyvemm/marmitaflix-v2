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
  scrollbar-width: none;

  @media only screen and (max-width: 600px) {
    height: calc(100vh);
    width: 100vw;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 0;
  }
`

export const MediaGridItem = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  border-radius: 0.5rem;

  @media only screen and (min-width: 600px) {
    &:hover {
      transform: scale(1.05);
      border: 1px solid #fff;
    }
  }

  @media only screen and (max-width: 600px) {
    flex: 1 1 150px;
    width: 150px;
    border-radius: 0;
    object-fit: cover;
  }
`

export const MediaCentered = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`
