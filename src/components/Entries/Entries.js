import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import Picker from '../Picker/Picker';
import EntriesForm from './EntriesForm/EntriesForm';
import Spendings from './Spendings/Spendings';
import getDate from '../../helpers/generateCurrentDate';
import authOperations from '../../redux/auth/authOperations';

import styles from './Entries.module.css';

class Entries extends Component {

    state = {
        date: getDate().split('-').reverse().join('-')
    }

    componentDidMount() {
        const { onChangeDate } = this.props;
        const { date } = this.state;

        onChangeDate(date);
    }

    handlerChangeData = e => {
        const { onChangeDate } = this.props;
        const { date } = this.state;
        const value = e.target.value;

        this.setState({ date: value },
            () => onChangeDate(value)
        );
    }

    render() {
        const {logined} = this.props;

        return (<>
            {logined && <div>
                <div className={styles.pickerEntryWrapper}>
                    <Picker date={this.state.date} onChange={this.handlerChangeData} />
                    <EntriesForm />
                </div>
                <Spendings />
            </div>}
        </>
        )
    }
}

const mapStateToProps = (state) => ({
    logined: state.logined
})

export default connect(mapStateToProps, { onChangeDate: authOperations.changeDate })(Entries);