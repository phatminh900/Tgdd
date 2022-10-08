import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ROUTES } from "../app-constants/navigation.constant";
import SharedLayout from "pages/public/shared-layout/shared-layout";
import { Provider } from "react-redux";
import store from "store/main.store";
import {
  NotFound,
  Login,
  Phones,
  // Phone,
  Review,
  Signup,
  Cart,
  Product,
  Laptops,
  Home,
  OrderHistory,
  ForgotPassword,
  ResetPassword,
  homeLoader,
  productItemLoader,
  ErrorPage,
  reviewLoader,
  signupAction,
  loginAction,
  forgotPasswordAction,
  resetPasswordAction,
  orderUserHistoryLoader,
  OrderUserHistory,
  OrderDetailSpecific,
  orderDetailSpecificLoader,
  UserPersonalInformation,
  userPersonalInfoAction,
} from "pages";
import { ErrorBoundary, PageLoading } from "components";
import AuthContextProvider from "context/auth.context";
import loaderProducts from "utils/loaderProducts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SharedLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} loader={homeLoader} />

      <Route path={ROUTES.PHONES}>
        <Route index element={<Phones />} loader={loaderProducts} />
        <Route
          path={`:slug`}
          element={<Product />}
          loader={productItemLoader}
        />
        <Route
          path={`:slug/reviews`}
          element={<Review />}
          loader={reviewLoader}
        />
      </Route>

      {/* laptops */}
      <Route path={ROUTES.LAPTOPS}>
        <Route index element={<Laptops />} loader={loaderProducts} />
        <Route
          path={ROUTES.SLUG}
          element={<Product />}
          loader={productItemLoader}
        />
        <Route
          path={ROUTES.PRODUCT_REVIEW}
          element={<Review />}
          loader={reviewLoader}
        />
      </Route>

      {/* Auth */}
      <Route path={ROUTES.LOGIN} element={<Login />} action={loginAction} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} action={signupAction} />
      <Route
        path={ROUTES.FORGOTPASSWORD}
        element={<ForgotPassword />}
        action={forgotPasswordAction}
      />
      <Route
        path={`${ROUTES.RESETPASSWORD}/:token`}
        element={<ResetPassword />}
        action={resetPasswordAction}
      />

      {/*  */}
      <Route path={ROUTES.CART} element={<Cart />} />

      <Route path={ROUTES.ORDER_HISTORY} element={<OrderHistory />}>
        <Route
          index
          element={<OrderUserHistory />}
          loader={orderUserHistoryLoader}
        />
        <Route
          path={":id"}
          element={<OrderDetailSpecific />}
          loader={orderDetailSpecificLoader}
        />
        <Route
          path={ROUTES.PERSONAL_INFORMATION}
          element={<UserPersonalInformation />}
          action={userPersonalInfoAction}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const Root = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AuthContextProvider>
          <React.Suspense fallback={<PageLoading />}>
            <RouterProvider router={router} />
          </React.Suspense>
        </AuthContextProvider>
      </ErrorBoundary>
    </Provider>
    // <BrowserRouter>
    //   <Provider store={store}>
    //     <AuthContextProvider>
    //       <ErrorBoundary>
    //         <React.Suspense fallback={<PageLoading />}>
    //           <Routes>
    //             <Route path="/" element={<SharedLayout />}>
    //               <Route index element={<Home />} />
    //               <Route path={ROUTES.PHONES} element={<Phones />} />
    //               <Route path={ROUTES.PHONES}>
    //                 {/* <Route index element={<Phones />} /> */}
    //                 <Route path={`:slug`} element={<Product />} />
    //                 <Route path={`:slug/reviews`} element={<Review />} />
    //               </Route>

    //               {/* laptops */}
    //               <Route path={ROUTES.LAPTOPS} element={<Laptops />} />
    //               <Route path={ROUTES.LAPTOPS}>
    //                 {/* <Route index element={<LAPTOPS />} /> */}
    //                 <Route path={`:slug`} element={<Product />} />
    //                 <Route path={`:slug/reviews`} element={<Review />} />
    //               </Route>
    //               {/* Auth */}
    //               <Route path={ROUTES.LOGIN} element={<Login />} />
    //               <Route path={ROUTES.SIGNUP} element={<Signup />} />
    //               <Route
    //                 path={ROUTES.FORGOTPASSWORD}
    //                 element={<ForgotPassword />}
    //               />
    //               <Route
    //                 path={`${ROUTES.RESETPASSWORD}/:token`}
    //                 element={<ReestPassword />}
    //               />

    //               {/*  */}
    //               <Route path={ROUTES.CART} element={<Cart />} />

    //               <Route
    //                 path={ROUTES.ORDER_HISTORY}
    //                 element={<OrderHistory />}
    //               />
    //             </Route>

    //             <Route path="*" element={<NotFound />} />
    //           </Routes>
    //         </React.Suspense>
    //       </ErrorBoundary>
    //     </AuthContextProvider>
    //   </Provider>
    // </BrowserRouter>
  );
};
export default Root;
