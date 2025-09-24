import { Box, Typography, Button } from "@mui/material";

import PostCard from "../components/PostCard";

import { fetchVerify, getPosts, putLike, putUnlike } from "../libs/fetcher";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../ThemedApp";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import useWebSocket from "../libs/webSocketClient";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { auth, setAuth } = useApp();

  const ws = useRef();

  const navigate = useNavigate();

  const like = (_id) => {
    const result = posts.map((post) => {
      if (post._id === _id) {
        post.likes = [...post.likes, auth];
      }

      return post;
    });

    setPosts(result);
    putLike(_id);
  };

  const unlike = (_id) => {
    const result = posts.map((post) => {
      if (post._id === _id) {
        post.likes = post.likes.filter((like) => like._id !== auth._id);
      }

      return post;
    });

    setPosts(result);
    putUnlike(_id);
  };

  useEffect(() => {
    (async () => {
      const data = await getPosts();
      console.log(data);
      if (!data) console.log("Fetch error");

      setPosts(data);

      //   const ws = useWebSocket();
      //   ws.addEventListener("message", (e) => {
      //     const msg = JSON.parse(e.data);
      //     if (msg.type == "post") {
      //       setPosts([msg.post, ...data]);
      //     }
      //   });
    })();
  }, []);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button size="small" disabled>
          Latest
        </Button>
        <Typography sx={{ color: grey[500] }}>|</Typography>
        <Button size="small" onClick={() => {
            (async () => {
                setAuth(await fetchVerify());
            })();
            navigate("/followed")
        }}>
          Followed
        </Button>
      </Box>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} like={like} unlike={unlike} />
      ))}
    </Box>
  );
}
