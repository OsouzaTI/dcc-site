async function getAllSubMenus() {        
    const response = await fetch('http://localhost:4000/submenu/all');
    return await response.json();
}


export {getAllSubMenus};
