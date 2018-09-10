import React, { Component } from 'react';

class BiomarkerName extends Component {
    render(){
        const { data, filterText, addBiomarker} = this.props;
        //filters biomarker list from search parameters
        const bioList = data.filter(bio => {
            return bio.marker.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
        })
        .map(bio => {
            return(
                <li
                    key={bio._id}
                    className={bio.processes}
                    onClick={() => addBiomarker(bio._id)}
                >{bio.marker}
                </li>
            );
        });
        
        return (
            <div>
                <ul>
                    {bioList}
                </ul>
            </div>
        );
    }
}

export default BiomarkerName;