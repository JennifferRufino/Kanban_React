import React, { CSSProperties } from 'react';
import './Card.sass';

interface CardProps {
	title: string;
	innerRef?: any;
	className?: string;
	style: CSSProperties;
	id: number;
	onDeleteCard: (id: number) => void;
}

const Card: React.FC<CardProps> = (props) => {
	const { title, id, onDeleteCard, innerRef, className, style, ...restprops } = props;
	const onClickHandler = () => {
		onDeleteCard(id);
	};
	return (
		<div {...restprops} ref={innerRef} style={style} className={'card' + className}>
			<div onClick={onClickHandler} className='icon-close card__delete'></div>
			<span>{title}</span>
		</div>
	);
};

export default Card;