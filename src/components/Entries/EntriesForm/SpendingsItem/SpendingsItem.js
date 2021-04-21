import React from 'react';
import EntryButton from '../../../EntryButton/EntryButton';

import styles from './SpendingsItem.module.css';

const SpendingsItem = ({ category, spent, onClickDelete, onClickEdit, id }) =>
    <li className={styles.item}>
        <div className={styles.wrapperTwoP}>
            <div>
                <p className={styles.title}>{category}</p>
            </div>
            <div>
                <p className={styles.title}>{spent}$</p>
            </div>
        </div>
        <div className={styles.wrapperTwoButtons}>
            <div className={styles.buttonWrapper}>
                <EntryButton title="Edit" onClick={() => onClickEdit(id)}/>
            </div>
            <div className={styles.buttonWrapper}>
                <EntryButton title="Delete" onClick={() => onClickDelete(id)}/>
            </div>
        </div>
    </li>

export default SpendingsItem;