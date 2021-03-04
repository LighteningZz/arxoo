import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'
import './recommend-carousel.scss'
import classNames from 'classnames'
export default class NearbySlickComponent extends Component {
    constructor(props) {
        super(props)
        this.imageElement = [];
    }


    static defaultProps = {
        showItems: 5,
        columnClasses: 'is-one-fifth',
        imageSize: 'is-3by2',
        inColumns: false
    }

    handleArrow = [];

    state = {
        showItems: this.props.showItems,
        index: 0,
        arrowPosition: 0,
        multiplerTranslate: 20,
        arrowLeftHide: true,
        arrowRightHide: false,

    }

    componentDidMount = () => {
        this.handleResponsiveColumn(window.innerWidth);
        window.addEventListener('resize', () => {
            this.handleResponsiveColumn(window.innerWidth);
        });
    }

    handleResponsiveColumn = (clientWidth) => {
        if (!clientWidth) return;
        let columnClasses = 'column';
        let multiplerTranslate = 50;
        let showItems = this.props.showItems;
        const { fetchData } = this.props;
        if (clientWidth < 480) {
            columnClasses += ' is-half'
            showItems = 2;
        } else if (clientWidth < 768) {
            columnClasses += ' is-one-third'
            multiplerTranslate = 33.3;
            showItems = 3;
        } else {
            columnClasses += ' ' + this.props.columnClasses
            multiplerTranslate = 100 / this.props.showItems;
            showItems = this.props.showItems;
        }
        this.setState(
            {
                columnClasses,
                multiplerTranslate,
                index: 0,
                showItems,
                arrowLeftHide: true,
                arrowRightHide: fetchData.length - showItems <= 0
            });
    }

    handlePrev = (e) => {
        this.handleStyle(false);
    }

    handleNext = (e) => {
        this.handleStyle(true);
    }

    handleStyle = (prevOrNext) => {
        const { index, showItems } = this.state;
        const { fetchData } = this.props;
        let translateValue = this.state.multiplerTranslate;
        let newIndex = prevOrNext ? index + 1 : index - 1;
        this.setState({
            index: newIndex,
            addStyle: { transform: `translateX(-${translateValue * newIndex}%)` },
            arrowLeftHide: newIndex == 0,
            arrowRightHide: fetchData.length - newIndex - showItems <= 0
        });
    }

    render() {
        const { title, fetchData, language, t } = this.props;
        return (
            <>
                <hr />
                <div className='recommend-carousel-title is-size-4 has-text-weight-semibold  has-text-dark'>
                    {t(title)}
                </div>
                <div className='recommend-carousel'>
                    <div className={classNames("btn-slick-cover", { "is-hidden": this.state.arrowLeftHide })}
                        style={{
                            left: '-15px',
                            top: '50%'
                        }}>
                        <div className="btn-slick-left" onClick={this.handlePrev} >
                            <i className="fas fa-angle-left" ></i>
                        </div>
                    </div>
                    <div className="slick-container" ref={ref => this.container = ref}>
                        <div className='columns  is-mobile has-text-left ' style={{ transform: `translateX(-${this.state.multiplerTranslate * this.state.index}%)` }}  >
                            {
                                fetchData.map(
                                    (item, index) =>
                                        <div className={this.state.columnClasses} key={item.PackageID} >
                                            <Link href={`/${language}/Package/${item.ID}`} >
                                                <a alt={item.Name}>
                                                    <div className="card">
                                                        <div className="card-image" ref={ref => this.imageElement[index] = ref}>
                                                            <div className={classNames('image', this.props.imageSize)} alt={item.Name} >
                                                                <img
                                                                    src={item.Picture}
                                                                    alt={item.Name}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="content">
                                                                <h3 className='is-size-6 has-text-dark has-text-weight-bold'>{item.Name}</h3>
                                                                {
                                                                    item.PriceDiscount &&
                                                                    <span className='has-text-grey'><s>USD {item.Price}</s></span>
                                                                }
                                                                <p>
                                                                    <span className='has-text-primary'>
                                                                        USD
                                                                        &nbsp;
                                                                        {
                                                                            item.PriceDiscount
                                                                                ? item.PriceDiscount
                                                                                : item.Price
                                                                        }
                                                                    </span>
                                                                    &nbsp;
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
                    <div className={classNames("btn-slick-cover", { "is-hidden": this.state.arrowRightHide })}
                        style={{
                            right: '-15px',
                            top: '50%'
                        }}>
                        <div className="btn-slick-right" onClick={this.handleNext}>
                            <i className="fas fa-angle-right" ></i>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
