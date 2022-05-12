import {
  MAINNET_USDC_TICKET_ADDRESS,
  POLYGON_USDC_TICKET_ADDRESS,
  AVALANCHE_USDC_TICKET_ADDRESS,
} from '../Constants';

export function getTicketAddress(chainId: string): string {
  switch (chainId) {
    case '1':
      return MAINNET_USDC_TICKET_ADDRESS;
    case '137':
      return POLYGON_USDC_TICKET_ADDRESS;
    case '43114':
      return AVALANCHE_USDC_TICKET_ADDRESS;
    default:
      throw new Error(`Unsupported network: ${chainId}`);
  }
}
