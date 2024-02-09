import axios from "axios";
import {
  POST_CREATEUSER_ERROR,
  POST_CREATEUSER_LOADING,
  POST_CREATEUSER_SUCCESS,
  POST_LOGIN_LOADING,
} from "./actionType";

export const createUser =
  (username, email, password, UserimageUrl, navigate) => async (dispatch) => {
    dispatch({ type: POST_CREATEUSER_LOADING });
    try {
      const response = await axios.post(
        `http://localhost:8080/api/register`,
         username, email, password, UserimageUrl ,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle the server response here
      console.log(response.data);
      dispatch({ type: POST_CREATEUSER_SUCCESS });
      alert("SignUp successfull");
      navigate("/login");
    } catch (error) {
      // console.log(error);
      dispatch({ type: POST_CREATEUSER_ERROR });
      alert("some thing wrong");
    }
  };
