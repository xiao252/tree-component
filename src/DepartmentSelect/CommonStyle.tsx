import styled,{css} from "styled-components";

export const textOverflow = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const scrollbar = css`
  &::-webkit-scrollbar {
    width: 5px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgb(118, 113, 113);
    border-radius: 10px;
  }
`