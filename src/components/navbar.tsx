import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "./navbar.css"

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="logo">S Connect</div>
      <div className="links">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/createpost">Create Post</Link>
        )}
      </div>

      <div className="user">
        {user && (
          <>
            <p>{auth.currentUser?.displayName}</p>
            {/* if photoUrl is null or not set by the user for the account then show empty string */}
            <img
              src={auth.currentUser?.photoURL || ""}
              alt=""
              width="100"
              height="100"
            />
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
      
    </div>
  );
};