import { FC, ReactNode, useRef } from "react";
import { styled } from "styled-components";
import {
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'

const AppModalContainer = styled.div`
  .ant-modal {
    max-width: 40rem;
  }
`;

type AppModalProps = {
  children: ReactNode;
  open: boolean;
  motionPreset?: 'slideInBottom' | 'none';
  onClose?: () => void;
}

const AppModal: FC<AppModalProps> = ({ children, open, onClose, motionPreset = 'slideInBottom' }) => {
  const finalRef = useRef(null)
  return (
    <AppModalContainer ref={finalRef}>
      <Modal
        isOpen={open}
        onClose={onClose ? onClose : () => {}}
        isCentered
        closeOnOverlayClick={!!onClose}
        motionPreset={motionPreset}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent bg="none" maxW="none" w="auto">
          {children}
        </ModalContent>
      </Modal>
    </AppModalContainer>
  );
}

export default AppModal;
