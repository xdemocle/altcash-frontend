const coins = [
  { symbol: '4ART', name: '4ART Coin' },
  { symbol: 'AAPL', name: 'Apple tokenized stock FTX' },
  { symbol: 'AAVE', name: 'Aave' },
  { symbol: 'ABBC', name: 'ABBC Coin' },
  { symbol: 'ABYSS', name: 'Abyss' },
  { symbol: 'ADK', name: 'Aidos Kuneen' },
  { symbol: 'ADT', name: 'adToken' },
  { symbol: 'AID', name: 'AidCoin' },
  { symbol: 'AKN', name: 'Akoin' },
  { symbol: 'AKRO', name: 'Akropolis' },
  { symbol: 'AMC', name: 'AMC Entertainment Holdings tokenized stock FTX' },
  { symbol: 'AMZN', name: 'Amazon tokenized stock FTX' },
  { symbol: 'ANKR', name: 'Ankr' },
  { symbol: 'APM', name: 'apM Coin' },
  { symbol: 'AR', name: 'Arweave' },
  { symbol: 'BABA', name: 'Alibaba tokenized stock FTX' },
  { symbol: 'BB', name: 'BlackBerry tokenized stock FTX' },
  { symbol: 'BBC', name: 'BigBang Core' },
  { symbol: 'BFT', name: 'BnkToTheFuture' },
  { symbol: 'BILI', name: 'Billibilli tokenized stock Bittrex' },
  { symbol: 'BNTX', name: 'BNTX' },
  { symbol: 'BOA', name: 'BOA' },
  { symbol: 'BORA', name: 'BORA' },
  { symbol: 'BRZ', name: 'BRZ' },
  { symbol: 'BTCV', name: 'BTCV' },
  { symbol: 'BTE', name: 'BTE' },
  { symbol: 'BTU', name: 'BTU' },
  { symbol: 'BWF', name: 'BWF' },
  { symbol: 'BWX', name: 'BWX' },
  { symbol: 'BYND', name: 'BYND' },
  { symbol: 'CAMP', name: 'CAMP' },
  { symbol: 'CELO', name: 'CELO' },
  { symbol: 'CGT', name: 'CGT' },
  { symbol: 'CHR', name: 'CHR' },
  { symbol: 'CKB', name: 'CKB' },
  { symbol: 'CNS', name: 'CNS' },
  { symbol: 'CNTM', name: 'CNTM' },
  { symbol: 'COSM', name: 'COSM' },
  { symbol: 'CPC', name: 'CPC' },
  { symbol: 'CRO', name: 'CRO' },
  { symbol: 'CTC', name: 'CTC' },
  { symbol: 'CURE', name: 'CURE' },
  { symbol: 'CUSD', name: 'CUSD' },
  { symbol: 'CVT', name: 'CVT' },
  { symbol: 'DAWN', name: 'DAWN' },
  { symbol: 'DEP', name: 'DEP' },
  { symbol: 'DFI', name: 'DFI' },
  { symbol: 'DMT', name: 'DMT' },
  { symbol: 'DNA', name: 'DNA' },
  { symbol: 'DUCATO', name: 'DUCATO' },
  { symbol: 'DUSK', name: 'DUSK' },
  { symbol: 'ECELL', name: 'ECELL' },
  { symbol: 'ECOC', name: 'ECOC' },
  { symbol: 'EDR', name: 'EDR' },
  { symbol: 'ELAMA', name: 'ELAMA' },
  { symbol: 'EXCL', name: 'EXCL' },
  { symbol: 'EXE', name: 'EXE' },
  { symbol: 'FB', name: 'FB' },
  { symbol: 'FCT2', name: 'FCT2' },
  { symbol: 'FIRO', name: 'FIRO' },
  { symbol: 'FIT', name: 'FIT' },
  { symbol: 'FLETA', name: 'FLETA' },
  { symbol: 'FME', name: 'FME' },
  { symbol: 'FNB', name: 'FNB' },
  { symbol: 'FNK', name: 'FNK' },
  { symbol: 'FOR', name: 'FOR' },
  { symbol: 'FRSP', name: 'FRSP' },
  { symbol: 'FX', name: 'FX' },
  { symbol: 'GEO', name: 'GEO' },
  { symbol: 'GLEEC', name: 'GLEEC' },
  { symbol: 'GLM', name: 'GLM' },
  { symbol: 'GME', name: 'GME' },
  { symbol: 'GNC', name: 'GNC' },
  { symbol: 'GO', name: 'GO' },
  { symbol: 'GOOGL', name: 'Google tokenized stock FTX' },
  { symbol: 'GRT', name: 'GRT' },
  { symbol: 'GST', name: 'GST' },
  { symbol: 'GXC', name: 'GXC' },
  { symbol: 'HBAR', name: 'HBAR' },
  { symbol: 'HBD', name: 'HBD' },
  { symbol: 'HDAC', name: 'HDAC' },
  { symbol: 'HDAO', name: 'HDAO' },
  { symbol: 'HEDG', name: 'HEDG' },
  { symbol: 'HIVE', name: 'HIVE' },
  { symbol: 'HMQ', name: 'HMQ' },
  { symbol: 'HNS', name: 'HNS' },
  { symbol: 'HXRO', name: 'HXRO' },
  { symbol: 'HYDRO', name: 'HYDRO' },
  { symbol: 'INSTAR', name: 'INSTAR' },
  { symbol: 'INX', name: 'INX' },
  { symbol: 'IOC', name: 'IOC' },
  { symbol: 'IOTA', name: 'IOTA' },
  { symbol: 'IRIS', name: 'IRIS' },
  { symbol: 'KAI', name: 'KAI' },
  { symbol: 'KDA', name: 'KDA' },
  { symbol: 'KDAG', name: 'KDAG' },
  { symbol: 'KLAY', name: 'KLAY' },
  { symbol: 'KLV', name: 'KLV' },
  { symbol: 'KOK', name: 'KOK' },
  { symbol: 'KRT', name: 'KRT' },
  { symbol: 'KSM', name: 'KSM' },
  { symbol: 'LAMB', name: 'LAMB' },
  { symbol: 'LCS', name: 'LCS' },
  { symbol: 'LMCH', name: 'LMCH' },
  { symbol: 'LOON', name: 'LOON' },
  { symbol: 'LUCY', name: 'LUCY' },
  { symbol: 'LUNA', name: 'LUNA' },
  { symbol: 'MARO', name: 'MARO' },
  { symbol: 'MDT', name: 'MDT' },
  { symbol: 'ME', name: 'ME' },
  { symbol: 'MEME', name: 'MEME' },
  { symbol: 'MER', name: 'MER' },
  { symbol: 'META', name: 'META' },
  { symbol: 'MET', name: 'MET' },
  { symbol: 'MFA', name: 'MFA' },
  { symbol: 'MOC', name: 'MOC' },
  { symbol: 'MOF', name: 'MOF' },
  { symbol: 'MORE', name: 'MORE' },
  { symbol: 'MRPH', name: 'MRPH' },
  { symbol: 'MSTR', name: 'MSTR' },
  { symbol: 'MTC', name: 'MTC' },
  { symbol: 'MUE', name: 'MUE' },
  { symbol: 'MYST', name: 'MYST' },
  { symbol: 'NFLX', name: 'NFLX' },
  { symbol: 'NKN', name: 'NKN' },
  { symbol: 'NOK', name: 'NOK' },
  { symbol: 'NVT', name: 'NVT' },
  { symbol: 'OCEAN', name: 'OCEAN' },
  { symbol: 'OGN', name: 'OGN' },
  { symbol: 'OGT', name: 'OGT' },
  { symbol: 'ORBS', name: 'ORBS' },
  { symbol: 'OXEN', name: 'OXEN' },
  { symbol: 'PFE', name: 'PFE' },
  { symbol: 'PHNX', name: 'PHNX' },
  { symbol: 'PI', name: 'PI' },
  { symbol: 'PLA', name: 'PLA' },
  { symbol: 'PMA', name: 'PMA' },
  { symbol: 'PROM', name: 'PROM' },
  { symbol: 'PTON', name: 'PTON' },
  { symbol: 'PTOY', name: 'PTOY' },
  { symbol: 'PXL', name: 'PXL' },
  { symbol: 'QNT', name: 'QNT' },
  { symbol: 'RENBTC', name: 'RENBTC' },
  { symbol: 'REPV2', name: 'REPV2' },
  { symbol: 'REV', name: 'REV' },
  { symbol: 'RVC', name: 'RVC' },
  { symbol: 'SDT', name: 'SDT' },
  { symbol: 'SENSO', name: 'SENSO' },
  { symbol: 'SG', name: 'SG' },
  { symbol: 'SHR', name: 'SHR' },
  { symbol: 'SIX', name: 'SIX' },
  { symbol: 'SKM', name: 'SKM' },
  { symbol: 'SLV', name: 'SLV' },
  { symbol: 'SOLVE', name: 'SOLVE' },
  { symbol: 'SPC', name: 'SPC' },
  { symbol: 'SPHR', name: 'SPHR' },
  { symbol: 'SPIN', name: 'SPIN' },
  { symbol: 'SPND', name: 'SPND' },
  { symbol: 'SPY', name: 'SPY' },
  { symbol: 'SQ', name: 'SQ' },
  { symbol: 'STC', name: 'STC' },
  { symbol: 'STMX', name: 'STMX' },
  { symbol: 'STPT', name: 'STPT' },
  { symbol: 'STRAX', name: 'STRAX' },
  { symbol: 'SUKU', name: 'SUKU' },
  { symbol: 'SUTER', name: 'SUTER' },
  { symbol: 'SXP', name: 'SXP' },
  { symbol: 'TEA', name: 'TEA' },
  { symbol: 'TEMCO', name: 'TEMCO' },
  { symbol: 'THC', name: 'THC' },
  { symbol: 'TRAC', name: 'TRAC' },
  { symbol: 'TRYB', name: 'TRYB' },
  { symbol: 'TSHP', name: 'TSHP' },
  { symbol: 'TSLA', name: 'TSLA' },
  { symbol: 'TUBE', name: 'TUBE' },
  { symbol: 'TUDA', name: 'TUDA' },
  { symbol: 'UBT', name: 'UBT' },
  { symbol: 'UCT', name: 'UCT' },
  { symbol: 'UPEUR', name: 'UPEUR' },
  { symbol: 'UPP', name: 'UPP' },
  { symbol: 'UPT', name: 'UPT' },
  { symbol: 'UPUSD', name: 'UPUSD' },
  { symbol: 'UPXAU', name: 'UPXAU' },
  { symbol: 'UQC', name: 'UQC' },
  { symbol: 'URAC', name: 'URAC' },
  { symbol: 'USDN', name: 'USDN' },
  { symbol: 'USDS', name: 'USDS' },
  { symbol: 'UST', name: 'UST' },
  { symbol: 'UTI', name: 'UTI' },
  { symbol: 'VAL', name: 'VAL' },
  { symbol: 'VANY', name: 'VANY' },
  { symbol: 'VBK', name: 'VBK' },
  { symbol: 'VDX', name: 'VDX' },
  { symbol: 'VEE', name: 'VEE' },
  { symbol: 'VID', name: 'VID' },
  { symbol: 'VITE', name: 'VITE' },
  { symbol: 'VLX', name: 'VLX' },
  { symbol: 'VRA', name: 'VRA' },
  { symbol: 'WAXP', name: 'WAXP' },
  { symbol: 'WGP', name: 'WGP' },
  { symbol: 'XHV', name: 'XHV' },
  { symbol: 'XST', name: 'XST' },
  { symbol: 'XTP', name: 'XTP' },
  { symbol: 'XWC', name: 'XWC' },
  { symbol: 'YFL', name: 'YFL' },
  { symbol: 'YOU', name: 'YOU' },
  {
    symbol: '$PAC',
    name: 'PACcoin',
    color: '#f5eb16'
  },
  {
    symbol: '0XBTC',
    name: '0xBitcoin',
    color: '#ff914d'
  },
  {
    symbol: '2GIVE',
    name: '2Give',
    color: '#f1cb60'
  },
  {
    symbol: 'ABT',
    name: 'Arcblock',
    color: '#3effff'
  },
  {
    symbol: 'ACT',
    name: 'Achain',
    color: '#767dff'
  },
  {
    symbol: 'ACTN',
    name: 'Action Coin',
    color: '#ffffff'
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    color: '#0d1e30'
  },
  {
    symbol: 'ADD',
    name: 'ADD Token',
    color: '#fec807'
  },
  {
    symbol: 'ADX',
    name: 'AdEx',
    color: '#1b75bc'
  },
  {
    symbol: 'AE',
    name: 'Aeternity',
    color: '#de3f6b'
  },
  {
    symbol: 'AEON',
    name: 'Aeon',
    color: '#134451'
  },
  {
    symbol: 'AEUR',
    name: 'Augmint Euro Token',
    color: '#051d2d'
  },
  {
    symbol: 'AGI',
    name: 'SingularityNET',
    color: '#6916ff'
  },
  {
    symbol: 'AGRS',
    name: 'Agoras Tauchain',
    color: '#f49e00'
  },
  {
    symbol: 'AION',
    name: 'Aion',
    color: '#00bfec'
  },
  {
    symbol: 'ALGO',
    name: 'Algorand',
    color: '#000000'
  },
  {
    symbol: 'AMB',
    name: 'Ambrosus',
    color: '#3c5be0'
  },
  {
    symbol: 'AMP',
    name: 'HyperSpace (Synereo)',
    color: '#2daee4'
  },
  {
    symbol: 'AMPL',
    name: 'Ampleforth',
    color: '#000000'
  },
  {
    symbol: 'ANT',
    name: 'Aragon',
    color: '#2cd3e1'
  },
  {
    symbol: 'APPC',
    name: 'AppCoins',
    color: '#fd875e'
  },
  {
    symbol: 'ARDR',
    name: 'Ardor',
    color: '#3c87c7'
  },
  {
    symbol: 'ARG',
    name: 'Argentum',
    color: '#a71435'
  },
  {
    symbol: 'ARK',
    name: 'Ark',
    color: '#f70000'
  },
  {
    symbol: 'ARN',
    name: 'Aeron',
    color: '#0092b5'
  },
  {
    symbol: 'ARNX',
    name: 'Aeron',
    color: '#436697'
  },
  {
    symbol: 'ARY',
    name: 'Block Array',
    color: '#343434'
  },
  {
    symbol: 'AST',
    name: 'AirSwap',
    color: '#0061ff'
  },
  {
    symbol: 'ATM',
    name: 'ATMChain',
    color: '#346fce'
  },
  {
    symbol: 'ATOM',
    name: 'Cosmos',
    color: '#2e3148'
  },
  {
    symbol: 'AUDR',
    name: 'AUDRamp',
    color: '#34318a'
  },
  {
    symbol: 'AUTO',
    name: 'Cube',
    color: '#fab431'
  },
  {
    symbol: 'AYWA',
    name: 'Aywa',
    color: '#3355b5'
  },
  {
    symbol: 'BAB',
    name: 'Bitcoin Cash ABC',
    color: '#f19f13'
  },
  {
    symbol: 'BAL',
    name: 'Balancer',
    color: '#1e1e1e'
  },
  {
    symbol: 'BAND',
    name: 'Band Protocol',
    color: '#516aff'
  },
  {
    symbol: 'BAT',
    name: 'Basic Attention Token',
    color: '#ff5000'
  },
  {
    symbol: 'BAY',
    name: 'BitBay',
    color: '#6356ab'
  },
  {
    symbol: 'BCBC',
    name: 'BCBC',
    color: '#004ab5'
  },
  {
    symbol: 'BCC',
    name: 'BCC',
    color: '#f7931c'
  },
  {
    symbol: 'BCD',
    name: 'Bitcoin Diamond',
    color: '#fcc339'
  },
  {
    symbol: 'BCH',
    name: 'Bitcoin Cash',
    color: '#8dc351'
  },
  {
    symbol: 'BCIO',
    name: 'Blockchain.io',
    color: '#3f43ad'
  },
  {
    symbol: 'BCN',
    name: 'Bytecoin',
    color: '#f04086'
  },
  {
    symbol: 'BCO',
    name: 'BananaCoin',
    color: '#2c76b7'
  },
  {
    symbol: 'BCPT',
    name: 'BlockMason Credit Protocol',
    color: '#404040'
  },
  {
    symbol: 'BDL',
    name: 'Bitdeal',
    color: '#e54c40'
  },
  {
    symbol: 'BEAM',
    name: 'Beam',
    color: '#0b76ff'
  },
  {
    symbol: 'BELA',
    name: 'Belacoin',
    color: '#13a0f6'
  },
  {
    symbol: 'BIX',
    name: 'Bibox Token',
    color: '#000000'
  },
  {
    symbol: 'BLCN',
    name: 'BLCN',
    color: '#2aabe4'
  },
  {
    symbol: 'BLK',
    name: 'BlackCoin',
    color: '#181818'
  },
  {
    symbol: 'BLOCK',
    name: 'Blocknet',
    color: '#101341'
  },
  {
    symbol: 'BLZ',
    name: 'Blazecoin',
    color: '#18578c'
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    color: '#f3ba2f'
  },
  {
    symbol: 'BNT',
    name: 'Bancor Network Token',
    color: '#000d2b'
  },
  {
    symbol: 'BNTY',
    name: 'Bounty0x',
    color: '#fd7a3d'
  },
  {
    symbol: 'BOOTY',
    name: 'Booty',
    color: '#00b4f4'
  },
  {
    symbol: 'BOS',
    name: 'BOScoin',
    color: '#00a8d6'
  },
  {
    symbol: 'BPT',
    name: 'Blockport',
    color: '#0f63d8'
  },
  {
    symbol: 'BQ',
    name: 'bitqy',
    color: '#1d1d1d'
  },
  {
    symbol: 'BRD',
    name: 'Bread',
    color: '#fe5d86'
  },
  {
    symbol: 'BSD',
    name: 'BitSend',
    color: '#000000'
  },
  {
    symbol: 'BSV',
    name: 'BitcoinSV',
    color: '#eab304'
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#f7931a'
  },
  {
    symbol: 'BTCD',
    name: 'BitcoinDark',
    color: '#ff6600'
  },
  {
    symbol: 'BTCH',
    name: 'Bitcoin Hush',
    color: '#4700c2'
  },
  {
    symbol: 'BTCP',
    name: 'Bitcoin Private',
    color: '#272d63'
  },
  {
    symbol: 'BTCZ',
    name: 'BitcoinZ',
    color: '#f8c24a'
  },
  {
    symbol: 'BTDX',
    name: 'Bitcloud',
    color: '#00aaff'
  },
  {
    symbol: 'BTG',
    name: 'Bitcoin Gold',
    color: '#eba809'
  },
  {
    symbol: 'BTM',
    name: 'Bytom',
    color: '#504c4c'
  },
  {
    symbol: 'BTS',
    name: 'BitShares',
    color: '#35baeb'
  },
  {
    symbol: 'BTT',
    name: 'BitTorrent',
    color: '#000000'
  },
  {
    symbol: 'BTX',
    name: 'Bitcore',
    color: '#fb2ea3'
  },
  {
    symbol: 'BURST',
    name: 'Burst',
    color: '#2d2d2d'
  },
  {
    symbol: 'BZE',
    name: 'BZEdge',
    color: '#00aeef'
  },
  {
    symbol: 'CALL',
    name: 'Capital',
    color: '#fbb413'
  },
  {
    symbol: 'CC',
    name: 'CoinCollect',
    color: '#36b0f3'
  },
  {
    symbol: 'CDN',
    name: 'Canada eCoin',
    color: '#f70808'
  },
  {
    symbol: 'CDT',
    name: 'Blox',
    color: '#272731'
  },
  {
    symbol: 'CHAIN',
    name: 'Chainmakers',
    color: '#00aced'
  },
  {
    symbol: 'CHAT',
    name: 'ChatCoin',
    color: '#1c98f7'
  },
  {
    symbol: 'CHIPS',
    name: 'CHIPS',
    color: '#598182'
  },
  {
    symbol: 'CIX',
    name: 'Cryptonetix',
    color: '#0576b4'
  },
  {
    symbol: 'CLAM',
    name: 'Clams',
    color: '#20c5d3'
  },
  {
    symbol: 'CLOAK',
    name: 'Cloakcoin',
    color: '#ff3a00'
  },
  {
    symbol: 'CMM',
    name: 'Commercium',
    color: '#2fd2e5'
  },
  {
    symbol: 'CMT',
    name: 'Comet',
    color: '#c1a05c'
  },
  {
    symbol: 'CND',
    name: 'Cindicator',
    color: '#383939'
  },
  {
    symbol: 'CNX',
    name: 'Cryptonex',
    color: '#4c6bae'
  },
  {
    symbol: 'CNY',
    name: 'CNY',
    color: '#ff4314'
  },
  {
    symbol: 'COB',
    name: 'Cobinhood',
    color: '#13bf99'
  },
  {
    symbol: 'COLX',
    name: 'ColossusXT',
    color: '#77c3b0'
  },
  {
    symbol: 'COMP',
    name: 'Compound',
    color: '#00d395'
  },
  {
    symbol: 'COQUI',
    name: 'COQUI Cash',
    color: '#71c800'
  },
  {
    symbol: 'CRED',
    name: 'Verify',
    color: '#37e8a3'
  },
  {
    symbol: 'CRPT',
    name: 'Crypterium',
    color: '#00bdcd'
  },
  {
    symbol: 'CRW',
    name: 'Crown',
    color: '#0f1529'
  },
  {
    symbol: 'CS',
    name: 'CREDITS',
    color: '#262626'
  },
  {
    symbol: 'CTR',
    name: 'Centra',
    color: '#fdde6c'
  },
  {
    symbol: 'CTXC',
    name: 'Cortex',
    color: '#000000'
  },
  {
    symbol: 'CVC',
    name: 'Civic',
    color: '#3ab03e'
  },
  {
    symbol: 'D',
    name: 'Denarius',
    color: '#b8b8b8'
  },
  {
    symbol: 'DAI',
    name: 'Dai',
    color: '#f4b731'
  },
  {
    symbol: 'DASH',
    name: 'Dash',
    color: '#008ce7'
  },
  {
    symbol: 'DAT',
    name: 'Datum',
    color: '#2d9cdb'
  },
  {
    symbol: 'DATA',
    name: 'Streamr DATAcoin',
    color: '#e9570f'
  },
  {
    symbol: 'DBC',
    name: 'DeepBrain Chain',
    color: '#5bc1d4'
  },
  {
    symbol: 'DCN',
    name: 'Dentacoin',
    color: '#136485'
  },
  {
    symbol: 'DCR',
    name: 'Decred',
    color: '#2ed6a1'
  },
  {
    symbol: 'DEEZ',
    name: 'DeezNuts',
    color: '#939393'
  },
  {
    symbol: 'DENT',
    name: 'Dent',
    color: '#666666'
  },
  {
    symbol: 'DEW',
    name: 'DEW',
    color: '#fec907'
  },
  {
    symbol: 'DGB',
    name: 'DigiByte',
    color: '#006ad2'
  },
  {
    symbol: 'DGD',
    name: 'DigixDAO',
    color: '#f4d029'
  },
  {
    symbol: 'DLT',
    name: 'Agrello',
    color: '#f4ae95'
  },
  {
    symbol: 'DNT',
    name: 'district0x',
    color: '#2c398f'
  },
  {
    symbol: 'DOCK',
    name: 'Dock',
    color: '#786dbc'
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    color: '#c3a634'
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    color: '#e6007a'
  },
  {
    symbol: 'DRGN',
    name: 'Dragonchain',
    color: '#c91111'
  },
  {
    symbol: 'DROP',
    name: 'Dropil',
    color: '#242d3d'
  },
  {
    symbol: 'DTA',
    name: 'DATA',
    color: '#74d269'
  },
  {
    symbol: 'DTH',
    name: 'Dether',
    color: '#3c80f1'
  },
  {
    symbol: 'DTR',
    name: 'Dynamic Trading Rights',
    color: '#121747'
  },
  {
    symbol: 'EBST',
    name: 'eBoost',
    color: '#1693d4'
  },
  {
    symbol: 'ECA',
    name: 'Electra',
    color: '#aa15dd'
  },
  {
    symbol: 'EDG',
    name: 'Edgeless',
    color: '#2b1544'
  },
  {
    symbol: 'EDO',
    name: 'Eidoo',
    color: '#242424'
  },
  {
    symbol: 'EDOGE',
    name: 'EtherDoge',
    color: '#0facf3'
  },
  {
    symbol: 'ELA',
    name: 'Elastos',
    color: '#3fbadf'
  },
  {
    symbol: 'ELEC',
    name: 'Electrify.Asia',
    color: '#ff9900'
  },
  {
    symbol: 'ELF',
    name: 'aelf',
    color: '#2b5ebb'
  },
  {
    symbol: 'ELIX',
    name: 'Elixir',
    color: '#00aded'
  },
  {
    symbol: 'ELLA',
    name: 'Ellaism',
    color: '#396a28'
  },
  {
    symbol: 'EMC',
    name: 'EmerCoin',
    color: '#b49ffc'
  },
  {
    symbol: 'EMC2',
    name: 'Einsteinium',
    color: '#00ccff'
  },
  {
    symbol: 'ENG',
    name: 'Enigma',
    color: '#2f2f2f'
  },
  {
    symbol: 'ENJ',
    name: 'Enjin Coin',
    color: '#624dbf'
  },
  {
    symbol: 'ENTRP',
    name: 'Hut34 Entropy',
    color: '#fa5836'
  },
  {
    symbol: 'EON',
    name: 'EOS Network',
    color: '#443f54'
  },
  {
    symbol: 'EOP',
    name: 'EOP',
    color: '#35a7df'
  },
  {
    symbol: 'EOS',
    name: 'EOS',
    color: '#000000'
  },
  {
    symbol: 'EQLI',
    name: 'Equaliser',
    color: '#c9a35e'
  },
  {
    symbol: 'EQUA',
    name: 'EQUA',
    color: '#f68922'
  },
  {
    symbol: 'ETC',
    name: 'Ethereum Classic',
    color: '#328332'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    color: '#627eea'
  },
  {
    symbol: 'ETHOS',
    name: 'Ethos',
    color: '#00ffba'
  },
  {
    symbol: 'ETN',
    name: 'Electroneum',
    color: '#23bee2'
  },
  {
    symbol: 'ETP',
    name: 'Metaverse ETP',
    color: '#00a5ff'
  },
  {
    symbol: 'EUR',
    name: 'EUR',
    color: '#0f8ff8'
  },
  {
    symbol: 'EVX',
    name: 'Everex',
    color: '#044aac'
  },
  {
    symbol: 'EXMO',
    name: 'EXMO',
    color: '#347ffb'
  },
  {
    symbol: 'EXP',
    name: 'Expanse',
    color: '#ffaa5c'
  },
  {
    symbol: 'FAIR',
    name: 'Faircoin',
    color: '#c99705'
  },
  {
    symbol: 'FCT',
    name: 'Factom',
    color: '#417ba4'
  },
  {
    symbol: 'FIL',
    name: 'Filecoin [IOU]',
    color: '#42c1ca'
  },
  {
    symbol: 'FJC',
    name: 'Fujicoin',
    color: '#00afec'
  },
  {
    symbol: 'FLDC',
    name: 'Foldingcoin',
    color: '#c40e09'
  },
  {
    symbol: 'FLO',
    name: 'FLO',
    color: '#2080a2'
  },
  {
    symbol: 'FSN',
    name: 'FUSION',
    color: '#1d9ad7'
  },
  {
    symbol: 'FTC',
    name: 'Feathercoin',
    color: '#27323a'
  },
  {
    symbol: 'FUEL',
    name: 'Etherparty',
    color: '#4096d0'
  },
  {
    symbol: 'FUN',
    name: 'FunFair',
    color: '#ed1968'
  },
  {
    symbol: 'GAME',
    name: 'GameCredits',
    color: '#2d475b'
  },
  {
    symbol: 'GAS',
    name: 'Gas',
    color: '#58bf00'
  },
  {
    symbol: 'GBP',
    name: 'GBP',
    color: '#bc3fe0'
  },
  {
    symbol: 'GBX',
    name: 'Globitex',
    color: '#1666af'
  },
  {
    symbol: 'GBYTE',
    name: 'Obyte',
    color: '#302c2c'
  },
  {
    symbol: 'GENERIC',
    name: 'GENERIC',
    color: '#efb914'
  },
  {
    symbol: 'GIN',
    name: 'GINcoin',
    color: '#008dde'
  },
  {
    symbol: 'GLXT',
    name: 'GLX Token',
    color: '#005396'
  },
  {
    symbol: 'GMR',
    name: 'Gimmer',
    color: '#372d2c'
  },
  {
    symbol: 'GNO',
    name: 'Gnosis',
    color: '#00a6c4'
  },
  {
    symbol: 'GNT',
    name: 'Golem',
    color: '#001d57'
  },
  {
    symbol: 'GOLD',
    name: 'Dragonereum Gold',
    color: '#f1b32b'
  },
  {
    symbol: 'GRC',
    name: 'Gridcoin',
    color: '#5411b3'
  },
  {
    symbol: 'GRIN',
    name: 'Grin',
    color: '#fff300'
  },
  {
    symbol: 'GRS',
    name: 'Groestlcoin',
    color: '#377e96'
  },
  {
    symbol: 'GSC',
    name: 'Global Social Chain',
    color: '#ff0060'
  },
  {
    symbol: 'GTO',
    name: 'Gifto',
    color: '#7f27ff'
  },
  {
    symbol: 'GUP',
    name: 'Guppy',
    color: '#37dcd8'
  },
  {
    symbol: 'GUSD',
    name: 'Gemini dollar',
    color: '#00dcfa'
  },
  {
    symbol: 'GVT',
    name: 'Genesis Vision',
    color: '#16b9ad'
  },
  {
    symbol: 'GXS',
    name: 'GXChain',
    color: '#35a5f3'
  },
  {
    symbol: 'GZR',
    name: 'Gizer',
    color: '#56c9e9'
  },
  {
    symbol: 'HIGHT',
    name: 'Highcoin',
    color: '#117fc0'
  },
  {
    symbol: 'HODL',
    name: 'HOdlcoin',
    color: '#d59143'
  },
  {
    symbol: 'HOT',
    name: 'Holo',
    color: '#8834ff'
  },
  {
    symbol: 'HPB',
    name: 'High Performance Blockchain',
    color: '#1591ca'
  },
  {
    symbol: 'HSR',
    name: 'HShare',
    color: '#56428e'
  },
  {
    symbol: 'HT',
    name: 'HOTTO',
    color: '#2a3069'
  },
  {
    symbol: 'HTML',
    name: 'HTMLCOIN',
    color: '#cfa967'
  },
  {
    symbol: 'HUC',
    name: 'Huntercoin',
    color: '#ffc018'
  },
  {
    symbol: 'HUSH',
    name: 'Hush',
    color: '#292929'
  },
  {
    symbol: 'ICN',
    name: 'Iconomi',
    color: '#4c6f8c'
  },
  {
    symbol: 'ICX',
    name: 'ICON',
    color: '#1fc5c9'
  },
  {
    symbol: 'IGNIS',
    name: 'Ignis',
    color: '#f9c011'
  },
  {
    symbol: 'ILK',
    name: 'Inlock Token',
    color: '#98c23a'
  },
  {
    symbol: 'INK',
    name: 'Ink',
    color: '#df1a14'
  },
  {
    symbol: 'INS',
    name: 'Insolar',
    color: '#b2a3f6'
  },
  {
    symbol: 'ION',
    name: 'ION',
    color: '#57beea'
  },
  {
    symbol: 'IOP',
    name: 'Internet of People',
    color: '#0cafa5'
  },
  {
    symbol: 'IOST',
    name: 'IOStoken',
    color: '#1c1c1c'
  },
  {
    symbol: 'IOTX',
    name: 'IoTeX',
    color: '#00d4d5'
  },
  {
    symbol: 'IQ',
    name: 'Everipedia',
    color: '#55ddff'
  },
  {
    symbol: 'ITC',
    name: 'IoT Chain',
    color: '#102044'
  },
  {
    symbol: 'JNT',
    name: 'Jibrel Network',
    color: '#0050db'
  },
  {
    symbol: 'JPY',
    name: 'JPY',
    color: '#eac749'
  },
  {
    symbol: 'KCS',
    name: 'KuCoin Shares',
    color: '#0093dd'
  },
  {
    symbol: 'KIN',
    name: 'Kin',
    color: '#005fff'
  },
  {
    symbol: 'KLOWN',
    name: 'Ether Clown',
    color: '#ea0017'
  },
  {
    symbol: 'KMD',
    name: 'Komodo',
    color: '#2b6680'
  },
  {
    symbol: 'KNC',
    name: 'Kyber Network',
    color: '#188c92'
  },
  {
    symbol: 'KRB',
    name: 'Karbo',
    color: '#00aeef'
  },
  {
    symbol: 'LBC',
    name: 'LBRY Credits',
    color: '#006149'
  },
  {
    symbol: 'LEND',
    name: 'ETHLend',
    color: '#0fa9c9'
  },
  {
    symbol: 'LEO',
    name: 'Unus Sed LEO',
    color: '#11021e'
  },
  {
    symbol: 'LINK',
    name: 'ChainLink',
    color: '#2a5ada'
  },
  {
    symbol: 'LKK',
    name: 'Lykke',
    color: '#9d01eb'
  },
  {
    symbol: 'LOOM',
    name: 'Loom Network',
    color: '#48beff'
  },
  {
    symbol: 'LPT',
    name: 'Livepeer Token',
    color: '#000000'
  },
  {
    symbol: 'LRC',
    name: 'Loopring',
    color: '#2ab6f6'
  },
  {
    symbol: 'LSK',
    name: 'Lisk',
    color: '#0d4ea0'
  },
  {
    symbol: 'LTC',
    name: 'Litecoin',
    color: '#bfbbbb'
  },
  {
    symbol: 'LUN',
    name: 'Lunyr',
    color: '#f55749'
  },
  {
    symbol: 'MAID',
    name: 'MaidSafeCoin',
    color: '#5592d7'
  },
  {
    symbol: 'MANA',
    name: 'Decentraland',
    color: '#ff2d55'
  },
  {
    symbol: 'MATIC',
    name: 'Matic Network',
    color: '#2b6def'
  },
  {
    symbol: 'MCAP',
    name: 'MCAP',
    color: '#033b4a'
  },
  {
    symbol: 'MCO',
    name: 'Crypto.com',
    color: '#103f68'
  },
  {
    symbol: 'MDA',
    name: 'Moeda Loyalty Points',
    color: '#01a64f'
  },
  {
    symbol: 'MDS',
    name: 'MediShares',
    color: '#1e252c'
  },
  {
    symbol: 'MED',
    name: 'Medibloc',
    color: '#00b0ff'
  },
  {
    symbol: 'MEETONE',
    name: 'MEET.ONE',
    color: '#000000'
  },
  {
    symbol: 'MFT',
    name: 'Mainframe',
    color: '#da1157'
  },
  {
    symbol: 'MIOTA',
    name: 'IOTA',
    color: '#242424'
  },
  {
    symbol: 'MITH',
    name: 'Mithril',
    color: '#00316d'
  },
  {
    symbol: 'MKR',
    name: 'Maker',
    color: '#1aab9b'
  },
  {
    symbol: 'MLN',
    name: 'Melon',
    color: '#0b1529'
  },
  {
    symbol: 'MNX',
    name: 'MinexCoin',
    color: '#00adef'
  },
  {
    symbol: 'MNZ',
    name: 'MNZ',
    color: '#7f368a'
  },
  {
    symbol: 'MOAC',
    name: 'MOAC',
    color: '#000000'
  },
  {
    symbol: 'MOD',
    name: 'Modum',
    color: '#09547d'
  },
  {
    symbol: 'MONA',
    name: 'MonaCoin',
    color: '#dec799'
  },
  {
    symbol: 'MSR',
    name: 'Masari',
    color: '#47b95c'
  },
  {
    symbol: 'MTH',
    name: 'Monetha',
    color: '#104fca'
  },
  {
    symbol: 'MTL',
    name: 'Metal',
    color: '#1e1f25'
  },
  {
    symbol: 'MUSIC',
    name: 'Musicoin',
    color: '#ffffff'
  },
  {
    symbol: 'MZC',
    name: 'MAZA',
    color: '#ffaa05'
  },
  {
    symbol: 'NANO',
    name: 'Nano',
    color: '#4a90e2'
  },
  {
    symbol: 'NAS',
    name: 'Nebulas',
    color: '#222222'
  },
  {
    symbol: 'NAV',
    name: 'NavCoin',
    color: '#7d59b5'
  },
  {
    symbol: 'NCASH',
    name: 'Nucleus Vision',
    color: '#36a9cf'
  },
  {
    symbol: 'NDZ',
    name: 'NDZ',
    color: '#622fba'
  },
  {
    symbol: 'NEBL',
    name: 'Neblio',
    color: '#50479e'
  },
  {
    symbol: 'NEO',
    name: 'NEO',
    color: '#58bf00'
  },
  {
    symbol: 'NEOS',
    name: 'Neoscoin',
    color: '#e5f300'
  },
  {
    symbol: 'NEU',
    name: 'Neumark',
    color: '#b3ba00'
  },
  {
    symbol: 'NEXO',
    name: 'Nexo',
    color: '#1a4199'
  },
  {
    symbol: 'NGC',
    name: 'NAGA',
    color: '#f80000'
  },
  {
    symbol: 'NIO',
    name: 'Autonio',
    color: '#70c9c9'
  },
  {
    symbol: 'NLC2',
    name: 'NoLimitCoin',
    color: '#f28f01'
  },
  {
    symbol: 'NLG',
    name: 'Gulden',
    color: '#2ab0fd'
  },
  {
    symbol: 'NMC',
    name: 'Namecoin',
    color: '#186c9d'
  },
  {
    symbol: 'NMR',
    name: 'Numeraire',
    color: '#050708'
  },
  {
    symbol: 'NPXS',
    name: 'Pundi X',
    color: '#f5d100'
  },
  {
    symbol: 'NULS',
    name: 'Nuls',
    color: '#82bd39'
  },
  {
    symbol: 'NXS',
    name: 'Nexus',
    color: '#4099cd'
  },
  {
    symbol: 'NXT',
    name: 'NXT',
    color: '#008fbb'
  },
  {
    symbol: 'OAX',
    name: 'OpenANX',
    color: '#164b79'
  },
  {
    symbol: 'OK',
    name: 'OKCash',
    color: '#000000'
  },
  {
    symbol: 'OMG',
    name: 'OMG Network',
    color: '#101010'
  },
  {
    symbol: 'OMNI',
    name: 'Omni',
    color: '#1c347a'
  },
  {
    symbol: 'ONG',
    name: 'SoMee.Social',
    color: '#000000'
  },
  {
    symbol: 'ONT',
    name: 'Ontology',
    color: '#32a4be'
  },
  {
    symbol: 'OOT',
    name: 'Utrum',
    color: '#25aae1'
  },
  {
    symbol: 'OST',
    name: 'OST',
    color: '#34445b'
  },
  {
    symbol: 'OX',
    name: 'OX Fina',
    color: '#4392cd'
  },
  {
    symbol: 'OXT',
    name: 'Orchid',
    color: '#5f45ba'
  },
  {
    symbol: 'PART',
    name: 'Particl',
    color: '#03e8b0'
  },
  {
    symbol: 'PASC',
    name: 'Pascalcoin',
    color: '#f7931e'
  },
  {
    symbol: 'PASL',
    name: 'Pascal Lite',
    color: '#00acff'
  },
  {
    symbol: 'PAX',
    name: 'PAX Token',
    color: '#ede708'
  },
  {
    symbol: 'PAY',
    name: 'TenX',
    color: '#302c2c'
  },
  {
    symbol: 'PAYX',
    name: 'Paypex',
    color: '#663300'
  },
  {
    symbol: 'PINK',
    name: 'Pinkcoin',
    color: '#ed79aa'
  },
  {
    symbol: 'PIRL',
    name: 'Pirl',
    color: '#96b73d'
  },
  {
    symbol: 'PIVX',
    name: 'PIVX',
    color: '#5e4778'
  },
  {
    symbol: 'PLR',
    name: 'Pillar',
    color: '#00bfff'
  },
  {
    symbol: 'POA',
    name: 'POA Network',
    color: '#444fa1'
  },
  {
    symbol: 'POE',
    name: 'Po.et',
    color: '#dcd6cc'
  },
  {
    symbol: 'POLIS',
    name: 'Polis',
    color: '#2c3e50'
  },
  {
    symbol: 'POLY',
    name: 'Polymath Network',
    color: '#4c5a95'
  },
  {
    symbol: 'POT',
    name: 'Potcoin',
    color: '#105b2f'
  },
  {
    symbol: 'POWR',
    name: 'Power Ledger',
    color: '#05bca9'
  },
  {
    symbol: 'PPC',
    name: 'Peercoin',
    color: '#3cb054'
  },
  {
    symbol: 'PPP',
    name: 'PayPie',
    color: '#348f8d'
  },
  {
    symbol: 'PPT',
    name: 'Populous',
    color: '#152743'
  },
  {
    symbol: 'PRE',
    name: 'Presearch',
    color: '#3a8cbd'
  },
  {
    symbol: 'PRL',
    name: 'Oyster',
    color: '#1061e3'
  },
  {
    symbol: 'PUNGO',
    name: 'Pungo Token',
    color: '#22b573'
  },
  {
    symbol: 'PURA',
    name: 'Pura',
    color: '#333333'
  },
  {
    symbol: 'QASH',
    name: 'QASH',
    color: '#1347e8'
  },
  {
    symbol: 'QIWI',
    name: 'QIWI',
    color: '#ff8c00'
  },
  {
    symbol: 'QLC',
    name: 'QLC Chain',
    color: '#610089'
  },
  {
    symbol: 'QRL',
    name: 'Quantum Resistant Ledger',
    color: '#252525'
  },
  {
    symbol: 'QSP',
    name: 'Quantstamp',
    color: '#454545'
  },
  {
    symbol: 'QTUM',
    name: 'Qtum',
    color: '#2e9ad0'
  },
  {
    symbol: 'R',
    name: 'Revain',
    color: '#771a4e'
  },
  {
    symbol: 'RADS',
    name: 'Radium',
    color: '#9d4bef'
  },
  {
    symbol: 'RAP',
    name: 'Rapture',
    color: '#000000'
  },
  {
    symbol: 'RCN',
    name: 'Rcoin',
    color: '#3555f9'
  },
  {
    symbol: 'RDD',
    name: 'Reddcoin',
    color: '#e30613'
  },
  {
    symbol: 'RDN',
    name: 'Raiden Network Token',
    color: '#2a2a2a'
  },
  {
    symbol: 'REN',
    name: 'Ren',
    color: '#080817'
  },
  {
    symbol: 'REP',
    name: 'Augur',
    color: '#602a52'
  },
  {
    symbol: 'REQ',
    name: 'Request',
    color: '#00e6a0'
  },
  {
    symbol: 'RHOC',
    name: 'RChain',
    color: '#cc1e46'
  },
  {
    symbol: 'RIC',
    name: 'Riecoin',
    color: '#60e4dd'
  },
  {
    symbol: 'RISE',
    name: 'Rise',
    color: '#f49352'
  },
  {
    symbol: 'RLC',
    name: 'iExec RLC',
    color: '#ffd800'
  },
  {
    symbol: 'RPX',
    name: 'RPX',
    color: '#8d181b'
  },
  {
    symbol: 'RUB',
    name: 'RUB',
    color: '#64d1ff'
  },
  {
    symbol: 'RVN',
    name: 'Ravencoin',
    color: '#384182'
  },
  {
    symbol: 'RYO',
    name: 'Ryo Currency',
    color: '#3d58b0'
  },
  {
    symbol: 'SAFE',
    name: 'Safe',
    color: '#00688c'
  },
  {
    symbol: 'SAI',
    name: 'Single Collateral DAI',
    color: '#b68900'
  },
  {
    symbol: 'SALT',
    name: 'SALT',
    color: '#1beef4'
  },
  {
    symbol: 'SAN',
    name: 'Santiment Network Token',
    color: '#2b77b3'
  },
  {
    symbol: 'SBD',
    name: 'Steem Dollars',
    color: '#4ba2f2'
  },
  {
    symbol: 'SBERBANK',
    name: 'SBERBANK',
    color: '#48b254'
  },
  {
    symbol: 'SC',
    name: 'Siacoin',
    color: '#20ee82'
  },
  {
    symbol: 'SHIFT',
    name: 'Shift',
    color: '#964b9c'
  },
  {
    symbol: 'SIB',
    name: 'SIBCoin',
    color: '#057bc1'
  },
  {
    symbol: 'SIN',
    name: 'SINOVATE',
    color: '#f5342e'
  },
  {
    symbol: 'SKY',
    name: 'Skycoin',
    color: '#0072ff'
  },
  {
    symbol: 'SLR',
    name: 'Solarcoin',
    color: '#fda616'
  },
  {
    symbol: 'SLS',
    name: 'SaluS',
    color: '#8e9495'
  },
  {
    symbol: 'SMART',
    name: 'SmartCash',
    color: '#fec60d'
  },
  {
    symbol: 'SNGLS',
    name: 'SingularDTV',
    color: '#b30d23'
  },
  {
    symbol: 'SNM',
    name: 'SONM',
    color: '#0b1c26'
  },
  {
    symbol: 'SNT',
    name: 'Status',
    color: '#5b6dee'
  },
  {
    symbol: 'SOC',
    name: 'All Sports',
    color: '#199248'
  },
  {
    symbol: 'SPANK',
    name: 'SpankChain',
    color: '#ff3b81'
  },
  {
    symbol: 'SPHTX',
    name: 'SophiaTX',
    color: '#00b098'
  },
  {
    symbol: 'SRN',
    name: 'Sirin Labs Token',
    color: '#1c1c1c'
  },
  {
    symbol: 'STAK',
    name: 'STRAKS',
    color: '#f2941b'
  },
  {
    symbol: 'START',
    name: 'Startcoin',
    color: '#01aef0'
  },
  {
    symbol: 'STEEM',
    name: 'Steem',
    color: '#4ba2f2'
  },
  {
    symbol: 'STORJ',
    name: 'Storj',
    color: '#2683ff'
  },
  {
    symbol: 'STORM',
    name: 'Storm',
    color: '#080d98'
  },
  {
    symbol: 'STQ',
    name: 'Storiqa',
    color: '#2dc4e7'
  },
  {
    symbol: 'STRAT',
    name: 'Stratis',
    color: '#1387c9'
  },
  {
    symbol: 'STX',
    name: 'Stox',
    color: '#7324f0'
  },
  {
    symbol: 'SUB',
    name: 'Substratum',
    color: '#e53431'
  },
  {
    symbol: 'SUMO',
    name: 'Sumokoin',
    color: '#2d9cdb'
  },
  {
    symbol: 'SYS',
    name: 'Syscoin',
    color: '#0082c6'
  },
  {
    symbol: 'TAAS',
    name: 'TaaS',
    color: '#002342'
  },
  {
    symbol: 'TAU',
    name: 'Lamden',
    color: '#7b346e'
  },
  {
    symbol: 'TBX',
    name: 'Tokenbox',
    color: '#5244d4'
  },
  {
    symbol: 'TEL',
    name: 'Telcoin',
    color: '#14c8ff'
  },
  {
    symbol: 'TEN',
    name: 'Tokenomy',
    color: '#0899cd'
  },
  {
    symbol: 'TERN',
    name: 'Ternio',
    color: '#f4c257'
  },
  {
    symbol: 'TGCH',
    name: 'TrueGalaxyCash',
    color: '#434247'
  },
  {
    symbol: 'THETA',
    name: 'Theta Network',
    color: '#2ab8e6'
  },
  {
    symbol: 'TIX',
    name: 'Blocktix',
    color: '#ef494d'
  },
  {
    symbol: 'TKN',
    name: 'TokenCard',
    color: '#24dd7b'
  },
  {
    symbol: 'TKS',
    name: 'Tokes Platform',
    color: '#895af8'
  },
  {
    symbol: 'TNB',
    name: 'Time New Bank',
    color: '#ffc04e'
  },
  {
    symbol: 'TNC',
    name: 'Trinity Network Credit',
    color: '#ff439b'
  },
  {
    symbol: 'TNT',
    name: 'Tierion',
    color: '#ff4081'
  },
  {
    symbol: 'TOMO',
    name: 'TomoChain',
    color: '#1a1f36'
  },
  {
    symbol: 'TPAY',
    name: 'TokenPay',
    color: '#3058a6'
  },
  {
    symbol: 'TRIG',
    name: 'Triggers',
    color: '#30c0f2'
  },
  {
    symbol: 'TRTL',
    name: 'TurtleCoin',
    color: '#00843d'
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    color: '#ef0027'
  },
  {
    symbol: 'TUSD',
    name: 'TrueUSD',
    color: '#2b2e7f'
  },
  {
    symbol: 'TZC',
    name: 'TrezarCoin',
    color: '#374851'
  },
  {
    symbol: 'UBQ',
    name: 'Ubiq',
    color: '#00ea90'
  },
  {
    symbol: 'UMA',
    name: 'UMA',
    color: '#ff4a4a'
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    color: '#ff007a'
  },
  {
    symbol: 'UNITY',
    name: 'SuperNET',
    color: '#f58634'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    color: '#2775c9'
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    color: '#26a17b'
  },
  {
    symbol: 'UTK',
    name: 'UTRUST',
    color: '#30367a'
  },
  {
    symbol: 'VERI',
    name: 'Veritaseum',
    color: '#ff9933'
  },
  {
    symbol: 'VET',
    name: 'VeChain',
    color: '#15bdff'
  },
  {
    symbol: 'VIA',
    name: 'Viacoin',
    color: '#565656'
  },
  {
    symbol: 'VIB',
    name: 'Viberate',
    color: '#ff1f43'
  },
  {
    symbol: 'VIBE',
    name: 'VIBE',
    color: '#338be5'
  },
  {
    symbol: 'VIVO',
    name: 'VIVO',
    color: '#408af1'
  },
  {
    symbol: 'VRC',
    name: 'VeriCoin',
    color: '#418bca'
  },
  {
    symbol: 'VRSC',
    name: 'VerusCoin',
    color: '#ffb500'
  },
  {
    symbol: 'VTC',
    name: 'Vertcoin',
    color: '#048657'
  },
  {
    symbol: 'VTHO',
    name: 'VeThor Token',
    color: '#2a5284'
  },
  {
    symbol: 'WABI',
    name: 'Tael',
    color: '#399b32'
  },
  {
    symbol: 'WAN',
    name: 'Wanchain',
    color: '#136aad'
  },
  {
    symbol: 'WAVES',
    name: 'Waves',
    color: '#0155ff'
  },
  {
    symbol: 'WAX',
    name: 'WAX',
    color: '#f89022'
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    color: '#201a2d'
  },
  {
    symbol: 'WGR',
    name: 'Wagerr',
    color: '#b80000'
  },
  {
    symbol: 'WICC',
    name: 'WaykiChain',
    color: '#5783cb'
  },
  {
    symbol: 'WINGS',
    name: 'Wings',
    color: '#0dc9f7'
  },
  {
    symbol: 'WPR',
    name: 'WePower',
    color: '#ffe600'
  },
  {
    symbol: 'WTC',
    name: 'Waltonchain',
    color: '#8200ff'
  },
  {
    symbol: 'X',
    name: 'GLX Equity Token',
    color: '#3b5998'
  },
  {
    symbol: 'XAS',
    name: 'Asch',
    color: '#faa00d'
  },
  {
    symbol: 'XBC',
    name: 'Bitcoin Plus',
    color: '#f7931a'
  },
  {
    symbol: 'XBP',
    name: 'BlitzPredict',
    color: '#21af67'
  },
  {
    symbol: 'XBY',
    name: 'XtraBYtes',
    color: '#56f4f1'
  },
  {
    symbol: 'XCP',
    name: 'Counterparty',
    color: '#ed1650'
  },
  {
    symbol: 'XDN',
    name: 'DigitalNote',
    color: '#4f7aa2'
  },
  {
    symbol: 'XEM',
    name: 'NEM',
    color: '#67b2e8'
  },
  {
    symbol: 'XIN',
    name: 'Infinity Economics',
    color: '#1eb5fa'
  },
  {
    symbol: 'XLM',
    name: 'Stellar',
    color: '#000000'
  },
  {
    symbol: 'XMCC',
    name: 'Monoeci',
    color: '#dd0632'
  },
  {
    symbol: 'XMG',
    name: 'Magi',
    color: '#004a80'
  },
  {
    symbol: 'XMO',
    name: 'Monero Original',
    color: '#ff6600'
  },
  {
    symbol: 'XMR',
    name: 'Monero',
    color: '#ff6600'
  },
  {
    symbol: 'XMY',
    name: 'Myriad',
    color: '#ec1076'
  },
  {
    symbol: 'XP',
    name: 'XP',
    color: '#008200'
  },
  {
    symbol: 'XPA',
    name: 'XPA',
    color: '#4fa784'
  },
  {
    symbol: 'XPM',
    name: 'Primecoin',
    color: '#ffd81b'
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    color: '#23292f'
  },
  {
    symbol: 'XSG',
    name: 'SnowGem',
    color: '#d21e2b'
  },
  {
    symbol: 'XTZ',
    name: 'Tezos',
    color: '#a6e000'
  },
  {
    symbol: 'XUC',
    name: 'Exchange Union',
    color: '#25aae3'
  },
  {
    symbol: 'XVC',
    name: 'Vcash',
    color: '#b50126'
  },
  {
    symbol: 'XVG',
    name: 'Verge',
    color: '#00cbff'
  },
  {
    symbol: 'XZC',
    name: 'Zcoin',
    color: '#23b852'
  },
  {
    symbol: 'YFI',
    name: 'yearn.finance',
    color: '#006ae3'
  },
  {
    symbol: 'YOYOW',
    name: 'YOYOW',
    color: '#21a5de'
  },
  {
    symbol: 'ZCL',
    name: 'Zclassic',
    color: '#c87035'
  },
  {
    symbol: 'ZEC',
    name: 'Zcash',
    color: '#ecb244'
  },
  {
    symbol: 'ZEL',
    name: 'ZelCash',
    color: '#183c87'
  },
  {
    symbol: 'ZEN',
    name: 'Horizen',
    color: '#00eaab'
  },
  {
    symbol: 'ZEST',
    name: 'Zest',
    color: '#07bc9c'
  },
  {
    symbol: 'ZIL',
    name: 'Zilliqa',
    color: '#49c1bf'
  },
  {
    symbol: 'ZILLA',
    name: 'Chainzilla',
    color: '#00004d'
  },
  {
    symbol: 'ZRX',
    name: '0x',
    color: '#302c2c'
  }
]

module.exports = coins
