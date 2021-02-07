import { PromiseBlackBox } from '@oqton/redux-black-box';
import ERC20Contract from 'erc20-contract-js';
import BigNumber from 'bignumber.js';
import api from '../util/api';
import CSTKToken from '../blockchain/contracts/CSTKToken';
import config from '../config';
import tandc from '../assets/tandc.json';
import statutes from '../assets/statutes.json';

const initialState = {
  loadedtandc: false,
  agreedtandc: false,
  loadedstatutes: false,
  agreedstatutes: false,
  web3: null,
  balances: {},
  currentIteration: undefined,
  cstackBalance: undefined,
  rcstackBalance: undefined,
  softCap: undefined,
  hardCap: undefined,
  softCapTimestamp: undefined,
  totalReceived: undefined,
  loading: false,
  userIsWhiteListed: false,
  effectiveBalance: false,
};

const CSTK = new CSTKToken().contract; // CSTK tokencontract on XDAI

const coins = [
  {
    symbol: 'DAI',
    contractaddress: config.DAITokenAddress,
  },
  {
    symbol: 'CSTK',
    erc20Contract: CSTK,
  },
];

// const CSTKContract = CSTK.contract;
// const m = CSTKContract.methods;
// debugger;

const reducer = (state = initialState, action) => {
  // const newState = { ...state };
  switch (action.type) {
    case 'BOOTSTRAP':
      return {
        ...state,
      };
    case 'READ_SHOW_TANDC':
      return {
        ...state,
        READ_SHOW_TANDC_LOAD: new PromiseBlackBox(() => {
          return api
            .getSignature(action.address, tandc.key)
            .then(res => ({ type: 'READ_SHOW_TANDC_LOAD_SUCCESS', res }))
            .catch(e => ({ type: 'READ_SHOW_TANDC_LOAD_FAIL', e }));
        }),
      };
    case 'READ_SHOW_TANDC_LOAD_SUCCESS':
      delete state.READ_SHOW_TANDC_LOAD;
      return {
        ...state,
        loadedtandc: true,
        agreedtandc: true,
      };
    case 'READ_SHOW_TANDC_LOAD_FAIL':
      delete state.READ_SHOW_TANDC_LOAD;
      return {
        ...state,
        loadedtandc: true,
        agreedtandc: false,
        showtandc: true,
      };
    case 'READ_SHOW_STATUTES':
      return {
        ...state,
        READ_SHOW_STATUTES_LOAD: new PromiseBlackBox(() => {
          return api
            .getSignature(action.address, statutes.key)
            .then(res => ({ type: 'READ_SHOW_STATUTES_LOAD_SUCCESS', res }))
            .catch(e => ({ type: 'READ_SHOW_STATUTES_LOAD_FAIL', e }));
        }),
      };
    case 'READ_SHOW_STATUTES_LOAD_SUCCESS':
      delete state.READ_SHOW_STATUTES_LOAD;
      return {
        ...state,
        loadedstatutes: true,
        agreedstatutes: true,
      };
    case 'READ_SHOW_STATUTES_LOAD_FAIL':
      delete state.READ_SHOW_STATUTES_LOAD;
      return {
        ...state,
        loadedstatutes: true,
        agreedstatutes: false,
      };
    case 'SET_SHOW_TANDC':
      return {
        ...state,
        showtandc: action.value,
      };

    case 'AGREE_TANDC':
      // debugger;
      return {
        ...state,
        WRITE_TANDC: new PromiseBlackBox(() => {
          return api
            .postSignature(action.message, action.signature, action.address, tandc.key)
            .then(res => ({ type: 'WRITE_TANDC_SUCCESS', res }))
            .catch(e => ({ type: 'WRITE_TANDC_FAIL', e }));
        }),
      };

    case 'WRITE_TANDC_SUCCESS':
      delete state.WRITE_TANDC;
      return {
        ...state,
        agreedtandc: true,
      };
    case 'WRITE_TANDC_FAIL':
      delete state.WRITE_TANDC;
      return {
        ...state,

        agreedtandc: false,
      };

    case 'AGREE_STATUTES':
      // debugger;
      return {
        ...state,
        WRITE_STATUTES: new PromiseBlackBox(() => {
          return api
            .postSignature(action.message, action.signature, action.address, statutes.key)
            .then(res => ({ type: 'WRITE_STATUTES_SUCCESS', res }))
            .catch(e => ({ type: 'WRITE_STATUTES_FAIL', e }));
        }),
      };

    case 'WRITE_STATUTES_SUCCESS':
      delete state.WRITE_STATUTES;
      return {
        ...state,
        agreedstatutes: true,
      };
    case 'WRITE_STATUTES_FAIL':
      delete state.WRITE_STATUTES;
      return {
        ...state,
        agreedstatutes: false,
      };

    case 'WEB3_AVAILABLE':
      return {
        ...state,
        web3: action.web3,
      };
    case 'READ_FUNDING_CONTRACT':
      return {
        ...state,
        loading: true,
        READ_FUNDING_CONTRACT: new PromiseBlackBox(() => {
          return CSTK.totalSupply()
            .call()
            .then(res => ({ type: 'READ_FUNDING_CONTRACT_SUCCESS', res }))
            .catch(e => ({ type: 'READ_FUNDING_CONTRACT_FAIL', e }));
        }),
      };

    case 'READ_FUNDING_CONTRACT_SUCCESS':
      delete state.BB_READ_FUNDING_CONTRACT;
      if (!state.web3) {
        return state;
      }

      // TODO : wire this up to the actual contract
      return {
        ...state,
        loading: false,
        // currentIteration: 0,
        // cstackBalance: new state.web3.utils.BN("4000000000000000000"),
        // rcstackBalance: new state.web3.utils.BN("12345000000000000000000"),
        // softCap: new state.web3.utils.BN("850000000000000000000000"),
        // hardCap: new state.web3.utils.BN("1200000000000000000000000"),
        // softCapTimestamp: undefined,
        totalReceived: new state.web3.utils.BN(action.res),

        // personalCap: new state.web3.utils.BN("15000000000000000000000"),
        // numerator: 3,
        // denominator: 2,
      };

    case 'READ_FUNDING_CONTRACT_FAIL':
      delete state.BB_READ_FUNDING_CONTRACT;
      // console.warn('fail');
      return {
        ...state,
        loading: false,
      };
    case 'GET_BALANCES_FOR_ADDRESS':
      if (!action.address || !state.web3) return state;
      if (!state.balances[action.address]) {
        state.balances[action.address] = coins.map(coin => {
          return { symbol: coin.symbol, status: '??' };
        });
      }
      return {
        ...state,
        BB_GET_BALANCES_FOR_ADDRESS: new PromiseBlackBox(() =>
          getBalances(state.web3, action.address, coins)
            .then(res => ({
              type: 'GET_BALANCES_FOR_ADDRESS_SUCCESS',
              res,
              address: action.address,
            }))
            .catch(e => ({ type: 'GET_BALANCES_FOR_ADDRESS_FAIL', e })),
        ),
      };
    case 'GET_BALANCES_FOR_ADDRESS_SUCCESS':
      delete state.BB_GET_BALANCES_FOR_ADDRESS;
      // eslint-disable-next-line no-case-declarations
      const addressBalances = action.res.map(item => {
        item.balanceFormatted = new BigNumber(item.balance).toFormat(
          BigNumber.min(2, item.decimals).toNumber(),
          BigNumber.ROUND_DOWN,
          {
            decimalSeparator: '.',
            groupSeparator: ',',
            groupSize: 3,
          },
        );
        return item;
      });
      return {
        ...state,
        balances: { ...state.balances, [action.address]: addressBalances },
      };

    case 'GET_BALANCES_FOR_ADDRESS_FAIL':
      delete state.BB_GET_BALANCES_FOR_ADDRESS;
      state.balances[action.address] = Array.isArray(state.balances[action.address])
        ? state.balances[action.address].map(coin => {
            coin.status = 'error fetching';
            return coin;
          })
        : (state.balances[action.address] = { status: 'error fetching' });
      return state;

    case 'GET_EFFECTIVEBALANCE_FOR_ADDRESS':
      if (!action.address) {
        return {
          ...state,
          effectiveBalance: new BigNumber(0),
        };
      }
      return {
        ...state,
        BB_GET_EFFECTIVEBALANCE_FOR_ADDRESS: new PromiseBlackBox(() =>
          api
            .getEffectiveBalance(action.address)
            .then(res => ({
              type: 'GET_EFFECTIVEBALANCE_FOR_ADDRESS_SUCCESS',
              res,
              address: action.address,
            }))
            .catch(e => ({ type: 'GET_EFFECTIVEBALANCE_FOR_ADDRESS_FAIL', e })),
        ),
      };
    case 'GET_EFFECTIVEBALANCE_FOR_ADDRESS_SUCCESS':
      delete state.BB_GET_EFFECTIVEBALANCE_FOR_ADDRESS;
      // eslint-disable-next-line no-case-declarations
      const effectiveBalance = new BigNumber(action.res.balance).toFormat(
        BigNumber.min(2, 18).toNumber(),
        BigNumber.ROUND_DOWN,
        {
          decimalSeparator: '.',
          groupSeparator: ',',
          groupSize: 3,
        },
      );
      return {
        ...state,
        effectiveBalance,
      };

    case 'GET_EFFECTIVEBALANCE_FOR_ADDRESS_FAIL':
      delete state.BB_GET_EFFECTIVEBALANCE_FOR_ADDRESS;
      return {
        ...state,
        effectiveBalance: new BigNumber(0),
      };

    case 'GET_USER_IS_WHITELISTED':
      return {
        ...state,
        BB_GET_USER_IS_WHITELISTED: new PromiseBlackBox(() => {
          return api
            .getUserWhiteListed(action.address)
            .then(res => {
              return {
                type: 'GET_USER_IS_WHITELISTED_SUCCESS',
                res,
              };
            })
            .catch(e => ({ type: 'GET_USER_IS_WHITELISTED_FAIL', e }));
        }),
      };
    case 'GET_USER_IS_WHITELISTED_SUCCESS':
      delete state.BB_GET_USER_IS_WHITELISTED;
      return {
        ...state,
        userIsWhiteListed: action.res,
      };

    case 'GET_USER_IS_WHITELISTED_FAIL':
      delete state.BB_GET_USER_IS_WHITELISTED;
      return state;
    case 'USER_IS_WHITELISTED':
      return {
        ...state,
        userIsWhiteListed: true,
      };
    case 'USER_HAS_DONATED':
      return {
        ...state,
        hasDonated: true,
      };
    case 'CLOSE_CONTRIBUTE_THANKS':
      return {
        ...state,
        hasDonated: false,
      };
    default:
      console.log(`unknown action ${action.type}`);
      return state;
  }
};

// eslint-disable-next-line no-shadow
const getBalances = async (web3, address, coins) => {
  return Promise.all([
    ...coins.map(async coin => {
      const erc20Contract = coin.erc20Contract || new ERC20Contract(web3, coin.contractaddress);
      const [balance, decimals, totalsupply, maxtrust] = await Promise.all([
        erc20Contract
          .balanceOf(address)
          .call()
          .then(b => new BigNumber(b)),
        erc20Contract.decimals().call(),
        erc20Contract.totalSupply().call(),
        api.getMaxTrust(address),
      ]);
      return {
        symbol: coin.symbol,
        balance: balance.div(new BigNumber(10).pow(decimals)),
        totalsupply,
        decimals,
        maxtrust,
      };
    }),
  ]);
};

export default reducer;
