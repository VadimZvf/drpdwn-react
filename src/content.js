// @flow
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import c from 'classnames';
import s from './index.css';

export type Direction = 'auto' | 'top' | 'bottom' | 'right' | 'left';

type Props = {
    children: React.Node,
    className: string,
    tag: any,
    ariseDirection: Direction,
    center: boolean,
    cssModule: {
        auto?: string,
        top?: string,
        bottom?: string,
        right?: string,
        left?: string,
        content?: string
    },
    onClick: () => void
};

type State = {
    direction: Direction
};

class DropdownContent extends React.Component<Props, State> {
    static defaultProps = {
        ariseDirection: 'auto',
        tag: 'div',
        center: false,
        className: '',
        cssModule: {},
        onClick: () => {}
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            direction: props.ariseDirection === 'auto' ? 'bottom' : props.ariseDirection
        };
    }

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
        const { children, cssModule, center, className, tag: Tag, onClick } = this.props;
        const { direction } = this.state;

        const styles = { ...s, ...cssModule };

        return (
            <Tag
                className={c(styles.content, center ? styles.center : false, styles[direction], className)}
                onClick={onClick}
            >
                {children}
            </Tag>
        );
    }
}

export default DropdownContent;
