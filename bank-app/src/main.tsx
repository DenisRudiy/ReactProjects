import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/screens/home/Home'
import './index.css'
import ThemeProvider from './providers/ThemeProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<Home />
				</QueryClientProvider>
			</ThemeProvider>
		</ChakraProvider>
	</React.StrictMode>
)
