import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css'

function App() {
  const [account, setAccount] = useState('');
  const [targetString, setTargetString] = useState('');
  const [wordList, setWordList] = useState('');

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
  const ABI = [
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "targetString",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "wordList",
						"type": "string[]"
					}
				],
				"name": "validate",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "pure",
				"type": "function"
			}
		]

  async function connectMetamask() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert('Please install MetaMask to use this dApp!');
    }
  }

  async function validateWords() {
    // Instantiate the contract with the ABI and address
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, contractAddress);

    // Call the validate function
    const result = await contract.methods.validate(targetString, wordList.split(',')).call({ from: account });

    // Display the result
    alert(result ? 'Valid word combination' : 'Invalid word combination');
  }

  return (
    <div class="card">
      <button onClick={connectMetamask}>Connect Metamask</button>
      <p>Account: {account.slice(0,4)}...{account.slice(38)}</p>
      <div>

    <label class="input">
        <input
        class="input__field"
          type="text"
          placeholder="Target string"
          value={targetString}
          onChange={(e) => setTargetString(e.target.value)}
          style={{marginBottom: "10px"}}
        />
        </label>
        <label class="input">
        <input
        class="input__field"
          type="text"
          placeholder="Word list (comma-separated)"
          value={wordList}
          onChange={(e) => setWordList(e.target.value)}
          style={{marginBottom: "10px"}}
        />
        </label>
      </div>
      <button onClick={validateWords}>Validate</button>
    </div>
  );
}

export default App;