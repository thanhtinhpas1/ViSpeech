import React from 'react'

const PayOption = ({ payOption }) => (
  <div className="pay-option h-100">
    <input
      className="pay-option-check"
      type="radio"
      id={payOption.type}
      name="payOption"
      defaultChecked={payOption.defaultChecked ? payOption.defaultChecked : false}
    />
    <label className="pay-option-label h-100" htmlFor={payOption.type}>
      <span className="pay-title">
        <em className="pay-icon">
          <i className="fas fa-key" />
        </em>
      </span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          className="pay-amount"
          style={
            payOption.saleOff
              ? {
                  marginTop: '0.5em',
                  marginBottom: '0.5em',
                  textDecoration: 'line-through',
                }
              : null
          }
        >
          {payOption.price}/ {payOption.time}
        </span>
        {payOption.saleOff ? (
          <span className="pay-amount" style={{ marginBottom: '0.5em', color: 'red' }}>
            {payOption.saleOff.price}/ {payOption.saleOff.time}
          </span>
        ) : null}
      </div>
    </label>
  </div>
)

export default PayOption
