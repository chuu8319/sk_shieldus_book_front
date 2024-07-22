import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BoardDetail() {
    const [book, setBook] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishDate, setPublishDate] = useState('');

    const { bookId } = useParams();
    const navigate = useNavigate();

    const listButtonClick = e => { 
        e.preventDefault();
        navigate('/');  // 또는 navigate('/list') 또는 navigate(-1)
    };

    const updateButtonClick = e => { 
        e.preventDefault();

        axios
            .put(`http://localhost:8081/api/book/${bookId}`, { title, author, publisher, publishDate, description })
            .then(res => {
                res && res.status === 200 && navigate('/')
            })
            .catch(err => console.log(err));
    };

    const deleteButtonClick = e => { 
        e.preventDefault();

        axios
            .delete(`http://localhost:8081/api/book/${bookId}`)
            .then(res => {
                res && res.status === 200 && navigate('/')
            })
            .catch(err => console.log(err));        
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/book/${bookId}`)
            .then(res => {
                if (res && res.data) {
                    setTitle(res.data.title);
                    setAuthor(res.data.author);
                    setPublisher(res.data.publisher);
                    setPublishDate(res.data.publishDate);
                    setDescription(res.data.description);
                }
            })
            .catch(err => console.log(err));
    }, [bookId]);

    return (
        <>
            <div className="container">
                <h2>게시판 상세</h2>
                <form id="form" method="post">
                    <input type="hidden" id="bookId" name="bookId" />
                
                    <table className="book_detail">
                        <colgroup>
                            <col width="15%" />
                            <col width="*"   />
                            <col width="15%" />
                            <col width="35%" />
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row">글 번호</th>
                            <td colSpan="3">{bookId}</td>
                        </tr>
                        <tr>
                            <th scope="row">제목</th>
                            <td><input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)}/></td>
                            <th scope="row">작가</th>
                            <td><input type="text" id="author" name="author" value={author} onChange={e => setAuthor(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <th scope="row">출판사</th>
                            <td><input type="text" id="publisher" name="publisher" value={publisher} onChange={e => setPublisher(e.target.value)}/></td>
                            <th scope="row">출판일</th>
                            <td><input type="text" id="publishDate" name="publishDate" value={publishDate} onChange={e => setPublishDate(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan="4">
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    value={description} 
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                
                <input type="button" id="update" className="btn" value="수정하기" onClick={updateButtonClick} />
                <input type="button" id="list" className="btn" value="목록으로" onClick={listButtonClick} />
                <input type="button" id="delete" className="btn" value="삭제하기" onClick={deleteButtonClick} />
            </div>    
        </>
    );
};