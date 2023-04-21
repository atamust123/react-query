import { useState } from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
import { SuperHeroes } from './components/SuperHeoes.page'
import { RQSuperHeroes } from './components/RQSuperHeroes.page'
import { Home } from './components/Home.page'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { GRQSuperHeroes } from './components/GRQSuperHeroes.page'

function App() {
  const queryClient = new QueryClient();

  var profitableSchemes = function (n: number, minProfit: number, group: number[], profit: number[]) {
    const MOD = 1e9 + 7;
    const m = group.length;
    const dp = new Array(n + 1).fill(0).map(() => new Array(minProfit + 1).fill(0));
    dp[0][0] = 1;
    for (let k = 0; k < m; k++) {
      const g = group[k];
      const p = profit[k];
      for (let i = n; i >= g; i--) {
        for (let j = minProfit; j >= 0; j--) {
          dp[i][j] = (dp[i][j] + dp[i - g][Math.max(0, j - p)]) % MOD;
        }
      }
    }
    let ans = 0;
    for (let i = 0; i <= n; i++) {
      ans = (ans + dp[i][minProfit]) % MOD;
    }
    return ans;
  };

  console.log(profitableSchemes(5, 5, [2, 3], [2, 3]))

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
              <li>
                <Link to="/prq-super-heroes">Graphql RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' Component={SuperHeroes} />
            <Route path='/rq-super-heroes' Component={RQSuperHeroes} />
            <Route path='/prq-super-heroes' Component={GRQSuperHeroes} />
            <Route path='/' Component={Home} />
          </Routes>
        </div>
      </BrowserRouter >
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
