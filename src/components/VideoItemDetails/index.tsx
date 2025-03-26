// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { formatDistanceToNow } from "date-fns";
// import { BiLike, BiDislike } from "react-icons/bi";
// import { RiMenuAddLine } from "react-icons/ri";
// // import ReactPlayer from "react-player";
// // import { ThreeDots } from "react-loader-spinner";
// import { useTheme } from "../../context/ThemeContext";
// import { useSavedVideos } from "../../context/SavedVideosContext";
// import { getCookie, getAuthHeaders } from "../../utils/auth";
// import {
//   VideoItemDetailsContainer,
//   PlayerContainer,
//   VideoDetailContainer,
//   VideoTextContainer,
//   VideoTitle,
//   ViewsAndPostedContainer,
//   LikesAndViewsContainer,
//   ViewsText,
//   Button,
//   ChannelLogo,
//   ChannelDetails,
//   ChannelDetailsText,
//   ChannelDetailsText2,
//   VideoDescriptionText,
//   LoaderContainer,
//   FailureContainer,
//   FailureImg,
//   FailureText,
//   RetryButton,
// } from "./styledComponents";
// import Layout from "../Layout";

// interface VideoDetails {
//   id: string;
//   description: string;
//   publishedAt: string;
//   thumbnailUrl: string;
//   title: string;
//   videoUrl: string;
//   viewCount: string;
//   channel: {
//     name: string;
//     profileImageUrl: string;
//     subscriberCount: string;
//   };
// }

// const VideoItemDetails = () => {
//   const params = useParams();
//   const id = params?.id as string;
//   const { isDarkTheme } = useTheme();
//   const { addSavedVideo, removeSavedVideo, isVideoSaved } = useSavedVideos();

//   const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isDisliked, setIsDisliked] = useState(false);

//   const fetchVideoDetails = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const jwtToken = getCookie();
//       if (!jwtToken) {
//         throw new Error("User is not authenticated");
//       }

//       // const url = `https://apis.ccbp.in/videos/${id}`;
//       const url = `/api/videos/${id}`;
//       const response = await fetch(url, {
//         headers: getAuthHeaders(jwtToken),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch video details");
//       }

//       const data = await response.json();
//       console.log("video detials", data);
//       const videoData = data.video;
//       console.log(videoData);

//       // setVideoDetails({
//       //   id: videoData.id,
//       //   description: videoData.description,
//       //   publishedAt: videoData.published_at,
//       //   thumbnailUrl: videoData.thumbnail_url,
//       //   title: videoData.title,
//       //   videoUrl: videoData.video_url,
//       //   viewCount: videoData.view_count.toString(),
//       //   channel: {
//       //     name: videoData.channel.name,
//       //     profileImageUrl: videoData.channel.profile_image_url,
//       //     subscriberCount: videoData.channel.subscriber_count.toString(),
//       //   },
//       // });

//       setVideoDetails({
//         id: videoData.id,
//         title: videoData.title,
//         thumbnailUrl: videoData.thumbnail_url,
//         description: videoData.description || "No description available",
//         videoUrl: videoData.video_url || "",
//         viewCount: videoData.view_count?.toString() || "0",
//         publishedAt: videoData.published_at || new Date().toISOString(),
//         channel: {
//           name: videoData.channel.name,
//           profileImageUrl: videoData.channel.profile_image_url,
//           subscriberCount:
//             videoData.channel.subscriber_count?.toString() || "N/A",
//         },
//       });
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVideoDetails();
//   }, [id]);

//   const handleLike = () => {
//     setIsLiked(!isLiked);
//     setIsDisliked(false);
//   };

//   const handleDislike = () => {
//     setIsDisliked(!isDisliked);
//     setIsLiked(false);
//   };

//   // const handleSave = () => {
//   //   if (videoDetails) {
//   //     if (isVideoSaved(videoDetails.id)) {
//   //       removeSavedVideo(videoDetails.id);
//   //     } else {
//   //       addSavedVideo(videoDetails);
//   //     }
//   //   }
//   // };

//   // const handleSave = () => {
//   //   if (videoDetails) {
//   //     console.log("Saved Clicked");
//   //     console.log(videoDetails.id);
//   //     if (isVideoSaved(videoDetails.id)) {
//   //       removeSavedVideo(videoDetails.id);
//   //     } else {
//   //       addSavedVideo(videoDetails);
//   //     }
//   //   }
//   // };

