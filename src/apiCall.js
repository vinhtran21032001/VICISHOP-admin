import { adminRequest } from "./methodRequest"
import { addProductFailure, addProductStart, addProductSuccess, deleteProductStart, deleteProductSuccess, editProductFailure, editProductStart, editProductSuccess, getProductFailure, getProductStart, getProductSuccess } from "./redux/productRedux";
import { addUserFailure, addUserStart, addUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, editUserFailure, editUserStart, editUserSuccess, getUserFailure, getUserStart, getUserSuccess } from "./redux/userRedux";


export const APIgetProduct = async (dispatch) => {
     dispatch(getProductStart())
            try {
                const res = await adminRequest.get("/product");
                dispatch(getProductSuccess(res.data));
               
            } catch {
                dispatch(getProductFailure())
            }

}


export const APIDeleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart())
           try {
            //    const res = await adminRequest.delete("/product");
               dispatch(deleteProductSuccess(id));
              
           } catch {
               dispatch(getProductFailure())
           }

}

export const APIEditProduct = async (dispatch, newproduct)=> {
    dispatch(editProductStart())
    try {
     //    const res = await adminRequest.delete("/product");
        dispatch(editProductSuccess(newproduct));
       
    } catch {
        dispatch(editProductFailure())
    }
}

export const APIAddProduct = async (dispatch, newProduct) => {
    dispatch(addProductStart());
    try {
        const res = await adminRequest.post('/product', newProduct);
        dispatch(addProductSuccess(res.data));
    }catch {
        dispatch(addProductFailure());
    }
}

// User

export const APIGetUsers = async (dispatch) => {
    dispatch(getUserStart())
           try {
               const res = await adminRequest.get("/user");
               dispatch(getUserSuccess(res.data));
              
           } catch {
               dispatch(getUserFailure())
           }
}
export const APIDeleteUsers = async (dispatch, id) => {
    dispatch(deleteUserStart())
           try {
            //    const res = await adminRequest.get("/user");
               dispatch(deleteUserSuccess(id));
              
           } catch {
               dispatch(deleteUserFailure())
           }
}

export const APIEditUsers = async (dispatch, newUser) => {
    dispatch(editUserStart())
           try {
            //    const res = await adminRequest.get("/user");
               dispatch(editUserSuccess(newUser));
              
           } catch {
               dispatch(editUserFailure())
           }
}

export const APIAddUsers = async (dispatch, newUser) => {
    dispatch(addUserStart())
           try {
               const res = await adminRequest.post("/auth/resgistor", newUser);
               dispatch(addUserSuccess(res.data));
              
           } catch {
               dispatch(addUserFailure())
           }
}
