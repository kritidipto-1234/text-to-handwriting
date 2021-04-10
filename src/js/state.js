const state=
{
    currentPage:document.querySelector('.page'),
    totalPages:1,
    ruled:true,
    margin:true,
    increaseTotalPages()
    {
        this.totalPages++;
    },
    updateCurrentPage(page)
    {
        this.currentPage=page;
    }
}
export {state};