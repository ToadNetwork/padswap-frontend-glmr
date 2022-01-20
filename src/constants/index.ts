import { ChainId, JSBI, Percent, Token, WETH } from '@padswap/sdk'

export const ROUTER_ADDRESS = '0x40F1fEF0Fe68Fd10ff904070ee00a7769EE7fe34'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}


export const TOAD = new Token(ChainId.MAINNET, '0xF480f38C366dAaC4305dC484b2Ad7a496FF00CeA', 18, 'TOAD', 'Toad.network')
export const BUSD = new Token(ChainId.MAINNET, '0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F', 18, 'anyBUSD', 'BUSD')
export const anyUSDC = new Token(ChainId.MAINNET, '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b', 6, 'anyUSDC', 'USD Coin')
export const anyETH = new Token(ChainId.MAINNET, '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f', 6, 'anyETH', 'ETHEREUM')
export const xETH = new Token(ChainId.MAINNET, '0x30D2a9F5FDf90ACe8c17952cbb4eE48a55D916A7', 6, 'xETH', 'ETHEREUM')

export const xUSDC = new Token(ChainId.MAINNET, '0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9', 6, 'xUSDC', 'USD Coin')
export const PAD = new Token(ChainId.MAINNET, '0x59193512877E2EC3bB27C178A8888Cfac62FB32D', 18, 'PAD', 'Glmr Pad')
export const GLMR = new Token(ChainId.MAINNET, '0xe3DB50049C74De2F7d7269823af3178Cf22fd5E3', 18, 'GLMR', 'MoonBeam')
export const DAI = new Token(ChainId.MAINNET, '0xc234A67a4F840E61adE794be47de455361b52413', 18, 'DAI', 'DAI Stable Coin')
export const USDT = new Token(ChainId.MAINNET, '0x8e70cd5b4ff3f62659049e74b6649c6603a0e594', 6, 'USDT', 'Tether USD')


const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], TOAD, BUSD, anyUSDC, anyETH, xETH, xUSDC, PAD, GLMR, DAI, USDT],
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
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], TOAD, BUSD, anyUSDC, anyETH, xETH, xUSDC, PAD, GLMR, DAI, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], TOAD, BUSD, anyUSDC, anyETH, xETH, xUSDC, PAD, GLMR, DAI, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      GLMR,
      PAD,
    ]
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
