import { faArrowDown, faArrowUp, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

interface Props {
    orders: number[],
    incomes: number[],
}

interface Order {
    today: number,
    yesterday: number,
}
interface Income {
    today: number,
    yesterday: number,
}
interface Icons {
    orders: string
    incomes: string
}

const OrderChange = (props: Props) => {
    const [orders, setOrders] = useState<Order>({today: props.orders[1], yesterday: props.orders[0]})
    const [incomes, setIncomes] = useState<Income>({today: props.incomes[1], yesterday: props.incomes[0]})
    const [orderDifference, setOrderDifference] = useState(0)
    const [incomeDifference, setIncomeDifference] = useState(0)
    const [icons, setIcons] = useState<Icons>({orders: "Minus", incomes: "Minus"})

    useEffect(() => {
        setOrderDifference(orders.today - orders.yesterday)
        setIncomeDifference(incomes.today - incomes.yesterday)
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
    }, [])
    return (
        <div className="orderbox">
            <div className="orderbox-order">
                <h4 className="orderbox-order-value">{orders.today}</h4>
                <h5 className="orderbox-order-heading">Objednávky</h5>
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
                <h4 className="orderbox-order-value">{incomes.today}&nbsp;Kč</h4>
                <h5 className="orderbox-order-heading">Tržba</h5>
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
