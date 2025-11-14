import { v4 as uid } from "uuid";
export default function CrudReducer(state , action){
    switch(action.type){
        case "ADD_TASK":
            return [...state, { id: uid(), ...action.payload.formData, completed: false }];
        case "UPDATE_TASK":
            return state.map((todo) =>
                todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
            );
        case "DELETE_TASK":
            return state.filter((todo) => todo.id !== action.payload);
        case "TOGGLE_COMPLETED":
            return state.map((todo) =>
                todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
            );
        default:
            return state;
    }

}