import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import {
    SignInApiResponseModel,
    User,
} from 'models/api_responses/SignInApiResponseModel'
import AuthStorage from 'repo/auth/AuthStorage'
import { resetApiClient } from 'repo/Client'
import { AppLog, TAG } from 'utils/Util'

export interface AuthState {
    user: User | undefined
    loading: boolean
}

const initialState: AuthState = {
    user: undefined,
    loading: false,

}

// Define an async thunk action
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  // Perform async operation here, e.g., API request
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
});

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (
            state,
            { payload }: PayloadAction<SignInApiResponseModel>
        ) => {
            let user = payload
            state.user = user.data
            AuthStorage.storeUser(user)

            const token = user.data.access_token

            AppLog.log(
                () => 'Resetting Authorization Token: ' + token,
                TAG.AUTHENTICATION
            )

            resetApiClient(token)

            // PushNotification.registerUser(user.id);
            // PushNotification.registerUser(user.data.id);
        },
        logOut: (state) => {
            // PushNotification.unRegisterUser();
            state.user = undefined
            AuthStorage.removeUser(() => resetApiClient())
            // PushNotification.unRegisterUser();
        },
        setApiClient: (state, { payload }: PayloadAction<string>) => {
            AppLog.log(
                () => 'Resetting Authorization Token: ' + payload,
                TAG.AUTHENTICATION
            )
            resetApiClient(payload)
        },
        updateUserProfile: (state, { payload }: PayloadAction<User>) => {
            state.user = { ...state.user, ...payload }
            AuthStorage.storeProfileInCurrentUser({ ...state.user, ...payload })
        },
    },
    extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
})

// Action creators are generated for each case reducer function
export const { setUser, logOut, updateUserProfile, setApiClient } =
    authSlice.actions

export default authSlice.reducer
