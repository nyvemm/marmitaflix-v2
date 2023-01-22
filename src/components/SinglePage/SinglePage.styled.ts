import styled from 'styled-components'

export const SinglePageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export const SinglePageImage = styled.img`
  max-width: 300px;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    display: none;
  } ;
`

export const SinglePageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  overflow-y: auto;
  max-height: 430px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const SinglePageTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
  font-family: monospace;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const SinglePageDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 1rem;
  text-align: justify;
`

export const SinglePageLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SinglePageLinkTitle = styled.h2`
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-align: justify;
  font-family: monospace;
  margin: 0;
`
export const SinglePageLinkGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  margin: 1rem 0;
  gap: 1rem;
`

export const SinglePageLinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    background: #fff;
    color: #1f1f1f;
    border: none;
  }
`

export const EmbedContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
`

export const Embed = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
