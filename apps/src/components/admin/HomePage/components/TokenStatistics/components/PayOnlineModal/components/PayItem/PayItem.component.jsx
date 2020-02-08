/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const PayItem = ({ payItem }) => (
  <li className="pay-item">
    <input type="radio" className="pay-check" name="pay-option" id={payItem.type} />
    <label className="pay-check-label" htmlFor={payItem.type}>
      <img src={`${process.env.PUBLIC_URL}/images/customer/${payItem.imgSrc}`} alt="pay-logo" />
    </label>
  </li>
)

export default PayItem
