import { animated, useSpring } from 'react-spring'

import React from 'react'
import { SinglePage } from '../SinglePage/SinglePage'
import styled from 'styled-components'

export type ModalProps = {
  isOpen: boolean
  toggleModal: () => void
  slug: string
}

export const Modal = ({ isOpen, toggleModal, slug }: ModalProps) => {
  const [springProps, set] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(-100%)',
    config: { mass: 0.1, tension: 180, friction: 15 },
  }))

  React.useEffect(() => {
    if (isOpen) {
      set({ opacity: 1, transform: 'translateY(0%)' })
    } else {
      set({ opacity: 0, transform: 'translateY(100%)' })
    }
  }, [isOpen, set])

  return (
    <ModalContainer style={springProps}>
      <ModalOverlay onClick={toggleModal} />
      <ModalContent>
        <SinglePage slug={slug} />
      </ModalContent>
    </ModalContainer>
  )
}

const ModalContainer = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
`

const ModalContent = styled.div`
  max-width: 1000px;
  height: auto;
  background-color: #121212;
  border-radius: 19px;
  z-index: 999;
  outline: 1px solid #fff;
  box-shadow: 1px 1px 10px 1px #000;

  @media (max-width: 768px) {
    width: 100%;
    height: 50vh;
    bottom: 0;
    position: fixed;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top: 2px solid #fff;
    outline: none;
  } ;
`
