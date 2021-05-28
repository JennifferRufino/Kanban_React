import { IBoard } from '../board/types';
import { PanelActionTypes } from '../actions/panelActions';
import { reorderCard, moveCard } from '../../utils/utils';

const initialState: IBoard = {
	columns: [
		{
			title: 'To Do',
			color: "#5CC4FF",
			id: '1589896356832',
			cards: [
				{
					title: 'Documentar padrões mobile',
					id: '1589896374502',
					parrentId: '1589896356832',
				},
				{
					title: 'Ajustes fluxo de compra',
					id: '1589896378294',
					parrentId: '1589896356832',
				},
				{
					title: 'Banners da home',
					id: '1589896384638',
					parrentId: '1589896356832',
				},
				{
					title: 'Template de e-mail marketing',
					id: '1589896390118',
					parrentId: '1589896356832',
				},
			],
		},
		{
			title: 'In Progress',
			color: "#5CC4FF",
			id: '1589896361180',
			cards: [
				{
					title: 'Wireframe das telas',
					id: '1589896427925',
					parrentId: '1589896361180',
				},
			],
		},
		{
			title: 'Done',
			color: "#5CC4FF",
			id: '1589896366935',
			cards: [
				{
					title: 'Implementação do blog',
					id: '1589896427925',
					parrentId: '1589896361180',
				},
				{
					title: 'Análise de métricas',
					id: '1589896427925',
					parrentId: '1589896361180',
				},
				{
					title: 'Wireframe das telas',
					id: '1589896427925',
					parrentId: '1589896361180',
				},
			],
		},
	],
};

export default function panelReducer(state = initialState, action: PanelActionTypes): IBoard {
	switch (action.type) {
		case 'CREATE_COLUMN':
			return {
				...state,
				columns: [...state.columns, action.payload],
			};
		case 'CREATE_CARD':
			return {
				...state,
				columns: [
					...state.columns.map((el) => {
						if (el.id === action.payload.parrentId) {
							el.cards.push(action.payload);
							return el;
						} else return el;
					}),
				],
			};
		case 'REORDER_CARDS':
			const { source, destination } = action.payload;
			return reorderCard(state, source, destination);
		case 'MOVE_CARDS':
			return moveCard(state, action.payload.source, action.payload.destination);
		case 'DELETE_CARD':
			return {
				...state,
				columns: [
					...state.columns.map((column) => {
						return {
							...column,
							cards: column.cards.filter((el) => +el.id !== action.payload.id),
						};
					}),
				],
			};
		case 'DELETE_COLUMN':
			return {
				...state,
				columns: [
					...state.columns.filter(column => +column.id !== action.payload.id)
				],
			};
		default:
			return state;
	}
}