import React, { Component } from 'react'

class ContentComponent extends Component {
    componentDidMount() {

    }
    render() {
        const { Package } = this.props;
        return (
            <>
                <div className="content is-medium box">
                    <h1>{Package.Detail.Header}</h1>
                </div>
                <div className="content is-medium box">
                    {
                        Package.Detail.Detail && <p>{Package.Detail.Detail}</p>
                    }
                    {
                        Package.Detail.Include &&
                        <>
                            <h2>Include</h2>
                            <p>{Package.Detail.Include}</p>
                        </>
                    }
                    {
                        Package.Detail.Exclude &&
                        < >
                            <h2>Exclude</h2>
                            <p>{Package.Detail.Exclude}</p>
                        </>
                    }
                    {
                        Package.Detail.WhereWillWeGo &&
                        <>
                            <h2>Where Will We Go</h2>
                            <p>{Package.Detail.WhereWillWeGo}</p>
                        </>
                    }
                    {
                        Package.Detail.WhatWeWillDo &&
                        <>
                            <h2>What We Will Do</h2>
                            <p>{Package.Detail.WhatWeWillDo}</p>
                        </>
                    }
                    <ul>
                        {
                            Package.Policies && Package.Policies.map((item, index) => <li key={index}>{item}</li>)
                        }
                    </ul>
                </div>
            </>
        )
    }
}
export default ContentComponent