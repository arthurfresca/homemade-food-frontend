import { doGetRequest } from './requests';

import SERVICE_HTTP from '../../constants/serviceHttpAddress';

const GET_URL = `${SERVICE_HTTP}/car2go/vehicles`;

const MyTaxiSource = {
  fetchCars2Go: () => doGetRequest(GET_URL),
};

export default MyTaxiSource;
