import fs from 'fs';
import path from 'path';
import { parse } from 'json2csv';

import getVoters from '../../../utils/request/getVoters';

const request = async () => {
  const voters = await getVoters();

  const uniqueVoters = voters.filter(
    (
      (set) => (voter) =>
        !set.has(voter.voter) && set.add(voter.voter)
    )(new Set())
  );

  const addressesWithField: Array<{ address: string }> = [];

  uniqueVoters.map((voter) => addressesWithField.push({ address: voter.voter }));

  const csv = parse(addressesWithField, { header: false });

  fs.writeFile(path.join(__dirname, '..', 'results', `week-eight.csv`), csv, function (error) {
    if (error) {
      return console.log('Failed to write week eight results: ', error);
    }
  });
};

request();
