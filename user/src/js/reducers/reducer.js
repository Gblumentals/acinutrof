import {List} from 'immutable';







let id = 0;
const initialState = { user:{}, chain:List([]), activeClient:{}, items:List([]), clients:List([]) }


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
        return {
            ...state,
            items:state.items.push({id:action.itemId,item:action.item,completed:action.completed})
        }

    case 'COMPLETED_ITEM':
	  return {
        ...state,
        items:state.items.update( action.itemId-1,(value)=> {
           return {...value,completed:  action.completed}
        })
      }
    case 'INITIAL_ITEMS':
    return {
        ...state,
        user:action.user,
        items:List(action.clients),
        clients:List(action.clients)
      }

      case 'CLIENT_HISTORY':
      return {
          ...state,
          activeClient:action.activeClient,
          chain:List(action.chain),
        }

      case 'SUBSCRIBE_PUSH_NOTIFICATIONS':
      return {
          ...state
        }

	  // return {
    //     ...state,
    //     items:state.items.push({id:action.items.itemId,item:action.items.item,completed:action.items.completed})
    //   }
    default:
      return state
  }
}


export default reducer
