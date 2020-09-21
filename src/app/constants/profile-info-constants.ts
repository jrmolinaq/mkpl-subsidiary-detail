import { ProviderContactData } from '../interfaces/provider.interface';
import { GENERAL_FIELDS, CONTACT_FIELDS } from './common-data';
import { ROLES } from './auth';

const fields = {
  ...GENERAL_FIELDS,
  country: 'País',
  city: 'Ciudad',
  address: 'Dirección'
};

export const GENERAL_PROFILE_FIELDS = {
  [ROLES.provider]: { nit: 'NIT', ...fields },
  [ROLES.subsidiary]: fields
};

export const CONTACT_PROFILE_FIELDS: ProviderContactData = CONTACT_FIELDS;
