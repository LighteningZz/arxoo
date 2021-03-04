import './stars.scss'

const Rating = (rate = 0, max) => {
    let html = [];
    let halfAt = Math.floor(rate);
    for (let i = 0; i < max; i++) {
        let classes = 'star';
        if (rate > i) {
            if (rate % 1 > 0 && i == halfAt) {
                classes += ' active half';
            }
            else {
                classes += ' active';
            }
        }
        html.push(<i key={i} className={classes}></i>)
    }
    return html;
}
const StarComponent = ({ rate, max }) => <span className='stars'>{Rating(rate, max)}</span>

export default StarComponent