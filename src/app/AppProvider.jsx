import { BrowserRouter } from 'react-router-dom';
import { Button } from 'components/Action';
import { ErrorBoundary } from 'react-error-boundary';
import { GOOGLE_CLIENT_ID } from 'configs';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import ToasterClient from 'configs/toasterConfig';
import { persistStore } from 'redux-persist';
import { queryClient } from 'configs/reactQueryConfig';
import store from 'store';

const AppProvider = ({ children }) => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
						<HelmetProvider>
							<PersistGate persistor={persistStore(store)}>
								<BrowserRouter>
									<ToasterClient />
									{children}
								</BrowserRouter>
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
