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
    buttonCr.classList.add("active");
   }
}

