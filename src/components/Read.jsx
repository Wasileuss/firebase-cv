import React, { useState, useEffect } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';

function Read() {
    // Стан для збереження отриманих даних з бази даних
    const [data, setData] = useState([]);

    // Функція для отримання даних з бази даних
    const fetchData = async () => {
        try {
            // Отримання посилання на базу даних та створення посилання на розділ "languages" у вузлі "skills"
            const db = getDatabase(app);
            const dataRef = ref(db, 'projects');

            // Отримання знімку (snapshot) даних з бази даних
            const snapshot = await get(dataRef);

            // Масив для збереження витягнутих даних
            const fetchedData = [];

            // Перебір кожного елемента у знімку та додавання його до масиву
            snapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                fetchedData.push(item);
            });

            // Оновлення стану з отриманими даними
            setData(fetchedData);
        } catch (error) {
            // Виведення повідомлення про помилку у випадку невдалого отримання даних
            console.error('Помилка отримання даних: ', error.message);
        }
    };

    // Ефект відсутній, оскільки дані отримуються лише при кліку на кнопку
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='about about--add'>
            <button className='input-border' onClick={fetchData}>Show</button>
            <button className='input-border' onClick={() => setData([])}>Clear</button>
            <ul className='about__list'>
                {data.map((item, index) => (
                    <li className='about__item' key={index}>
                        <Link to={item.link} className='about__link' target='_blank' rel='noopener noreferrer'>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Read;