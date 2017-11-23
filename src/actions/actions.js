import * as MyTaxiRulesActionType from '../actiontypes/myTaxi';
import * as Car2GoRulesActionType from '../actiontypes/car2Go';
import MyTaxiSource from '../data/source/myTaxiRulesSource';
import Car2GoSource from '../data/source/car2GoRulesSource';

export const getMyTaxiList = myTaxies => ({
  type: MyTaxiRulesActionType.GET_TAXI_LIST,
  myTaxies,
});

export const getCar2GoList = cars2Go => ({
  type: Car2GoRulesActionType.GET_CAR_LIST,
  cars2Go,
});

/*
Those are respective middleware using Thunk library
The thunk is the agent which make something happen before Redux flow goes on
In this case Thunk will wait for backend response
Then, after success it will continue Redux flow
If this fail, it will log an error on the console
*/

export function fetchTaxies() {
  return async (dispatch) => {
    try {
      const taxies = await MyTaxiSource.fetchTaxies();
      dispatch(getMyTaxiList(taxies));
    } catch (exception) {
      console.error(exception);
    }
  };
}

export function fetchCars2Go() {
  return async (dispatch) => {
    try {
      const cars2Go = await Car2GoSource.fetchCars2Go();
      dispatch(getCar2GoList(cars2Go));
    } catch (exception) {
      console.error(exception);
    }
  };
}
