/*********************************************/
/****************POST***********************/
/*********************************************/

const newComment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-content').value.trim();
  // console.log(commentContent);
  // console.log(comment)
  if (comment) {
    const subjectid = event.target.getAttribute(`data-id`); // appears in the dev tool elements as correct subject id
    console.log(subjectid); // keeps coming up null

    console.log(comment);
    const response = await fetch(`/api/subject/${subjectid}`, {
      method: "POST",
      body: JSON.stringify({ comment: comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("got comment?"); // we have made it here before
    if (response.ok) {
      console.log(`\n here is the response`)
      console.log(response)
      document.location.replace(`/subject/${subjectid}`); // makes it to here and produces error
    } else {
      alert("Failed to post comment for blog");
    }
  }
};

/****************POST***********************/
document
  .querySelector(".new-comment")
  .addEventListener("submit", newComment);
