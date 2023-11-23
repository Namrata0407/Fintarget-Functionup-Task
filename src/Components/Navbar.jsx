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
    Heading,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react';


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ltpData, setLtpData] = useState({
        Nifty: { value: 0, color: 'black' },
        Banknifty: { value: 0, color: 'black' },
        Finnifty: { value: 0, color: 'black' },
    });

    useEffect(() => {
        // WebSocket connection
        const socket = new WebSocket('wss://functionup.fintarget.in/ws?id=fintarget-functionup');

        // Event listener for messages
        socket.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                updateLtpData(data);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        });

        // Close the WebSocket connection on component unmount
        return () => {
            socket.close();
        };
    }, []);

    const updateLtpData = (newData) => {
        setLtpData((prevData) => ({
            Nifty: {
                value: newData.Nifty,
                color: getColor(newData.Nifty, prevData.Nifty.value),
            },
            Banknifty: {
                value: newData.Banknifty,
                color: getColor(newData.Banknifty, prevData.Banknifty.value),
            },
            Finnifty: {
                value: newData.Finnifty,
                color: getColor(newData.Finnifty, prevData.Finnifty.value),
            },
        }));
    };

    const getColor = (latestValue, prevValue) => {
        return latestValue > prevValue ? 'green' : latestValue < prevValue ? 'red' : 'black';
    };

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
                    <Heading fontSize={"21px"}>Algowiz</Heading>

                    <Flex>
                        <Text fontWeight={'semibold'} > Nifty :  </Text>
                        <Text ml={"5px"} fontWeight={'semibold'} color={ltpData.Nifty.color}>{ltpData.Nifty.value}</Text>
                    </Flex>


                    <Flex>
                        <Text fontWeight={'semibold'} > BankNifty :  </Text>
                        <Text ml={"5px"} fontWeight={'semibold'} color={ltpData.Banknifty.color}> {ltpData.Banknifty.value}</Text>
                    </Flex>


                    <Flex>
                        <Text fontWeight={'semibold'} > FinNifty :  </Text>
                        <Text ml={"5px"} fontWeight={'semibold'} color={ltpData.Finnifty.color}> {ltpData.Finnifty.value}</Text>
                    </Flex>

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