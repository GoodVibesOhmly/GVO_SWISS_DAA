import Onboard from 'bnc-onboard';
import config from '../config';

// eslint-disable-next-line import/prefer-default-export
export const initOnboard = subscriptions => {
  const {
    networkId,
    onboardApiKey,
    // rpcUrl,
    // portisApiKey,
    // fortmaticApiKey,
    // appUrl,
    // squarelinkApiKey,
  } = config;
  return Onboard({
    dappId: onboardApiKey, // [String] The API key created by step one above
    networkId, // [Integer] The Ethereum network ID your Dapp uses.
    subscriptions,
    hideBranding: true,
    darkMode: true,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        // {
        //   walletName: 'trezor',
        //   appUrl,
        //   email: 'amin@giveth.com',
        //   rpcUrl,
        // },
        // {
        //   walletName: 'lattice',
        //   appName: 'CS Token',
        //   rpcUrl,
        // },
        // {
        //   walletName: 'ledger',
        //   rpcUrl,
        // },
        // { walletName: 'dapper' },
        // { walletName: 'coinbase' },
        // { walletName: 'status' },
        // { walletName: 'walletLink', rpcUrl },
        // {
        //   walletName: 'portis',
        //   apiKey: portisApiKey || 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b',
        // },
        // { walletName: 'fortmatic', apiKey: fortmaticApiKey || 'pk_test_886ADCAB855632AA' },
        // { walletName: 'unilogin' },
        // { walletName: 'torus' },
        // { walletName: 'squarelink', apiKey: squarelinkApiKey || '87288b677f8cfb09a986' },
        // { walletName: 'authereum', disableNotifications: true },
        // { walletName: 'trust', rpcUrl },
        // {
        //   walletName: 'walletConnect',
        //   infuraKey: 'd5e29c9b9a9d4116a7348113f57770a8',
        // },
        // { walletName: 'opera' },
        // { walletName: 'operaTouch' },
        // { walletName: 'imToken', rpcUrl },
        // { walletName: 'meetone' },
        // { walletName: 'mykey' },
        // { walletName: 'wallet.io', rpcUrl },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' },
    ],
  });
};
