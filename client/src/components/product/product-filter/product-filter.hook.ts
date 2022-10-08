import React, { useReducer, useState } from "react";
import { isEqual } from "lodash";
import { Resources } from "service/product.service";
import styles from "./product-filter.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
interface QueryState {
  keys: string[];
  values: string[];
  query: any[];
}
enum QueryActionsKind {
  ADD_QUERY = "ADD_QUERY",
  REMOVE_QUERY = "REMOVE_QUERY",
  CREATE_QUERY = "CREATE_QUERY",
}
interface QueryStateActions {
  type: QueryActionsKind;
  payload: {
    key: string;
    value: string;
  };
}
const initialState = {
  keys: [],
  values: [],
  query: [],
};
const queryStateReducer = (state: QueryState, action: QueryStateActions) => {
  const { type, payload } = action;
  switch (type) {
    case QueryActionsKind.ADD_QUERY:
      return {
        ...state,
        values: [...state.values, payload.value],
        keys: [...state.keys, payload.key],
        query: [...state.query, { [payload.key]: payload.value }],
      };
    case QueryActionsKind.REMOVE_QUERY:
      const keys = state.keys;
      const values = state.values;

      keys.splice(keys.indexOf(action.payload.key), 1);
      values.splice(values.indexOf(action.payload.value), 1);
      return {
        query: state.query.filter((q) => {
          return q[payload.key] !== payload.value;
        }),
        keys,
        values,
      };

    case QueryActionsKind.CREATE_QUERY:
      return { ...state };
    default:
      return initialState;
  }
};
const useProductFilterHook = (resource: Resources) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpenFilterBox, setIsOpenFilterBox] = useState(false);
  const [queryState, dispatchQueryState] = useReducer(
    queryStateReducer,
    initialState
  );
  const [currentFilterBox, setCurrentFilterBox] = useState("");

  const addToFilterQuery = (e: React.MouseEvent) => {
    const target = e.target as
      | HTMLImageElement
      | HTMLParagraphElement
      | HTMLButtonElement;
    const dataValue = {
      ...target.closest("button")?.dataset,
    };
    const alreadyQueried = queryState.query.some((qr, i) => {
      // situation have 2 query at the same time
      if (Object.keys(dataValue).length === 2) {
        return isEqual({ ...qr, ...queryState.query[i + 1] }, dataValue);
      }

      return isEqual(qr, dataValue);
    });
    if (alreadyQueried) {
      target.closest("button")?.classList.remove(styles.active);
    } else {
      target.closest("button")?.classList.add(styles.active);
    }
    // alreadyQueried &&
    // (e.target as HTMLButtonElement).classList.add(styles.active);

    Object.entries(dataValue).forEach((entry) => {
      const [key, value] = entry;
      if (queryState.query)
        if (
          queryState.values.includes(value!) &&
          queryState.keys.includes(key)
        ) {
          return dispatchQueryState({
            type: QueryActionsKind.REMOVE_QUERY,
            payload: {
              key,
              value: value!,
            },
          });
        }

      dispatchQueryState({
        type: QueryActionsKind.ADD_QUERY,
        payload: {
          key,
          value: value!,
        },
      });
    });
  };
  const unQueryFilter = (e: React.MouseEvent) => {
    const queryOptions = (
      e.target as HTMLButtonElement
    ).parentElement?.parentElement?.querySelectorAll(
      `.${styles["product-filter__btn"]}`
    )!;

    const filterQuery = [...queryOptions].map((query) =>
      Object.entries((query as HTMLButtonElement).dataset)
    );
    filterQuery.forEach((filter) => {
      const [key, value] = filter[0];
      dispatchQueryState({
        type: QueryActionsKind.REMOVE_QUERY,
        payload: {
          key,
          value: value!,
        },
      });
    });
    setIsOpenFilterBox(false);
    queryOptions.forEach((el) => el.classList.remove(styles.active));
  };

  const queryFilter = async () => {
    const queryStr = queryState.keys.reduce((query, key, i) => {
      const priceQueries = ["lt", "gte", "gt", "lte"];

      if (priceQueries.includes(key))
        return (query += `&price[${key}]=${queryState.values[i]}`);
      return (query += `&${key}=${queryState.values[i]}`);
    }, "");

    setIsOpenFilterBox(false);

    navigate({
      pathname,
      search: queryStr,
    });
    // dispatch(getProducts(resource, queryStr));
  };
  return {
    isOpenFilterBox,
    setIsOpenFilterBox,
    currentFilterBox,
    setCurrentFilterBox,
    addToFilterQuery,
    unQueryFilter,
    queryFilter,
  };
};

export default useProductFilterHook;
