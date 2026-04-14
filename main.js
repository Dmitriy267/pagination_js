async function getData(url) {
    try {
        const request = await fetch(url);
        if (!request.ok) {
            throw Error('Request error');
        }
        return await request.json();
    } catch (error) {
        console.log(error.message);
    }
}

function crreatePaginationLinks(previous, next) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    if (previous) {
        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.dataset.page = previous;
        prevBtn.innerText = 'Previous';
        prevBtn.id = 'previous';
        prevBtn.className = 'pagination-link';
        pagination.appendChild(prevBtn);
    }
    if (next) {
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.dataset.page = next;
        nextBtn.innerText = 'Next';
        nextBtn.id = 'next';
        nextBtn.className = 'pagination-link';
        pagination.appendChild(nextBtn);
    }
}

async function getFacts(page = 1) {
    const list = document.getElementById('facts-list');
    const preloader = document.getElementById('preloader');
    preloader.classList.remove('loaded');
    try {
        const url = `${APE_ENDPOINT}?page=${page}`;
        const facts = await getData(url);
        if (!facts) {
            throw new Error('Request error');
        }
        const data = facts.data;
        let contens = '';
        for (const fact of data) {
            contens = contens + `<li>${fact.fact}</li>`;
        }
        list.innerHTML = contens;
        crreatePaginationLinks(facts.prev_page_url, facts.next_page_url);
        preloader.classList.add('loaded');
    } catch {
        err;
    }
    {
        preloader.classList.add('loaded');
        list.innerHTML = `<li class="error">No data to show.</li>`;
    }
}

function handlePagination() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-link')) {
            const button = e.target;
            const link = button.dataset.page;
            const page = parseInt(link.split('?')[1].replace('page=', ''), 10);
            getFacts(page);
        }
    });
}

document.addEventListener('load', () => {
    handlePagination();
    getFacts();
});
