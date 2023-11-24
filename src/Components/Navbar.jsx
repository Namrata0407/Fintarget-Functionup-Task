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
    const [currentState, setCurrentState] = useState({ "open": 0, "heigh": 0, "low": 0, "close": 0 });

    useEffect(() => {
        let count = 0;
        let open;
        let high;
        let low;
        let close;
        const socket = new WebSocket('wss://functionup.fintarget.in/ws?id=fintarget-functionup');

        // Event listener for messages
        socket.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);

                if (count === 0) {
                    open = data.Nifty;
                    high = data.Nifty;
                    low = data.Nifty;
                    console.log(open, high, low, close, count);
                    count++;
                } else if (count == 59) {
                    close = data.Nifty;
                    console.log(open, high, low, close, count);

                    let localData = JSON.parse(localStorage.getItem("localCandle")) || []

                    localData.push({
                        x: new Date().getTime(),
                        y: [open, high, low, close]
                    })

                    localStorage.setItem("localCandle", JSON.stringify(localData));

                    open = null;
                    high = null;
                    low = null;
                    close = null;
                    count = 0;

                } else {
                    if (data.Nifty > high) {
                        high = data.Nifty;
                    } else if (data.Nifty < low) {
                        low = data.Nifty;
                    }
                    console.log(open, high, low, close, count);
                    count++;
                }

                updateLtpData(data, count);

            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        });

        // Close the WebSocket connection on component unmount
        return () => {
            socket.close();
        };
    }, []);

    const updateLtpData = (newData, count) => {


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