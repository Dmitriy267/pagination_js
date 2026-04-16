async function getData(url) {
    try {
        const request = await fetch(url);
        if (!request.ok) {
            throw Error('Request error');
        }

        const data = await request.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
