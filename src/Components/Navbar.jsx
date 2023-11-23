'use client'

import {
    Box,
    Flex,
    Avatar,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react';


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ltpData, setLtpData] = useState({ Nifty: 0, BankNifty: 0, FinNifty: 0 });

    useEffect(() => {
        // WebSocket connection
        const socket = new WebSocket('wss://functionup.fintarget.in/ws?id=fintarget-functionup');

        // Event listener for messages
        socket.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                setLtpData(data);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        });

        // Close the WebSocket connection on component unmount
        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('Latest LTP Data:', ltpData);
        }, 1000);

        // Clear the timer on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [ltpData]);

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>Algowiz</Box>

                    <Text>Nifty : {ltpData.Nifty}</Text>
                    <Text>BankNifty : {ltpData.Banknifty}</Text>
                    <Text>FinNifty : {ltpData.Finnifty}</Text>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
};


export default Navbar;