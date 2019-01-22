# drpdwn-react

react dropdown

## Usage

```
import Dropdown from 'drpdwn-react';

...

<Dropdown>
    <Dropdown.Trigger>Trigger</Dropdown.Trigger>
    <Dropdown.Content>Content</Dropdown.Content>
</Dropdown>
```

## Customize

```
import Dropdown from 'drpdwn-react';

...

const Button = ({ children, ...attr }) => {
    return <button {...attr}>{children}</button>;
};

class Wrapper extends React.Component<{}, { isOpen: boolean }> {
    state = { isOpen: false };

    handleToggle = () => this.setState(state => ({ isOpen: !state.isOpen }));
    handleChange = isOpen => this.setState({ isOpen });

    render() {
        return (
            <div className={styles.wrap}>
                <Dropdown
                    className={styles.controllable}
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
```
