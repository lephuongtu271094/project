module.exports = function (totalPage, currentPage, count, search) {
    var currentPage = parseInt(currentPage);
    if (totalPage <= 1) {
        return ''
    } else {
        let html = ''
        html += '<nav aria-label="Page navigation" class="text-center"><ul class="pagination">'
        for (let i = 1; i <= totalPage; i++) {
            if(count){
                html += '<li ' + (i === currentPage ? ' class="active" ' : '') + '"><a href="?search='+ search +'&page=' + i + '">' + i + '</a></li>'                
            }else{
                html += '<li ' + (i === currentPage ? ' class="active" ' : '') + '"><a href="?page=' + i + '">' + i + '</a></li>'                
            }
        }
        html += '</ul></nav>'
        return html
    }
}