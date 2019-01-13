// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Dropdown from '.';
import styles from './stories.css';

const Button = ({ children, ...attr }) => {
    return <button {...attr}>{children}</button>;
};

const stories = storiesOf('Dropdown', module);
stories.addDecorator(withKnobs);

stories.add('Basic', () => (
    <div className={styles.wrap}>
        <div className={styles.top}>
            <Dropdown>
                <Dropdown.Trigger>Trigger</Dropdown.Trigger>
                <Dropdown.Content>Content</Dropdown.Content>
            </Dropdown>
        </div>
        <div className={styles.bottom}>
            <Dropdown>
                <Dropdown.Trigger>Trigger</Dropdown.Trigger>
                <Dropdown.Content>Content</Dropdown.Content>
            </Dropdown>
        </div>
    </div>
));

class Wrapper extends React.Component<{}, { isOpen: boolean }> {
    state = { isOpen: false };

    handleToggle = () => this.setState(state => ({ isOpen: !state.isOpen }));
    handleChange = isOpen => this.setState({ isOpen });

    render() {
        return (
            <div className={styles.wrap}>
                <Dropdown
                    className={styles.controllable}
                    ariseDirection="auto"
                    id="customDropdown"
                    isOpen={this.state.isOpen}
                    onChange={this.handleChange}
                >
                    <Dropdown.Trigger>Trigger</Dropdown.Trigger>
                    <Dropdown.Content>Content</Dropdown.Content>
                </Dropdown>
                <Dropdown.Trigger onClick={this.handleToggle} id="customDropdown" tag={Button}>
                    Toggle
                </Dropdown.Trigger>
            </div>
        );
    }
}

stories.add('Controllable', () => <Wrapper />);
