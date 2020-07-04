/* eslint-disable no-underscore-dangle */
import React from 'react'
import {Radio} from 'antd'

const TokenType = ({ tokenType }) => (
  <div className="pay-option h-100">
    <Radio className="pay-option-check" value={tokenType._id} name="tokenType" style={{ marginRight: 0 }} />
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
            tokenType.salePercent > 0
              ? {
                  marginTop: '0.5em',
                  marginBottom: '0.5em',
                  textDecoration: 'line-through',
                }
              : null
          }
        >
          {tokenType.price} vnđ/ {tokenType.minutes} phút
        </span>
        {tokenType.salePercent > 0 ? (
          <span className="pay-amount" style={{ marginBottom: '0.5em', color: 'red' }}>
            {tokenType.saleOffPrice} vnđ/ {tokenType.minutes} phút
          </span>
        ) : null}
      </div>
    </label>
  </div>
)

export default TokenType
