import React, { CSSProperties } from 'react';
import './Card.sass';

interface CardProps {
	title: string;
	innerRef?: any;
	className?: string;
	style: CSSProperties;
	id: number;
	tag: string,
	onDeleteCard: (id: number) => void;
}

const Card: React.FC<CardProps> = (props) => {
	const { title, id, tag, onDeleteCard, innerRef, className, style, ...restprops } = props;
	
	const onClickHandler = () => {
		onDeleteCard(id);
	};
	return (
		<div {...restprops} ref={innerRef} style={style} className={'card' + className}>
			<div onClick={onClickHandler} className='icon-close card__delete'></div>
			<span>{title}<br/><br/></span><br/>
			<span 
				style={{display: 'grid', padding: 3, color: "#fff", position: 'relative', background: "#5CC4FF", fontWeight: 500, flexDirection: 'row',alignItems: 'center', width: 49, borderStyle: 'dashed', justifyContent: 'center', borderColor: '#5CC4FF'}}
			>
				
						{tag}
			</span>
		</div>
	);
};

export default Card;