async function getAllMenus() {        
    const response = await fetch('http://localhost:4000/menu/all');
    return await response.json();
}


export {getAllMenus};
