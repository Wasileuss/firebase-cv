import React, { useState } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, push, set } from 'firebase/database';
// import Edit from './Edit';

function Todo() {
    // Створення стану для полів "Мова" та "Рівень"
    let [title, setTitle] = useState('');
    let [link, setLink] = useState('');

    // Функція для збереження даних в базу даних та localstorage
    const saveData = async () => {
        // Перевірка наявності значень у полях "Мова" та "Рівень"
        if (!title || !link) {
            alert('Fill all the fields!');
            return;
        }

        try {
            // Отримання посилання на базу даних та створення посилання на розділ "languages" у вузлі "skills"
            const db = getDatabase(app);
            const dbRef = push(ref(db, 'projects'));

            console.log(db);

            // Збереження даних у базу даних
            await set(dbRef, {
                title: title,
                link: link
            });

            // Збереження даних у localstorage
            const localData = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedLocalData = [...localData, { id: dbRef.key, title: title, link: link }];
            localStorage.setItem('tasks', JSON.stringify(updatedLocalData));

            // Виведення повідомлення про успішне збереження
            // alert('Data saved successfully');

            // Очищення полів "Мова" та "Рівень" після успішного збереження
            setTitle('');
            setLink('');

            // Зняття фокусу з кнопки після кліку
            document.activeElement.blur();
        } catch (error) {
            // Виведення повідомлення про помилку у випадку невдалого збереження
            alert('Error saving data: ' + error.message);
        }
    };

    return (
        <div className='about about--add'>
            <div className='about__inputs'>
                
                <input 
                    className='input-border' 
                    type="text" value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder='Enter your title here'
                />
                <input 
                    className='input-border' 
                    type="text" value={link} 
                    onChange={(e) => setLink(e.target.value)} 
                    placeholder='Enter your link here'
                />
                <button className='input-border' onClick={saveData}>Save</button>
            </div>
            {/* <Edit /> */}
        </div>
    );
};

export default Todo;

