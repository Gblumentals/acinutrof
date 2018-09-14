import {List} from 'immutable';







let id = 0;
const initialState = { unansweredQuestion:{}, client:{}, chain:List([]), activeUser:{}, items:List([]), users:List([]) }


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
        console.log('ACTION', state);
        return {
            ...state,
            unansweredQuestion: action.unansweredQuestion,
            chain: state.chain.push(action.unansweredQuestion)
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
        client:action.client,
        items:List(action.users),
        users:List(action.users),
      }

      case 'USER_HISTORY':
      return {
          ...state,
          activeUser:action.activeUser,
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
