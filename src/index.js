// @flow
import * as React from 'react';
import c from 'classnames';
import { findDOMNode } from 'react-dom';
import Trigger from './trigger';
import Content from './content';
import type { Direction } from './content';
import makeControllable from './utilities/make-controllable';
import getRandomId from './utilities/get-random-id';
import s from './index.css';

type Props = {
    className: string,
    children: React.Node,
    preventClickInside: boolean,
    id?: string,
    ariseDirection: Direction,
    onChange: boolean => void,
    isOpen?: boolean
};

type State = {
    id: string,
    isOpen: boolean
};

class Dropdown extends React.Component<Props, State> {
    static defaultProps = {
        ariseDirection: 'auto',
        preventClickInside: true,
        onChange: () => {},
        className: ''
    };
    static Content = Content;
    static Trigger = Trigger;

    constructor(props: Props) {
        super(props);
        this.state = {
            id: props.id || getRandomId(),
            isOpen: Boolean(props.isOpen)
        };
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        if (typeof props.isOpen !== 'undefined') {
            return makeControllable(props, state, 'isOpen');
        }

        return null;
    }

    componentDidMount() {
        window.addEventListener('click', this.handleWindowClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleWindowClick);
    }

    render() {
        const children = React.Children.map(this.props.children, child => {
            if (!child) {
                return child;
            }

            if (child.type === Trigger) {
                return <Trigger {...child.props} id={this.state.id} onClick={this.toggleDropdown} />;
            }

            if (child.type === Content) {
                if (!this.state.isOpen) {
                    return null;
                }

                return (
                    <Content
                        {...child.props}
                        ariseDirection={this.props.ariseDirection}
                        onClick={this.handleContentClick}
                    />
                );
            }

            return child;
        });

        return <div className={c(s.wrap, this.props.className)}>{children}</div>;
    }

    handleWindowClick = (event: SyntheticMouseEvent<HTMLElement>) => {
        if (!this.state.isOpen) {
            return;
        }

        const triggerId = event.target.dataset ? event.target.dataset.drptrigger : null;

        if (triggerId === this.state.id) {
            return;
        }

        /* eslint-disable react/no-find-dom-node */
        const element = findDOMNode(this);
        /* eslint-enable react/no-find-dom-node */
        // $FlowFixMe
        if (event.target !== element && !element.contains(event.target)) {
            this.hideDropdown();
        }
    };

    hideDropdown() {
        this.setState({ isOpen: false }, this.triggerChange);
    }

    toggleDropdown = () => {
        this.setState({ isOpen: !this.state.isOpen }, this.triggerChange);
    };

    handleContentClick = () => {
        if (!this.props.preventClickInside) this.hideDropdown();
    };

    triggerChange() {
        this.props.onChange(this.state.isOpen);
    }
}

export { Content };
export { Trigger };

export default Dropdown;
