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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import OrderChange from "./OrderChange";

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
		<div className="page page-home">
			<OrderChange orders={orderData.datasets[0].data.slice(-2)} incomes={incomeData.datasets[0].data.slice(-2)} />
			<OrdersTable {...JSON.parse(JSON.stringify(tableOrders))} />
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
		</div>
	);
};

export default Home;
