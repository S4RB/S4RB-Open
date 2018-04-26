import axios from 'axios';
import * as React from 'react';
import './App.css'
import { Button } from "./components/Button/Button";

// import { ComplainQuaterResult, ComplainMonthlyResult } from '../../types/ComplainTypes';

const tHeadsQuater = [
    <td>Year</td>,
    <td>Quarter</td>,
    <td>CPMU</td>,
];

const tHeadsMontly = [
    <td>Month</td>,
    <td>CPMU</td>
];

class App extends React.Component {
    state = {
        cpmuJson: [],
        period: 'monthly'
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.getCpmu = this.getCpmu.bind(this)
    }

    componentDidMount(): void {
        this.getCpmu()
    }

    private getCpmu(period?: string): void {
        let url: string = '/data/cpmu';

        if(period === 'quarterly') {
            url = url + '?period=quarterly'
        }

        axios
            .get(url)
            .then(res => {
                this.setState({
                    cpmuJson: res.data,
                    period: period
                });
            });
    }

    private printRowsMonthly() {
        return this.state.cpmuJson
            .map((cp,i ) => <tr key={i}><td>{cp.year}</td><td>{cp.quarter}</td><td>{cp.cpmu}</td></tr>);
    }

    private printRowsQuaterly() {
        return this.state.cpmuJson
            .map((cp,i ) => <tr key={i}><td>{cp.month}</td><td>{cp.cpmu}</td></tr>)
    }

    private isButtonActive(name: string): boolean {
        return this.state.period === name;
    }

    public render() {
        let rows = [];
        let tHeads = [];

        if(this.state.cpmuJson.length) {
            rows   = this.state.period === 'quarterly' ? this.printRowsMonthly() : this.printRowsQuaterly();
            tHeads = this.state.period === 'quarterly' ? tHeadsQuater : tHeadsMontly;
        }

        return (
            <div>
                <Button
                    click={this.getCpmu}
                    name={'monthly'}
                    isActive={this.isButtonActive('monthly')}/>
                <Button
                    click={this.getCpmu}
                    name={'quarterly'}
                    isActive={this.isButtonActive('quarterly')}/>
                <h1>Complaints per million units</h1>
                <table className="cpmuTable">
                    <thead>
                        { tHeads }
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
