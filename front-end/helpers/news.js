async function getAllNews() {        
    const response = await fetch('http://localhost:4000/news/all');
    return await response.json();
}

async function getNewsBySlug(slug) {        
    const response = await fetch('http://localhost:4000/news/'+slug);
    return await response.json();
}


export {getAllNews, getNewsBySlug};