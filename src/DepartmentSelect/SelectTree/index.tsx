import { Select, Tooltip,Tag } from "antd";
import { useState,FC, useEffect, useMemo } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Path } from '../Tree/types'
import Tree from "../Tree";
import SelectedList from "../SelectedList";
import { throttle } from 'lodash'
import SearchList from '../SearchList'

type SelectTreeProps = {
  value?: Path[];
  onChange?: (value: Path[]) => void;
  /**
   * 是否多选
   */
  multiple?:boolean;
}

const SelectTree:FC<SelectTreeProps> = ({value,onChange,multiple}) => {
  const [search, setSearch] = useState('')

  const onSearchHandler = throttle((val:string)=>{
    setSearch(val)
  },1500)

  return (
    <>
      <Style />
      <Select
        value={value?.map((item,index)=>({
          key:item.name,
          value:item.id,
          label:item.name,
          isCacheable: false
        }))}
        mode="multiple"
        allowClear
        maxTagCount={1}
        tagRender={({value:curVal,onClose})=>{
          const _value = curVal;
          const onCloseHandler = (id:number)=>{
            const v = value?[...value]:[]
            const index = v.findIndex((item)=>item.id == id)
            v.splice(index,1)
            onChange&&onChange(v)
            onClose()
          } 
          return (
            _value.label.length>4?(
              <Tooltip title={_value.label}>
                <Tag closable onClose={()=>onCloseHandler(_value.value)}>
                  {_value.label.slice(0,4)+'...'}
                </Tag>
              </Tooltip>
            ):(
              <Tag closable onClose={()=>onCloseHandler(_value.value)}>
                {_value.label}
              </Tag>
            )
          )
        }}
        maxTagPlaceholder={(omittedValues) => {
          const valueStrArr = omittedValues.map((item) => item.value.label);
          return (
            <Tooltip title={valueStrArr.join(",")}>
              +{valueStrArr.length}...
            </Tooltip>
          );
        }}
        onChange={(_value, option)=>{
          onChange&&onChange(value?.filter((item)=>_value.find((item2)=>item2.value == item.id)))
        }}
        onClear={()=>{
          onChange&&onChange([])
        }}
        searchValue={search}
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
                    <SearchList isTitle value={value || []} search={search} onChange={onChange} multiple={multiple}/>
                  </Box>
                ):(
                  <Box>
                    <Tree value={value || []} onChange={onChange} multiple={multiple} />
                  </Box>
                )
              }
              <SelectedListWrap>
                <SelectedListTitle>已选部门（{multiple?'多选':'单选'}）</SelectedListTitle>
                <SelectedList value={value || []} onChange={onChange} />
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
