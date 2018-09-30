import React, { Component } from 'react';

//search bar used to find biomarker names when name of biomarker is known, but processes involved are not
class SearchBar extends Component {
    filterBiomarker() {
        const val = this.myValue.value;
        this.props.filterBiomarker(val);
    }
    
    render() {
        return (
            <header>
                <form>
                    <input
                        type="text"
                        ref={(value) => this.myValue = value}
                        placeholder="  Search biomarkers"
                        onChange={this.filterBiomarker.bind(this)}
                    />
                </form>
            </header>
        );
    }
}

export default SearchBar;