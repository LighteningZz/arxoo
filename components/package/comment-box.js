import React, { Component } from 'react'

class CommentBoxComponent extends Component {
    render() {
        return (
            <div className='content is-medium box'>
                <div className="field">
                    <label className="label">Write a journy.</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="e.g. Hello world"></textarea>
                    </div>
                </div>
                <div className="field">
                    <div className="file is-primary is-small  has-text-right">
                        <label className="file-label">
                            <input className="file-input" type="file" name="resume" multiple />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Upload
                               </span>
                            </span>
                        </label>
                    </div>
                </div>

                <div className="field">
                    <div className="control has-text-right">
                        <button className="button is-primary is-small">Send.</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentBoxComponent