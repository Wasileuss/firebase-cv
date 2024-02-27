import TechSkills from './TechSkills';
import SoftSkills from './SoftSkills';
import Languages from './Languages';
import languages from '../data/languges.json';
import interests from '../data/interests.json';

const Skills = () => {
    return (
        <div className="skills">
            <TechSkills />
            <SoftSkills />
            <Languages data={languages} />
            <div className="skills__interests">
                <h2 className="skills__title title">Interests</h2>
                <ul className="skills__list">
                    {interests.map((item, idx) => (
                        <li className="skills__item" key={idx}>{item.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Skills
