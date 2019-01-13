// @flow
import * as React from 'react';
import c from 'classnames';
import s from './index.css';

type Props = {
    children: React.Node,
    className: string,
    id: string,
    tag: any,
    onClick: () => void
};

const DropdownTrigger = ({ children, className, onClick, id, tag: Tag }: Props) => (
    <Tag className={c(s.trigger, className)} data-drptrigger={id} onClick={onClick}>
        {children}
    </Tag>
);

DropdownTrigger.defaultProps = {
    onClick: () => {},
    className: '',
    id: '',
    tag: 'div'
};

export default DropdownTrigger;
