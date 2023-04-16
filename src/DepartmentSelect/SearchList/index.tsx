import { Checkbox,Tooltip,Empty } from 'antd'
import { FC,useEffect,useState } from 'react'
import styled from 'styled-components'
import { Path } from '../Tree/types'
import { textOverflow,scrollbar } from '../CommonStyle'

type SearchListProps = {
    /**
     * 是否显示顶部标题
     */
    isTitle?:boolean;
    multiple?:boolean;
    value:Path[];
    onChange?:(value:Path[])=>void;
    search:string
}

const SearchList:FC<SearchListProps> = ({isTitle,value,onChange,multiple})=>{

    const [data, setData] = useState<Path[] | undefined>()
    
    useEffect(()=>{
        setTimeout(() => {
            setData([
                {
                    name: "子111",
                    path:'1/11/111',
                    pathName:'子1/子11/子111',
                    id: 111
                },
                {
                    name: "子112",
                    path:'1/11/112',
                    pathName:'子1/子11/子112',
                    id: 112
                },
                {
                    name: "子11",
                    path:'1/11',
                    pathName:'子1/子11',
                    id: 11
                }
            ])
        }, 500);
    })

    const prentHide = ()=>{
        data?.forEach((item)=>{
            const cItem = value.find((item2)=>item2.path.split('/').find((id)=> parseInt(id)== item.id))
            const checkedItem = value.find((item3)=> item3.id == item.id)
            if(checkedItem){
                
            }
        })
    }

    const childHide = ()=>{

    }

    const itemClickHandler = (index:number,id:number)=>{
        const isExistIndex = value.findIndex((item)=>item.id == id)
        //取消选中
        if(isExistIndex!=-1){
            const _value = [...value];
            _value.splice(isExistIndex,1)
            onChange&&onChange(_value)
        }else{
            //选中
            if(multiple){
                const _value = [...value];
                if(data){
                    _value.push(data[index])
                }
                onChange&&onChange(_value)
            }else{
                if(data){
                    onChange&&onChange([data[index]])
                }
            }
        }
    }

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
                {
                    data&&data.length>0?(
                        data.map((item,index)=>(
                            <Item key={item.id} onClick={()=>itemClickHandler(index,item.id)}>
                                <CheckboxCover checked={!!value.find((item2)=>item2.id == item.id)} />
                                <Info>
                                    <Tooltip title={<div>
                                        <div>{item.pathName.split('/').slice(-1)+'/'+item.id}</div>
                                        <div>{item.pathName}</div>
                                    </div>}>
                                        <Title>{item.pathName.split('/').slice(-1)+'/'+item.id}</Title>
                                        <Desc>{item.pathName}</Desc>
                                    </Tooltip>
                                </Info>
                            </Item>
                        ))
                    ):(
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )
                }
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