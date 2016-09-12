import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import AutoComplete from './AutoComplete';
import TestUtils from 'react-addons-test-utils';

const filterFunc = (entry) => [4, 3, 1, 0, 1, 2, 0, 3, 4].filter(number => number > parseInt(entry, 10));

describe('Autocomplete', () => {
  let Autocomplete;
  const hintText = '...';
  const debounceTime = 400;

  beforeEach(() => {
    Autocomplete = TestUtils.renderIntoDocument(
      <AutoComplete
          debounceTime={debounceTime}
          displayContentItem={item => item}
          hintText={hintText}
          filterFunc={filterFunc}
          onItemClicked={() => {}}
        />
    );
  });

  it('should display hint text on empty change', () => {
    const AutocompleteNode = ReactDOM.findDOMNode(Autocomplete);
    const input = AutocompleteNode.getElementsByTagName('input')[0];

    TestUtils.Simulate.keyDown(input, {key: ''});

    expect(AutocompleteNode.querySelector('.mpg-autocomplete-hintText').textContent).toEqual(hintText);
  });

  it('should display filter items on entry change', () => {
    const clock = sinon.useFakeTimers();
    const AutocompleteNode = ReactDOM.findDOMNode(Autocomplete);
    const input = AutocompleteNode.getElementsByTagName('input')[0];
    const searchInput = '3';

    TestUtils.Simulate.keyDown(input, { value: searchInput });
    TestUtils.Simulate.change(input, { target: { value: searchInput } });

    clock.tick(debounceTime + 1);

    expect(AutocompleteNode.getElementsByClassName('mpg-autocomplete-item').length).toEqual(filterFunc(searchInput).length);
  });

});
