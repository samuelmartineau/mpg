import React, {Component, PropTypes} from 'react';
import Autocomplete from 'react-autocomplete';
import uuid from 'uuid';
import classNames from 'classnames';
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
        this.setState({searchInput: value});
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
      const classes = classNames(this.props.itemClassName, highlightClass, 'mpg-autocomplete-item');
        return (
            <div className={classes} key={uuid.v1()}>{this.props.displayContentItem(item)}</div>
        );
    }

    debouncedMeny = (items) => {

    }

    renderMenu = (items, searchInput) => {
        return (
            <div className={this.props.menuClassName}>
                {searchInput === ''
                    ? <div className="mpg-autocomplete-hintText" ref="autocomplete-hintText">{this.props.hintText}</div>
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
                            <div className="autocomplete__selectedContainer">{this.props.displayContentItem(this.state.selectedItem)}</div>
                            <button type="button" onClick={this.clearSelection}>x</button>
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
    displayContentItem: PropTypes.func.isRequired,
    filterFunc: PropTypes.func.isRequired,
    onItemClicked: PropTypes.func.isRequired,
    debounceTime: PropTypes.number,
    onClearSelection: PropTypes.func,
    defaultSelectedItems: PropTypes.array
}

export default AutoComplete;
