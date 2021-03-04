import React, { Component } from 'react'
import Link from 'next/link'
import './popular.scss'

class PopularComponent extends Component {



    render() {
        const { title, fecthData, language, t } = this.props;
        return (fecthData.length > 0 &&
            <>
                <div className='populars-title is-size-4 has-text-weight-semibold  has-text-grey'>
                    {t(title)}
                </div>
                <div className='populars'>
                    <div className='columns is-mobile'>
                        {
                            fecthData.map(
                                (item, index) =>
                                    <div key={item.ID} className='column is-one-eighth-desktop is-four-fifths-mobile'>
                                        <Link href={`/${language}/Package/${item.ID}`} >
                                            <a className='popular'>
                                                <div className="popular-header">
                                                    <div className='image is-3by2'>
                                                        <img src={item.Picture} alt={item.Name} />
                                                    </div>
                                                </div>
                                                <div className='popular-description has-text-grey-darker'>
                                                    <h1 className='has-text-centered'><strong>{item.Name}</strong></h1>
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

export default PopularComponent