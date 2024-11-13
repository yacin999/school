/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
    data : unknown[]
}

const initialState : InitialStateProps= {
    data : []
}


export const InfiniteScroll = createSlice({
    name : "InfiniteScroll",
    initialState,
    reducers : {
        onInitialScroll : (state, action : PayloadAction<InitialStateProps>) => {
            const list = state.data.find((data:any)=>action.payload.data.find((payload : any)=> data.id ===  payload.id))
            if (!list) {
                state.data = [...state.data, ...action.payload.data]
            }
        },
        onClearList : (state, action) => {
            state.data = action.payload.data
        }
    }
})


export const {onInitialScroll, onClearList} = InfiniteScroll.actions
export default InfiniteScroll.reducer