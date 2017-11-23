import { doGetRequest } from './requests';

import SERVICE_HTTP from '../../constants/serviceHttpAddress';

const GET_URL = `${SERVICE_HTTP}/mytaxi/vehicles`;

const MyTaxiSource = {
  fetchTaxies: () => doGetRequest(GET_URL),
};

export default MyTaxiSource;
