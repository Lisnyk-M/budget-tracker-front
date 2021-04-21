import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import authOperations from '../../../redux/auth/authOperations';
import SpendingsItem from '../EntriesForm/SpendingsItem/SpendingsItem';

import styles from './Spendings.module.css';
import slide from './slide.module.css';

class Spendings extends Component {
    componentDidMount(prevProps) {
        const { onGetEntry, logined, date } = this.props;

        if (logined) {
            onGetEntry(date);
        }
    }

    componentDidUpdate(prevProps) {
        const { onGetEntry, logined, entryResponse, entries, date } = this.props;

        if (prevProps.logined !== logined) {
            onGetEntry(date);
        }

        if (prevProps.entryResponse !== entryResponse) {
            onGetEntry(date);
        }

        if (prevProps.date !== date) {
            onGetEntry(date)
        }
    }

    handleClick = id => {
        const { date } = this.props;

        const reqObject = {
            date,
            id,
        }

        this.props.onDeleteEntry(reqObject);
    }

    handleClickEdit = id => {
        const { date } = this.props;

        const reqObject = {
            date,
            id,
        }

        this.props.onGetPosition(reqObject);
    }

    render() {
        const { entries } = this.props.entries;
        const { logined } = this.props;

        let total = 0;

        if (logined && entries && entries.length > 0) {
            total = entries.reduce((prev, cur) => prev + cur.spent, 0);
        }

        return (
            <div>
                <h3>Day spendings:</h3>
                <TransitionGroup component="ul" className={styles.list}>
                    {logined && entries && entries.length > 0 && entries.map(entry => (
                        <CSSTransition key={entry._id} timeout={300} classNames={slide} appear={false}>
                            <SpendingsItem
                                key={entry._id}
                                id={entry._id}
                                category={entry.category}
                                spent={entry.spent}
                                onClickDelete={this.handleClick}
                                onClickEdit={this.handleClickEdit}
                            />
                        </CSSTransition>
                    ))}

                </TransitionGroup>

                <div className={styles.wrapperTwoP}>
                    <div>
                        <p className={styles.title}>Total</p>
                    </div>
                    <div>
                        <p className={styles.title}>{total}$</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    logined: state.logined,
    entryResponse: state.entryResponse,
    entries: state.entries,
    date: state.date,
})

export default connect(mapStateToProps, {
    onGetEntry: authOperations.getEntry,
    onDeleteEntry: authOperations.deleteEntry,
    onGetPosition: authOperations.getPosition,
})(Spendings);