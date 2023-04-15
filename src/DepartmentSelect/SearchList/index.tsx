import { Checkbox,Tooltip,Empty } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'
import { textOverflow,scrollbar } from '../CommonStyle'

type SearchListProps = {
    /**
     * 是否显示顶部标题
     */
    isTitle?:boolean;
}

const SearchList:FC<SearchListProps> = ({isTitle})=>{
    return (
        <Wrap>
            {
                isTitle&&(
                    <Head>
                        <HeadTitle>搜索结果</HeadTitle>
                    </Head>
                )
            }
            <Scroll>
                <Item>
                    <CheckboxCover />
                    <Info>
                        <Tooltip title="人力外包组/2131231人力外包组/2131231人力外包组/2131231人力外包组/2131231">
                            <Title>人力外包组/2131231人力外包组/2131231人力外包组/2131231人力外包组/2131231</Title>
                        </Tooltip>
                        <Tooltip title="人力外包组/2131231人力外包组/2131231人力外包组/2131231人力外包组/2131231人力外包组/2131231">
                            <Desc>人力外包组/2131231人力外包组/2131231人力外包组/2131231人力外包组/2131231人力外包组/2131231</Desc>
                        </Tooltip>
                    </Info>
                </Item>
                {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
            </Scroll>
        </Wrap>
    )
}

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`
Wrap.displayName = "Wrap"

const Head = styled.div`
    color: #444;
    font-size: 18px;
`
Head.displayName = "Head"

const HeadTitle = styled.div``
HeadTitle.displayName = "HeadTitle"

const Scroll = styled.div`
    flex: 1;
    overflow: auto;
    ${scrollbar}
`
Scroll.displayName = "Scroll"

const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    &:hover{
        background: #eee; border-radius: 5px;
    }
`
Item.displayName = "Item"

const CheckboxCover = styled(Checkbox)`
    margin-right: 10px;
`
CheckboxCover.displayName = "CheckboxCover"

const Info = styled.div`
    flex: 1; width: 0;
`
Info.displayName ="Info"

const Title = styled.div`
    font-size: 18px;
    color: #444;
    ${textOverflow}
`
Title.displayName = "Title"

const Desc = styled.div`
    font-size: 16px;
    color: #666;
    ${textOverflow}
`
Desc.displayName = "Desc"


export default SearchList