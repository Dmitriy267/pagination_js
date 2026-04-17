const postsSection = document.getElementById('posts');
let pageNumber = 1;
let numberOfPages = 30;
const numberPerPage = 6;
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const fetchPosts = async function (pageNumber) {
    try {
        const request = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${numberPerPage}`,
        );
        if (!request.ok) {
            throw Error('Request error');
        }

        const data = await request.json();
        postsSection.innerHTML = '';
        data.forEach((item) => {
            postsSection.innerHTML =
                postsSection.innerHTML +
                `
            <div class="posts-card">
         <div class="post-title">
            <h2 class="post-title-text">${item.title}</h2>
         </div>
         <div class="post-body">
            <p class="post-body-text">
               ${item.body}
            </p>
         </div>
      </div>  
            `;
        });
    } catch (error) {
        console.log(error.message);
    }
};
fetchPosts();

prev.addEventListener('click', function (e) {
    e.preventDefault();
    if (pageNumber > 1) {
        pageNumber = pageNumber - 1;
        fetchPosts(pageNumber);
    }
});

next.addEventListener('click', function (e) {
    e.preventDefault();
    if (pageNumber < numberOfPages) {
        pageNumber = pageNumber + 1;
        fetchPosts(pageNumber);
    }
});
