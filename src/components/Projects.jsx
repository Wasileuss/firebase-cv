import projects from '../data/projects.json';

const Projects = () => {
    return (
        <div className='projects'>
            <h2 className='projects__title title'>My Projects</h2>
            <ul className='projects__list'>
                {projects.map((item,idx) =>
                    <li className='projects__item' key={idx}>
                        <a className='projects__link' href={item.href} target={item.target} rel={item.rel} aria-label={item.title}>{item.title}</a>
                    </li>
                )}
            </ul>
        </div>
    );
};
    
export default Projects;