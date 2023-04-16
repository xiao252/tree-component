import styled from "styled-components";
import { FC } from 'react'
import {Close as CloseIcon} from "./Icon";
import { Path } from '../Tree/types'
import { Tooltip,Empty } from "antd";
import { textOverflow,scrollbar } from "../CommonStyle";

type SelectedListProps = {
  value:Path[];
  onChange?:(value:Path[])=>void
}

const SelectedList:FC<SelectedListProps> = ({value,onChange}) => {

  const deleteHandler = (index:number)=>{
    const valueCopy = [...value]
    valueCopy.splice(index,1)
    onChange&&onChange(valueCopy)
  }

  return (
    <Wrap>
      <List>
        {
          value.length>0?(
            value.map((item,index)=>(
              <Item key={item.id}>
                <CloseBtn onClick={()=>deleteHandler(index)}>
                  <CloseIcon />
                </CloseBtn>
                <Tooltip title={<div>
                  <div>{item.pathName.split('/').slice(-1)+'/'+item.id}</div>
                  <div>{item.pathName+'/'+item.id}</div>
                </div>}>
                  <Title>{item.pathName.split('/').slice(-1)+'/'+item.id}</Title>
                  <Desc>{item.pathName}</Desc>
                </Tooltip>
              </Item>
            ))
          ):(
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )
        }
      </List>
    </Wrap>
  );
};

const Wrap = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  flex:1;
  height: 0;
`;
Wrap.displayName = "Wrap";

const ClearAllBtn = styled.div`
  color: #00f;
  cursor: pointer;
`;
ClearAllBtn.displayName = "ClearAllBtn";

const List = styled.div`
  flex: 1;
  overflow: auto;
  ${scrollbar}
`;
List.displayName = "List";

const Item = styled.div`
  background: #eee;
  border-radius: 5px;
  padding: 4px 8px;
  box-sizing: "border-box";
  position: relative;
  margin-bottom: 10px;
`;
Item.displayName = "Item";

const CloseBtn = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  fill: #666;
  font-size: 25px;
  cursor: pointer;
`;
CloseBtn.displayName = "CloseBtn";

const Title = styled.div`
  font-size: 18px;
  color: #444;
  padding-right: 25px;
  ${textOverflow}
`;
Title.displayName = "Title";

const Desc = styled.div`
  font-size: 16px;
  color: #666;
  ${textOverflow}
`;
Desc.displayName = "Desc";

export default SelectedList;
