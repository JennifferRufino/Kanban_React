import { IBoard } from '../board/types';
import { PanelActionTypes } from '../actions/panelActions';
import { reorderCard, moveCard } from '../../utils/utils';

const initialState: IBoard = {
	columns: [
		{
			title: 'План на месяц',
			id: '1589896356832',
			cards: [
				{
					title: 'Пройти курс по React',
					id: '1589896374502',
					parrentId: '1589896356832',
				},
				{
					title: 'Отметить день рождения',
					id: '1589896378294',
					parrentId: '1589896356832',
				},
				{
					title: 'Записаться на курсы английского языка, чтобы уехать жить в Лондон',
					id: '1589896384638',
					parrentId: '1589896356832',
				},
				{
					title: 'Сделать бекенд своего сайта на node.js',
					id: '1589896390118',
					parrentId: '1589896356832',
				},
				{
					title: 'Собрать портфолио',
					id: '1589896393813',
					parrentId: '1589896356832',
				},
				{
					title: 'Написать первую статью в блог',
					id: '1589896397350',
					parrentId: '1589896356832',
				},
				{
					title:
						'Записаться в мотошколу. Хотя немного страшновато, конечно. Друзья и родители против, но очень хочется. Но кого я обманываю, уже 2 года решаюсь на этот шаг 😢 Еще и друзья будут хрустиком называть. В общем, хотя бы подумать над этим.',
					id: '1589896401574',
					parrentId: '1589896356832',
				},
				{
					title: 'Нет, я серьезный человек, иду в мотошколу. Записываюсь!',
					id: '1589896408198',
					parrentId: '1589896356832',
				},
			],
		},
		{
			title: 'План на день',
			id: '1589896361180',
			cards: [
				{
					title: 'Записаться на курс по React',
					id: '1589896427925',
					parrentId: '1589896361180',
				},
				{
					title: 'Забронировать тир на субботу',
					id: '1589896431942',
					parrentId: '1589896361180',
				},
				{
					title: 'Накидать тем для статей в блог',
					id: '1589896436141',
					parrentId: '1589896361180',
				},
				{
					title: 'Сделать колонку Итоги',
					id: '1589896439834',
					parrentId: '1589896361180',
				},
			],
		},
		{
			title: 'Итоги',
			id: '1589896366935',
			cards: [],
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