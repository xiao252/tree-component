import {useState,useCallback, useRef, useEffect,FC} from "react";
import styled,{css} from 'styled-components'
import { Checkbox } from 'antd'
import { Node,Path } from './types'
import { Jia,Jian } from './Icon'
import { textOverflow,scrollbar } from '../CommonStyle'
import { tree } from "./data";

type TreeProps ={
  value:Path[],
  onChange?:(value:Path[])=>void;
  /**
   * 是否多选
   */
  multiple?:boolean;
}

const Tree:FC<TreeProps> = ({value,onChange,multiple}) => {
  const path = useRef<Path[]>([])
  const [_,_setRender] = useState(0)
  const render = useCallback(() => {
    _setRender(Math.random()+Date.now())
  },[])
  
  //被选节点子节点全选
  const childSelected = (node:Node) => {
    if (node.child) {
      node.child.forEach((childNode) => {
        childNode.status = "1";
        childSelected(childNode);
      });
    }
  };

  //初始化选中&父节点复选
  const initSelected = (_tree:Node[], prentNode?:Node) => {
    _tree.forEach((item) => {
      item.prentNode = prentNode;
      if (path.current.length > 0) {
        path.current.forEach((pathItem) => {
          const ids = pathItem.path.split("/");
          const index = ids.findIndex((id) => parseInt(id) == item.id);
          //当前节点未被选中 & 是否是选中节点的父节点，如果是则设置为复选态
          if (!path.current.find((item2)=>item2.id == item.id) && index != -1 && index < ids.length - 1) {
            item.status = "2";
          }
          if (pathItem.id === item.id) {
            item.status = "1";
            // if(multiple){
            //   childSelected(item);
            // }
          }
        });
      } else {
        item.status = "0";
      }
      if (item.child) {
        initSelected(item.child, item);
      }
    });
  };

  //节点全部重置
  const nodeAllClear = (_tree:Node[])=>{
    _tree.forEach((item) => {
      item.status = '0';
      if(item.child){
        nodeAllClear(item.child)
      }
    })
  }

  useEffect(()=>{
    path.current = value
    nodeAllClear(tree)
    initSelected(tree);
    render()
  },[value])

  //根据id查找节点
  // const findeNode = (id, allTree) => {
  //   const findChild = (nodes) => {
  //     for (let index = 0; index < nodes.length; index++) {
  //       const element = nodes[index];
  //       if (element.id == id) {
  //         return element;
  //       } else if (element.child) {
  //         let result = findChild(element.child);
  //         if (result) {
  //           return result;
  //         }
  //       }
  //     }
  //   };
  //   return findChild(allTree);
  // };

  //生成path节点
  const gennerPathNode = (node:Node) => {
    let idStr = node.id + "";
    let nameStr = node.name + "";
    const prentLoop = (_node:Node) => {
      if (_node.prentNode) {
        idStr = `${_node.prentNode.id}/${idStr}`;
        nameStr = `${_node.prentNode.name}/${nameStr}`;
        prentLoop(_node.prentNode);
      }
    };
    prentLoop(node);
    //新选中的路径节点
    return {
      id: node.id,
      path: idStr,
      name:node.name,
      pathName:nameStr
    };
  };

  //祖先节点status设置为0
  const clearPrentStatus = (node?:Node) => {
    if (node) {
      node.status = "0";
      clearPrentStatus(node.prentNode);
    }
  };

  //子节点全不选
  const childSelectedR = (node:Node) => {
    if (node.child) {
      node.child.forEach((childNode) => {
        childNode.status = "0";
        childSelectedR(childNode);
      });
    }
  };

  //如果同胞元素全部被选则为祖先节点设置选中态
  const prentStatus = (node:Node) => {
    if (node.prentNode) {
      if(node.prentNode.child){
        if (node.prentNode.child.every((cnode) => cnode.status == "1")) {
          node.prentNode.status = "1";
          prentStatus(node.prentNode);
        }
      }
    }
  };

  //path 去重
  const pathRemoveRepeat = (arr:Path[]) => {
    return arr.reduce<Path[]>((pre, cur) => {
      return pre.find((item) => item.id == cur.id) ? pre : pre.concat(cur);
    }, []);
  };

  const nodeSelectedToggle = (currentNode:Node) => {
    if (
      !currentNode.status ||
      currentNode.status == "0" ||
      currentNode.status == "2"
    ) {
      currentNode.status = "1";
      // prentStatus(currentNode);
    } else {
      currentNode.status = "0";
      // childSelectedR(currentNode);
    }
    let tempArr:Path[] = [];
    if(!multiple){
      tempArr = [gennerPathNode(currentNode)];
    }else{
      const loopTreeSelected = (nodes:Node[]) => {
        nodes.forEach((node) => {
          if (node.status == "1") {
            tempArr.push(gennerPathNode(node));
          }
          if (node.child) {
            loopTreeSelected(node.child);
          }
        });
      };
      loopTreeSelected(tree);
      //和初始path合并去重
      // tempArr = pathRemoveRepeat([...tempArr, ...path.current]);
    }
    path.current = tempArr
    //清理path
    if (currentNode.status == "1") {
      //选中节点子节点全部取消选中
      // path.current = tempArr.reduce((prev, current) => {
      //   let x = prev.filter((item2) => {
      //     const ids = item2.path.split("/");
      //     const index = ids.findIndex((id) => parseInt(id) == current.id);
      //     return index == -1 || index == ids.length - 1;
      //   });
      //   return x;
      // }, tempArr);
    } else {
      // const { path: crNodePath } = gennerPathNode(currentNode);
      // const ids = crNodePath.split("/");
      // //选中节点祖先全部取消选中
      // path.current = tempArr.filter((item2) => !ids.find((id) => parseInt(id) == item2.id));
      // //选中节点祖先全部设置为status = '0'
      // clearPrentStatus(currentNode);
      // //选中节点子节点全部取消选中
      // path.current = path.current.reduce((prev, current) => {
      //   let x = prev.filter((item2) => {
      //     const ids = item2.path.split("/");
      //     const index = ids.findIndex((id) => parseInt(id) == current.id);
      //     return index == -1 || index == ids.length - 1;
      //   });
      //   return x;
      // }, path.current);
    }
    onChange&&onChange(path.current)
  };

  const nodeExpandHandler = (node:Node) => {
    if (node.id == 121) {
      node.child = [
        {
          child: null,
          isChild:false,
          name: "子1211",
          id: 1211
        },
        {
          child: null,
          isChild:false,
          name: "子1212",
          id: 1212
        },
        {
          child: null,
          isChild:false,
          name: "子1213",
          id: 1213
        },
        {
          child: null,
          isChild:false,
          name: "子1214",
          id: 1214
        }
      ];
      console.log("异步载入");
    }
    node.isExpand = !node.isExpand;
    initSelected(tree);
    render()
  }

  const checkboxHandler = (node:Node)=>{
    nodeSelectedToggle(node)
    initSelected(tree);
    render()
  }

  const gennerDom = (nodes:Node[]) => {
    return (
      <Item>
        {nodes.map((node) => (
          <div key={node.id}>
            <Block>
              {node.isChild && (
                node.isExpand ? (
                  <ExpandOn onClick={(e)=>nodeExpandHandler(node)}><Jian/></ExpandOn>
                ) : (
                  <ExpandOff onClick={(e)=>nodeExpandHandler(node)} ><Jia/></ExpandOff>
                )
              )}
              <Label onClick={()=>checkboxHandler(node)} title={node.name} active={node.status == "1"}>
                <CheckboxCover checked={node.status == "1"} indeterminate={node.status == "2"} />
                <Name>{node.name}</Name>
              </Label>
            </Block>
            {node.isExpand ? (node.child ? gennerDom(node.child) : null) : null}
          </div>
        ))}
      </Item>
    );
  };
  return (
    <Scroll>{gennerDom(tree)}</Scroll>
  )
};

