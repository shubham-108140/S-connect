import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Post as IPost } from "./main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "./post.css";
//fontawsome

// const element = <FontAwesomeIcon icon="fa-solid fa-house" />
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

// Usage in JSX

//typescript
interface Props {
  post: IPost;
}
interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likesToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likesToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post-container">
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="description">
        <h2>{post.description}</h2>
      </div>
      <div className="footer">
        <div className="footer-like-comment"></div>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <><FontAwesomeIcon icon={faHeart} style={{color: "#ff0000",}} /></> : <><FontAwesomeIcon icon={emptyHeart}  /></>}
        </button>

        <button>
          <FontAwesomeIcon icon={faComment} size="sm" />
        </button>
        {/* {likes && <p>{likes?.length} Likes</p>} */}
        <p>@{post.username}</p>
      </div>
      <div>
        {likes?.length === 0 ? (
          ""
        ) : likes?.length === 1 ? (
          <p>{likes?.length} Like</p>
        ) : (
          <p>{likes?.length} Likes</p>
        )}
      </div>
    </div>
  );
};
