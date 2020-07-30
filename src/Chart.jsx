import React from 'react';
import * as HttpClient from './Services/HttpClient';
import { Line } from 'react-chartjs-2';
import { randomColor } from 'randomcolor';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Chart = () => {
    const fetch = async () => {
        let startAt = date.startAt.getFullYear() + "-" + (date.startAt.getMonth() + 1) + "-" + date.startAt.getDate();
        let endAt = date.endAt.getFullYear() + "-" + (date.endAt.getMonth() + 1) + "-" + date.endAt.getDate();
        const res = await HttpClient.callApi(`history?start_at=${startAt}&end_at=${endAt}`);
        // throw new Error('I crashed!');
        const labels = []
        const tmp = {};
        Object.keys(res.rates).sort().map((key, index) => {
            labels.push(key);
            Object.keys(res.rates[key]).sort().map(key1 => {
                if (tmp[key1] === undefined) tmp[key1] = [];
                tmp[key1].push(res.rates[key][key1]);
            })
        })

        setState({
            labels,
            datasets: Object.keys(tmp).sort().map((value, index) => {
                const newcolor = randomColor();
                console.log(value)
                return {
                    label: value,
                    fill: false,
                    lineTension: 1,
                    borderWidth: 2,
                    data: tmp[value],
                    backgroundColor: newcolor,
                    borderColor: newcolor,
                }
            })
        })
    }

    const defaultState = {
        labels: [],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 1,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            },
        ]
    }
    const [state, setState] = React.useState(defaultState);
    const defaultDate = {
        startAt: new Date(),
        endAt: new Date(),
    }
    const [date, setDate] = React.useState(defaultDate);
    const handleChange = type => event => {
        setDate({
            ...date,
            [type]: event
        });
    };


    return (
        <div>
            <span   >Start at:</span   >
            <DatePicker
                selected={date.startAt}
                onChange={handleChange('startAt')}
            />
            <span   >End at:</span >
            <DatePicker
                selected={date.endAt}
                onChange={handleChange('endAt')}
            />
            <button onClick={fetch}>Fetch</button>
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Exchange rate',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    );
}

export default Chart;
