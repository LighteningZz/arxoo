import React, { Component } from 'react'
import { translate } from "react-i18next";
import { common as msg } from '../constant/locales'
import { Router } from '../routes'
import './nav.scss'
import Link from 'next/link'

class Nav extends Component {
  static async getInitialProps(initProps) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(initProps.ctx);
    }

    return { ...pageProps };
  }
  state = {
    Language: [],
    Currency: []
  }

  handleChangeLanguage = (LanguageCode) => {
    return async event => {
      event.preventDefault();
      const lang = LanguageCode.toLowerCase();
      const route = Router.router;
      this.props.i18n.changeLanguage(lang);
      Router.push(`/${lang}${route.asPath.substring(3, route.asPath.length)}`);
    }
  }

  handleBurger = event => {
    event.preventDefault();
    var $navbarBurgers = event.target;
    var $navbarMenu = document.querySelectorAll('.navbar-menu')[0];
    $navbarBurgers.classList.toggle('is-active');
    $navbarMenu.classList.toggle('is-active');
  }

  componentWillMount() {
    this.setState({
      Language: [
        { LanguageCode: 'TH', LanguageName: 'ภาษาไทย' }
        , { LanguageCode: 'EN', LanguageName: 'English' }
      ],
      Currency: [
        { CurrencyCode: 'THB', CurrencyName: 'บาทไทย' }
        , { CurrencyCode: 'USD', CurrencyName: 'ดอลลาร์สหรัฐ' }
      ]
    });
  }

  componentDidMount() {
    console.log(Router)
  }

  render() {
    const { t, i18n: { language } } = this.props;
    return (
      <>
        <nav className='navbar is-fixed-top' aria-label="main navigation">
          <div className="navbar-brand ">
            <Link href={`/${language}`}>
              <a className='navbar-item'>
                <img src="//arxoo.com/Content/img/ArxooLogo.png" height="28" alt="ARXOO" />
              </a>
            </Link>
            <a role="button" className='navbar-burger' aria-label="menu" aria-expanded="false" onClick={this.handleBurger}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className='navbar-menu'>
            <div className="navbar-start">
              <div className='navbar-item'>
                <div className="control has-icons-left">
                  <input className="input is-radiusless" type="text" placeholder="I will go ..." />
                  <span className="icon is-small is-left">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className='navbar-item has-dropdown is-hoverable is-hidden-mobile'>
                <a className="navbar-link">
                  {t(msg.Currency)}
                </a>
                <div className="navbar-dropdown">
                  {
                    this.state.Currency.map(
                      ({ CurrencyCode, CurrencyName }) => (
                        <a to='/' key={CurrencyCode} className="navbar-item">{CurrencyCode}</a>
                      )
                    )
                  }
                </div>
              </div>
              <div className='navbar-item has-dropdown is-hoverable is-hidden-mobile'>
                <a className="navbar-link">
                  {t(msg.Language)}
                </a>
                <div className="navbar-dropdown">
                  {
                    this.state.Language.map(
                      ({ LanguageCode, LanguageName }) => (
                        <a key={LanguageCode} className="navbar-item" onClick={this.handleChangeLanguage(LanguageCode)}>{LanguageName}</a>
                      )
                    )
                  }
                </div>
              </div>
              <a className='navbar-item '>
                {t(msg["Sign up"])}
              </a>
              <a className='navbar-item '>
                {t(msg["Sign in"])}
              </a>
            </div>
          </div>
        </nav>
      </>
    )
  }
}
export default translate(['common'])(Nav);