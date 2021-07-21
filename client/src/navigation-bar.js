import {Link} from 'react-router-dom';

export default function NavigationBar(){
    return(
        <ul className="nav noselect">
            <li><Link to="/news" className="nav-link">Новости</Link></li>
            <li><Link to="/classes" className="nav-link">Занятия</Link></li>
            <li><Link to="/consultations" className="nav-link">Консультации</Link></li>
            <li><Link to="/games" className="nav-link">Игры</Link></li>
            <li><Link to="/exercises" className="nav-link">Задания</Link></li>
            <li><Link to="/about" className="nav-link">Обо мне</Link></li>
        </ul>
    )
}