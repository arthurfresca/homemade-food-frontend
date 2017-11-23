import * as Car2GoRulesActionType from '../actiontypes/car2Go';

const INITIAL_STATE = {
  ids: [],
  content: {},
};

function normalize(cars2GoList) {
  const ids = [];
  const content = {};
  cars2GoList.placemarks.forEach((car2Go) => {
    ids.push(car2Go.id);
    content[car2Go.id] = car2Go;
  });
  return {
    ids,
    content,
  };
}

export default function cars2Go(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Car2GoRulesActionType.GET_CAR_LIST:
      return normalize(action.cars2Go);
    default:
      return state;
  }
}
