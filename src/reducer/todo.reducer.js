// @flow
import Actions from '../action/actions';
import { normalize, schema } from 'normalizr';
import R from 'ramda';

const STodo = new schema.Entity('todo');
const STodos = new schema.Array(STodo);

export function todo(
  state = { result: [], entities: { todo: {} }, tempIdCursor: 0 },
  action: FSAction
) {
  switch (action.type) {
    case Actions.GET_TODO_LIST.SUCCESS: {
      const normalizedData = normalize(action.payload, STodos);
      return {
        ...state,
        result: normalizedData.result,
        entities: {
          todo: {
            ...state.entities.todo,
            ...normalizedData.entities.todo
          }
        }
      };
    }

    case Actions.UPDATE_TODO.REQUEST: {
      return {
        ...state,
        entities: {
          todo: {
            ...state.entities.todo,
            [action.payload.id]: action.payload
          }
        }
      };
    }

    /* case Actions.CREATE_TODO.REQUEST: {
       *   return {
       *     ...state,
       *     entities: {
       *       todo: {
       *         ...state.entities.todo,
       *         ['[TEMP]' + state.tempIdCursor]: action.payload
       *       }
       *     },
       *     tempIdCursor: state.tempIdCursor + 1
       *   };
       * }

       * case Actions.CREATE_TODO.SUCCESS: {
       *   return {
       *     ...state,
       *     entities: {
       *       todo: {
       *         ...state.entities.todo,
       *         [action.payload.id]: action.payload
       *       }
       *     }
       *   };
       * }
       */
    case Actions.DELETE_TODO.REQUEST: {
      return {
        ...state,
        entities: {
          todo: {
            ...state.entities.todo,
            [action.payload.id]: {
              ...state.entities.todo[action.payload.id],
              hidden: true
            }
          }
        }
      };
    }

    default:
      return state;
  }
}
