import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';


const GuideModal = () => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayTwo />)

    useEffect(() => {
        onOpen()
    }, []);

    return (
        <>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader color={"green"}>Application Guide</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight={"semibold"}>Since each candle will be printed after one minute, So please wait a
                            few minutes to see the new candles appear on the chart, and don't
                            refresh the page.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor={"#00b6ff"} color={"white"} onClick={onClose}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};


export default GuideModal;