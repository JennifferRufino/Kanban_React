import React from 'react';
import './App.sass';
import Board from './Containers/Board';

function App() {	
	return (
		<div className='board__backgound'>
			<div className='board__wrapper'>
				<Board />
			</div>
		</div>
	);
}

export default App;