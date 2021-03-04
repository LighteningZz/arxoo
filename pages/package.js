import React, { Component } from 'react'
import { App } from '../layout'
import { translate } from "react-i18next";
import { Album, Header, Content, Comment, CommentBox, Map } from '../components/package'
import Sticky from 'react-stickynode'
import { axios } from '../constant'
import ErrorPage from 'next/error'
import { common as msg } from '../constant/locales'

class PackageComponent extends Component {

  static async getInitialProps({ ctx, res, query }) {
    let pageProps = {
      Package: {
        Detail: {},
        Pictures: [],
        Prices: [],
        Policies: [],
      }
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (query.id) {
      await axios.get('/api/Package/' + query.id)
        .then((res) => {
          pageProps.Package = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });


    } else {
      pageProps.error = { statusCode: 404 };
    }

    return { ...pageProps };
  }
  state = {
    LocationData: [],
    Review: []
  }

  componentDidMount() {
    const { Package } = this.props;
    axios.get('/api/Package/' + Package.PackageID + '/Location')
      .then((res) => {
        this.setState({ LocationData: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { t, i18n: { language }, Package, error, LocationData } = this.props;
    const comments = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (error) {
      return <ErrorPage statusCode={error.statusCode} />
    }
    return (
      <>
        <style>{` 
          #maps {
             height: 300px;
          }`
        }
        </style>
        <App title='Package'>
          <section className='section'>
            <div className='package-container container'>
              <div className="content is-medium box">
                <h1>{Package.PackageName}</h1>
              </div>
              <div className="columns">
                <div className="column is-12">
                  <Album Pictures={Package.Pictures} />
                </div>
              </div>
              <div className="columns">
                <div className="column is-9">
                  <Content Package={Package} />
                  {this.state.LocationData.length > 0 && <Map title={t(msg.Location)} data={this.state.LocationData} />}
                  <CommentBox />
                  {
                    comments.map(
                      (item) => <Comment key={item} />
                    )
                  }
                </div>
                <div className="column is-3">
                  <Sticky>
                    <Header Package={Package} />
                  </Sticky>
                </div>
              </div>
            </div>
          </section>
        </App>
      </>
    )
  }
}


export default PackageComponent;