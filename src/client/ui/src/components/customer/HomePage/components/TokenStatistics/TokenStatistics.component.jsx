/* eslint-disable no-underscore-dangle */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Radio } from 'antd'
import Utils from 'utils'
import InfoModal from 'components/common/InfoModal/InfoModal.component'
import { loadStripe } from '@stripe/stripe-js'
import { CUSTOMER_PATH, DEFAULT_PAGINATION, TOKEN_TYPE, STRIPE_PUBLIC_KEY } from 'utils/constant'
import LoadingIcon from 'components/common/LoadingIcon/LoadingIcon.component'
import TokenType from './components/TokenType/TokenType.component'
import PayOnlineModal from './components/PayOnlineModal/PayOnlineModal.container'
import PayReviewModal from './components/PayReviewModal/PayReviewModal.component'

const TokenStatistics = ({ currentUser, getTokenTypeListObj, getMyProjectListObj, getTokenTypes, getMyProjects }) => {
  const [payOnlineModal, setPayOnlineModal] = useState({})
  const [payReviewModal, setPayReviewModal] = useState({})
  const [infoModal, setInfoModal] = useState({})
  const [selectedTokenTypeId, setSelectedTokenTypeId] = useState(null)
  const [defaultTokenTypeId, setDefaultTokenTypeId] = useState(null)
  const history = useHistory()

  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_PUBLIC_KEY))
  }, [])

  const closeInfoModal = useCallback(() => {
    setInfoModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  const closePayOnlineModal = useCallback(() => {
    setPayOnlineModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  const closePayReviewModal = useCallback(() => {
    setPayReviewModal(i => {
      return { ...i, visible: false }
    })
  }, [])

  useEffect(() => {
    getTokenTypes()
  }, [getTokenTypes])

  const changeTokenTypeCss = selectedId => {
    window.$(`.token-currency-choose .pay-option label.pay-option-check-select`).removeClass('pay-option-check-select')
    window
      .$(`.token-currency-choose .pay-option input[value=${selectedId}]`)
      .parent()
      .parent()
      .siblings('label')
      .addClass('pay-option-check-select')
  }

  useEffect(() => {
    if (
      getTokenTypeListObj.isLoading === false &&
      getTokenTypeListObj.isSuccess != null &&
      getTokenTypeListObj.tokenTypeList.length > 0
    ) {
      const tokenTypeId = Utils.sortAndFilterTokenTypeList(
        getTokenTypeListObj.tokenTypeList,
        [TOKEN_TYPE.FREE.name],
        'price'
      )[0]._id
      setDefaultTokenTypeId(tokenTypeId)
      setSelectedTokenTypeId(tokenTypeId)
      changeTokenTypeCss(tokenTypeId)
    }
  }, [getTokenTypeListObj])

  useEffect(() => {
    if (currentUser._id && Utils.isEmailVerified(currentUser.roles)) {
      const filters = {
        isValid: ['true'],
      }
      getMyProjects({ userId: currentUser._id, pagination: DEFAULT_PAGINATION.SIZE_100, filters })
    }
  }, [currentUser._id, currentUser.roles, getMyProjects])

  const openPayOnlineModal = () => {
    if (!Utils.isEmailVerified(currentUser.roles)) {
      const infoObj = {
        visible: true,
        title: 'Không thể thực hiện tác vụ',
        message:
          'Tài khoản của bạn chưa được kích hoạt. Vui lòng thực hiện xác thực email tại trang cá nhân để kích hoạt tài khoản.',
        icon: {
          isSuccess: false,
        },
        button: {
          content: 'Đến trang cá nhân',
          clickFunc: () => {
            closeInfoModal()
            history.push(`${CUSTOMER_PATH}/profile`)
          },
        },
        onCancel: () => closeInfoModal(),
      }
      setInfoModal(infoObj)
      return
    }

    if (getMyProjectListObj.myProjectList.data.length === 0) {
      const infoObj = {
        visible: true,
        title: 'Không thể thực hiện tác vụ',
        message: 'Bạn chưa có dự án nào. Tạo dự án để thực hiện tác vụ này.',
        icon: {
          isSuccess: false,
        },
        button: {
          content: 'Tạo dự án',
          clickFunc: () => {
            closeInfoModal()
            history.push(`${CUSTOMER_PATH}/create-project`)
          },
        },
        onCancel: () => closeInfoModal(),
      }
      setInfoModal(infoObj)
      return
    }

    const index = getTokenTypeListObj.tokenTypeList.findIndex(x => x._id === selectedTokenTypeId)
    let selectedType = getTokenTypeListObj.tokenTypeList[index]
    selectedType = Utils.removePropertiesFromObject(selectedType, ['createdDate', 'updatedDate'])
    const payOnlineObj = {
      visible: true,
      data: {
        user: currentUser,
        tokenType: selectedType,
      },
      onCancel: () => closePayOnlineModal(),
    }
    setPayOnlineModal(payOnlineObj)
  }

  const onOrderSuccess = useCallback(
    orderData => {
      closePayOnlineModal()
      setPayReviewModal({
        visible: true,
        data: {
          minutes: orderData.minutes,
          token: orderData.tokenValue,
        },
        onCancel: () => closePayReviewModal(),
      })
    },
    [closePayOnlineModal, closePayReviewModal]
  )

  const onChangeTokenType = e => {
    setSelectedTokenTypeId(e.target.value)
    changeTokenTypeCss(e.target.value)
  }

  return (
    <>
      <div className="card-innr">
        <div className="token-balance token-balance-with-icon">
          <div className="token-balance-icon">
            <img src={`${process.env.PUBLIC_URL}/images/customer/logo-light-sm.png`} alt="logo" />
          </div>
          <div className="token-balance-text">
            <h3 className="card-sub-title" style={{ fontSize: '16px', color: '#fff' }}>
              Các gói API Key
            </h3>
          </div>
        </div>
        <div className="token-balance token-balance-s2">
          <div className="token-currency-choose" style={{ color: '#495463' }}>
            {getTokenTypeListObj.isLoading && getTokenTypeListObj.isSuccess == null && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LoadingIcon size={30} color="#fff" />
              </div>
            )}
            {getTokenTypeListObj.tokenTypeList.length > 0 && (
              <Radio.Group
                name="radiogroup"
                style={{ width: '100%', fontSize: 'inherit' }}
                onChange={onChangeTokenType}
                defaultValue={defaultTokenTypeId}
              >
                <div className="row guttar-15px" style={{ display: 'flex' }}>
                  {Utils.sortAndFilterTokenTypeList(
                    getTokenTypeListObj.tokenTypeList,
                    [TOKEN_TYPE.FREE.name],
                    'price'
                  ).map(tokenType => {
                    return (
                      <div className="col-3" key={tokenType._id}>
                        <TokenType tokenType={tokenType} />
                      </div>
                    )
                  })}
                </div>
              </Radio.Group>
            )}
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <button
            type="button"
            className="btn btn-warning"
            onClick={openPayOnlineModal}
            style={{ display: 'flex', justifyContent: 'center' }}
            disabled={getTokenTypeListObj.tokenTypeList.length === 0 || stripePromise == null}
          >
            <em className="pay-icon fas fa-dollar-sign" />
            Mua ngay
          </button>
        </div>
      </div>
      {payOnlineModal.visible && (
        <PayOnlineModal
          payOnlineModal={payOnlineModal}
          myProjectList={getMyProjectListObj.myProjectList}
          onOrderSuccess={onOrderSuccess}
          stripePromise={stripePromise}
        />
      )}
      {payReviewModal.visible && <PayReviewModal payReviewModal={payReviewModal} />}
      {infoModal.visible && <InfoModal infoModal={infoModal} />}
    </>
  )
}

export default TokenStatistics
