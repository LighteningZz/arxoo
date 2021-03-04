import React, { Component } from 'react'
import Link from 'next/link'
import './category.scss'

class PopularComponent extends Component {


    componentDidMount(){
    }

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
                                (item) =>
                                    <div key={item.CategoryID} className='column is-one-eighth-desktop is-four-fifths-mobile'>
                                        <Link href={`/${language}/Search/${item.CategoryID}`} >
                                            <a className='popular'>
                                                <div className="popular-header">
                                                    <div className='image is-3by2'>
                                                        <img src={item.Picture} alt={item.CategoryName} />
                                                    </div>
                                                </div>
                                                <div className='popular-description has-text-grey-darker'>
                                                    <h1 className='has-text-centered'><strong>{item.CategoryName}</strong></h1>
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