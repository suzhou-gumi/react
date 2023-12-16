/* eslint-disable @typescript-eslint/no-explicit-any */
import { Props, Key, Ref } from "shared/ReactTypes";
import { WorkTag } from "./workTags";
import { Flags, NoFlags } from "./fiberFlags";

export class FiberNode {
  tag: WorkTag;
  pendingProps: Props;
  memoizedProps: Props | null;
  key: Key;
  stateNode: any;
  type: any;
  ref: Ref;

  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  index: number;

  alternate: FiberNode | null;
  flags: Flags;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // 实例
    this.tag = tag;
    this.key = key;
    // HostComponent <div> div DOM
    this.stateNode = null;
    // FunctionComponent () => {}
    this.type = null;

    // 构成树状结构
    // 指向父fiberNode
    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;

    this.ref = null;

    // 作为工作单元
    this.pendingProps = pendingProps;
    this.memoizedProps = null;

    this.alternate = null;
    this.flags = NoFlags;
  }
}
