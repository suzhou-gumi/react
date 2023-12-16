import { Action } from "shared/ReactTypes";
import { Update } from "./fiberFlags";

export interface Update<State> {
  action: Action<State>;
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  };
}

export const createUpdate = <State>(action: Action<State>) => {
  return {
    action,
  };
};

export const createUpdateQueue = <Action>() => {
  return {
    shared: {
      pending: null,
    },
  } as UpdateQueue<Action>;
};

export const enqueueUpdate = <State>(
  update: Update<State>,
  updateQueue: UpdateQueue<State>,
) => {
  updateQueue.shared.pending = update;
};

export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null,
): { memoizedState: State } => {
  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memoizedState: baseState,
  };

  if (pendingUpdate !== null) {
    const action = pendingUpdate.action;

    if (action instanceof Function) {
      // baseUpdate 1 update 2 -> memoizedState 2
      result.memoizedState = action(baseState);
    } else {
      // baseUpdate 1 update (x) => 4x -> memoizedState 4
      result.memoizedState = action;
    }
  }

  return result;
};
