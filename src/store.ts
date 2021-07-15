import create from "zustand";

export type UserType = {
  id: number;
  username: string;
  avatar: string;
};

export type CommentType = {
  id: number;
  content: string;
  userId: number;
  postId: number;
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  likes: number;
  userId: number;
  comments: CommentType[];
};

type Store = {
  activeUser: UserType | null;
  setActiveUser: (arg: UserType) => void;
  userList: UserType[];
  getUserList: () => void;
  postList: PostType[];
  getPostList: () => void;
  postNewComment: (arg: {
    content: string;
    userId: number;
    postId: number;
  }) => void;
  postNewPost: (arg: {
    title: string;
    content: string;
    image: {
      src: string;
      alt: string;
    };
    likes: number;
    userId: number;
    comments: CommentType[];
  }) => void;
  addLike: (id: number, likes: number) => void;
};

const useStore = create<Store>((set, get) => ({
  activeUser: null,
  setActiveUser: (user: UserType) => set({ activeUser: user }),

  userList: [],
  getUserList: () => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((users) => set({ userList: users }));
  },
  postList: [],
  getPostList: () => {
    fetch("http://localhost:4000/posts?_embed=comments")
      .then((response) => response.json())
      .then((posts) => set({ postList: posts }));
  },
  postNewComment: (newComment) => {
    fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((commentFromServer) => {
        set({
          postList: get().postList.map((post) => {
            if (post.id === commentFromServer.postId)
              return {
                ...post,
                comments: [...post.comments, commentFromServer],
              };
            else return post;
          }),
        });
      });
  },

  postNewPost: (newPost) => {
    fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((newPostFromServer) => {
        set({ postList: [newPostFromServer, ...get().postList] });
      });
  },
  addLike: (postId, likes) => {
    fetch(`http://localhost:4000/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes }),
    })
      .then((response) => response.json())
      .then((postFromServer) => {
        console.log(postFromServer);

        set({
          postList: get().postList.map((post) => {
            if (post.id === postFromServer.id)
              return { ...postFromServer, comments: [...post.comments] };
            else return post;
          }),
        });
      });
  },
}));

export default useStore;
