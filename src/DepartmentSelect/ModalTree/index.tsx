import { useState } from 'react'
import styled from 'styled-components'
import { Select,Tooltip,Modal,Collapse,Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import SearchList from '../SearchList'
import SelectedList from '../SelectedList'
import { scrollbar } from '../CommonStyle'
import { Bank,Organize,Time } from './Icon'

const ModalTree = () => {
  const [value, setValue] = useState(["a10", "c12", "c14", "c6"]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <>
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
      open={false}
      showSearch={false}
      placeholder="请选择"
      suffixIcon={<IconBtn>部门</IconBtn>}
      showArrow={true}
      clearIcon={<IconBtn onClick={()=>setIsModalOpen(true)}>部门</IconBtn>}
      style={{ width: 200 }}
    />
    <ModalCover title="选择归属部门" width={800} visible={isModalOpen}  onCancel={()=>setIsModalOpen(false)}>
      <Content>
        <ToolsPanel>
          <InputCover placeholder="搜索部门名称和编号" prefix={<SearchOutlined />} />
          {
            false?(
              <SearchList />
            ):(
              <Collapse defaultActiveKey={['1']} ghost accordion={true} expandIconPosition='right' >
                <Collapse.Panel header={
                  <PanelHead>
                    <PanelHeadIcon><Bank/></PanelHeadIcon>
                    招商银行
                  </PanelHead>
                } key="1">
                  <Wrap>xasxas<br/>asx<br/>asxa<br/>xasxas<br/>xasx<br/>asxaxa<br/>sxasxa<br/>sxa<br/>sxa<br/>xasxasxasxa<br/>sxa<br/>xasx<br/>asxas<br/><br/>xa<br/>sx<br/>axas<br/>xasxasxasxa</Wrap>
                </Collapse.Panel>
                <Collapse.Panel header={
                  <PanelHead>
                    <PanelHeadIcon><Organize/></PanelHeadIcon>
                    招商银行
                  </PanelHead>
                } key="2">
                  <Wrap>asxasxasxasxasa2</Wrap>
                </Collapse.Panel>
                <Collapse.Panel header={
                  <PanelHead>
                    <PanelHeadIcon><Time/></PanelHeadIcon>
                    招商银行
                  </PanelHead>
                } key="3">
                  <Wrap>asxasxasxasxasa3</Wrap>
                </Collapse.Panel>
              </Collapse>
            )
          }
        </ToolsPanel>
        <SelectedListWrap>
          <SelectedTools>
            <SelectedTitle>已选部门</SelectedTitle>
            <SelectedClearBtn>全部清除</SelectedClearBtn>
          </SelectedTools>
          <SelectedList/>
        </SelectedListWrap>
      </Content>
    </ModalCover>
    </>
  );
};

const Content = styled.div`
  display: flex; height: 100%;
`
Content.displayName = "Content"

const ToolsPanel = styled.div`
  width: 350px;
  border-right: 1px solid #ccc;
  display: flex; flex-direction: column;
`
ToolsPanel.displayName = "ToolsPanel"

const SelectedListWrap = styled.div`
  flex: 1; width: 0;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`
SelectedListWrap.displayName = "SelectedListWrap"

const ModalCover = styled(Modal)`
  .ant-modal-body{
    height: 500px;
    padding: 0 10px;
  }
  .ant-collapse-item:first-child{
    .ant-collapse-header{
      border: 1px solid #eee; border-radius: 10px !important;
    }
  }
  .ant-collapse-content-box{
    padding: 0;
  }
  .ant-collapse-header{
    margin-right: 20px;
  }
  .ant-collapse-content{
    margin-right: 4px;
    padding-left: 20px;
  }
`
ModalCover.displayName = "ModalCover"

const IconBtn = styled.div`
  white-space: nowrap;
  font-size: 16px; color: #6a6aeb;
  margin-left: -18px;
  margin-top: -3px;
  cursor: pointer;
`
IconBtn.displayName = 'IconBtn'

const Wrap = styled.div`
  height: 255px;
  overflow: auto;
  ${scrollbar}
`
Wrap.displayName = "Wrap"

const PanelHead = styled.div`
  display: flex; align-items: center;
`
PanelHead.displayName = "PanelHead"

const PanelHeadIcon = styled.div`
  font-size: 30px; line-height: 0;
  width: 40px;display:flex;
  justify-content: center;
`
PanelHeadIcon.displayName = "PanelHeadIcon"

const InputCover = styled(Input)`
  background:#eee; margin-top: 20px; margin-bottom: 5px;
  margin-right: 20px;width: initial;
  .ant-input{
    background:#eee;
  }
`
InputCover.displayName = "InputCover"

const SelectedTools = styled.div`
  display: flex;justify-content:space-between;
  padding-top:16px; padding-bottom: 18px;
`
SelectedTools.displayName = "SelectedTools"

const SelectedTitle = styled.div`
  font-weight: bold;
`
SelectedTitle.displayName = "SelectedTitle"

const SelectedClearBtn = styled.div`
  cursor: pointer;
  color: #6b6be7;
` 
SelectedClearBtn.displayName = "SelectedClearBtn"


export default ModalTree;
