import React, { useState, useCallback } from 'react';
import './AddNewItem.sass';
import AddFormItem from './AddFormItem/AddFormItem';
import { IColumn, ICard } from '../../Store/board/types';

interface AddNewItemProps {
	variant: 'column' | 'card';
	onAddColumn?: (column: IColumn) => void;
	onAddCard?: (card: ICard) => void;
	parrentId?: string;
}

const AddNewItem: React.FC<AddNewItemProps> = (props) => {
	const { variant, onAddCard, onAddColumn, parrentId }: AddNewItemProps = props;
	const [show, setShow] = useState<boolean>(false);
	const [text, setText] = useState<string>('');

	const showHandler = () => {
		setShow(!show);
	};
	

	const handelSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
		event && event.preventDefault();
		if (text !== '') {
			if (variant === 'column') {
				onAddColumn!({ title: text, color: text, id: Date.now().toString(), cards: [] });
				setText('');
			} else {
				onAddCard!({ title: text, id: Date.now().toString(), parrentId: parrentId! });
				setText('');
			}
		}
	};

	const onChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setText(e.target.value), []);

	const placeholder: string = `Adicionar outro ${variant === 'column' ? 'lista' : 'cartão'}`;
	const textButton: string = `Adicionar ${variant === 'column' ? 'lista' : 'cartão'}`;

	return (
		<div className='add-item'>
			{!show ? (
				<button onClick={showHandler} className='add-item__open'>
					<div className='icon-add'></div>
					<span>{placeholder}</span>
				</button>
			) : (
				<AddFormItem
					text={text}
					onChangeText={onChangeText}
					showHandler={showHandler}
					placeholder={placeholder}
					textButton={textButton}
					variant={variant}
					handelSubmit={handelSubmit}
				/>
			)}
		</div>
	);
};

export default AddNewItem;