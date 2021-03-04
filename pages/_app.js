import React from 'react'
import App, { Container } from 'next/app'
import { I18nextProvider } from 'react-i18next'
import { translate } from "react-i18next"
import { getTranslation } from '../tools/translationHelpers'
import startI18n from '../tools/startI18n'
import axios from '../constant/axios'

class MyApp extends App {

    static async getInitialProps({ Component, ctx, router, build }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const lang = router.query.lang || 'en';
        let translations;
        if (build) {
            translations = await getTranslation(
                lang,
                ['common'],
                `http://localhost:3000/static/locales/`
            )
        }
        axios.defaults.headers.common['LanguageCode'] = lang;
        return { pageProps, translations, lang }
    }

    constructor(props) {
        super(props)
        this.i18n = startI18n(props.translations, props.lang);
    }

    render() {
        const { Component, pageProps, lang } = this.props;
        const I18nextComponent = translate(['common'])(Component);
        return (
            <Container>
                <I18nextProvider i18n={this.i18n}>
                    <I18nextComponent {...pageProps} />
                </I18nextProvider>
            </Container>
        )
    }
}
export default MyApp