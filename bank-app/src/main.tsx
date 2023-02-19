import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/screens/home/Home'
import './index.css'
import ThemeProvider from './providers/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<ThemeProvider>
				<Home />
			</ThemeProvider>
		</ChakraProvider>
	</React.StrictMode>
)
