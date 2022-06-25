import { DataSource } from 'apollo-datasource';
import { each } from 'lodash';
import missings from '../data/missings.json';
import names from '../data/names.json';
import { Metadata } from '../types';

class NamesAPI extends DataSource {
  // constructor() {
  //   super()
  // }

  getAll(): Metadata[] {
    const arr = [];

    for (const [key, value] of Object.entries(names)) {
      arr.push({
        id: key,
        bittrexId: value.id,
        symbol: key,
        name: value.name,
        slug: value.slug,
        description: value.description,
        logo: value.logo
      });
    }

    each(missings, (missing) => {
      arr.push(missing);
    });

    return arr;
  }
}

export default NamesAPI;
