// button status
const listButton=document.querySelectorAll("[button-status");
if (listButton.length>0) {
    const url= new URL(window.location.href); // tao ra link moi
   listButton.forEach(button => {
    // console.log(url.href);
        button.addEventListener("click", () => {
            const status=button.getAttribute("button-status");
            // console.log(status);
            if (status) {
                url.searchParams.set("status",status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href=url.href;  // chuyen sang trang moi
        })
   });
    const statusCr=url.searchParams.get("status")|| "";
    const buttonCr=document.querySelector(`[button-status="${statusCr}"]`);
    // console.log(buttonCr);
   if (buttonCr) {
    buttonCr.classList.add("active");  // them css cho nut hien tai
   }
}

//   form search

    const fromSearch=document.querySelector("[form-search]");
    // console.log(fromSearch);
    if(fromSearch){
        const url=new URL(window.location.href);
        fromSearch.addEventListener("submit",(event) => {
            event.preventDefault(); // ham ngan chan load lai trang
            const keyword=event.target.elements.keyword.value; // lay gia tri cua keyword
            if (keyword) {
                url.searchParams.set("keyword",keyword);
            }
            else {
                url.searchParams.delete("keyword");
            }
            window.location.href=url.href;
            
           
        });
    }



// end from  search