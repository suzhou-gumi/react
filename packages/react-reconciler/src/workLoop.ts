import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode } from "./fiber";

let workingProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
  workingProgress = fiber;
}

function renderRoot(root: FiberNode) {
  // 初始化
  prepareFreshStack(root);

  do {
    try {
      workLoop();
      break;
    } catch (e) {
      console.warn("workLoop发生错误 ", e);
      workingProgress = null;
    }
  } while (true);
}

function workLoop() {
  while (workingProgress !== null) {
    performUnitOfWork(workingProgress);
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber);
  fiber.memoizedProps = fiber.pendingProps;

  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    workingProgress = next;
  }
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;

  do {
    completeWork(node);
    const sibling = node.sibling;

    if (sibling !== null) {
      workingProgress = sibling;
      return;
    }
    node = node.return;
    workingProgress = node;
  } while (node !== null);
}
