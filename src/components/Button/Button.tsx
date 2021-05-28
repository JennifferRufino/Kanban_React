import React from 'react';
import './Button.sass';

interface ButtonProps {
	onClick?(e: any): any;
	children: string[];
	onKeyPress?(event: React.KeyboardEvent): void;
	type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, onKeyPress, type }) => {
	return (
		<button onKeyPress={onKeyPress} type={type} onClick={onClick} className='button'>
			{children}
		</button>
	);
};

export default Button;