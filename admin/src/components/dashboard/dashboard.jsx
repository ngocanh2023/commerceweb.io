import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [proData, setProData] = useState([]);

    const formatter = new Intl.NumberFormat("en-US", {
        thousandSeparator: ".",
        currency: "VND",
    });

    const fetchProducts = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        await fetch("http://localhost:5000/getProducts", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                // console.log("result", result);
                setProData(JSON.parse(result));
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        fetchProducts()
    }, [])

    console.log('proData', proData)

    return (
        <div className="dashMean">
            <div className="dashNav">
                <div className="navDash">D@SHBOARD</div>
                <div className="homeDash" typeof="button" onClick={() => { navigate("/") }}>Home</div>
            </div>
            <div className="dashBody">
                <div className="dashHead">
                    <div className="clientDash">
                        <div className="amountClient">2 Clients</div>
                        <div className="amountIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="earningDash">
                        <div className="earningAmount">44.779.000 VND</div>
                        <div className="earningIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                            </svg>
                        </div>
                    </div>
                    <div className="orderDash">
                        <div className="orderAmount">2 New Orders</div>
                        <div className="orderIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="dashHistory">
                    <div className="historyMenu">History</div>
                    <div className="historyTable">
                        <table id="historyMenu">
                        <thead className="headHistory">
                            <tr className="menuHis">
                                <th>NO</th>
                                <th>ID USER</th>
                                <th className="thNameHis">NAME</th>
                                <th>PHONE</th>
                                <th>ADDRESS</th>
                                <th>TOTAL</th>
                                <th>DELIVERY</th>
                                <th>STATUS</th>
                                <th>DETAIL</th>
                            </tr>
                        </thead>
                        <tbody >
                        {proData?.map((data, i) => {
                            return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{data._id}</td>
                                        <td>{data.customerArray[0].email}</td>
                                        <td>{data.customerArray[0].phone}</td>
                                        <td>{data.customerArray[0].address}</td>
                                        <td>{formatter.format(data.sum) + " VND"}</td>
                                        <td>Chưa Vận Chuyển</td>
                                        <td>Chưa Thanh Toán</td>
                                        <td className="detailBtn"><button>Detail</button></td>
                                    </tr>
                            )
                        })}
                        </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Dashboard;