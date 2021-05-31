import React from 'react';
import './Column.sass';


interface ColumnProps {
	children: React.ReactNode
	ref?: any
	column?: any
}

const Column: React.FC<ColumnProps> = (props) => {
    const {children, ref} = props
	return (
		<div ref={ref} className='column' style={{background: props.column?.color, color: '#fff'}}>
			{children}
		</div>
	);
};

export default Column;