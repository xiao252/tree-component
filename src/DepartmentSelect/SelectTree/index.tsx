import { Select, Tooltip } from "antd";
import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Tree from "../Tree";
import SelectedList from "../SelectedList";
import { throttle } from 'lodash'
import SearchList from '../SearchList'

const SelectTree = () => {
  const [value, setValue] = useState(["a10", "c12", "c14", "c6"]);
  const [search, setSearch] = useState('')

  const onSearchHandler = throttle((val:string)=>{
    setSearch(val)
  },1500)

  return (
    <>
      <Style />
      <Select
        value={value}
        mode="multiple"
        allowClear
        maxTagCount={1}
        maxTagPlaceholder={(omittedValues) => {
          const valueStrArr = omittedValues.map((item) => item.value);
          return (
            <Tooltip title={valueStrArr.join(",")}>
              +{valueStrArr.length}...
            </Tooltip>
          );
        }}
        onChange={(value, option) => {
          setValue(value);
          console.log("onChange", value, option);
        }}
        onSearch={onSearchHandler}
        placeholder="请选择"
        showArrow={true}
        style={{ width: 200 }}
        dropdownClassName="department-select-dropdown"
        dropdownRender={(originNode) => {
          return (
            <TreeWrap>
              {
                search?(
                  <Box>
                    <SearchList isTitle/>
                  </Box>
                ):(
                  <Box>
                    <Tree />
                  </Box>
                )
              }
              <SelectedListWrap>
                <SelectedListTitle>已选部门（{true?'多选':'单选'}）</SelectedListTitle>
                <SelectedList />
              </SelectedListWrap>
            </TreeWrap>
          );
        }}
      />
    </>
  );
};
const Flex = styled.div`
  display: flex;
`;
const TreeWrap = styled(Flex)`
  height: 300px;
  box-sizing: border-box;
`;
TreeWrap.displayName = "TreeWrap";

const SelectedListTitle = styled.div`
  font-size: 18px;color: #666;
`;
SelectedListTitle.displayName = "SelectedListTitle";

const Box = styled.div`
  width: 250px;
  border-right: 1px solid #ccc;
  margin-right: 10px;
  padding-right: 10px;
  box-sizing: border-box;
`;
Box.displayName = "Box";

const SelectedListWrap = styled.div`
  flex: 1; 
  width: 0;
  display: flex;
  flex-direction: column;
`;
SelectedListWrap.displayName = "SelectedListWrap";

const Style = createGlobalStyle`
  .department-select-dropdown{
    overflow: initial;
    width: 600px !important;
    padding: 10px;
  }
`;

export default SelectTree;
