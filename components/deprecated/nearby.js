import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'
import './nearby.scss'

export default class NearbyComponent extends Component {

    state = {
        fetchData: []
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { fetchData } = this.state;
        if (fetchData !== nextState.fetchData) {
            return true
        }
        return false
    }

    componentDidMount() {
        const { fetchData } = this.props;
        if (fetchData) {
            this.setState({ fetchData: fetchData });
        } else {
            if (process.browser) {
                axios.get('/api/MainPage/popularpackage').then(({ data }) => {
                    // this.state.fetchData = data.Data;
                    this.setState({ fetchData: data.Data });
                });
            }
        }
    }

    render() {
        const { title, fetchData, language, t } = this.props;

        return (
            <>
                <hr />
                <div className='is-size-3 has-text-weight-semibold  has-text-grey'>
                    {title}
                </div>
                <div className='nearby has-text-right'>
                    <div className='columns is-desktop is-mobile has-text-left' >
                        {
                            this.state.fetchData.map(
                                (item, index) =>
                                    <div className='column is-four-fifths-mobile  is-one-fifth-desktop' key={item.ID}>
                                        <Link href={`/${language}/Package/${item.ID}`} >
                                            <a alt={item.Name}>
                                                <div className="card">
                                                    <div className="card-image">
                                                        <div className="image is-3by2" alt={item.Name} style={{ backgroundImage: 'url(' + encodeURI(item.Picture) + ')' }}>
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="content">
                                                            <h3 className='is-size-6 has-text-dark has-text-weight-bold'>{item.Name}</h3>
                                                            <p>
                                                                <span className='has-text-dark'>{item.Currency}{item.Price}</span>
                                                                &nbsp;
                                                    <span className='is-small'>{item.PriceDesc}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                            )
                        }

                    </div>
                </div>
            </>
        )
    }

}
