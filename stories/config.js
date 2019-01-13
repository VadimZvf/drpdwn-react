import { configure, addDecorator } from '@storybook/react';
import container from './container';

const stories = require.context('../src', true, /stories.js$/);

/* eslint-disable global-require */
function loadStories() {
    stories.keys().forEach(filename => stories(filename));
}
/* eslint-enable global-require */

addDecorator(container);
configure(loadStories, module);
