import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import StationList from '../../components/StationList';

const stations = [
  { name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" },
  { name: 'Mayank', title: 'Hi Mern', slug: 'hi-mern', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'" },
];

test('renders the list', t => {
  const wrapper = shallow(
    <StationList stations={stations} handleShowStation={() => {}} handleDeleteStation={() => {}} />
  );

  t.is(wrapper.find('StationListItem').length, 2);
});
