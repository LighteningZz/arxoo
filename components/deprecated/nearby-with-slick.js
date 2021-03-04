import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'
import './nearby-with-slick.scss'
import classNames from 'classnames'
export default class NearbySlickComponent extends Component {
    constructor(props) {
        super(props)
        this.imageElement = [];
    }


    static defaultProps = {
        showItems: 5,
        columnClasses: 'is-one-fifth'
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
        const { fetchData } = this.props;
        if (!fetchData) {
            axios.get('/api/MainPage/popularpackage')
                .then((res) => {
                    this.setState({ fetchData: res.data.Data }, () => {
                        this.setState({
                            arrowRightHide: this.state.fetchData.length - this.state.showItems <= 0
                        });

                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        this.handleResponsiveColumn(this.container.clientWidth);
        window.addEventListener('resize', () => {
            this.handleResponsiveColumn(this.container.clientWidth, () => {
                this.handleArrowPosition(this.imageElement[0].offsetHeight)
            });
        });
    }


    handleResponsiveColumn = (clientWidth, callback) => {
        if (!clientWidth) return;
        let columnClasses = 'column';
        let multiplerTranslate = 50;
        let showItems = this.props.showItems;
        if (clientWidth < 476) {
            columnClasses += ' is-half'
            showItems = 2;
        } else if (clientWidth < 764) {
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
                arrowRightHide: this.state.fetchData.length - showItems <= 0
            }, () => {
                if (callback) {
                    callback();
                }
            })
    }

    handleArrowPosition = (offsetHeight) => {
        if (typeof (offsetHeight) == 'object') {
            this.setState({ arrowPosition: this.handleArrowStyle(offsetHeight.target.offsetHeight / 2) });
        } else {
            this.setState({ arrowPosition: this.handleArrowStyle(offsetHeight / 2) });
        }
    }

    handleArrowStyle = (height) => height > 0 ? { top: height + 'px' } : { display: 'none' };

    handlePrev = (e) => {
        const { showItems } = this.props;
        const { index } = this.state;
        this.handleStyle(false);
    }

    handleNext = (e) => {
        const { showItems } = this.props;
        const { index } = this.state;
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
        console.log((this.state.index + this.state.showItems) == this.state.fetchData.length)
        return (
            <>
                <hr />
                <div className='is-size-3 has-text-weight-semibold  has-text-grey'>
                    {title}
                </div>
                <div className='nearby-with-slick'>
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
                        <div className='columns  is-mobile has-text-left ' style={{ transform: `translateX(-${this.state.multiplerTranslate * this.state.index}%)` }}  >
                            {
                                this.state.fetchData.map(
                                    (item, index) =>
                                        <div className={this.state.columnClasses} key={item.ID} >
                                            <Link href={`/${language}/Package/${item.ID}`} >
                                                <a alt={item.Name}>
                                                    <div className="card">
                                                        <div className="card-image" ref={ref => this.imageElement[index] = ref}>
                                                            <div className="image is-3by2" alt={item.Name} >
                                                                <img
                                                                    src={item.Picture}
                                                                    alt={item.Name}
                                                                    onLoad={index == 0 ? this.handleArrowPosition : undefined}
                                                                />
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

            </>
        )
    }

}
