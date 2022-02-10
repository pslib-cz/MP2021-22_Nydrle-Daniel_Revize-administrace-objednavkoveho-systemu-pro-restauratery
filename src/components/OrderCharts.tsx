import React, { useEffect, useRef, useState } from 'react'
import { incomeData, orderData } from '../data/data'

import { Chart } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
} from "chart.js";
import * as clr from "../plugins/plugin.colors"

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const OrderCharts = () => {
	const [incomes, setIncomes] = useState(incomeData)
	const [orders, setOrders] = useState(orderData)
	const orderChartRef = useRef<ChartJS>(null)

    useEffect(() => {
        let chart = orderChartRef.current;
		if (!chart) {
			return;
		}
		setIncomes({
			...incomes,
			datasets: incomes.datasets.map((dataset) => ({
				...dataset,
				backgroundColor: clr.getGradient(chart!.ctx, chart!.chartArea),
			})),
		});
    }, [])
    
    return (
        <div className="charts">
            <div className="charts-chartcontainer">
                <Chart type="bar" data={{ ...incomes }} />
            </div>
            <div className="charts-chartcontainer">
                <Chart
                    type="line"
                    ref={orderChartRef}
                    datasetIdKey="order"
                    data={orders}
                />
            </div>
        </div>
    )
}

export default OrderCharts
