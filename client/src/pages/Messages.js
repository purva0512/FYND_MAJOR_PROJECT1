import { Tabs } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../components/Layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { setUser } from "../redux/userSlice";

function Messages() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://healthi5.onrender.com/api/user/mark-all-notification-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/user/delete-all-messages",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Unseen",
            key: "1",
            children: (
              <>
                <div className="d-flex justify-content-end">
                  <h1 className="anchor" onClick={() => markAllAsSeen()}>
                    Mark all as seen
                  </h1>
                </div>

                {user?.unseenMessage.map((notify) => (
                  <div
                    className="card p-2"
                    onClick={() => navigate(notify.onClickPath)}
                  >
                    <div className="card-text">{notify.message}</div>
                  </div>
                ))}
              </>
            ),
          },
          {
            label: "Seen",
            key: "2",
            children: (
              <>
                <div className="d-flex justify-content-end">
                  <h1 className="anchor" onClick={() => deleteAll()}>
                    Delete all
                  </h1>
                </div>
                {user?.seenMessage.map((notify) => (
                  <div
                    className="card p-2"
                    onClick={() => navigate(notify.onClickPath)}
                  >
                    <div className="card-text">{notify.message}</div>
                  </div>
                ))}
              </>
            ),
          },
        ]}
      />
    </Layout>
  );
}

export default Messages;
