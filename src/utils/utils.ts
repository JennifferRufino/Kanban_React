import { IBoard, ICard } from '../Store/board/types';
import { DraggableLocation } from 'react-beautiful-dnd';

export const reorderCard = (
	state: IBoard,
	source: DraggableLocation,
	destination: DraggableLocation
): IBoard => {
	let newState = { ...state };
	return {
		columns: newState.columns.map((item, index) => {
			if (item.id === source.droppableId) {
				let temp = [...item.cards];
				const [removed] = temp.splice(source.index, 1);
				temp.splice(destination.index, 0, removed);

				return { id: item.id, title: item.title, cards: temp };
			}

			return item;
		}),
	};
};
export const moveCard = (
	state: IBoard,
	source: DraggableLocation,
	destination: DraggableLocation
): IBoard => {
	let newState = { ...state };
	let sourceCard: ICard[] = [];
	newState.columns = newState.columns.map((column) => {
		if (column.id === source.droppableId) {
			column.cards.forEach((card, index) => (index === source.index ? sourceCard.push(card) : ''));
			return {
				title: column.title,
				id: column.id,
				cards: column.cards.filter((_, index) => index !== source.index),
			};
		}
		return column;
	});

	newState.columns = newState.columns.map((column) => {
		if (column.id === destination.droppableId) {
			column.cards.splice(destination.index, 0, ...sourceCard);
			return column;
		}
		return column;
	});
	return newState;
};