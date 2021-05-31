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
	const [text2, setText2] = useState<string>('');

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
				onAddCard!({ title: text, tag: text2, id: Date.now().toString(), parrentId: parrentId! });
				setText('');
				setText2('');
			}
		}
	};

	const onChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setText(e.target.value), []);
	const onChangeText2 = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setText2(e.target.value), []);

	const placeholder: string = `Adicionar ${variant === 'column' ? 'outra lista' : 'outro cartão'}`;
	const placeholder2: string = "Adicionar Tag";
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
					text2 = {text2}
					onChangeText={onChangeText}
					onChangeText2={onChangeText2}
					showHandler={showHandler}
					placeholder={placeholder}
					placeholder2 = {placeholder2}
					textButton={textButton}
					variant={variant}
					handelSubmit={handelSubmit}
				/>
			)}
		</div>
	);
};

export default AddNewItem;