import { faArrowDown, faArrowUp, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import ChartData from '../interfaces/ChartData';

interface Props {
    kpiData: ChartData[]
    numberOfOrders: number
}

interface Order {
    today: number
    yesterday: number
}

interface Income {
    today: number
    yesterday: number
}

interface Icons {
    orders: string
    incomes: string
}

const OrderChange = (props: Props) => {
    const [orders, setOrders] = useState<Order>({yesterday: 0, today: 0})
    const [incomes, setIncomes] = useState<Income>({yesterday: 0, today: 0})
    const [orderDifference, setOrderDifference] = useState(0)
    const [incomeDifference, setIncomeDifference] = useState(0)
    const [numberOfOrders, setNumberOfOrders] = useState(0)
    const [icons, setIcons] = useState<Icons>({orders: "Minus", incomes: "Minus"})

    useEffect(() => {
        console.log(props)
        setOrders({today: props.kpiData[1]?.orders, yesterday: props.kpiData[0]?.orders})
        setIncomes({today: +props.kpiData[1]?.revenue, yesterday: +props.kpiData[0]?.revenue})

        setOrderDifference(orders.today - orders.yesterday)
        setIncomeDifference(incomes.today - incomes.yesterday)

        setNumberOfOrders(props.numberOfOrders)
        
        let orderIcon: string, incomeIcon: string
        if (orderDifference > 0)
            orderIcon = "ArrowUp"
        else if (orderDifference < 0)
            orderIcon = "ArrowDown"
        if (incomeDifference > 0)
            incomeIcon = "ArrowUp"
        else if (incomeDifference < 0)
            incomeIcon = "ArrowDown"
        setIcons({orders: orderIcon!, incomes: incomeIcon!})
    }, [props])

    return (
        <div className="orderbox">
            <div className="orderbox-order">
                <h4 className="orderbox-order-value">{orders.today}</h4>
                <h5 className="orderbox-order-heading">Objednávky dnes</h5>
                {
                    orders.today > orders.yesterday && (
                        <FontAwesomeIcon icon={faArrowUp} />
                    )
                }
                {
                    orders.today < orders.yesterday && (
                        <FontAwesomeIcon icon={faArrowDown} />
                    )
                }
                {
                    orders.today === orders.yesterday && (
                        <FontAwesomeIcon icon={faMinus} />
                    )
                }
                <small className="orderbox-order-difference">{orderDifference}</small>
            </div>
            <div className="orderbox-order">
                <h4 className="orderbox-order-value">{numberOfOrders}</h4>
                <h5 className="orderbox-order-heading">Objednávky celkem</h5>
            </div>
            <div className="orderbox-order">
                <h4 className="orderbox-order-value">{incomes.today}&nbsp;Kč</h4>
                <h5 className="orderbox-order-heading">Tržba dnes</h5>
                {
                    incomes.today > incomes.yesterday && (
                        <FontAwesomeIcon icon={faArrowUp} />
                    )
                }
                {
                    incomes.today < incomes.yesterday && (
                        <FontAwesomeIcon icon={faArrowDown} />
                    )
                }
                {
                    incomes.today === incomes.yesterday && (
                        <FontAwesomeIcon icon={faMinus} />
                    )
                }
                <small className="orderbox-order-difference">{incomeDifference}&nbsp;Kč</small>
            </div>
        </div>
    )
}

export default OrderChange
