import React, { useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Column from '../components/Column/Column';
import AddNewItem from '../components/AddNewItem/AddNewItem';
import Card from '../components/Card/Card';
import { rootState } from '../Store/store';
import { actions } from '../Store/actions/panelActions';
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
	DraggableStateSnapshot,
	DraggingStyle,
	NotDraggingStyle,
} from 'react-beautiful-dnd';

function getStyle(style: DraggingStyle | NotDraggingStyle, snapshot: DraggableStateSnapshot) {
	if (!snapshot.isDragging || snapshot.isDropAnimating) {
		return style;
	}

	const translate = style.transform;
	// move to the right spot

	// add a bit of turn for fun
	const rotate = 'rotate(5deg)';

	// patching the existing style
	return {
		...style,
		transform: `${translate} ${rotate}`,
		// transition: `all 0.001s`,
		transitionDuration: `0.001s`,
	};
}

const Board = (props: Props) => {
	const { columns = [], createColumn, createCard, reorderCards, moveCards, deleteCard, deleteColumn } = props;

	const onDragEnd = useCallback(
		(result: DropResult) => {
			const { source, destination } = result;
			if (destination === null) {
				return;
			}
			source.droppableId === destination?.droppableId
				? reorderCards(source, destination!)
				: moveCards(source, destination!);
		},
		[moveCards, reorderCards]
	);

	const onDeleteColumn = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) =>{
		deleteColumn(id)
	}

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				{columns.map((column) => (
					<Droppable key={column.id} droppableId={column.id}>
						{(provided, snapshot) => (
							<div ref={provided.innerRef} className='content' key={column.id}>
								<Column column={column}>
									<h2 className='column__header'>{column.title}</h2>
									<div onClick={e => onDeleteColumn(e, +column.id)} className='icon-close column__delete'></div>
									<div className='column__list'>
										<div className='column__wrapper'>
											{column.cards.map((item, index) => (
												<Draggable key={item.id} draggableId={item.id} index={index}>
													{(provided, snapshot) => (
														<Card 
															className={`${snapshot.isDragging ? ' card-draggbel' : ''}`}
															innerRef={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															key={item.id}
															id={+item.id}
															title={item.title}
															tag ={item.tag}
															onDeleteCard={deleteCard}
															style={getStyle(provided.draggableProps.style!, snapshot)}
														/>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									</div>
									<div className='column__addbtn'>
										<AddNewItem onAddCard={createCard} parrentId={column.id} variant='card' />
									</div>
								</Column>
							</div>
						)}
					</Droppable>
				))}
			</DragDropContext>
			<div className='content'>
				<Column>
					<AddNewItem onAddColumn={createColumn} variant='column' />
				</Column>
			</div>
		</>
	);
};

const mapState = (state: rootState) => ({
	columns: state.panel.columns,
});

// const { createCard, createColumn, reorderCards, moveCards } = actions;

const connector = connect(mapState, actions);

type Props = ConnectedProps<typeof connector>;

export default connector(Board);