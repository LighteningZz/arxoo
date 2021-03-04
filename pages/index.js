import React, { Component } from 'react'
import { App } from '../layout'
import { common as msg } from '../constant/locales'
import Catergory from '../components/category'
import { axios } from '../constant'
import RecommendCarousel from '../components/recommend-carousel'
import FlashDeal from '../components/recommend-flash-deals'
import popularPackageComponent from '../container/recomend-carousel/popular-package'
import popularActivityComponent from '../container/recomend-carousel/popular-activity'


class IndexComponent extends Component {


  static async getInitialProps({ ctx, req, router }) {
    let pageProps = {
      mainCategory: [],
      popularPackage: [],
      popularActivity: []
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    await axios.get('/api/MainPage/MainCategory')
      .then((res) => {
        pageProps.mainCategory = res.data;
      })
      .catch(function (error) {
        console.log(error);
      })

    await axios
      .get('/api/MainPage/PopularPackage?Length=10')
      .then((res) => {
        pageProps.popularPackage = res.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    await axios.get('/api/MainPage/popularActivity')
      .then((res) => {
        pageProps.popularActivity = res.data;
      })
      .catch(function (error) {
        console.log(error);
      })

    return { ...pageProps };
  }


  componentDidMount() {
  }

  render() {
    const { t, mainCategory, popularPackage, popularActivity, i18n: { language } } = this.props;
    const propLanguage = { t, language };
    return (
      <App title={t(msg["Let The Journy Begin"])}>
        <section className='section'>
          <div className='container is-medium'>
            <Catergory title={t(msg["Choose your begin"])} fecthData={mainCategory} {...propLanguage} />
          </div>
          <FlashDeal
            title={t(msg["Flash Deal"])}
            columnClasses='is-one-third'
            showItems='3'
            centerIndex={true}
            imageSize='is-16by9'
            {...propLanguage} />
          <div className='container is-medium'>
            <RecommendCarousel title={t(msg["Recommend Package"])}  >
              {
                popularPackage.map((item, index) => popularPackageComponent(`/${language}/Package/${item.PackageID}`, item))
              }
            </RecommendCarousel>
            <RecommendCarousel
              title={msg["Popular Package"]} >
              {
                popularActivity.map((item, index) => popularActivityComponent(`/${language}/Package/${item.PackageID}`, item))
              }
            </RecommendCarousel>
          </div>
        </section>
      </App >
    )
  }
}


export default IndexComponent;