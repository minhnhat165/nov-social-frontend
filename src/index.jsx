import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n/config';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
