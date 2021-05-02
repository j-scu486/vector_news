import React from 'react';
import renderer from 'react-test-renderer';
import Message from '../components/Message';
import * as ReactDOM from "react-dom"

test('Component renderes properly', () => {
    const messageDiv = document.createElement("div");
    ReactDOM.render(<Message />, messageDiv);

    expect(messageDiv.querySelector('class')).toBe('message-success')
})