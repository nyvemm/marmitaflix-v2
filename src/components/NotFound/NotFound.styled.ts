import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 0 1rem;
`

export const NotFoundTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  text-align: center;
  font-family: monospace;
  cursor: pointer;
`

export const NotFoundDescription = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 1rem;
  text-align: left;
`

export const NotFoundBulletList = styled.ul`
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 1rem;
  text-align: justify;
  list-style: disc;
  margin-left: 1rem;

  @media (max-width: 600px) {
    display: none;
  }
`

export const NotFoundBulletListItem = styled.li`
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 0.25rem;
  text-align: justify;
`
