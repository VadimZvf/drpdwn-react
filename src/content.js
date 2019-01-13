// @flow
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import c from 'classnames';
import s from './index.css';

export type Direction = 'auto' | 'top' | 'bottom';

type Props = {
    children: React.Node,
    className: string,
    ariseDirection: Direction,
    classNames: {
        auto?: string,
        top?: string,
        bottom?: string,
        wrap?: string
    },
    onClick: () => void
};

type State = {
    direction: Direction
};

class DropdownContent extends React.Component<Props, State> {
    static defaultProps = {
        ariseDirection: 'bottom',
        className: '',
        classNames: {},
        onClick: () => {}
    };

    state = {
        direction: this.props.ariseDirection
    };

    componentDidMount() {
        this.checkDirection();
    }

    checkDirection() {
        if (this.props.ariseDirection === 'auto') {
            if (this.isOutOfScreen()) {
                this.setState({ direction: this.state.direction === 'top' ? 'bottom' : 'top' });
            }
        }
    }

    isOutOfScreen() {
        /* eslint-disable react/no-find-dom-node */
        const element = findDOMNode(this);
        /* eslint-enable react/no-find-dom-node */
        if (element && typeof element.getBoundingClientRect === 'function') {
            const rect = element.getBoundingClientRect();
            return window.innerHeight <= rect.top + rect.height + 16; // 16px scrollbar offset
        }
        return false;
    }

    render() {
        const { children, className, onClick } = this.props;
        const { direction } = this.state;

        return (
            <section className={c(s.content, s[direction], className)} onClick={onClick}>
                {children}
            </section>
        );
    }
}

export default DropdownContent;
