import React from 'react';
import './Column.sass';


interface ColumnProps {
	children: React.ReactNode
	ref?: any
}

const Column: React.FC<ColumnProps> = (props) => {
    const {children, ref} = props
	return (
		<div ref={ref} className='column'>
			{children}
		</div>
	);
};

export default Column;