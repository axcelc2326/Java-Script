function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const currentLeft = sidebar.style.left;

    if (currentLeft === '0px') {
        sidebar.style.left = '-250px';
    } else {
        sidebar.style.left = '0px'; 
    }
}