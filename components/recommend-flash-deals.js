import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'
import './recommend-flash-deals.scss'
import classNames from 'classnames'

export default class NearbySlickComponent extends Component {
    constructor(props) {
        super(props)
        this.imageElement = [];
    }

    static defaultProps = {
        showItems: 3,
        columnClasses: 'is-one-thid',
        imageSize: 'is-3by2',
        inColumns: false,
        centerIndex: false
    }

    handleArrow = [];

    state = {
        fetchData: [],
        showItems: this.props.showItems,
        index: 0,
        arrowPosition: 0,
        multiplerTranslate: 20,
        arrowLeftHide: true,
        arrowRightHide: false,

    }

    componentDidMount = () => {
        const { fetchData, centerIndex } = this.props;
        if (!fetchData) {
            axios.get('/api/MainPage/promotions')
                .then((res) => {
                    this.setState({ fetchData: res.data.Data }, () => {
                        this.handleAfterFetchData();
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            this.handleAfterFetchData();
        }

    }
    handleAfterFetchData = () => {
        if (this.props.inColumns) {
            this.handleResponsiveColumn(this.container.clientWidth, () => {
                this.handleArrowPosition(this.imageElement[0].offsetHeight)
            });
            window.addEventListener('resize', () => {
                this.handleResponsiveColumn(this.container.clientWidth, () => {
                    this.handleArrowPosition(this.imageElement[0].offsetHeight)
                });
            });
        } else {
            this.handleResponsiveColumn(window.innerWidth, () => {
                this.handleArrowPosition(this.imageElement[0].offsetHeight)
            });
            window.addEventListener('resize', () => {
                this.handleResponsiveColumn(window.innerWidth, () => {
                    this.handleArrowPosition(this.imageElement[0].offsetHeight)
                });
            });
        }
    }

    handleResponsiveColumn = (clientWidth, callback) => {
        if (!clientWidth) return;
        let columnClasses = 'column';
        let multiplerTranslate = 50;
        let showItems = this.props.showItems;
        const centerIndex = this.props.centerIndex ? ((this.state.fetchData.length / 2) - 1) > 0 : false;
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
        console.log(this.state.fetchData.length)
        this.setState(
            {
                columnClasses,
                multiplerTranslate,
                index: centerIndex ? (this.state.fetchData.length / 2) - 1 : 0,
                showItems,
                arrowLeftHide: false,
                arrowRightHide: false
            }, () => {
                if (callback) {
                    callback();
                }
            })
    }

    handleArrowPosition = (offsetHeight) => {
        console.log(offsetHeight)
        if (typeof (offsetHeight) == 'object') {
            this.setState({ arrowPosition: this.handleArrowStyle(offsetHeight.target.offsetHeight / 2) });
        } else {
            this.setState({ arrowPosition: this.handleArrowStyle(offsetHeight / 2) });
        }
    }

    handleArrowStyle = (height) => height > 0 ? { top: height + 'px' } : { display: 'none' };

    handlePrev = (e) => {
        this.handleStyle(false);
    }

    handleNext = (e) => {
        this.handleStyle(true);
    }

    handleStyle = (prevOrNext) => {
        const { index, fetchData, showItems } = this.state;
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
                <div className="container is-medium recommend-flash-deals-cover">
                    <div className='recommend-flash-deals'>
                        <div className='recommend-flash-deals-title '>
                            <h3 className='is-size-4 has-text-weight-semibold'>
                                <i className="fas fa-bolt"></i>&nbsp;
                            {t(title)}
                            </h3>
                        </div>
                        <div className={classNames("btn-slick-cover", { "is-hidden": this.state.arrowLeftHide })}
                            style={{
                                left: '-15px',
                                ...this.state.arrowPosition,
                            }}>
                            <div className="btn-slick-left" onClick={this.handlePrev} >
                                <i className="fas fa-angle-left" ></i>
                            </div>
                        </div>
                        <div className="slick-container" ref={ref => this.container = ref}>
                            <div className='columns is-mobile has-text-left ' style={{ transform: `translateX(-${this.state.multiplerTranslate * this.state.index}%)` }}  >
                                {
                                    this.state.fetchData.map(
                                        (item, index) =>
                                            <div className={this.state.columnClasses} key={item.ID} >
                                                <Link href={`/${language}/Package/${item.ID}`} >
                                                    <a alt={item.Name} >
                                                        <div className="card" ref={ref => index == 0 ? (this.imageElement[0] = ref) : undefined}>
                                                            <div className="card-image">
                                                                {/* <div className="card-badge">
                                                                    <p>Up to -{item.MinDiscount}%</p>
                                                                </div> */}
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
                                                                    <p>
                                                                        <span className='has-text-dark'>{item.ShortDescription}</span>
                                                                        <span className='has-text-primary is-small is-pulled-right'>Up to {item.MaxDiscount}%</span>
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
                                ...this.state.arrowPosition,
                            }}>
                            <div className="btn-slick-right" onClick={this.handleNext}>
                                <i className="fas fa-angle-right" ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
