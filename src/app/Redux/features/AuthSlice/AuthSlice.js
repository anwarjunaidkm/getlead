import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../../domain/axiosInstance";
import { toast } from "react-toastify";

//<<<--------------------Login Api------------------------>>>
export const LoginApi = createAsyncThunk(
  "login/LoginApi",
  async ({ formData, router }) => {
    try {
      const res = await axiosInstance.post(
        "/api_bcc/api/auth/login/",
        formData
      );
      if (res.data.data.token) {
        localStorage.setItem("token", res.data.data.token.access);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            router.push("/home");
          },
        });
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.message);

      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
);

const initialState = {
  loading: false,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginApi.pending, (state, action) => {
        state.loading = true;
        console.log("requseted");
      })
      .addCase(LoginApi.fulfilled, (state, action) => {
        state.loading = false;
        console.log("success");
      })
      .addCase(LoginApi.rejected, (state, action) => {
        state.loading = false;
        console.log("failed");
      });
  },
});

export const {} = LoginSlice.actions;
export default LoginSlice.reducer;
