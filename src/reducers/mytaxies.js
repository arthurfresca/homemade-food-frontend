import * as MyTaxiRulesActionType from '../actiontypes/myTaxi';

const INITIAL_STATE = {
  ids: [],
  content: {},
};

function normalize(taxiesList) {
  const ids = [];
  const content = {};
  taxiesList.poiList.forEach((taxi) => {
    ids.push(taxi.id);
    content[taxi.id] = taxi;
  });
  return {
    ids,
    content,
  };
}

export default function mytaxies(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MyTaxiRulesActionType.GET_TAXI_LIST:
      return normalize(action.myTaxies);
    default:
      return state;
  }
}
