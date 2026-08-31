import { useState } from "react";
import "../styles/board.css";
import { AdminAvatarIcon } from "../components/icons/AdminAvatarIcon";

type BoardType = "일반" | "갤러리" | "상품문의";

interface Board {
  id: string;
  name: string;
  type: BoardType;
}

interface Comment {
  id: number;
  author: string;
  content: string;
}

interface Post {
  id: number;
  boardId: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  likes: number;
  views: number;
  date: string;
  isNotice: boolean;
  isPrivate: boolean;
  comments: Comment[];
}

const INITIAL_BOARDS: Board[] = [
  { id: "notice", name: "Notice", type: "일반" },
  { id: "qna", name: "Q&A", type: "일반" },
  { id: "event", name: "Event", type: "일반" },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    boardId: "event",
    title: "벨리안 여름 신제품 출시 이벤트",
    content:
      "와인베리 퍼밍 콜라겐 젤리 출시를 기념해 첫 구매 고객 전원에게 사은품을 드려요!",
    author: "관리자",
    likes: 0,
    views: 1,
    date: "2026-08-08",
    isNotice: false,
    isPrivate: false,
    comments: [],
  },
];

function BoardPage() {
  const [boards, setBoards] = useState<Board[]>(INITIAL_BOARDS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeBoardId, setActiveBoardId] = useState<string>("all");
  const [boardSearchKeyword, setBoardSearchKeyword] = useState("");
  const [postSearchKeyword, setPostSearchKeyword] = useState("");

  const [view, setView] = useState<"list" | "detail" | "create">("list");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [boardMenuOpenId, setBoardMenuOpenId] = useState<string | null>(null);
  const [postMenuOpenId, setPostMenuOpenId] = useState<number | null>(null);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);

  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardType, setNewBoardType] = useState<BoardType>("일반");

  // 게시글 작성 폼 상태
  const [newPostBoardId, setNewPostBoardId] = useState("notice");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);

  // 댓글 입력
  const [commentDraft, setCommentDraft] = useState("");

  const filteredBoards = boards.filter((b) =>
    b.name.toLowerCase().includes(boardSearchKeyword.toLowerCase())
  );

  const activeBoard = boards.find((b) => b.id === activeBoardId);

  const filteredPosts = posts
    .filter((p) => (activeBoardId === "all" ? true : p.boardId === activeBoardId))
    .filter((p) =>
      (p.title + p.author).toLowerCase().includes(postSearchKeyword.toLowerCase())
    );

  const boardCount = (boardId: string) =>
    posts.filter((p) => p.boardId === boardId).length;

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredPosts.map((p) => p.id) : []);
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setPosts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  const openDetail = (postId: number) => {
    setSelectedPostId(postId);
    setView("detail");
  };

  const closeAddBoard = () => {
    setIsAddBoardOpen(false);
    setNewBoardName("");
    setNewBoardType("일반");
  };

  const submitAddBoard = () => {
    const trimmed = newBoardName.trim();
    if (trimmed === "") return;
    const id = `board-${Date.now()}`;
    setBoards((prev) => [...prev, { id, name: trimmed, type: newBoardType }]);
    closeAddBoard();
  };

  const deleteBoard = (id: string) => {
    setBoards((prev) => prev.filter((b) => b.id !== id));
    setPosts((prev) => prev.filter((p) => p.boardId !== id));
    if (activeBoardId === id) setActiveBoardId("all");
    setBoardMenuOpenId(null);
  };

  const openCreatePost = (boardId?: string) => {
    setNewPostBoardId(boardId || boards[0]?.id || "notice");
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostImage(null);
    setCreateDropdownOpen(false);
    setView("create");
  };

  const submitCreatePost = () => {
    const newPost: Post = {
      id: Date.now(),
      boardId: newPostBoardId,
      title: newPostTitle || "제목 없음",
      content: newPostContent,
      imageUrl: newPostImage || undefined,
      author: "관리자",
      likes: 0,
      views: 0,
      date: new Date().toISOString().slice(0, 10),
      isNotice: false,
      isPrivate: false,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    setActiveBoardId(newPostBoardId);
    setView("list");
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPostImage(URL.createObjectURL(file));
    }
  };

  const toggleNotice = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isNotice: !p.isNotice } : p
      )
    );
    setPostMenuOpenId(null);
  };

  const togglePrivate = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isPrivate: !p.isPrivate } : p
      )
    );
    setPostMenuOpenId(null);
  };

  const deletePost = (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (view === "detail") setView("list");
  };

  const addComment = (postId: number) => {
    const trimmed = commentDraft.trim();
    if (trimmed === "") return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: Date.now(), author: "관리자", content: trimmed },
              ],
            }
          : p
      )
    );
    setCommentDraft("");
  };

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  /* ---------------- 상세 보기 ---------------- */
  if (view === "detail" && selectedPost) {
    return (
      <div className="dashboard-page">
        <div className="board-detail">
          <div className="board-detail__header">
            <button
              className="board-detail__back"
              onClick={() => setView("list")}
            >
              ←
            </button>
            <h2 className="board-detail__title">게시물 상세</h2>
            <div className="board-detail__actions">
              <button
                className="board-btn"
                onClick={() => openCreatePost(selectedPost.boardId)}
              >
                ✎ 수정
              </button>
              <button
                className="board-btn board-btn--danger"
                onClick={() => deletePost(selectedPost.id)}
              >
                🗑 삭제
              </button>
            </div>
          </div>

          <div className="board-detail__card">
            <h3 className="board-detail__post-title">{selectedPost.title}</h3>
            <div className="board-detail__meta">
              <span className="board-detail__author">
                👤 {selectedPost.author}
              </span>
              <span>조회수 {selectedPost.views}</span>
              <span>좋아요 {selectedPost.likes}</span>
              <span>{selectedPost.date}</span>
            </div>

            <p className="board-detail__content">{selectedPost.content}</p>

            {selectedPost.imageUrl && (
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="board-detail__image"
              />
            )}
          </div>

          <div className="board-detail__comments">
            <h3 className="board-detail__comments-title">
              댓글 <span>{selectedPost.comments.length}</span>
            </h3>

            {selectedPost.comments.map((c) => (
              <div key={c.id} className="board-comment">
                <span className="board-comment__author">{c.author}</span>
                <p>{c.content}</p>
              </div>
            ))}

            <div className="board-comment-form">
              <AdminAvatarIcon className="board-comment-form__avatar" />
              <div className="board-comment-form__field">
                <span className="board-comment-form__label">관리자</span>
                <textarea
                  placeholder="내용을 입력해 주세요"
                  value={commentDraft}
                  onChange={(e) => setCommentDraft(e.target.value)}
                  rows={3}
                />
                <button
                  className="board-btn board-btn--primary"
                  onClick={() => addComment(selectedPost.id)}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- 게시글 작성 ---------------- */
  if (view === "create") {
    const targetBoard = boards.find((b) => b.id === newPostBoardId);
    const needsImage =
      targetBoard?.type === "갤러리" || targetBoard?.type === "상품문의";

    return (
      <div className="dashboard-page">
        <div className="board-detail">
          <div className="board-detail__header">
            <button
              className="board-detail__back"
              onClick={() => setView("list")}
            >
              ←
            </button>
            <h2 className="board-detail__title">게시물 작성</h2>
            <div className="board-detail__actions">
              <button className="board-btn" onClick={() => setView("list")}>
                취소
              </button>
              <button
                className="board-btn board-btn--primary"
                onClick={submitCreatePost}
              >
                등록
              </button>
            </div>
          </div>

          <div className="board-detail__card">
            <div className="board-form__field">
              <label>게시판</label>
              <select
                value={newPostBoardId}
                onChange={(e) => setNewPostBoardId(e.target.value)}
              >
                {boards.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="board-form__field">
              <label>제목</label>
              <input
                type="text"
                placeholder="제목을 입력해 주세요"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </div>

            <div className="board-form__field">
              <label>내용</label>
              <textarea
                rows={8}
                placeholder="내용을 입력해 주세요"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>

            <div className="board-form__field">
              <label>
                이미지{needsImage && <span className="board-form__required">•</span>}
              </label>
              {newPostImage ? (
                <div className="board-form__image-wrap">
                  <img src={newPostImage} alt="미리보기" />
                  <button onClick={() => setNewPostImage(null)}>×</button>
                </div>
              ) : (
                <label className="board-form__image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                  <span>+ 이미지 추가</span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- 목록 ---------------- */
  return (
    <div className="dashboard-page">
      <section className="dashboard-section board-page">
        <div className="board-page__header">
          <h2 className="board-page__title">게시물</h2>
          <div className="board-page__header-actions">
            <button className="board-btn">게시물 일괄 등록</button>
            <div className="board-create-dropdown-wrap">
              <button
                className="board-btn board-btn--primary"
                onClick={() => setCreateDropdownOpen((prev) => !prev)}
              >
                게시물 작성 ﹀
              </button>
              {createDropdownOpen && (
                <>
                  <div
                    className="board-dropdown-overlay"
                    onClick={() => setCreateDropdownOpen(false)}
                  />
                  <div className="board-create-dropdown">
                    {boards.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => openCreatePost(b.id)}
                      >
                        {b.name}에 작성
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="board-page__body">
          <aside className="board-sidebar">
            <div className="board-sidebar__search">
              <span>🔍</span>
              <input
                type="text"
                placeholder="게시판 이름으로 검색"
                value={boardSearchKeyword}
                onChange={(e) => setBoardSearchKeyword(e.target.value)}
              />
            </div>

            <button
              className={`board-sidebar__item ${
                activeBoardId === "all" ? "board-sidebar__item--active" : ""
              }`}
              onClick={() => setActiveBoardId("all")}
            >
              전체 게시물{" "}
              <span className="board-sidebar__count">{posts.length}</span>
            </button>

            {filteredBoards.map((board) => (
              <div key={board.id} className="board-sidebar__row">
                <button
                  className={`board-sidebar__item ${
                    activeBoardId === board.id
                      ? "board-sidebar__item--active"
                      : ""
                  }`}
                  onClick={() => setActiveBoardId(board.id)}
                >
                  {board.name}{" "}
                  <span className="board-sidebar__count">
                    {boardCount(board.id)}
                  </span>
                </button>
                <button
                  className="board-sidebar__more"
                  onClick={() =>
                    setBoardMenuOpenId(
                      boardMenuOpenId === board.id ? null : board.id
                    )
                  }
                >
                  ⋮
                </button>
                {boardMenuOpenId === board.id && (
                  <>
                    <div
                      className="board-dropdown-overlay"
                      onClick={() => setBoardMenuOpenId(null)}
                    />
                    <div className="board-sidebar__menu">
                      <button onClick={() => setBoardMenuOpenId(null)}>
                        게시판 수정
                      </button>
                      <button
                        className="board-sidebar__menu-item--danger"
                        onClick={() => deleteBoard(board.id)}
                      >
                        게시판 삭제
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            <button
              className="board-sidebar__add"
              onClick={() => setIsAddBoardOpen(true)}
            >
              + 게시판 추가
            </button>
          </aside>

          <div className="board-main">
            {selectedIds.length > 0 ? (
              <div className="board-main__bulk-toolbar">
                <span className="board-main__bulk-count">
                  {selectedIds.length}개 선택됨
                </span>
                <div className="board-main__bulk-actions">
                  <button className="board-btn">연관 상품 편집</button>
                  <button className="board-btn">데이터 편집</button>
                  <button className="board-btn">이동</button>
                  <button
                    className="board-btn board-btn--danger"
                    onClick={deleteSelected}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ) : (
              <div className="board-main__toolbar">
                <h3 className="board-main__title">
                  {activeBoardId === "all" ? "전체 게시물" : activeBoard?.name}{" "}
                  <span className="board-main__count">
                    {filteredPosts.length}
                  </span>
                </h3>
                <div className="board-main__search">
                  <span>🔍</span>
                  <input
                    type="text"
                    placeholder="제목, 작성자로 검색"
                    value={postSearchKeyword}
                    onChange={(e) => setPostSearchKeyword(e.target.value)}
                  />
                </div>
              </div>
            )}

            {(activeBoard?.type === "갤러리" ||
              activeBoard?.type === "상품문의") &&
            filteredPosts.length > 0 ? (
              <div className="board-gallery-grid">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="board-gallery-card"
                    onClick={() => openDetail(post.id)}
                  >
                    <div className="board-gallery-card__image">
                      {post.imageUrl && <img src={post.imageUrl} alt="" />}
                    </div>
                    <p className="board-gallery-card__title">{post.title}</p>
                    <span className="board-gallery-card__meta">
                      {post.author} · {post.date}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <table className="board-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={
                          filteredPosts.length > 0 &&
                          selectedIds.length === filteredPosts.length
                        }
                        onChange={(e) => toggleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th>국가</th>
                    <th>위치</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>좋아요</th>
                    <th>조회수</th>
                    <th>작성일</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="board-table__empty">
                        작성된 게시물이 없어요
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((post) => {
                      const board = boards.find((b) => b.id === post.boardId);
                      return (
                        <tr
                          key={post.id}
                          className="board-table__row"
                          onClick={() => openDetail(post.id)}
                        >
                          <td onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(post.id)}
                              onChange={() => toggleSelectOne(post.id)}
                            />
                          </td>
                          <td>대한민국</td>
                          <td>{board?.name}</td>
                          <td className="board-table__title-cell">
                            {post.isNotice && (
                              <span className="board-badge board-badge--notice">
                                공지
                              </span>
                            )}
                            {post.isPrivate && (
                              <span className="board-badge board-badge--private">
                                비공개
                              </span>
                            )}
                            {post.title}
                          </td>
                          <td>{post.author}</td>
                          <td>{post.likes}</td>
                          <td>{post.views}</td>
                          <td>{post.date}</td>
                          <td
                            className="board-table__more-cell"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="board-sidebar__more"
                              onClick={() =>
                                setPostMenuOpenId(
                                  postMenuOpenId === post.id
                                    ? null
                                    : post.id
                                )
                              }
                            >
                              ⋮
                            </button>
                            {postMenuOpenId === post.id && (
                              <>
                                <div
                                  className="board-dropdown-overlay"
                                  onClick={() => setPostMenuOpenId(null)}
                                />
                                <div className="board-post-menu">
                                  <button
                                    onClick={() => toggleNotice(post.id)}
                                  >
                                    {post.isNotice
                                      ? "공지 해제"
                                      : "공지 설정"}
                                  </button>
                                  <button
                                    onClick={() => togglePrivate(post.id)}
                                  >
                                    {post.isPrivate
                                      ? "공개 처리"
                                      : "비공개 처리"}
                                  </button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {isAddBoardOpen && (
        <div className="board-modal-overlay" onClick={closeAddBoard}>
          <div className="board-modal" onClick={(e) => e.stopPropagation()}>
            <div className="board-modal__header">
              <h3 className="board-modal__title">게시판 추가</h3>
              <button className="board-modal__close" onClick={closeAddBoard}>
                ×
              </button>
            </div>

            <div className="board-modal__body">
              <div className="board-form__field">
                <label>게시판 이름</label>
                <input
                  type="text"
                  placeholder="게시판 이름을 입력해 주세요"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                />
              </div>

              <div className="board-form__field">
                <label>게시판 유형</label>
                <div className="board-modal__type-options">
                  {(["일반", "갤러리", "상품문의"] as BoardType[]).map(
                    (type) => (
                      <label key={type} className="board-modal__type-option">
                        <input
                          type="radio"
                          checked={newBoardType === type}
                          onChange={() => setNewBoardType(type)}
                        />
                        <span>
                          {type === "일반"
                            ? "일반 게시판"
                            : type === "갤러리"
                            ? "갤러리 게시판"
                            : "상품문의 게시판"}
                        </span>
                      </label>
                    )
                  )}
                </div>
                <p className="board-modal__hint">
                  갤러리·상품문의 게시판은 목록에서 이미지가 크게 표시돼요.
                </p>
              </div>
            </div>

            <div className="board-modal__footer">
              <button className="board-btn" onClick={closeAddBoard}>
                취소
              </button>
              <button
                className="board-btn board-btn--primary"
                disabled={newBoardName.trim() === ""}
                onClick={submitAddBoard}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardPage;