//   const handleSave = () => {
//     if (videoDetails) {
//       console.log("Save button clicked for video:", videoDetails.id); // Debugging
//       if (isVideoSaved(videoDetails.id)) {
//         console.log("Removing video from saved list");
//         removeSavedVideo(videoDetails.id);
//       } else {
//         console.log("Adding video to saved list");
//         addSavedVideo(videoDetails);
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <LoaderContainer className="loader-container" data-testid="loader">
//         Loading...
//       </LoaderContainer>
//     );
//   }

//   if (error || !videoDetails) {
//     return (
//       <FailureContainer>
//         <FailureImg
//           src={
//             isDarkTheme
//               ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
//               : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
//           }
//           alt="failure view"
//         />
//         <FailureText theme={isDarkTheme ? "dark" : "light"}>
//           Oops! Something Went Wrong
//         </FailureText>
//         <RetryButton type="button" onClick={fetchVideoDetails}>
//           Retry
//         </RetryButton>
//       </FailureContainer>
//     );
//   }

//   const postedAt = formatDistanceToNow(new Date(videoDetails.publishedAt));
//   const theme = isDarkTheme ? "dark" : "light";

//   return (
//     <VideoItemDetailsContainer data-testid="videoItemDetails" theme={theme}>
//       <Layout>
//         <VideoDetailContainer>
//           <PlayerContainer>
//             {/* <ReactPlayer
//               url={videoDetails.videoUrl}
//               controls
//               width="100%"
//               height="100%"
//             /> */}
//             <img
//               src={videoDetails.thumbnailUrl}
//               alt="videothumbnail"
//               style={{}}
//             />
//           </PlayerContainer>
//           <VideoTextContainer>
//             <VideoTitle theme={theme}>{videoDetails.title}</VideoTitle>
//             <LikesAndViewsContainer>
//               <ViewsAndPostedContainer>
//                 <ViewsText>{videoDetails.viewCount} views</ViewsText>
//                 <ViewsText>{postedAt} ago</ViewsText>
//               </ViewsAndPostedContainer>
//               <div>
//                 <Button
//                   type="button"
//                   theme={isLiked ? "active" : "not-active"}
//                   onClick={handleLike}
//                   data-testid="likeButton"
//                 >
//                   <BiLike size={20} style={{ paddingTop: "6px" }} />
//                   Like
//                 </Button>
//                 <Button
//                   type="button"
//                   theme={isDisliked ? "active" : "not-active"}
//                   onClick={handleDislike}
//                   data-testid="dislikeButton"
//                 >
//                   <BiDislike size={20} style={{ paddingTop: "6px" }} />
//                   Dislike
//                 </Button>
//                 <Button
//                   type="button"
//                   theme={
//                     isVideoSaved(videoDetails.id) ? "active" : "not-active"
//                   }
//                   onClick={handleSave}
//                   data-testid="saveButton"
//                 >
//                   <RiMenuAddLine size={20} style={{ paddingTop: "6px" }} />
//                   {isVideoSaved(videoDetails.id) ? "Saved" : "Save"}
//                 </Button>
//               </div>
//             </LikesAndViewsContainer>
//             <hr />
//             <ChannelDetails>
//               <ChannelLogo
//                 src={videoDetails.channel.profileImageUrl}
//                 alt="channel logo"
//               />
//               <div>
//                 <ChannelDetailsText theme={theme}>
//                   {videoDetails.channel.name}
//                 </ChannelDetailsText>
//                 <ChannelDetailsText2>
//                   {videoDetails.channel.subscriberCount} subscribers
//                 </ChannelDetailsText2>
//               </div>
//             </ChannelDetails>
//             <VideoDescriptionText theme={theme}>
//               {videoDetails.description}
//             </VideoDescriptionText>
//           </VideoTextContainer>
//         </VideoDetailContainer>
//       </Layout>
//     </VideoItemDetailsContainer>
//   );
// };

// export default VideoItemDetails;

// -----------------------------------------------------------------------------

/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { BiLike, BiDislike } from "react-icons/bi";
import { RiMenuAddLine } from "react-icons/ri";
import { useTheme } from "../../context/ThemeContext";
import { useSavedVideos } from "../../context/SavedVideosContext";
import { getCookie, getAuthHeaders } from "../../utils/auth";
import {
  VideoItemDetailsContainer,
  PlayerContainer,
  VideoDetailContainer,
  VideoTextContainer,
  VideoTitle,
  ViewsAndPostedContainer,
  LikesAndViewsContainer,
  ViewsText,
  Button,
  ChannelLogo,
  ChannelDetails,
  ChannelDetailsText,
  ChannelDetailsText2,
  VideoDescriptionText,
  LoaderContainer,
  FailureContainer,
  FailureImg,
  FailureText,
  RetryButton,
} from "./styledComponents";
import Layout from "../Layout";

