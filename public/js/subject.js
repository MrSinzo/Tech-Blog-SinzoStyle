/*********************************************/
/****************POST***********************/
/*********************************************/
const newPostHandler = async (event) => {
  event.preventDefault();

  const postContent = document.querySelector("#post-content").value.trim();
  // console.log(postContent);
  if (postContent) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    // console.info(id);
    console.log(postContent);
    const response = await fetch(`/api/dashboard/subject/`, {
      method: "POST",
      body: JSON.stringify({ postContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("got Milk add-on");
    if (response.ok) {
      document.location.replace("/api/subject/");
    } else {
      alert("Failed to create post for blog");
    }
  }
};

/****************POST***********************/
document
  .querySelector(".new-post-form")
  .addEventListener("submit", newPostHandler);
