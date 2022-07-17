import { DataSource } from 'apollo-datasource';
import { each } from 'lodash';
import missings from '../data/missings.json';
import names from '../data/names.json';
import { Metadata } from '../types';

class NamesAPI extends DataSource {
  getAll(): Metadata[] {
    const arr = [];

    for (const [key, value] of Object.entries(names)) {
      arr.push({
        id: key,
        symbol: key,
        name: value.name,
        slug: value.slug,
        description: value.description,
        logo: value.logo
      });
    }

    each(missings, (missing: Metadata) => {
      arr.push({
        id: missing.symbol,
        symbol: missing.symbol,
        name: missing.name,
        slug: missing.slug,
        description: missing.description,
        logo: missing.logo
      });
    });

    return arr;
  }
}

export default NamesAPI;
