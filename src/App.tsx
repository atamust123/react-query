import { useState } from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
import { SuperHeroes } from './components/SuperHeoes.page'
import { RQSuperHeroes } from './components/RQSuperHeroes.page'
import { Home } from './components/Home.page'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' Component={SuperHeroes} />
            <Route path='/RQ-super-heroes' Component={RQSuperHeroes} />
            <Route path='/' Component={Home} />
          </Routes>
        </div>
      </BrowserRouter >
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
