import React, { useState } from "react";
import { Modal, Button, Input, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/clickShopSlice";
import { useNavigate } from "react-router-dom";
import { githubLogo, googleLogo } from "../assets";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOk = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalVisible(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const userInfo = useSelector((state) => state.clickShop.userInfo);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handleLogin = () => {
    signInWithPopup(
      auth,
      provider.setCustomParameters({ prompt: "select_account" })
    )
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Log Out Successfully!");
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const githubLogin = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal
        title="Authorization"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            className="text-black border border-gray-200"
            type="primary"
            loading={isLoading}
            onClick={handleOk}
          >
            {isLoading ? "Loading..." : "Authorize"}
          </Button>,
        ]}
      >
        <Space direction="vertical" size="large">
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Space>
      </Modal>
        
      <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
        <div className="w-full flex items-center justify-center gap-10">
          <button
            className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
            onClick={() => setIsModalVisible(true)}
          >
            Another way authorization
          </button>
        </div>

        <div className="w-full flex items-center justify-center gap-10">
          <div
            onClick={handleLogin}
            className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
          >
            <img className="w-8" src={googleLogo} alt="googleLogo" />
            <span className="text-sm text-gray-900"> Sign in with Google</span>
          </div>
          {userInfo && (
            <button
              onClick={handleSignOut}
              className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
            >
              Sign Out
            </button>
          )}
        </div>
        <div className="w-full flex items-center justify-center gap-10">
          <div
            onClick={githubLogin}
            className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
          >
            <img className="w-8" src={githubLogo} alt="githubLogo" />
            <span className="text-sm text-gray-900"> Sign in with Github</span>
          </div>
          {userInfo && (
            <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">
              Sign Out
            </button>
          )}
        </div>
        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Register now
          </Link>
        </p>
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default Login;
