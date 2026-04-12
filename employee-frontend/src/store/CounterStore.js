import {create} from 'zustand'

//Cretae store
export const useCounterStore=create((set)=>({
    //State
    newCounter:0,
    //Functions to modify the state
    incrementCounter:()=>set(state=>({newCounter:state.newCounter+1})),
    decrementCounter:()=>set(state=>({newCounter:state.newCounter-1})),
    reset:()=>set({newCounter:0}),
    //State
    newCounter1:100,
    //Functions to modify the state
    incrementCounter1:()=>set(state=>({newCounter:state.newCounter1+1})),
    decrementCounter1:()=>set(state=>({newCounter:state.newCounter1-1})),
    reset1:()=>set({newCounter1:0}),
    //Function to change new counter to 500
    reset2:()=>set({newCounter:500}),
    //Function to decrement newCounter1 by 20
    decrementCounter2:()=>set(state=>({newCounter1:state.newCounter1-20})),
    //Add user state with properties name,age,email
    user:{name:"ravi",email:"ravi@mail.com",age:21},
    //Function to change email
    changeEmail:()=>set(state=>({...state.user,email:"test@mail.com"})),
    //Function to change name and age
    changeNameAndAge:()=>set(state=>({...state.user,name:"bhanu",age:23}))
}))