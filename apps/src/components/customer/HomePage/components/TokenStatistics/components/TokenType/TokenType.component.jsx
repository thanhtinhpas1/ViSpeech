/* eslint-disable no-underscore-dangle */
import React from 'react'

const TokenType = ({ tokenType }) => (
  <div className="pay-option h-100">
    <input
      className="pay-option-check"
      type="radio"
      id={tokenType._id}
      name="tokenType"
      defaultChecked={tokenType.defaultChecked}
    />
    <label className="pay-option-label h-100" htmlFor={tokenType._id}>
      <span className="pay-title">
        <em className="pay-icon">
          <i className="fas fa-key" />
        </em>
      </span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          className="pay-amount"
          style={
            tokenType.saleOff
              ? {
                  marginTop: '0.5em',
                  marginBottom: '0.5em',
                  textDecoration: 'line-through',
                }
              : null
          }
        >
          {tokenType.price}$/ {tokenType.minutes} phút
        </span>
        {tokenType.saleOff ? (
          <span className="pay-amount" style={{ marginBottom: '0.5em', color: 'red' }}>
            {tokenType.saleOff.price}$/ {tokenType.saleOff.time} phút
          </span>
        ) : null}
      </div>
    </label>
  </div>
)

export default TokenType
