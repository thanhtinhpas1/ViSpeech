/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-warning">
                <i className="zmdi zmdi-equalizer" />
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Visits</strong>
              </p>
              <h3 className="card-title">70,340</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons text-info">info</i>
                <a href="#pablo">See detailed report</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-rose">
                <i className="zmdi zmdi-shopping-cart" />
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Orders</strong>
              </p>
              <h3 className="card-title">102</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">local_offer</i> Product-wise sales
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-success">
                <i className="zmdi zmdi-money" />
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Revenue</strong>
              </p>
              <h3 className="card-title">$23,100</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">date_range</i> Weekly sales
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header">
              <div className="icon icon-info">
                <i className="zmdi zmdi-twitter" />
              </div>
            </div>
            <div className="card-content">
              <p className="category">
                <strong>Followers</strong>
              </p>
              <h3 className="card-title">+245</h3>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">update</i> Just Updated
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card" style={{ minHeight: '350px' }}>
            <div className="card-header card-header-icon">
              <i className="material-icons">timeline</i>
            </div>
            <div className="card-content">
              <h4 className="card-title">Sales Trend</h4>
              <div className="chart-edge">
                <div id="line-chart" className="demo-placeholder" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card" style={{ minHeight: '350px' }}>
            <div className="card-header" />
            <div className="card-content">
              <h4 className="card-title">Region-wise Sales</h4>
              <div id="dash1-sales-chart" className="chart">
                <canvas
                  id="doughnutChart"
                  height={400}
                  width={498}
                  style={{ display: 'block', width: '498px', height: '400px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card" style={{ minHeight: '485px' }}>
            <div className="card-header card-header-text">
              <h4 className="card-title">Employees Stats</h4>
              <p className="category">New employees on 15th December, 2016</p>
            </div>
            <div className="card-content table-responsive">
              <table className="table table-hover">
                <thead className="text-primary">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Bob Williams</td>
                    <td>$23,566</td>
                    <td>USA</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Mike Tyson</td>
                    <td>$10,200</td>
                    <td>Canada</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Tim Sebastian</td>
                    <td>$32,190</td>
                    <td>Netherlands</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Philip Morris</td>
                    <td>$31,123</td>
                    <td>Korea, South</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Minerva Hooper</td>
                    <td>$23,789</td>
                    <td>South Africa</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Hulk Hogan</td>
                    <td>$43,120</td>
                    <td>Netherlands</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Angelina Jolie </td>
                    <td>$12,140</td>
                    <td>Australia</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card" style={{ minHeight: '485px' }}>
            <div className="card-header">
              <h4 className="card-title">Task List</h4>
            </div>
            <div className="card-content">
              <div className="dropdown pull-right">
                <button
                  type="button"
                  className="btn btn-round btn-info dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="material-icons">build</i>
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu dropdown-menu-right" role="menu">
                  <li>
                    <a href="#action">Action</a>
                  </li>
                  <li>
                    <a href="#action">Another action</a>
                  </li>
                  <li>
                    <a href="#here">Something else here</a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a href="#link">Separated link</a>
                  </li>
                </ul>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" name="optionsCheckboxes" defaultChecked />
                        </label>
                      </div>
                    </td>
                    <td>Create Annual Training Plan. Get it reviewed by Mike</td>
                    <td className="td-actions text-right">
                      <button
                        type="button"
                        rel="tooltip"
                        title="Edit Task"
                        className="btn btn-primary btn-simple btn-xs"
                      >
                        <i className="material-icons">edit</i>
                      </button>
                      <button
                        type="button"
                        rel="tooltip"
                        title="Remove"
                        className="btn btn-danger btn-simple btn-xs"
                      >
                        <i className="material-icons">close</i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" name="optionsCheckboxes" />
                        </label>
                      </div>
                    </td>
                    <td>Create Tutorials for Induction Training</td>
                    <td className="td-actions text-right">
                      <button
                        type="button"
                        rel="tooltip"
                        title="Edit Task"
                        className="btn btn-primary btn-simple btn-xs"
                      >
                        <i className="material-icons">edit</i>
                      </button>
                      <button
                        type="button"
                        rel="tooltip"
                        title="Remove"
                        className="btn btn-danger btn-simple btn-xs"
                      >
                        <i className="material-icons">close</i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" name="optionsCheckboxes" />
                        </label>
                      </div>
                    </td>
                    <td>Complete wireframe for HR Portal by end of December</td>
                    <td className="td-actions text-right">
                      <button
                        type="button"
                        rel="tooltip"
                        title="Edit Task"
                        className="btn btn-primary btn-simple btn-xs"
                      >
                        <i className="material-icons">edit</i>
                      </button>
                      <button
                        type="button"
                        rel="tooltip"
                        title="Remove"
                        className="btn btn-danger btn-simple btn-xs"
                      >
                        <i className="material-icons">close</i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" name="optionsCheckboxes" defaultChecked />
                        </label>
                      </div>
                    </td>
                    <td>Recruit five developers and get them trained on the new project</td>
                    <td className="td-actions text-right">
                      <button
                        type="button"
                        rel="tooltip"
                        title="Edit Task"
                        className="btn btn-primary btn-simple btn-xs"
                      >
                        <i className="material-icons">edit</i>
                      </button>
                      <button
                        type="button"
                        rel="tooltip"
                        title="Remove"
                        className="btn btn-danger btn-simple btn-xs"
                      >
                        <i className="material-icons">close</i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card" style={{ minHeight: '485px' }}>
            <div className="card-header">
              <h4 className="card-title">Activities</h4>
            </div>
            <div className="card-content">
              <div className="streamline">
                <div className="sl-item sl-primary">
                  <div className="sl-content">
                    <small className="text-muted">5 mins ago</small>
                    <p>Williams has just joined Project X</p>
                  </div>
                </div>
                <div className="sl-item sl-danger">
                  <div className="sl-content">
                    <small className="text-muted">25 mins ago</small>
                    <p>Jane has sent a request for access to the project folder</p>
                  </div>
                </div>
                <div className="sl-item sl-success">
                  <div className="sl-content">
                    <small className="text-muted">40 mins ago</small>
                    <p>Kate added you to her team</p>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-content">
                    <small className="text-muted">45 minutes ago</small>
                    <p>John has finished his task</p>
                  </div>
                </div>
                <div className="sl-item sl-warning">
                  <div className="sl-content">
                    <small className="text-muted">55 mins ago</small>
                    <p>Jim shared a folder with you</p>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-content">
                    <small className="text-muted">60 minutes ago</small>
                    <p>John has finished his task</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header card-header-icon">
              <i className="material-icons">language</i>
            </div>
            <div className="card-content">
              <h4 className="card-title">Global Sales by Top Locations</h4>
              <div className="row">
                <div className="col-md-5">
                  <div className="table-responsive table-sales">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/admin/flags/US.png`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>USA</td>
                          <td className="text-right">2.920</td>
                          <td className="text-right">53.23%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/admin/flags/DE.png`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>Germany</td>
                          <td className="text-right">1.300</td>
                          <td className="text-right">20.43%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/admin/flags/AU.png`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>Australia</td>
                          <td className="text-right">760</td>
                          <td className="text-right">10.35%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/admin/flags/GB.png`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>United Kingdom</td>
                          <td className="text-right">690</td>
                          <td className="text-right">7.87%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/admin/flags/RO.png`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>Romania</td>
                          <td className="text-right">600</td>
                          <td className="text-right">5.94%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/admin/flags/BR.png`}
                                alt=""
                              />
                            </div>
                          </td>
                          <td>Brasil</td>
                          <td className="text-right">550</td>
                          <td className="text-right">4.34%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-6 col-md-offset-1">
                  <div id="worldMap" className="map" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
