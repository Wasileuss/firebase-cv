import { Link } from 'react-router-dom';
import sertificates from '../data/sertificates.json';

const Sert = () => {
    return (
        <div className='sert'>
            <h2 className='sert__title title'>Sertificates</h2>
            <ul className='sert__list'>
                {sertificates.map((item,idx) =>
                    <li className='sert__item' title={item.title} key={idx}>
                        <Link to={item.href} className='sert__link' target={item.target} rel={item.rel}>{item.school}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Sert