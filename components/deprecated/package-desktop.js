import React, { Component } from 'react'
import Link from 'next/link'
import Star from '../stars'
import { common as msg } from '../../constant/locales'
import './package-desktop.scss'

class Package extends Component {

    /**
     * Fetch translation file(s).
     * @function Package
     * @param {string} title - Title.
     * @param {array} fecthData - JSON Data.
     * @param {object} t - Translator.
     * @param {string} language - Language.
     * @param {boolean} multiline - Default is true.
     */


    render() {
        const { title, fecthData, language, t } = this.props;
        return (fecthData.length > 0 &&
            <>
                <div className='is-size-4 has-text-weight-semibold  has-text-grey'>
                    {t(title)}
                </div>
                <div className='package-desktop has-text-right'>
                    <div className='columns  is-mobile is-multiline  has-text-left' >
                        {
                            fecthData.map(
                                (item, index) => 
                                    <div className='column is-one-fifth-desktop is-12-mobile' key={item.ID} alt={item.Name}>
                                        <Link href={`/${language}/Package/${item.ID}`} >
                                            <a alt={item.Name}>
                                                <div className="card">
                                                    <div className="card-image">
                                                        <div className="image is-3by2">
                                                            <img src={item.Picture} alt={item.Name} />
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="content">
                                                            <h3 className='is-size-6 has-text-dark has-text-weight-bold'>
                                                                {item.Name}
                                                            </h3>
                                                            <span className='has-text-dark is-small'>
                                                                {item.Currency || '$'} {item.Price}
                                                            </span>
                                                            <br />
                                                            <Star rate={item.Rating} max={5} />
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
                <hr />
            </>
        )
    }

}

export default Package