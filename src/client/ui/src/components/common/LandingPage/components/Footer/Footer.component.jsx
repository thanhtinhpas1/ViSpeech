/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-5 sm-m-15px-tb">
            <h4>About Us</h4>
            <p className="footer-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            </p>
            <ul className="social-icons">
              <li>
                <a className="facebook" href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a className="google" href="#">
                  <i className="fab fa-google-plus-g" />
                </a>
              </li>
              <li>
                <a className="linkedin" href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-5 col-lg-4 sm-m-15px-tb">
            <h4>Helpful Links</h4>
            <div className="d-flex justify-content-around">
              <ul className="list-style">
                <li>
                  <a href="#">Gym Training</a>
                </li>
                <li>
                  <a href="#">Crossfit</a>
                </li>
                <li>
                  <a href="#">Cardio</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
              <ul className="list-style">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Trainings</a>
                </li>
                <li>
                  <a href="#">Coaches</a>
                </li>
                <li>
                  <a href="#">Club cards</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 sm-m-15px-tb">
            <h4 className="font-18 font-alt color-white font-w-600 m-0px m-15px-b">Get in touch</h4>
            <p>12345 Little Lonsdale St, Melbourne</p>
            <p>
              <span>E-Mail:</span> info@example.com
            </p>
            <p>
              <span>Phone:</span> (123) 123-456
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 footer-copy">
            <p className="m-0px">© Copyright by Moxo. Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
