// src/App.js (continued)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [wager, setWager] = useState(10);  // Default wager
  const [clientSeed, setClientSeed] = useState('');
  const [serverHash, setServerHash] = useState('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.token);
      setMessage('Logged in successfully!');
      getBalance(response.data.token);
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  const getBalance = async (token) => {
    const response = await axios.get('http://localhost:5000/balance', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBalance(response.data.balance);
  };

  const gamble = async (gameType) => {
    if (isCooldown) return;

    try {
      const clientSeed = Math.random().toString(36).substring(2);
      const response = await axios.post('http://localhost:5000/gamble', {
        wager,
        game_type: gameType,
        client_seed: clientSeed
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBalance(response.data.balance);
      setMessage(`Result: ${response.data.result > 0 ? 'Won' : 'Lost'} ${Math.abs(response.data.result)} coins`);
      setClientSeed(clientSeed);
      setServerHash(response.data.secret_hash);
      setCooldownTime(response.data.cooldown);
      setIsCooldown(true);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setCooldownTime(error.response.data.cooldown);
        setIsCooldown(true);
        setMessage("You're on cooldown. Please wait.");
      } else {
        setMessage('An error occurred');
      }
    }
  };

  useEffect(() => {
    if (isCooldown && cooldownTime > 0) {
      const timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCooldown, cooldownTime]);

  return (
    <div className="App">
      <h1>Virtual Casino</h1>
      {token ? (
        <div>
          <p>Balance: {balance}</p>
          <input
            type="number"
            value={wager}
            onChange={(e) => setWager(parseInt(e.target.value) || 0)}
            placeholder="Enter wager amount"
          />
          <button onClick={() => gamble("low_risk")} disabled={isCooldown}>Low-Risk Gamble</button>
          <button onClick={() => gamble("high_risk")} disabled={isCooldown}>High-Risk Gamble</button>
          <button onClick={() => gamble("jackpot_only")} disabled={isCooldown}>Jackpot Gamble</button>
          {isCooldown && <p>Cooldown: {cooldownTime} seconds</p>}
          <p>Client Seed: {clientSeed}</p>
          <p>Server Hash: {serverHash}</p>
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}

export default App;