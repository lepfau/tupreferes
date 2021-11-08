import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function AddPost() {
    const [choix1, setChoix1] = useState('');
    const [choix2, setChoix2] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!choix1 || !choix2) return setError('All fields are required');

        // post structure
        let post = {
            choix1,
            choix2,
            pourcent1 : 50,
            pourcent2: 50,
                    createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();
        if (data.success) {
            // reset the fields
            setChoix1('');
            setChoix2('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <label>Choix 1</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setChoix1(e.target.value)}
                            value={choix1}
                            placeholder="title"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Choix 2</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setChoix2(e.target.value)}
                            value={choix2}
                            placeholder="title"
                        />
                    </div>
              
                    <div className={styles.formItem}>
                        <button type="submit">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}