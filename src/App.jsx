import AppProvider from 'app/AppProvider';
import AppSetting from 'app/AppSetting';
import AppRoute from './routes/AppRoute';
function App() {
	return (
		<div className="bg-slate-200 dark:bg-dark-900">
			<AppProvider>
				<AppSetting />
				<AppRoute />
			</AppProvider>
		</div>
	);
}

export default App;
