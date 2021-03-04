import Link from 'next/link'
import Stars from '../../components/stars'


const popularPackage = (link, item) => (<Link href={link} key={item.PackageID} >
    <a alt={item.Name}>
        <div className="card">
            <div className="card-badge">
                <div className="card-badge-left">
                    {
                        item.Rating > 0 ? <span className='has-text-primary'><Stars rate={1} max={1} /> {item.Rating}</span> : ''
                    }
                </div>
                <div className="card-badge-right has-text-white-bis">
                    <span>
                        <i className="fas fa-map-marker-alt"></i> {item.City},{item.Country}
                    </span>
                </div>
            </div>
            <div className="card-image" >
                <div className='image is-16by9' alt={item.Name} >
                    <img
                        src={item.Picture}
                        alt={item.Name}
                    />
                </div>
            </div>
            <div className="card-content">
                <div className="content">

                    <div className="card-title">
                        <span className='has-text-dark has-text-weight-bold'>{item.Name}</span>
                    </div>
                    <div className="card-detail">
                        {
                            item.PriceDiscount &&
                            <span className='has-text-grey discount'>{item.CurrencyCode} {item.Price}</span>
                        }
                    </div>
                    <div className="card-detail">
                        <span className='has-text-primary'>
                            {item.CurrencyCode}&nbsp;
                            {
                                item.PriceDiscount
                                    ? <>
                                        {item.PriceDiscount}
                                        &nbsp;<i className="fas fa-bolt has-text-warning"></i>
                                    </>
                                    : item.Price
                            }
                        </span>
                        &nbsp;
        </div>
                </div>
            </div>
        </div>
    </a>
</Link>)

export default popularPackage;