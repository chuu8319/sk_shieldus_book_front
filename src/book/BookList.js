import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BoardList() {

    const [datas, setDatas] = useState([]);

    // 컴포넌트가 마운트된 후 게시판 목록 데이터를 조회 (목록 API를 호출)
    useEffect(() => {
        axios
            .get('http://localhost:8081/api/book')
            .then(res => {
                res && res.data && setDatas(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="container">
                <h2>도서 목록</h2>
                <table className="book_list">
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                        <col width="15%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">도서번호</th>
                            <th scope="col">제목</th>
                            <th scope="col">저자</th>
                            <th scope="col">등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            datas.length !== 0 && datas.map((book, Idx) => (
                                <tr key={Idx}>
                                    <td>{book.bookId}</td>
                                    <td className="title">
                                        <Link to = {`/detail/${book.bookId}`}>{book.title}</Link>
                                    </td>
                                    <td>{book.author}</td>
                                    <td>{book.createdAt}</td>
                                </tr>
                            ))
                        }   
                        {
                            datas.length === 0 && (
                                <tr>
                                    <td colSpan="4">조회된 결과가 없습니다.</td>
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
                <Link to={'/write'} className="btn">도서등록</Link>
            </div>
        </>
    );
};
