import softskills from '../data/softskills.json';

const SoftSkills = () => {
    return (
        <div className="skills__softskills">
            <h2 className="skills__title title">Soft Skills</h2>
            <ul className='skills__list'>
                {softskills.map((item,idx) =>
                    <li className='skills__item' key={idx}>
                        <p className='skills__title'>{item.soft}</p>
                    </li>)}
            </ul>
        </div>
    );
}

export default SoftSkills