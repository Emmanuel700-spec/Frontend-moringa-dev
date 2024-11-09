import {createSlice,createAsyncThunk} from '@reduxjs/toolkit' /*reateAsyncThunk-use to fetch api data*/
export const fetchTodo = createAsyncThunk("fetchTodo",async () =>{
    const data = await fetch('http://localhost:5000/categories');
    return data.json();
})
const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        isLoading:false,
        data: null,        
        error: null,
    },
      reducers: {},
      extraReducers: (builder) =>{      

             /*if  data is not fetched */
        builder.addCase(fetchTodo.pending, (state) => {
            state.isLoading = true;
          })
           /*if  data is  fetched */
        builder.addCase(fetchTodo.fulfilled, (state, action) => {

            state.isLoading = false;
            state.data = action.payload;
          })
           /*if  data fetched  has error message*/
        builder.addCase(fetchTodo.rejected, (state, action) => {
            state.error = true
          })
      } 

        
})
export default  todoSlice.reducer;