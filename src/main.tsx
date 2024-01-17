import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import WalletConnector from '@/wallet/WalletConnector';
import MainLayout from '@/layouts/MainLayout';
import App from '@/pages/App';
import Game from './pages/Game';
import Start from './pages/Start';
import GameLayout from './layouts/GameLayout';

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: "16px",
        fontFamily: "Rationale",
        background: "#000"
      },
    },
  },
  colors: {
    button: {
      bg: "#2F6B75",
      border: "#9ED9E3",
      bg2: "#EA6200",
      border2: '#F5CFB4',
    },
    text: {
      detected: "#606060",
      warning: "#EA6200",
      rule: "#444444",
      red: "#ff0000",
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "Potta One",
      },
      variants: {
        primary: {
          height: 'auto',
          color: '#fff',
          fontSize: '2rem',
          lineHeight: '1',
          padding: '1rem 1rem 1.5rem',
          border: '0.125rem',
          borderStyle: 'solid',
          borderColor: 'button.bg',
          borderRadius: '2.25rem',
          bgGradient: 'linear-gradient(180deg, button.border 0%, button.bg 100%)',
          boxShadow: '0px -1rem 0px 0px rgba(0, 0, 0, 0.1) inset',
          _hover: {
            boxShadow: '0px -0.5rem 0px 0px rgba(0, 0, 0, 0.1) inset',
          },
          _disabled: {
            opacity: 1,
            bgGradient: 'linear-gradient(180deg, #D9D9D9 0%, #444444 100%)',
            borderColor: '#444444',
            color: '#444444',
            boxShadow: '0px -1rem 0px 0px rgba(0, 0, 0, 0.1) inset',
            pointerEvents: 'none',
          }
        },
        secondary: {
          height: 'auto',
          color: '#fff',
          fontSize: '2rem',
          lineHeight: '1',
          padding: '1rem 1rem 1.5rem',
          border: '0.125rem',
          borderStyle: 'solid',
          borderColor: 'button.bg2',
          borderRadius: '2.25rem',
          bgGradient: 'linear-gradient(180deg, button.border2 0%, button.bg2 100%)',
          boxShadow: '0px -1rem 0px 0px rgba(0, 0, 0, 0.1) inset',
          _hover: {
            boxShadow: '0px -0.5rem 0px 0px rgba(0, 0, 0, 0.1) inset',
          }
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
        <RecoilRoot>
          <WalletConnector>
              <BrowserRouter>
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<App />} />
                    <Route path="/start" element={<Start />} />
                  </Route>
                  <Route element={<GameLayout />}>
                    <Route path="/game" element={<Game />} />
                  </Route>
                </Routes>
              </BrowserRouter>
          </WalletConnector>
        </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
)
