import { createContext } from "react";
import ActivityStore from "./activityStore";

interface IStore {
  activityStore: ActivityStore;
}

const store: IStore = {
  activityStore: new ActivityStore(),
};

const StoreContext = createContext(store);

const useStore = () => {
  return StoreContext;
};

export { useStore, StoreContext, store };
