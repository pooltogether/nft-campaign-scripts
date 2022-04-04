import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

import { POLYGON_USDC_TICKET_ADDRESS } from '../../../utils/Constants';
import getAccounts from '../../../utils/request/getAccounts';

const request = async () => {
  const accounts = await getAccounts(
    '137',
    POLYGON_USDC_TICKET_ADDRESS,
    26432570 // Block number at Mar-27-2022 07:00:01 PM +UTC
  );

  const accountsWithBalanceGTZero: Array<{ address: string }> = [];

  accounts.map((user) => {
    if (user.balance > 0) {
      accountsWithBalanceGTZero.push({ address: user.id });
    }
  });

  const csv = parse(accountsWithBalanceGTZero, { header: false });

  fs.writeFile(path.join(__dirname, '..', 'results', 'week-one.csv'), csv, function (error) {
    if (error) {
      return console.log('Failed to write week one results: ', error);
    }
  });
};

request();
