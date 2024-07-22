let dragElement;
let X, Y;

document.querySelectorAll(".div").forEach((div) => {
    div.addEventListener("mousedown", onMouseDown);
});

function onMouseDown(e) {
    dragElement = e.target;
    X = dragElement.style.left;
    Y = dragElement.style.top;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
    dragElement.style.left =
        e.pageX - document.getElementById("drag").getBoundingClientRect().x + "px";
    dragElement.style.top =
        e.pageY - document.getElementById("drag").getBoundingClientRect().y + "px";
}

function onMouseUp(e) {
    let isDropped = false;
    document.querySelectorAll(".dropzone").forEach((dropzone) => {
        const dzRect = dropzone.getBoundingClientRect();
        const refRect = dragElement.getBoundingClientRect();
        const answer = dropzone.getAttribute("data-answer");

        if (
            refRect.left > dzRect.left &&
            refRect.right < dzRect.right &&
            refRect.top > dzRect.top &&
            refRect.bottom < dzRect.bottom &&
            dragElement.innerText === answer
        ) {
            isDropped = true;
            dragElement.style.position = "absolute";
            dragElement.style.left =
                dzRect.left - document.getElementById("drag").getBoundingClientRect().x + "px";
            dragElement.style.top =
                dzRect.top - document.getElementById("drag").getBoundingClientRect().y + "px";

            dragElement.style.width = dropzone.offsetWidth + "px";
            dragElement.style.height = dropzone.offsetHeight + "px";
            dragElement.style.lineHeight = dropzone.offsetHeight + "px";
            dragElement.style.borderColor = "#2ecc71";
            dragElement.style.backgroundColor = "#d4efdf";
            dragElement.style.color = "#2ecc71";

            dropzone.classList.add("correct");
        }
    });

    if (!isDropped) {
        dragElement.style.left = X;
        dragElement.style.top = Y;
        dragElement.classList.add("incorrect");
        setTimeout(() => {
            dragElement.classList.remove("incorrect");
        }, 500);
    }

    dragElement = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    // Update feedback
    updateFeedback();
}

function updateFeedback() {
    const correctCount = document.querySelectorAll(".correct").length;
    const totalQuestions = document.querySelectorAll(".question-container").length;

    document.getElementById("feedback").innerText = `Score: ${correctCount}/${totalQuestions}`;
}