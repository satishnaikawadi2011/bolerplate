import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UrqlProvider from './utils/UrqlProvider';

ReactDOM.render(
	<React.StrictMode>
		<UrqlProvider>
			<App />
		</UrqlProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
