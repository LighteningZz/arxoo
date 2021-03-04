import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery'; //https://github.com/xiaolin/react-image-gallery
import 'react-image-gallery/styles/scss/image-gallery.scss'
import './album.scss'

class AlbumComponent extends Component {

    componentDidMount() {

    }
    render() {
        const { Pictures } = this.props;
        const originalClass = 'image is-16by9'
        const thumbnailClass = 'image'
        let images = Pictures.map((item) => {
            return {
                original: item.Picture,
                thumbnail: item.Picture,
                PictureName: item.PictureName,
                originalClass: originalClass,
                thumbnailClass: thumbnailClass
            }
        });
        return (
            <div className='box'>
                <ImageGallery items={images}
                    autoPlay={true}
                    showPlayButton={false}
                    thumbnailPosition='right'
                    originalClass='box'
                    thumbnailClass='box'
                />
            </div>
        )
    }
}
export default AlbumComponent