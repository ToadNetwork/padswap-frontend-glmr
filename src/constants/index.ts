import { ChainId, JSBI, Percent, Token, WETH } from '@padswap/sdk'

export const ROUTER_ADDRESS = '0x40F1fEF0Fe68Fd10ff904070ee00a7769EE7fe34'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const USDC = new Token(ChainId.MAINNET, '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d', 6, 'USDC', 'USD Coin')
export const PAD = new Token(ChainId.MAINNET, '0x45488c50184ce2092756ba7cdf85731fd17e6f3d', 18, 'PAD', 'Movr Pad')
export const MOVR = new Token(ChainId.MAINNET, '0x663a07a2648296f1a3c02ee86a126fe1407888e5', 18, 'MOVR', 'MoonRiver')
export const BUSD = new Token(ChainId.MAINNET, '0x5d9ab5522c64e1f6ef5e3627eccc093f56167818', 18, 'BUSD', 'Binance USD')
export const BNB = new Token(ChainId.MAINNET, '0x2bf9b864cdc97b08b6d79ad4663e71b8ab65c45c', 18, 'BNB', 'Binance Coin')
export const DAI = new Token(ChainId.MAINNET, '0x80a16016cc4a2e6a2caca8a4a498b1699ff0f844', 18, 'DAI', 'DAI Stable Coin')
export const USDT = new Token(ChainId.MAINNET, '0xb44a9b6905af7c801311e8f4e76932ee959c663c', 18, 'USDT', 'Tether USD')
export const MIM = new Token(ChainId.MAINNET, '0x0cae51e1032e8461f4806e26332c030e34de3adb', 18, 'MIM', 'Magic Internet Money')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], USDC, PAD, MOVR, BUSD, BNB, DAI, USDT, MIM],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x59193512877E2EC3bB27C178A8888Cfac62FB32D', 18, 'PAD', 'Lily Pad'),
      new Token(ChainId.MAINNET, '0xe3DB50049C74De2F7d7269823af3178Cf22fd5E3', 18, 'WGLMR', 'Wrapped GLMR'),
    ],
    [BUSD, USDT],
    [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
