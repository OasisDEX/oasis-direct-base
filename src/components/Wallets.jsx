import React from 'react';
import Product from '../ui-components/Product';
import { IdentityIcon, LedgerIcon, TrezorIcon, Circle, BackIcon, MetamaskIcon } from "./Icons";
import { getCurrentProviderName } from '../blockchainHandler';


class Web3ClientChoice extends React.Component {

  constructor() {
    super();

    this.state = {
      hasProvider: false,
      provider: '',
      shouldDisplayAvailableClients: false
    }
  }

  componentWillMount = () => {
    // This will wait for the web3 to be attached to the window object.
    // If we use straight check we risk having this piece of code executed before
    // web3 being loaded
    setTimeout(() => {
      if (window.web3) {
        this.setState({hasProvider: true, provider: getCurrentProviderName()});
      }
    }, 250);
  }

  switchToAvailableClientsView = () => {
    this.setState({shouldDisplayAvailableClients: true});
  }

  connectLedger = () => {
    this.props.showHW('ledger');
  }

  connectTrezor = () => {
    this.props.showHW('trezor');
  }

  getToClientSelection = () => {
    this.setState({shouldDisplayAvailableClients: false});
  }

  render() {
    return <React.Fragment>
      {
        this.state.shouldDisplayAvailableClients
          ? <section className="frame wallets">
            <div style={{position: "absolute", zIndex: 2, top: "18px"}} onClick={this.getToClientSelection}>
              <Circle><BackIcon/></Circle>
            </div>
            <div className="decorator">
              <ul className="list">
                <li className="list-item column-flex clients">
                  <div className="heading">
                    <h2>Desktop Clients</h2>
                  </div>
                  <div className="row-flex">
                    <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                      <Product label="Metamask" logo={MetamaskIcon}/>
                    </a>
                    <a href="https://www.parity.io/" target="_blank" rel="noopener noreferrer">
                      <Product label="Parity" logo={MetamaskIcon}/>
                    </a>
                  </div>
                </li>
                <li className="list-item column-flex clients">
                  <div className="heading">
                    <h2>Mobile Clients</h2>
                  </div>
                  <div className="row-flex">
                    <a href="https://status.im/" target="_blank" rel="noopener noreferrer">
                      <Product label="Status" logo={MetamaskIcon}/>
                    </a>
                    <a href="https://toshi.org/" target="_blank" rel="noopener noreferrer">
                      <Product label="Toshi" logo={MetamaskIcon}/>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          : <section className="frame wallets">
            <div className="heading">
              <h2>Select the Wallet you'd like to use</h2>
            </div>
            <div className="decorator">
              <div className="content">
                <ul className="list">
                  <li className="list-item">
                    <div className="browser-wallet">
                      {
                        this.state.hasProvider
                          ? <React.Fragment>
                            <div className="client-summary">
                              <IdentityIcon address={window.web3.eth.defaultAccount}/>
                              <div>
                                <span className="label status">Connected</span>
                                <span className="label">{this.state.provider}</span>
                              </div>
                            </div>
                            <button type="button" onClick={() => this.props.setWeb3WebClient()}> Continue</button>
                          </React.Fragment>
                          : <React.Fragment>
                            <div className="client-summary">
                              <span className="label">No Client in use</span>
                            </div>
                            <button type="button" onClick={() => this.switchToAvailableClientsView()}> Show Clients</button>
                          </React.Fragment>
                      }
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="row-flex">
                      <Product label="Ledger" logo={LedgerIcon} onClick={this.connectLedger}/>
                      <Product label="Trezor" logo={TrezorIcon} onClick={this.connectTrezor}/>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
      }
    </React.Fragment>

  }
}

export default Web3ClientChoice;