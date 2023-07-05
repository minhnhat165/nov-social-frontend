import AppProvider from 'app/AppProvider';
import AppRoute from './routes/AppRoute';
import AppSetting from 'app/AppSetting';
import SocketClient from 'socket-io/SocketClient';
function App() {
	return (
		<div className="min-h-screen bg-slate-200 dark:bg-dark-900">
			<AppProvider>
				<AppSetting />
				<SocketClient />
				<AppRoute />
			</AppProvider>
		</div>
	);
}

export default App;
