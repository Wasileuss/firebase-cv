import React, { useState, useEffect } from 'react';
import app from '../firebaseConfig';
import { getDatabase, ref, onValue, get, update, remove } from 'firebase/database';

function Edit() {
    // Стейти для зберігання даних та параметрів редагування
    const [data, setData] = useState([]); // Дані з бази даних
    const [editingItem, setEditingItem] = useState(null); // Об'єкт, який редагується
    const [editedTitle, setEditedTitle] = useState(''); // Змінна для редагування назви мови
    const [editedLink, setEditedLink] = useState(''); // Змінна для редагування рівня володіння мовою
    const [componentMounted, setComponentMounted] = useState(false);

    // Функція для отримання даних з Firebase Realtime Database
    const fetchData = async () => {
        try {
            // Створення екземпляру Firebase Realtime Database
            const db = getDatabase(app);
            // Створення посилання на колекцію "notepad/tasks"
            const dataRef = ref(db, 'projects');

            // Підписка на зміни в колекції "notepad/tasks"
            onValue(dataRef, (snapshot) => {
                // Отримання масиву даних з документа
                const fetchedData = [];
                snapshot.forEach((childSnapshot) => {
                    const item = childSnapshot.val();
                    // Додавання id документа до даних
                    fetchedData.push({ ...item, id: childSnapshot.key });
                });
 
                // Оновлення стану даних
                setData(fetchedData);
            });
        } catch (error) {
            // Виведення повідомлення про помилку
            console.error('Error receiving data: ', error.message);
        }
    };

    useEffect(() => {
        if (componentMounted) {
            fetchData();
        }
    }, [componentMounted]);

    // Функція для отримання даних з localstorage
    const fetchLocalStorageData = () => {
        const localData = JSON.parse(localStorage.getItem('tasks')) || [];
        setData(localData);
    };

    // Завантаження даних при монтируванні компонента
    useEffect(() => {
        setComponentMounted(true);
        fetchData();
        fetchLocalStorageData();
        return () => {
            // Відписка від змін при демонтируванні компонента
        };
    }, []);

    // Функція для редагування даних
    const handleEdit = (item) => {
        // Оновлення id документа, що редагується
        setEditingItem(item);
        // Оновлення назви мови
        setEditedTitle(item.title);
        // Оновлення рівня володіння мовою
        setEditedLink(item.link);
    };

     // Функція для збереження даних
    const handleSave = async () => {
        try {
            // Створення екземпляру Firebase Realtime Database
            const db = getDatabase(app);
            // Створення посилання на документ "notepad/tasks/<id>"
            const dataRef = ref(db, 'projects/' + editingItem.id);
            // Перевірка існування документа
            const snapshot = await get(dataRef);

            if (snapshot.exists()) {
                // Оновлення лише певних полів
                await update(dataRef, {
                    title: editedTitle,
                    link: editedLink,
                });

                // Оновлення localstorage
                const updatedData = data.map(item => (item.id === editingItem.id ? { ...item, title: editedTitle, link: editedLink } : item));
                localStorage.setItem('tasks', JSON.stringify(updatedData));
                // Оновлення даних після збереження
                fetchData();
                // Очищення стану редагування
                setEditingItem(null);
                setEditedTitle('');
                setEditedLink('');
            } else {
                console.error('Document does not exist');
            }
        } catch (error) {
            // Виведення повідомлення про помилку
            console.error('Data saving error: ', error.message);
        }
    };

    // Функція для видалення даних
    const handleRemove = async (id) => {
        try {
            // Створення екземпляру Firebase Realtime Database
            const db = getDatabase(app);
            // Створення посилання на документ "notepad/tasks/<id>"
            const dataRef = ref(db, 'projects/' + id);
            // Видалення документа
            /*await*/ remove(dataRef);

            // Оновлення localstorage
            const updatedData = data.filter(item => item.id !== id);
            localStorage.setItem('tasks', JSON.stringify(updatedData));
            // Оновлення даних після видалення
            fetchData();
        } catch (error) {
            // Виведення повідомлення про помилку
            console.error('Data deletion error: ', error.message);
        }
    };

    // Функція для відображення підтвердження видалення
    const confirmDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            handleRemove(id);
        }
    };

    return (
        <div className="about about--add">
            <ul>
                {data.slice().map((item) => (
                    <li className="about__list" key={item.id}>
                        {editingItem && editingItem.id === item.id ? (
                            <div className="about__item">
                                <input
                                    className="input-border"
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <input
                                    className="input-border"
                                    type="text"
                                    value={editedLink}
                                    onChange={(e) => setEditedLink(e.target.value)}
                                />
                                <button className="input-border" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="about__item">
                                <div className="about__inputs">
                                    <p>{item.title}</p>
                                    <p>{item.link}</p>
                                </div>
                                <div className="about__buttons">
                                    <button className="input-border" onClick={() => handleEdit(item)}>
                                        Edit
                                    </button>
                                    <button className="input-border" onClick={() => confirmDelete(item.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Edit;