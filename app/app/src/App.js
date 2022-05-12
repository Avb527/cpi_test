import './App.css';
import { useState } from 'react';
import { Connection, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import * as web3sol from '@solana/web3.js';
// import * as metaplex from '@metaplex/js';
import { Account } from "@metaplex-foundation/mpl-core";
import { Creator, Metadata } from "@metaplex-foundation/mpl-token-metadata";

import {
  Program, Provider, web3
} from '@project-serum/anchor';

import * as anchor from '@project-serum/anchor';

import * as spl from '@solana/spl-token';

import idl from './myidl.json';
import puppetidl from './idl.json';
import accountsJson from './accounts.json';

import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { min } from 'bn.js';
import { copyFileSync } from 'fs';
import { off } from 'process';
import { token } from '@project-serum/anchor/dist/cjs/utils';



const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  getPhantomWallet()
]

const { SystemProgram, Keypair } = web3;
/* create an account  */
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
const puppetID = new PublicKey(puppetidl.metadata.address);
console.log('address of puppet master program : ', programID.toString());
console.log('address of puppet program : ', puppetID.toString())

function App() {

  const [supply, setSupply] = useState(null);
  const [price, setPrice] = useState(null);
  const [number, setNumber] = useState(1);
  const wallet = useWallet();

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = accountsJson.config.networkRpcUrl;
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    );
    return provider;
  }

  async function getConnection() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = accountsJson.config.networkRpcUrl;
    const connection = new Connection(network, opts.preflightCommitment);

    return connection;
  }

  async function init() {
    const provider = await getProvider();
    const connection = await getConnection();
    console.log('address of puppet program : ', puppetID.toString())
    const puppetprogram = new Program(puppetidl, puppetID, provider);
    //console.log(puppetprogram.puppetID.toString())
    console.log(puppetprogram.provider);

    const puppet = anchor.web3.Keypair.generate();

    const tx = await puppetprogram.rpc.initialize({
      accounts: {
        puppet: puppet.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [puppet],
    });

    console.log(tx);
  }

  async function test() {

    const provider = await getProvider();
    const connection = await getConnection();
    const program = new Program(idl, programID, provider);
    console.log(program.programId.toString())
    console.log(program.provider);

    console.log('address of puppet program : ', puppetID.toString())
    const puppetprogram = new Program(puppetidl, puppetID, provider);
    console.log(puppetprogram.programId.toString())
    console.log(puppetprogram.provider);

    /*
    const puppet = anchor.web3.Keypair.generate();

    let tx = await puppetprogram.rpc.initialize({
      accounts: {
        puppet: puppet.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [puppet],
    });

    console.log(tx);
    */
    const accounts = {
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
      puppetProgram: puppetprogram.programId
    }

    let method = "put";
    let url = "http://www.google.com"
    let tx = await program.rpc.pullStrings(method, url, {
      accounts: accounts,
      signers: []
    });

    console.log(tx);
  }


  if (!wallet.connected) {
    /* If the user's wallet is not connected, display connect wallet button. */
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <WalletMultiButton />
      </div>
    )
  } else {
    return (
      <div className="App">
        <div>
          <br/>
          <button onClick={init}>init</button>
          <br/>
          <br/>
          <button onClick={test}>test</button>
          <br/>  

        </div>
      </div>
    );
  }
}

 
const AppWithProvider = () => (
  <ConnectionProvider endpoint="https://api.devnet.solana.com">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;