import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-chartjs-2";
import OrdersTable from "./OrdersTable";
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
import * as clr from "../plugins/plugin.colors";
import { tableData, incomeData, orderData } from "../data/data";

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

const Home = () => {
	const [tableOrders, setTableOrders] = useState(tableData);
	const [incomes, setIncomes] = useState(incomeData);
	const [orders, setOrders] = useState(orderData);
	const orderChartRef = useRef<ChartJS>(null);

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
	}, []);

	return (
		<div>
			<h1>Hlavní panel</h1>
			<OrdersTable {...JSON.parse(JSON.stringify(tableOrders))} />
			<Chart type="bar" data={{ ...incomes }} />
			<Chart
				type="line"
				ref={orderChartRef}
				datasetIdKey="order"
				data={orders}
			/>
		</div>
	);
};

export default Home;
