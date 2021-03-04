import React, { Component } from 'react'
import Stars from '../stars'
import './header.scss'

class HeaderComponent extends Component {


    componentDidMount() {

    }

    render() {
        const { Package } = this.props;
        return (
            <>
                <article className="package-header media box">
                    <div className="media-content">
                        <div className="content">
                            <h1 className='is-size-5'>{Package.PackageName}</h1>
                            <div className='package-header-detail'>
                                <span>{Package.Detail.Detail} </span>
                            </div>
                            {Package.Prices && <>
                                <div className="content">
                                    <br />
                                    <strong >
                                        <i className="fas fa-fire has-text-primary"></i> Booking Prices
                                    </strong>
                                    <ul>
                                        {
                                            Package.Prices.map((item, index) => <li key={index} >
                                                {item.CurrencyCode} <strong key={index}>{item.Prices}</strong> per {item.BookingPersonsTypeName}
                                                <br />
                                            </li>)
                                        }
                                    </ul>
                                </div>
                            </>
                            }
                            <p>
                                <Stars rate={Package.OverAllRating} max={5} />
                                <a className="button is-primary is-outlined is-fullwidth">Booking</a>
                            </p>
                        </div>
                        {Package.Policies && Package.Policies.length > 0 && <>
                            <div className="content is-small">
                                <strong>Policies</strong>
                                <ul>
                                    {
                                        Package.Policies && Package.Policies.map((item, index) => <li key={index}>{item}</li>)
                                    }
                                </ul>
                            </div>
                        </>
                        }
                        <div className="columns">
                            <div className="column">
                                <img alt='Get it on App Store' src='/static/badge/playstore.png' />
                            </div>
                            <div className="column">
                                <img alt='Get it on App Store' src='/static/badge/appstore.png' />
                            </div>
                        </div>
                    </div>
                </article>
            </>
        )
    }
}
export default HeaderComponent