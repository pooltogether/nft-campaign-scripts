import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

import { POLYGON_USDC_TICKET_ADDRESS } from '../../../utils/Constants';
import getAccountsDelegations from '../../../utils/request/getAccountsDelegations';

const request = async () => {
  const accounts = await getAccountsDelegations(
    '137',
    POLYGON_USDC_TICKET_ADDRESS,
    27054473 // Block number at Mar-27-2022 07:00:01 PM +UTC
  );

  const usersWithDelegationGT10: Array<{ address: string }> = [];

  accounts.map(async (account) => {
    const { delegations } = account;

    await delegations.map(async (delegation: any) => {
      const { delegator, delegatee, balance } = delegation;

      // We record only delegations with a balance greater than pr equal to $10 and made to other accounts
      if (balance >= 10000000 && delegator.id !== delegatee.id) {
        usersWithDelegationGT10.push({ address: delegator.id });
      }
    });
  });

  const uniqueAddresses = usersWithDelegationGT10.filter(
    (
      (set) => (delegator) =>
        !set.has(delegator.address) && set.add(delegator.address)
    )(new Set())
  );

  const csv = parse(uniqueAddresses, { header: false });

  fs.writeFile(path.join(__dirname, '..', 'results', 'week-four.csv'), csv, function (error) {
    if (error) {
      return console.log('Failed to write week four results: ', error);
    }
  });
};

request();
