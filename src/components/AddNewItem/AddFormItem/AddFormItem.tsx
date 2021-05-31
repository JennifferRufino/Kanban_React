import React from 'react';
import Button from '../../Button/Button';
import ResizeTextarea from '../../ResizeTextarea/ResizeTextarea';

interface AddFormItemProps {
	placeholder: string;
	placeholder2: string;
	textButton: string;
	variant: string;	
	text: string;	
	text2: string;
	handelSubmit: () => void;
	onChangeText: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onChangeText2: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	showHandler: () => void;
}

const AddFormItem = (props: AddFormItemProps) => {
	const {text, text2, placeholder, placeholder2, textButton, variant, handelSubmit, onChangeText,onChangeText2, showHandler} = props;
	

	const onEnterPress = (e: React.KeyboardEvent) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			handelSubmit();
		}
	};

	return (
		<div>
			<form onSubmit={handelSubmit}>
				<div className='add-item__form'>
					{variant === 'column' ? (
						<input
							value={text}
							className='card add-item__input'							
							onChange={onChangeText}
							placeholder={placeholder}
							type='text'
							autoFocus
						/>
					) : (
						<>
							<ResizeTextarea 
								value={text}					
								onChange={onChangeText}
								onKeyDown={onEnterPress}						
								placeholder={placeholder}
							/>
							<ResizeTextarea 
								value={text2}					
								onChange={onChangeText2}
								onKeyDown={onEnterPress}						
								placeholder={placeholder2}
							/>	
						</>					
					)}
					<div className='add-item__btn'>
						<Button type='submit'>{textButton} </Button>
						<div onClick={showHandler} className='icon-close'></div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddFormItem;