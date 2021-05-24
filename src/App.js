import React from 'react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import logo from './logo.svg';
import './App.css';

function App() {
  const load = () => {
    const args = [
      {name: "Account ID", value: "APL-MC6M-AGJD-FWHA-3CFFQ"},
      {name: "Secret Phrase", value: "glads discus discuss salvers justness jut jumbos nary nary snowed secondly secondly"}
    ];
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
  
    const doc = new jsPDF();

    doc.setFontSize(15);
    doc.text('Apollo Paper Wallet', 15, 15);
    doc.setFontSize(10);
    doc.text(`${yyyy}/${mm}/${dd}`, 15, 24 + (6));

    args.map((arg, index) => {
      doc.text(`${arg.name}:`, 15, 24 + (6 * (2 + (10 * index))));
      doc.text(`${arg.value}`, 15, 24 + (6 * (3 + (10 * index))));

      QRCode.toDataURL(arg.value, (err, url) => {
        doc.addImage(url, 'SVG', 15, 24 + (6 * (4 + (10 * index))), 48, 48);
      });
    });

    doc.save(`apollo-wallet-${args[0].value}`);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={load}>
          click
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
