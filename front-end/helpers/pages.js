import { getCookie } from "cookies-next";

async function getAllPagesBySubMenuSlug(slug) {        
    const response = await fetch('http://localhost:4000/page/all/'+slug);
    return await response.json();
}

async function getAllPages() {        
    const response = await fetch('http://localhost:4000/page/all');
    return await response.json();
}


async function updatePage(id, title, content) {
    if(id == -1 || title == '' || content == '') 
        return;
    let token = getCookie('token')?.toString() ?? 'NO_TOKEN';
    const response = await fetch('http://localhost:4000/page/edit/', {
        method: 'PUT',
        body: JSON.stringify({id, title, content}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
}

export {getAllPagesBySubMenuSlug, updatePage, getAllPages};