import { IColumn, ICard } from '../board/types';
import { InferValueTypes } from '../store';
import { DraggableLocation } from 'react-beautiful-dnd';

export const actions = {
	createColumn: (column: IColumn) => ({ type: 'CREATE_COLUMN', payload: column } as const),
	createCard: (card: ICard) => ({ type: 'CREATE_CARD', payload: card } as const),
	reorderCards: (source: DraggableLocation, destination: DraggableLocation) =>
		({ type: 'REORDER_CARDS', payload: { source, destination } } as const),
	moveCards: (source: DraggableLocation, destination: DraggableLocation) =>
		({ type: 'MOVE_CARDS', payload: { source, destination } } as const),
	deleteCard: (id: number) => ({ type: 'DELETE_CARD', payload: { id } } as const),
	deleteColumn: (id: number) => ({ type: 'DELETE_COLUMN', payload: { id } } as const),
};

export type PanelActionTypes = ReturnType<InferValueTypes<typeof actions>>;