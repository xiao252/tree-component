import styled from "styled-components";
import { FC } from 'react'
import CloseIcon from "./Close";
import { Tooltip,Empty } from "antd";
import { textOverflow,scrollbar } from "../CommonStyle";

type SelectedListProps = {
  /**
   * 是否多选
   */
  multiple?:boolean;
}

const SelectedList:FC<SelectedListProps> = ({multiple}) => {
  return (
    <Wrap>
      <List>
        <Item>
          <CloseBtn>
            <CloseIcon />
          </CloseBtn>
          <Tooltip title="人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821">
            <Title>
              人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821
            </Title>
          </Tooltip>
          <Tooltip title=" 招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部">
            <Desc>
              招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部
            </Desc>
          </Tooltip>
        </Item>
        <Item>
          <CloseBtn>
            <CloseIcon />
          </CloseBtn>
          <Tooltip title="人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821">
            <Title>
              人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821
            </Title>
          </Tooltip>
          <Tooltip title=" 招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部">
            <Desc>
              招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部
            </Desc>
          </Tooltip>
        </Item>
        <Item>
          <CloseBtn>
            <CloseIcon />
          </CloseBtn>
          <Tooltip title="人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821">
            <Title>
              人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821
            </Title>
          </Tooltip>
          <Tooltip title=" 招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部">
            <Desc>
              招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部
            </Desc>
          </Tooltip>
        </Item>
        <Item>
          <CloseBtn>
            <CloseIcon />
          </CloseBtn>
          <Tooltip title="人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821">
            <Title>
              人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821
            </Title>
          </Tooltip>
          <Tooltip title=" 招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部">
            <Desc>
              招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部
            </Desc>
          </Tooltip>
        </Item>
        <Item>
          <CloseBtn>
            <CloseIcon />
          </CloseBtn>
          <Tooltip title="人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821">
            <Title>
              人力资源人力资源部人力资源部人力资源部人力资源部人力资源部部/12821
            </Title>
          </Tooltip>
          <Tooltip title=" 招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部">
            <Desc>
              招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部招商银行/长春分行/人力资源部
            </Desc>
          </Tooltip>
        </Item>
        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
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
