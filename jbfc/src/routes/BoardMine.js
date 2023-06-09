import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import Loading from "./Loading";
import api from "../api";

const Title = styled.h3`
  text-align: center;
  font-size: 36px;
  margin-bottom: 0;
  color: #3b5998;
  font-weight: 400;
  margin-top: 30px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1877f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }

  &:active {
    background-color: #146fd1;
  }
`;

const Wrapper = styled.div`
  background-color: #f0f2f5;
  margin: 0 auto;
  padding: 20px;
  max-width: 960px;

  h1 {
    font-size: 24px;
    margin: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }

  select {
    margin-left: 5px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    transition: all 0.2s ease;

    &:hover {
      background-color: #eee;
      border-color: #bbb;
    }

    &:active {
      background-color: #ddd;
      border-color: #999;
    }

    option {
      color: #333;
      background-color: #fff;
      display: flex;
      white-space: pre;
      min-height: 20px;
      padding: 0px 2px 1px;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: #fff;
    a {
      text-decoration: none;
      color: #333;

      h2 {
        font-size: 30px;
        margin-bottom: 10px;
      }
    }

    h3,
    h4 {
      margin-top: 13px;
      color: #777;
      font-size: 14px;
    }

    h3 {
      margin-top: 0;
    }

    button {
      background-color: #1877f2;
      border-radius: 5px;
      padding: 6px 15px;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 14px;
      color: #fff;
      margin-left: 10px;
      margin-bottom: 10px;

      &:hover {
        text-decoration: underline;
      }

      &:active {
        color: #999;
      }
    }
  }
`;

function BoardMine() {
  //유저의 로그인 정보를 가져옴
  const userId = localStorage.getItem(`userId`);
  const [mine, setMine] = useState(null);
  const navigator = useNavigate();

  //내가 쓴 글을 가져와 mine에 저장
  const callBoardMineApi = async () => {
    try {
      const res = await axios.post(`${api.BASE_URL}/board/mine`, { userId });
      setMine(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  // 최초 1회 내가 쓴 글을 Mine에 저장하도록 함
  useEffect(() => {
    callBoardMineApi();
  }, []);

  const goBack = () => {
    navigator(-1);
  };

  // 내가 쓴 글에서 삭제하고 싶은 글을 찾아내 해당 글을 DB에서 삭제함
  // 이때의 userId는 localstorage의 userId가 아닌 data._id 즉 mine 데이터 arr의 ._id가 들어간다.
  const deleteMine = async (userId, listId) => {
    try {
      await axios.delete(`${api.BASE_URL}/board/mine/delete`, {
        data: { userId: userId },
      });
      // 즉각적으로 지워지는것처럼보이게 listId를 가져옴
      setMine((current) =>
        current.filter((item, index) => index !== parseInt(listId))
      );
      swal("성공", "게시글 삭제가 완료되었습니다.", "success");
    } catch (error) {
      console.error(error);
    }
  };

  // 클릭했을 때 원하는 게시글을 삭제함
  const onClick = (event, userId) => {
    const listId = event.currentTarget.parentElement.parentElement.id;
    deleteMine(userId, listId);
    swal("성공", "게시글 삭제가 완료되었습니다.", "success");
  };

  return (
    <div>
      {mine === null ? (
        <Loading></Loading>
      ) : (
        <Wrapper>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <BackButton onClick={goBack}>뒤로가기</BackButton>
            <Title>JJACK BALANCE</Title>
          </div>

          <ul>
            {mine.map((data, index) => (
              <div key={index}>
                <li id={index} key={index}>
                  <h2>
                    {data.title}
                    <button onClick={(event) => onClick(event, data._id)}>
                      삭제❌
                    </button>
                  </h2>
                  <Link to={`/board/${data._id}`}>
                    <h4>작성자: {data.userId}</h4>
                    <h3>작성일: {data.nowTime}</h3>
                    <h3>카테고리: {data.category}</h3>
                  </Link>

                  <hr></hr>
                </li>
              </div>
            ))}
          </ul>
        </Wrapper>
      )}
    </div>
  );
}
export default BoardMine;
