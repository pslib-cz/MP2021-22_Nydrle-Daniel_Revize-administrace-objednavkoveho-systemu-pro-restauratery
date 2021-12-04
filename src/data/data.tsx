import * as clr from "../plugins/plugin.colors";
import faker from "faker";

let labels:string[] = [];
let amount: number = 10;
for (var i = 1; i < amount + 1; i++) {
	labels.push(i.toString());
}

export let tableData : object = {
    orders: new Array(faker.datatype.number({min: 1, max: 5})).fill(null).map(e => e =
		{
			time: faker.datatype.datetime(),
			price: faker.datatype.number(2000),
			phone: faker.phone.phoneNumber(),
			items: new Array(faker.datatype.number(10)).fill(null).map(e => e = {amount: faker.datatype.number({min: 1, max: 10}), name: faker.vehicle.vehicle()}),
			name: faker.name.findName(),
			address: faker.address.streetAddress()
		}
	)
}

let arr = new Array(faker.datatype.number(10)).fill(null).map(e => e =
	{
		time: faker.datatype.datetime(),
		price: faker.datatype.number(2000),
		phone: faker.phone.phoneNumber(),
		items: new Array(faker.datatype.number(10)).fill(null).map(e => e = {amount: faker.datatype.number(10), name: faker.vehicle.vehicle()}),
		name: faker.name.findName(),
		address: faker.address.streetAddress()
	}
)

export let incomeData = {
    labels: labels,
    datasets: [
        {
            id: 1,
            type: "bar" as const,
            label: "Tržba",
            data: labels.map(() => faker.datatype.number(2000)),
        },
    ]
}

export let orderData = {
    labels: labels,
    datasets: [
        {
            id: "orders",
			order: 2,
            type: "line" as const,
            label: "Objednávky",
            yAxisID: "orders",
            data: labels.map(() => faker.datatype.number(10)),
            fill: true,
			borderColor: clr.YELLOW,
			borderWidth: 0,
			backgroundColor: `${clr.YELLOW}66`,
            tension: 0.2,
        }
    ],
    options: {
		responsive: true,
		
		interaction: {
			mode: 'index',
			intersect: false,
		},
		stacked: false,
        scales: {
			orders: {
				type: 'linear' as const,
				position: 'left' as const,
			},
			averages: {
				type: 'linear' as const,
				position: 'right' as const,
				grid: {
				  drawOnChartArea: false,
				},
			}
        },
    }
}

const averages:number[] = [];
incomeData.datasets[0].data.forEach((data: number, index: number) => {
    averages.push(data / orderData.datasets[0].data[index]);
})

console.log(orderData.options.scales)

orderData = {...orderData, datasets: [...orderData.datasets,
	{
        id: "averages",
		order: 1,
        type: 'line' as const,
        label: "Průměrná útrata",
        yAxisID: "averages",
        data: averages,
        fill: false,
		borderColor: clr.PINK,
		borderWidth: 5,
		backgroundColor: clr.PINK,
        tension: 0.3,
    }
]}
