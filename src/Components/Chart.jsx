// src/CandlestickChart.js
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const seriesdata = [
    {
        data: JSON.parse(localStorage?.getItem("localCandle")) || []
    },
];

const CandlestickChart = () => {
    const [count, setCount] = useState(0);
    const [series, setSeries] = useState(seriesdata)


    useEffect(() => {
        let timeid = setInterval(() => {
            if (series[0].data.length !== JSON.parse(localStorage.getItem("localCandle")) && JSON.parse(localStorage?.getItem("localCandle"))) {
                setSeries([
                    {
                        data: JSON.parse(localStorage.getItem("localCandle")) || []
                    },
                ])
                setCount(count + 1);
            } else {
                // console.log("false")
            }
        }, 1000);

        return () => {
            clearInterval(timeid);
        };
    }, [series])

    const options = {
        chart: {
            type: 'candlestick',
        },
        title: {
            text: 'Candlestick Chart',
        },
    };

    return (
        <Flex justifyContent={"center"} w={"100%"} mt={"50px"}  >
            <ReactApexChart options={options} series={series} type="candlestick" height={550} width={"350%"} />
        </Flex>
    );
};

export default CandlestickChart;
