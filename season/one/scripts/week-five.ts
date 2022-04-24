import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

import { getTicketAddress } from '../../../utils/network/getTicketAddress';
import getAccounts from '../../../utils/request/getAccounts';

const startTimestamp = 1649617200; // Apr-10-2022 07:00:00 PM +UTC
const endTimestamp = 1650826800; // Apr-24-2022 07:00:00 PM +UTC

const request = async (chainId: string, blockNumber: number) => {
  const accounts = await getAccounts(
    chainId,
    getTicketAddress(chainId),
    blockNumber // Block number at Apr-24-2022 07:00:00 PM +UTC
  );

  const accountsWithDelegateBalanceGTZero: Array<string> = [];

  accounts.map((user) => {
    if (user.delegateBalance > 0) {
      if (accountsWithDelegateBalanceGTZero.indexOf(user.id) === -1) {
        accountsWithDelegateBalanceGTZero.push(user.id);
      }

      user.twabs.map((twab: { delegateBalance: number; timestamp: number }) => {
        const { delegateBalance, timestamp } = twab;

        if (timestamp >= startTimestamp && timestamp <= endTimestamp) {
          if (delegateBalance === 0) {
            // If delegateBalance is 0, then we need to remove the user from the list
            const index = accountsWithDelegateBalanceGTZero.indexOf(user.id);

            if (index !== -1) {
              accountsWithDelegateBalanceGTZero.splice(index, 1);
            }
          }
        }
      });
    }
  });

  return accountsWithDelegateBalanceGTZero;
};

const requests = async () => {
  const addressesEthereum = await request('1', 14649170);
  const addressesPolygon = await request('137', 27529570);
  const addressesAvalanche = await request('43114', 13849316);

  const addresses = [...addressesEthereum, ...addressesPolygon, ...addressesAvalanche];

  const uniqueAddresses = addresses.filter(
    (
      (set) => (address) =>
        !set.has(address) && set.add(address)
    )(new Set())
  );

  const addressesWithField: Array<{ address: string }> = [];

  uniqueAddresses.map((address) => addressesWithField.push({ address }));

  const csv = parse(addressesWithField, { header: false });

  fs.writeFile(path.join(__dirname, '..', 'results', `week-five.csv`), csv, function (error) {
    if (error) {
      return console.log('Failed to write week five results: ', error);
    }
  });
};

requests();