const Scroll = styled.div`
  overflow-x: hidden;
  overflow: auto;
  height: 100%;
  ${scrollbar}
`
Scroll.displayName = "Scroll"

const Item = styled.div`
  padding-left: 13px;
  border-left: 1px solid;
  &:first-child {
    border: none;
  }
`
Item.displayName = "Item"

const Block = styled.div`
  display: flex;
  align-items: center;
  margin-left: -7px;
  margin-bottom: 5px;
`
Block.displayName = "Block"

const Label = styled.div<{active:boolean}>`
  display: flex; align-items: center;
  border-radius: 2px; flex: 1; cursor: pointer;
  margin-left: 4px;
  ${
    ({active})=>active?`
      background: #b3def7;
    `:`
      &:hover{
        background: #eee;
      }
    `
  }
`
Label.displayName = "Label"

const Name = styled.div`
  flex: 1;
  width: 0;
  ${textOverflow}
`
Name.displayName = "Name"

const expand = css`
  width: 14px;
  height: 14px;
  line-height: 0;
`
const ExpandOn = styled.div`
  ${expand}
`
ExpandOn.displayName = "ExpandOn"

const ExpandOff = styled.div`
  ${expand}
`
ExpandOff.displayName = "ExpandOff"

const CheckboxCover = styled(Checkbox)`
  width: 18px; height: 18px;
  margin-left: 5px;
  margin-right: 5px;
  .ant-checkbox{
    top:1px;
  }
`
CheckboxCover.displayName = "CheckboxCover"

export default Tree;