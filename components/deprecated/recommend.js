import React, { Component } from 'react'
import Link from 'next/link'
import Star from '../stars'
import { common as msg } from '../../constant/locales'
import classes from 'classnames'
import './recommend.scss'

/**
 * Fetch translation file(s).
 * @function Recommend
 * @param {string} title - Title.
 * @param {array} fecthData - JSON Data.
 * @param {object} t - Translator.
 * @param {string} language - Language.
 * @param {boolean} multiline - Default is true.
 * @param {boolean} columnSize - Default is 5.
 * @param {boolean} imageSize - Default is 4by3.
 */

class Recommend extends Component {

    columnSize = column => classes('column',
        {
            'is-one-third-desktop is-half-mobile': column == 3,
            'is-one-quarter-desktop is-half-mobile': column == 4,
            'is-one-fifth-desktop is-half-mobile': column == 5,
            'is-one-sixth-desktop is-half-mobile': column == 6,
            'is-one-seventh-desktop is-half-mobile': column == 7,
            'is-one-eighth-desktop is-half-mobile': column == 8
        });
    imageSize = (size) => 'image ' + size;
    render() {
        const { title, fecthData, language, t, multiline = true, columnSize = 5, imageSize = '16by9' } = this.props;
        return (fecthData.length > 0 &&
            <>
                <div className='is-size-3 has-text-weight-semibold  has-text-grey'>
                    {t(title)}
                </div>
                <div className='recommend has-text-right'>
                    <div className={`columns is-mobile has-text-left ${multiline && 'is-multiline'}`} >
                        {
                            fecthData.map(
                                (item, index) =>
                                    <div className={this.columnSize(columnSize)} key={item.ID} alt={item.Name}>
                                        <Link href={`/${language}/Package/${item.ID}`} >
                                            <a alt={item.Name}>
                                                <div className="card">
                                                    <div className="card-image">
                                                        <div className={this.imageSize(imageSize)} >
                                                            <img src={item.Picture} alt={item.Name} />
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="content">
                                                            <h3 className='is-size-6 has-text-dark has-text-weight-bold'>{item.Name}</h3>
                                                            <span className='has-text-dark is-small'>{item.Currency || '$'} {item.Price}</span>
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
                    <a className="button is-right">{t(msg.Explore)}</a>
                </div>
                <hr />
            </>
        )
    }

}

export default Recommend