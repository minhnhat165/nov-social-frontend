import { GoogleOAuthProvider } from '@react-oauth/google';
import Button from 'components/Button';
import { GOOGLE_CLIENT_ID } from 'configs';
import { queryClient } from 'configs/reactQueryConfig';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from 'store';

const AppProvider = ({ children }) => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
						<HelmetProvider>
							<PersistGate persistor={persistStore(store)}>
								<ToastContainer />
								<BrowserRouter>{children}</BrowserRouter>
							</PersistGate>
						</HelmetProvider>
					</GoogleOAuthProvider>
				</QueryClientProvider>
			</Provider>
		</ErrorBoundary>
	);
};

export default AppProvider;

const ErrorFallback = () => {
	return (
		<div
			className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
			role="alert"
		>
			<h2 className="text-lg font-semibold">
				Ooops, something went wrong
			</h2>
			<Button
				className="mt-4"
				onClick={() => window.location.assign(window.location.origin)}
			>
				Refresh
			</Button>
		</div>
	);
};
