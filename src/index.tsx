import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store/store';

const app = (
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>		
	</Provider>
);

ReactDOM.render(app,document.getElementById('root'));
