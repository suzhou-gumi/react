import { Container } from "hostConfig";
import { FiberNode, FiberRootNode } from "./fiber";
import { HostRoot } from "./workTags";
import {
  createUpdate,
  UpdateQueue,
  createUpdateQueue,
  enqueueUpdate,
} from "./updateQueue";
import { ReactElement } from "shared/ReactTypes";
import { scheduleUpdateOnFiber } from "./workLoop";

export function createContainer(container: Container) {
  const hostRootFiber = new FiberNode(HostRoot, {}, null);
  const root = new FiberRootNode(container, hostRootFiber);
  hostRootFiber.updateQueue = createUpdateQueue();

  return root;
}

export function updateContainer(
  element: ReactElement | null,
  root: FiberRootNode,
) {
  const hostRootFiber = root.current;
  const update = createUpdate<ReactElement | null>(element);
  enqueueUpdate(
    update,
    hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>,
  );
  scheduleUpdateOnFiber(hostRootFiber);

  return element;
}
