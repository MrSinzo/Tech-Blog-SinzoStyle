/*********************************************/
/****************UpDate***********************/
/*********************************************/
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#subject-name").value.trim();
  const description = document.querySelector("#subject-desc").value.trim();

  if (name && description) {
    console.log(name) // data is being pulled from input
    console.log(description)// data is being pulled from input
    const response = await fetch(`/subject`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log( "got Milk")
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog");
    }
  }
};


/*********************************************/
/****************Delete***********************/
/*********************************************/
const delButtonHandler = async (event) => {
  // console.log("Lost milk?")
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/dashboard/subject/${id}`, { 
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete Blog");
    }
  }
};

document
  .querySelector(".new-subject-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".subject-list")
  .addEventListener("click", delButtonHandler);
