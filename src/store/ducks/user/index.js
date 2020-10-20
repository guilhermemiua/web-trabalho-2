const LOAD   = 'my-app/widgets/LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

export default function userReducer(state = {}, action = {}) {
  switch (action.type) {
    default: return state;
  }
}

function loadWidgets() {
  return { type: LOAD };
}

export {
  loadWidgets
}
