import React, {FC} from "react";
import SummaryForm from "./SummaryForm";
import {EOptionType} from "../entry/Options";
import { formatCurrency} from "../../utilities";
import {useOrderDetails} from "../../contexts/OrderDetails";
import {ICurrentBlock} from "../../types";

const OrderSummary: FC<ICurrentBlock> = ({ changePhase }) => {
  const { totals, optionCounts } = useOrderDetails()

  // @ts-ignore
  const scoops = Object.entries(optionCounts[EOptionType.scoops])
    .map(([key, value ]: [key: string, value: number]) => (
      <li key={key}>
        {value} {key}
      </li>
  ))

  const toppings = Object.keys(optionCounts[EOptionType.toppings])
    .map((key) => <li key={key}>{key}</li>)

  return (
    <>
      <h1>order summary</h1>
      <h2>Scoops: {formatCurrency(totals[EOptionType.scoops])}</h2>
      <ul>
        {scoops}
      </ul>
      {totals[EOptionType.toppings] && (<>
        <h2>Toppings: {formatCurrency(totals[EOptionType.toppings])}</h2>
        <ul>
          {toppings}
        </ul>
        </>)}
      <SummaryForm changePhase={changePhase} />
    </>
  )
}

export default OrderSummary
