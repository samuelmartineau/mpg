import React, {Component, PropTypes} from 'react';
import Autocomplete from 'react-autocomplete';
import {debounce} from 'lodash';
import './AutoComplete.css';

class AutoComplete extends Component {
    state = {
        selectedItem: this.props.defaultSelectedItems,
        searchInput: '',
        filteredItems: this.props.filterFunc('')
    }

    constructor(props) {
        super(props);
        const debounceTime = props.debounceTime || 300;
        this.filterItems = debounce(this.filterItems, debounceTime);
    }

    clearSelection = () => {
        this.setState({selectedItem: null});
        if (this.props.onClearSelection) {
          this.props.onClearSelection();
        }
    }

    onInputSearchChange = (evt, value) => {
        this.setState({searchInput: value, loading: true});
        this.filterItems(value);
    }

    filterItems = (searchInput) => {
        const filteredItems = this.props.filterFunc(searchInput);
        this.setState({filteredItems});
    }

    onSelect = (label, item) => {
        this.setState({searchInput: label, selectedItem: item});
        this.props.onItemClicked(item);
    }

    renderItem = (item, isHighlighted) => {
      const highlightClass = isHighlighted
          ? this.props.itemClassName + '--highlighted'
          : '';
        var className = [this.props.itemClassName, highlightClass].join(' ');
        return (
            <div className={className} key={item.id}>{this.props.displayContentItem(item)}</div>
        );
    }

    renderMenu = (items, searchInput) => {
        return (
            <div className={this.props.menuClassName}>
                {searchInput === ''
                    ? <div>{this.props.hintText}</div>
                    : items
                  }
            </div>
        );
    }

    render() {
        return (
            <div className={this.props.containerClassName}>
                {this.state.selectedItem
                    ? <div className="autocomplete__selected">
                            <div>{this.props.displayContentItem(this.state.selectedItem)}</div>
                            <button onClick={this.clearSelection}>x</button>
                        </div>
                    : <Autocomplete ref="autocomplete" value={this.state.searchInput} inputProps={{
                        name: 'autocomplete'
                    }} items={this.state.filteredItems} getItemValue={() => ''} onSelect={this.onSelect} onChange={this.onInputSearchChange} renderItem={this.renderItem} renderMenu={this.renderMenu} wrapperStyle={{}}/>
}
            </div>
        );
    }
}

AutoComplete.propTypes = {
    hintText: PropTypes.string.isRequired,
    debounceTime: PropTypes.number,
    displayContentItem: PropTypes.func.isRequired,
    onItemClicked: PropTypes.func,
    onClearSelection: PropTypes.func,
    filterFunc: PropTypes.func.isRequired,
    defaultSelectedItems: PropTypes.array
}

export default AutoComplete;
