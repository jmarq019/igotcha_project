import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { IoLogoGithub, IoLogoLinkedin, IoMdMail } from "react-icons/io";
import { FormattedMessage } from 'react-intl';

//Adding some styling 
const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: auto;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;


const ContactusModal = ({ showContactusModal, setShowContactusModal }) =>{

    const modalRef = useRef();

    const animation = useSpring({
      config: {
        duration: 250
      },
      opacity: showContactusModal ? 1 : 0,
      transform: showContactusModal ? `translateY(0%)` : `translateY(-100%)`
    });
  
    const closeContactusModal = e => {
      if (modalRef.current === e.target) {
        setShowContactusModal(false);
      }
    };

    const keyPress = useCallback(
        e => {
          if (e.key === 'Escape' && showContactusModal) {
            setShowContactusModal(false);
            console.log('I pressed');
          }
        },
        [setShowContactusModal, showContactusModal]
      );
    
      useEffect(
        () => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
      );


    return (
        <>
        {showContactusModal ? (
            <Background id="modal-background" onClick={closeContactusModal} ref={modalRef}>
                <animated.div style={animation}>
                <ModalWrapper id="modal-wrapper">
                    <ModalContent id="modal-content">
                        <h1><FormattedMessage id="contactInfo"/></h1>
                            <h2>Evelyn Madonado</h2>
                            <p><a href="evelyn.gmaldonado@gmail.com">Email<IoMdMail/></a> / <a href="https://www.linkedin.com/in/evelyngmaldonado/" taget="_blank" rel="noopener noreferrer">LinkedIn<IoLogoLinkedin/></a> / <a href="https://github.com/EvelynGMaldonado" taget="_blank" rel="noopener noreferrer">GitHub<IoLogoGithub/></a></p>
                            <h2>Jorge Barrag&aacute;n</h2>
                            <p><a href="mailto:jmarq19@outlook.com">Email<IoMdMail/></a> / <a href="https://www.linkedin.com/in/jorgemarquezbarragan/" target="_blank" rel="noopener noreferrer">LinkedIn<IoLogoLinkedin/></a> / <a href="https://github.com/jmarq019" target="_blank" rel="noopener noreferrer">GitHub<IoLogoGithub/></a></p>
                    </ModalContent>
                    <CloseModalButton id="close-modal-btn" aria-label='Close modal' onClick={() => setShowContactusModal(prev => !prev)} />
                </ModalWrapper>
                </animated.div>
            </Background>

        ) : null}
        </>
    )
}

export default ContactusModal;