import React, { Component } from 'react';

class ProcessTable extends Component {
    render(){
        const { data } = this.props;
        //filters biomarker list from search parameters
        const selectList = data.map(process => {
            return(
                <li
                    key={Math.random()}
                    className={process.processes}
                >
                {process.processes}
                </li>
            );
        });
        
        return (
            <div>
                <h2>Processes</h2>
                <ul>
                    {selectList}
                </ul>
            </div>
        );
    }
}

export default ProcessTable;