import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import axios from "axios";
import Reservation from "./Reservation";
import "../css/ReservationCheck.css";
import list from "../img/목록.jpg";
import reservationImg from "../img/펜션1.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/ReservationCheckDetail.css";


function ReservationCheckDetail() {
  //  const [user,setUser] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState([]);
  const [userPhoneNumber, setUserPhoneNumber] = useState([]);
  const [resParam,setResParam] = useState([]);
  const [selectedRes,setSelectedRes] = useState([]);
 

  const location = useLocation();
  const navigate = useNavigate();

  const selectedId = location.state?.selectedId;

  

  console.log(selectedId,reservation);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       const res = await axios.get("http://localhost:8282/reservation/reservationDetail",{
  //         withCredentials: true,
  //       });
  //       setReservation(res.data);
        
  //     }catch(err){
  //       console.log("실패");
  //     }
  //   }
  //   fetchData();
  // },[]);
 
 
  
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const res = await axios.get("http://localhost:8282/reservation/reservationDetail",{
          withCredentials: true,
          params:{
            id:selectedId,
          }
        })
        setReservation(res.data);

      }catch(err){
        console.error("예약정보를 불러오지 못했습니다", err)
      }
    }
    fetchData();
  },[])

  const handleDeleteReservation = async () => {
    if(window.confirm("예약을 취소하시겠습니까?")){
    try{
      const res = await axios.delete(
        "http://localhost:8282/reservation/delete",{
          withCredentials:true,
          params:{
            id:selectedId,
          }
        }
      );
      alert("예약이 삭제되었습니다.");
      window.location.href="http://localhost:3000/ReservationCheck";
    }catch(error){
      console.error("예약 삭제 실패",error);
    }
    } else{
      alert("예약 삭제를 취소했습니다.");
      return;
    }
  }


  useEffect(() => {
    // 세션에 저장된 사용자 이름을 불러오기 위해 서버에 요청 (이메일 로그인)
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8282/userdata", {
          withCredentials: true,
        });
        setUserInfo(res.data);
        setEditedUserInfo(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("로그인 정보를 불러오지 못했습니다", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <main id="myPage-layout">
        <Header />
        <div id="myPage-container">
          <nav id="myPage-navigation">
            <ul id="navigation-list">
              <li id="nav-userInfo">
                <a href="/mypage/userInfo">내 정보 관리</a>
              </li>
              <hr />
              <li>
                <a href="/reservationCheck">예약내역</a>
              </li>
              <hr />
              <li>
                <a href="/mypage/userInfo">찜목록</a>
              </li>
              <hr />
              <li>
                <a href="/mypage/userInfo">문의내역</a>
              </li>
              <hr />
              <li id="nav-coupon">
                <a href="/mypage/userInfo">쿠폰함</a>
              </li>
            </ul>
          </nav>
        </div>
      </main>
      <div className="reservationCheckDiv">
        <div>
          <div className="reservationDiv1">
            <img src={list} className="listImg" alt="목록"></img>
            <span> 예약 목록</span>
          </div>
          <div>
            <div className ="nicknameSpace">
            <span> {userInfo.nickname}님의 예약 정보</span>
            <br /> 
            </div>
            <section className="reservationCheckSection">
              <div className="detailReservation">
                {/* <ul className="">
                  {reservation.map((reservation)=> (
                    <li className="reservationDetailLi" key={reservation.pensions}>
                    <p>펜션 이름 : {reservation.name}</p>
                  </li>
                  ))}
                  
                </ul> */}
                <span>예약자 번호  :  {reservation.phoneNumber}</span><br />
                <span>체크인 날짜  :  {reservation.checkInDay}</span><br />
                <span>체크아웃 날짜  :  {reservation.checkOutDay}</span><br />
                <span>결제 수단  :  {reservation.payment}</span><br />
                <span>결제 금액  : {reservation.pay}원</span><br />
                <span>인원  :   {reservation.people}명</span><br />
                <span>픽업 여부  :  {reservation.pick}</span><br />
                <span>룸 타입  :  {reservation.roomType}</span><br />
                <button
                id="deleteReservation"
                onClick={handleDeleteReservation}
                >예약 취소하기</button>
              </div>
            </section>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReservationCheckDetail;
