import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardWrite() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [description, setDescription] = useState('');

    const changeTitle = e => setTitle(e.target.value);
    const changeAuthor = e => setAuthor(e.target.value);
    const changePublisher = e => setPublisher(e.target.value);
    const changePublishDate = e => setPublishDate(e.target.value);
    const changeDescription = e => setDescription(e.target.value);

    const navigate = useNavigate();

    // 서버로 전달할 입력창 내용을 객체로 정의 (단축 속성명)
    let datas = { 
        title, 
        author, 
        publisher, 
        publishDate,
        description 
    };

    // 설정한 데이터를 JSON 형식으로 서버로 전달
    const handlerSubmit = e => {
        e.preventDefault();
        axios({
            method: 'POST', 
            url: 'http://localhost:8081/api/book/write', 
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(datas)
        })
        .then(res => {
            res && res.status === 200 && navigate('/');
        })
        .catch(err => console.log(err));
    };

    return (
        <>
            <div className="container">
                <h2>도서 등록</h2>
                <form id="form" onSubmit={handlerSubmit}>
                    <table className="book_detail">
                        <tbody>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" id="title" name="title" onChange={changeTitle} /></td>
                            <td>저자</td>
                            <td><input type="text" id="author" name="author" onChange={changeAuthor} /></td>
                        </tr>
                        <tr>
                            <td>출판사</td>
                            <td><input type="text" id="publisher" name="publisher" onChange={changePublisher} /></td>
                            <td>출판일</td>
                            <td><input type="text" id="publishDate" name="publishDate" onChange={changePublishDate} placeholder="YYYY.MM.DD" /></td>
                        </tr>
                        <tr>
                            <td colSpan="4"><textarea id="description" name="description" onChange={changeDescription}></textarea></td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="submit" id="submit" value="저장" className="btn" />
                </form>
            </div>    
        </>
    );
};