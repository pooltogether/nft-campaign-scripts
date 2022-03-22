import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

import { POLYGON_USDC_TICKET_ADDRESS } from '../../../utils/Constants';
import getUsersBalance from '../../../utils/request/getUsersBalance';

const request = async () => {
  const usersBalance = await getUsersBalance(
    '137',
    POLYGON_USDC_TICKET_ADDRESS,
    26198370 // Block number at Mar-21-2022 06:59:59 PM +UTC
  );

  const usersWithBalanceGTZero: Array<{ address: string }> = [];

  usersBalance.map((user) => {
    if (user.balance > 0) {
      usersWithBalanceGTZero.push({ address: user.id });
    }
  });

  const csv = parse(usersWithBalanceGTZero, { fields: ['address'] });

  fs.writeFile(path.join(__dirname, '..', 'results', 'week-one.csv'), csv, function (error) {
    if (error) {
      return console.log('Failed to write week one results: ', error);
    }
  });
};

request();
