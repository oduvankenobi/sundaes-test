import React, {FC, useEffect, useState} from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import {Alert, Row } from "react-bootstrap";
import {pricePerItem} from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from '../../contexts/OrderDetails';

export const BASE_URL = 'http://localhost:3030'
export const ERR_TEXT = 'an unexpected error occurred'

export enum EOptionType {
  scoops = 'scoops',
  toppings = 'toppings'
}

const Options: FC<{ optionType: EOptionType }> = ({ optionType}) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)

  // @ts-ignore
  const { totals } = useOrderDetails()

  useEffect(() => {
    axios.get(`${BASE_URL}/${optionType}`)
      .then(({ data }) => setItems(data))
      .catch((err) => setError(true))
  }, [optionType])

  if (error) {
    return <Alert variant="danger">{ERR_TEXT}</Alert>
  }

  const ItemComponent = optionType === EOptionType.scoops ? ScoopOption : ToppingOption
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((el) => (
    <ItemComponent
      key={el.name}
      name={el.name}
      imageUrl={el.imageUrl} />
    )
  )

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>{title} total: {formatCurrency(totals[optionType])}</p>
      <Row>
        {optionItems}
      </Row>
    </>
  )
}

export default Options
