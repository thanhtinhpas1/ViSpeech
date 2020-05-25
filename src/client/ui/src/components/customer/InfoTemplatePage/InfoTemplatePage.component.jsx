/* eslint-disable react/no-danger */
import React from 'react'
import InfoModal from 'components/customer/InfoModal/InfoModal.component'

const InfoTemplatePage = ({ infoTemplate, infoModal }) => {
  return (
    <div className="page-content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-9 col-lg-10">
            <div className="content-area card">
              <div className="card-innr">
                {/* <div className="card-head">
                  <h6 className="card-title text-center">Email Confirm Template</h6>
                </div> */}
                <div className="gaps-1x" />
                <table className="email-wraper">
                  <tbody>
                    <tr>
                      <td className="pdt-4x pdb-4x">
                        {/* <table className="email-header">
                          <tbody>
                            <tr>
                              <td className="text-center pdb-2-5x">
                                <p className="email-title">
                                  The Best Selling Premium HTML Template
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table> */}
                        <table className="email-body">
                          <tbody>
                            <tr>
                              <td className="pd-3x pdb-1-5x">
                                <h2 className="email-heading">{infoTemplate.title}</h2>
                              </td>
                            </tr>
                            <tr>
                              <td className="pdl-3x pdr-3x pdb-2x">
                                {infoTemplate.user && (
                                  <p className="mgb-1x">
                                    Xin chào {infoTemplate.user.lastName} {infoTemplate.user.firstName},
                                  </p>
                                )}
                                <p className="mgb-1x" dangerouslySetInnerHTML={{ __html: infoTemplate.content }} />
                                <div className="gaps-1x" />
                                <div className="d-flex justify-content-end align-items-center">
                                  {infoTemplate.positiveButton && (
                                    <button
                                      type="button"
                                      className="btn email-btn"
                                      onClick={infoTemplate.positiveButton.clickFunc}
                                    >
                                      {infoTemplate.positiveButton.content}
                                    </button>
                                  )}
                                  {infoTemplate.negativeButton && (
                                    <button
                                      type="button"
                                      className="btn btn-danger ml-2"
                                      style={{
                                        borderRadius: '4px',
                                        color: '#ffffff !important',
                                        display: 'inline-block',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        lineHeight: '44px',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        padding: '0 30px',
                                      }}
                                      onClick={infoTemplate.negativeButton.clickFunc}
                                    >
                                      {infoTemplate.negativeButton.content}
                                    </button>
                                  )}
                                </div>
                                <div className="gaps-1x" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfoModal infoModal={infoModal} />
    </div>
  )
}

export default InfoTemplatePage
