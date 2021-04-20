import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DashboardLayout from "../../Layout/Dashboard.layout";
import Loading from "../Loading";
import './dashboard.css';

export default function DashboardPage() {
    const [dashboardData, setDashboardData] = useState();

    useEffect(() => {
        setTimeout(() => {
            // It should come from backend 
            // here I used fake data , ovbiously it;s not applicable for real life projects
            setDashboardData({
                totalAdmin: 3,
                totalOrder: 5,
                pendingOrder: 3,
                paidOrder: 2,
                totalService: 3,
                totalReview: 4
            })
        }, 2000);
        // axios.get('/dashboard')
        //     .then(res => {
        //         setDashboardData({
        //             totalAdmin: 3,
        //             totalOrder: 5,
        //             pendingOrder: 3,
        //             paidOrder: 2,
        //             totalService: 3,
        //             totalReview: 4
        //         })
        //     })
        //     .catch(err => console.log(err));
    }, [])
    return (
        <DashboardLayout>

            <div className="row mt-5">
                <h3 > Dashboard </h3>
                {
                    !dashboardData ? <Loading /> : (<>
                        <div className="col-md-4">
                            <div className={`infoCard brown`} >
                                <i className="fa fa-list m-2"></i>
                        Total {dashboardData?.totalOrder} Orders
                    </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`infoCard tomato`}>
                                <i className="fa fa-spinner m-2"></i>
                        Pending {dashboardData?.pendingOrder} Orders
                    </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`infoCard `} >
                                <i className="fa fa-check m-2"></i>
                        Paid {dashboardData?.paidOrder} Orders
                    </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`infoCard violet`} >
                                <i className="fa fa-book m-2"></i>
                        Total {dashboardData?.totalAdmin} Admins
                    </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`infoCard crown`} >
                                <i className="fa fa-book m-2"></i>
                        Total {dashboardData?.totalService} Service
                    </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`infoCard cyan`} >
                                <i className="fa fa-book m-2"></i>
                        Total {dashboardData?.totalReview} Review
                    </div>
                        </div>
                    </>)
                }
            </div>
        </DashboardLayout>
    )
}
