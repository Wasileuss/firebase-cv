const Languages = (props) => {
    const details = props.data;
    return (
        <div className="skills__languages">
            <h2 className="skills__title title">Language Skills</h2>
            <ul className='skills__list'>
                {details.map((item,idx) =>
                    <li className='skills__item' key={idx}>
                        <p className='skills__title'>{item.language} - <span>{item.level}</span></p>
                    </li>)}
            </ul>
        </div>
    );
}

export default Languages