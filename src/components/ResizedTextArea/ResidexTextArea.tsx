import React, { useRef, useEffect } from 'react';

interface ResizeTextareaProps {
    value: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const ResizeTextarea: React.FC<ResizeTextareaProps> = (props) => {
    const {value, placeholder, onChange,onKeyDown, children, ...restProps} = props
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus()
            if (textareaRef.current.clientHeight !== textareaRef.current.scrollHeight){
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
            }  
            if (value === ''){
                textareaRef.current.style.height = `54px`
            }
        }    
        
    }, [value])
    
	return (
		<div>
			<textarea
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				className='card add-item__input add-item__textarea'
				placeholder={placeholder}
				maxLength={280}
				ref={textareaRef}
                autoFocus
                {...restProps}
			/>
		</div>
	);
};

export default ResizeTextarea;