// Define the Comment interface
interface Comment {
  commentId: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

// Define the VideoDetails interface
interface VideoDetails {
  id: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  title: string;
  videoUrl: string;
  viewCount: string;
  channel: {
    name: string;
    profileImageUrl: string;
    subscriberCount: string;
  };
  comments: Comment[];
}

const VideoItemDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const { isDarkTheme } = useTheme();
  const { addSavedVideo, removeSavedVideo, isVideoSaved } = useSavedVideos();

  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Replace with actual user ID from your authentication system
  const currentUserId = "currentUserId"; // Placeholder; integrate with your auth system

  const fetchVideoDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const jwtToken = getCookie();
      if (!jwtToken) {
        throw new Error("User is not authenticated");
      }

      const url = `/api/videos/${id}`;
      const response = await fetch(url, {
        headers: getAuthHeaders(jwtToken),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch video details");
      }

      const data = await response.json();
      const videoData = data.video;

      setVideoDetails({
        id: videoData.id,
        title: videoData.title,
        thumbnailUrl: videoData.thumbnail_url,
        description: videoData.description || "No description available",
        videoUrl: videoData.video_url || "",
        viewCount: videoData.viewCount?.toString() || "0",
        publishedAt: videoData.publishedAt || new Date().toISOString(),
        channel: {
          name: videoData.channel.name,
          profileImageUrl: videoData.channel.profile_image_url,
          subscriberCount:
            videoData.channel.subscriberCount?.toString() || "N/A",
        },
        comments: videoData.comments || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };

  const handleSave = () => {
    if (videoDetails) {
      if (isVideoSaved(videoDetails.id)) {
        removeSavedVideo(videoDetails.id);
      } else {
        addSavedVideo(videoDetails);
      }
    }
  };

  // const handleAddComment = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!newComment.trim()) return;
  //   console.log("Video ID:", id);

  //   try {
  //     console.log("Video ID:", id);

  //     const response = await fetch(`/api/videos/${id}/comments`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userId: currentUserId, text: newComment }),
  //     });

  //     if (!response.ok) {
  //       const responseText = await response.text();
  //       console.error(
  //         `Failed to add comment: Status ${response.status}, Response: ${responseText}`
  //       );
  //       return;
  //     }

  //     const addedComment = await response.json();
  //     setVideoDetails((prev) =>
  //       prev ? { ...prev, comments: [...prev.comments, addedComment] } : null
  //     );
  //     setNewComment("");
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    console.log("Attempting to add comment...");
    console.log("Video ID:", id);
    console.log("Current User ID:", currentUserId);

    try {
      const jwtToken = getCookie();
      if (!jwtToken) {
        console.error("User is not authenticated");
        return;
      }

      const response = await fetch(`/pages/api/videos/${id}/comments`, {
        // Removed trailing slash
        method: "POST",
        headers: getAuthHeaders(jwtToken), // Include authentication headers
        body: JSON.stringify({ userId: currentUserId, text: newComment }),
      });

      const responseText = await response.text();
      console.log(
        `Response Status: ${response.status}, Response: ${responseText}`
      );

      if (!response.ok) {
        console.error(`Failed to add comment: ${responseText}`);
        return;
      }

      const addedComment = JSON.parse(responseText);

      setVideoDetails((prev) =>
        prev ? { ...prev, comments: [...prev.comments, addedComment] } : null
      );
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = async (commentId: string) => {
    const comment = videoDetails?.comments.find(
      (c) => c.commentId === commentId
    );
    const newText = prompt("Edit your comment:", comment?.text);
    if (newText && newText.trim()) {
      try {
        const response = await fetch(
          `/api/videos/${id}/comments/${commentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: newText }),
          }
        );

        if (!response.ok) {
          const responseText = await response.text();
          console.error(
            `Failed to edit comment: Status ${response.status}, Response: ${responseText}`
          );
          return;
        }

        setVideoDetails((prev) =>
          prev
            ? {
                ...prev,
                comments: prev.comments.map((c) =>
                  c.commentId === commentId
                    ? {
                        ...c,
                        text: newText,
                        updatedAt: new Date().toISOString(),
                      }
                    : c
                ),
              }
            : null
        );
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        const response = await fetch(
          `/api/videos/${id}/comments/${commentId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const responseText = await response.text();
          console.error(
            `Failed to delete comment: Status ${response.status}, Response: ${responseText}`
          );
          return;
        }

        setVideoDetails((prev) =>
          prev
            ? {
                ...prev,
                comments: prev.comments.filter(
                  (c) => c.commentId !== commentId
                ),
              }
            : null
        );
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  // const handleDeleteComment = async (commentId: string) => {
  //   if (confirm("Are you sure you want to delete this comment?")) {
  //     try {
  //       const response = await fetch(
  //         `/api/videos/${id}/comments/${commentId}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );

  //       if (response.ok) {
  //         setVideoDetails((prev) =>
  //           prev
  //             ? {
  //                 ...prev,
  //                 comments: prev.comments.filter(
  //                   (c) => c.commentId !== commentId
  //                 ),
  //               }
  //             : null
  //         );
  //       } else {
  //         console.error("Failed to delete comment");
  //       }
  //     } catch (error) {
  //       console.error("Error deleting comment:", error);
  //     }
  //   }
  // };

  if (isLoading) {
    return (
      <LoaderContainer className="loader-container" data-testid="loader">
        Loading...
      </LoaderContainer>
    );
  }

  if (error || !videoDetails) {
    return (
      <FailureContainer>
        <FailureImg
          src={
            isDarkTheme
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          }
          alt="failure view"
        />
        <FailureText theme={isDarkTheme ? "dark" : "light"}>
          Oops! Something Went Wrong
        </FailureText>
        <RetryButton type="button" onClick={fetchVideoDetails}>
          Retry
        </RetryButton>
      </FailureContainer>
    );
  }

  const postedAt = formatDistanceToNow(new Date(videoDetails.publishedAt));
  const theme = isDarkTheme ? "dark" : "light";

  return (
    <VideoItemDetailsContainer data-testid="videoItemDetails" theme={theme}>
      <Layout>
        <VideoDetailContainer>
          <PlayerContainer>
            <img src={videoDetails.thumbnailUrl} alt="videothumbnail" />
          </PlayerContainer>
          <VideoTextContainer>
            <VideoTitle theme={theme}>{videoDetails.title}</VideoTitle>
            <LikesAndViewsContainer>
              <ViewsAndPostedContainer>
                <ViewsText>{videoDetails.viewCount} views</ViewsText>
                <ViewsText>{postedAt} ago</ViewsText>
              </ViewsAndPostedContainer>
              <div>
                <Button
                  type="button"
                  theme={isLiked ? "active" : "not-active"}
                  onClick={handleLike}
                  data-testid="likeButton"
                >
                  <BiLike size={20} style={{ paddingTop: "6px" }} />
                  Like
                </Button>
                <Button
                  type="button"
                  theme={isDisliked ? "active" : "not-active"}
                  onClick={handleDislike}
                  data-testid="dislikeButton"
                >
                  <BiDislike size={20} style={{ paddingTop: "6px" }} />
                  Dislike
                </Button>
                <Button
                  type="button"
                  theme={
                    isVideoSaved(videoDetails.id) ? "active" : "not-active"
                  }
                  onClick={handleSave}
                  data-testid="saveButton"
                >
                  <RiMenuAddLine size={20} style={{ paddingTop: "6px" }} />
                  {isVideoSaved(videoDetails.id) ? "Saved" : "Save"}
                </Button>
              </div>
            </LikesAndViewsContainer>
            <hr />
            <ChannelDetails>
              <ChannelLogo
                src={videoDetails.channel.profileImageUrl}
                alt="channel logo"
              />
              <div>
                <ChannelDetailsText theme={theme}>
                  {videoDetails.channel.name}
                </ChannelDetailsText>
                <ChannelDetailsText2>
                  {videoDetails.channel.subscriberCount} subscribers
                </ChannelDetailsText2>
              </div>
            </ChannelDetails>
            <VideoDescriptionText theme={theme}>
              {videoDetails.description}
            </VideoDescriptionText>

            {/* Comments Section */}
            <hr />
            <h3>Comments</h3>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                style={{ marginRight: "10px" }}
              />
              <Button type="submit">Post</Button>
            </form>
            <div>
              {videoDetails.comments.map((comment) => (
                <div key={comment.commentId} style={{ margin: "10px 0" }}>
                  <p>{comment.text}</p>
                  {comment.userId === currentUserId && (
                    <div>
                      <Button
                        type="button"
                        onClick={() => handleEditComment(comment.commentId)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleDeleteComment(comment.commentId)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </VideoTextContainer>
        </VideoDetailContainer>
      </Layout>
    </VideoItemDetailsContainer>
  );
};

export default VideoItemDetails;
