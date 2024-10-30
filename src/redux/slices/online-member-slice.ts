/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type InitialStateProps = {
    members : {
        id : string
    }[]
}

const intialState : InitialStateProps = {
    members : []
}


export const onlineTracking = createSlice({
    name : "online",
    initialState : intialState,
    reducers : {
        onOnline : (state, action : PayloadAction<InitialStateProps>) => {
            // check for duplicates
            const list = state.members.find((data : any) => 
            action.payload.members.find((payload : any)=> data.id === payload.id))
            
            if (!list) {
                state.members = [...state.members, ...action.payload.members]
            }
        },
        onOffilne : (state, action : PayloadAction<InitialStateProps>)=> {
            // look for member and remove them
            state.members = state.members.filter((member : any)=> action.payload.members.find((m : any)=> member.id !== m.id))
        }
    }
})

export const {onOnline, onOffilne} = onlineTracking.actions
export default onlineTracking.reducer