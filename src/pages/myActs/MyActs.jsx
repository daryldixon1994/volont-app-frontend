import { Link } from "react-router-dom";
import { baseAssoUrl, getToken } from "../../lib";
import useFetch from "../../lib/useFetch";
import { Skeleton } from "primereact/skeleton";
import "./style.css";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import UserItem from "../../components/userItem/UserItem";
function MyActs() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const token = getToken();
  const { data, error, loading } = useFetch(`${baseAssoUrl}/getOwnActs`, token);
  const skeletonData = [1, 2, 3];
  if (error) {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
    return <div>an error was occured</div>;
  }

  const show = () => {
    setVisible(true);
  };
  return (
    <div className="account-outlet">
      <div id="my-acts-header">
        <h5></h5>
        <h5>Title</h5>
        <h5>Date</h5>
        <h5>Hour</h5>
        <h5>Location</h5>
        <h5>Category</h5>
        <h5>Volonteers</h5>
        <h5>Users</h5>
        <h5>Pending Users</h5>
      </div>
      <div className="acts-data">
        {loading ? (
          // <div>loading...</div>
          skeletonData.map((elt, i) => (
            // <Skeleton height="2rem" className="mb-2"></Skeleton>
            <div key={i} className="act">
              <Skeleton shape="circle" size="3rem" className="mr-2"></Skeleton>
              <Skeleton height="2rem" className="mb-2"></Skeleton>
              <Skeleton height="2rem" className="mb-2"></Skeleton>
              <Skeleton height="2rem" className="mb-2"></Skeleton>
              <Skeleton height="2rem" className="mb-2"></Skeleton>
              <Skeleton height="2rem" className="mb-2"></Skeleton>
              <Skeleton height="2rem" className="mb-2"></Skeleton>
              <Skeleton height="2rem" className="mb-2"></Skeleton>
              <Skeleton height="2rem" className="mb-2"></Skeleton>
            </div>
          ))
        ) : data.length >= 1 ? (
          data.map((act) => (
            <div key={act._id} className="act">
              <img src={act.img} alt="" />
              <h5>{act.actName}</h5>
              <h5>
                {act.actDate && new Date(act.actDate).toLocaleDateString()}
              </h5>
              <h5>{act.actHour}</h5>
              <h5>{act.location}</h5>
              <h5>{act.category}</h5>
              <h5>{act.volonteersNbr}</h5>
              <h5
                style={{}}
                onClick={() => {
                  setUsers(act.users);
                  show();
                }}
              >
                <Link>See more</Link>
              </h5>
              <Link style={{ textDecoration: "none" }} to={`/join-request`}>
                <h5>{act.pendingUsers?.length}</h5>
              </Link>
            </div>
          ))
        ) : (
          <h4>
            No acts yet. <br /> <Link to="/add-act">Add act</Link>{" "}
          </h4>
        )}
      </div>
      <Dialog
        header="Users"
        visible={visible}
        position="top"
        style={{ width: "80%" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={true}
        resizable={false}
      >
        <div id="users-list">
          <div id="users-list-header">
            <h5></h5>
            <h5>Username</h5>
            <h5>Email</h5>
            <h5>Phone</h5>
            <h5>Address</h5>
          </div>
          {users.length >= 1 ? (
            users.map((user, i) => <UserItem key={i} {...user} />)
          ) : (
            <p className="m-0">No users yet</p>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default MyActs;
