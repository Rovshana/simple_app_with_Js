const postContainer = document.getElementById("post-container");
const modal = document.getElementById("modal");
const getPostsData = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return correlatePostsWithHtml(res?.data);
    })
    .catch((err) => console.log(err));
};

const correlatePostsWithHtml = (data) => {
  data?.slice(0, 25).map((post) => {
    let liElement = document.createElement("li");
    liElement.textContent = post?.title;
    liElement.addEventListener("click", () => {
      getPostById(post?.id);
      modal.style.display = "flex";
    });
    return postContainer.appendChild(liElement);
  });
};

const getPostById = (id) => {
  //   console.log(id, "id");
  axios(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => showModal(res?.data))
    .catch((err) => console.log(err));
};

const showModal = (post) => {
  console.log(post, "post");
  modal.innerHTML = "";
  const pTag = document.createElement("p");
  const title = document.createElement("h2");
  const id = document.createElement("span");
  pTag.textContent = post?.body;
  title.textContent = post?.title;
  id.textContent = ` User id: ${post?.id}`;
  modal.appendChild(title);
  modal.appendChild(id);
  modal.appendChild(pTag);
};
modal.addEventListener("click", () => {
  modal.style.display = "none";
});

(function () {
  getPostsData();
})();
