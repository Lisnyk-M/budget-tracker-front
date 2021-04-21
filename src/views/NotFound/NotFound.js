import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div>
        <h1 style={{ fontSize: 100 + 'px', textAlign: "center" }}>404</h1>
        <p>Кажется вы потерялись, вот <Link to="/">ссылка на главную страницу</Link> </p>
    </div>
)

export default NotFound;