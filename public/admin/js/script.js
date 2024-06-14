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

// phan trang
    const buttonPage=document.querySelectorAll(".page-link");
    // console.log(buttonPage);
    if (buttonPage.length>0) {
    let url=new URL(window.location.href);
    buttonPage.forEach(button => {
        button.addEventListener("click",()=>{
            const page=button.getAttribute("page");
            url.searchParams.set("page",page);
            window.location.href=url.href;
        })
    });
    }
//end phan trang

//buttun change status

const listButtonChangeStatus=document.querySelectorAll("button[button-change-status]");
if(listButtonChangeStatus.length>0) {
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const url=button.getAttribute("link");
            // console.log(url);
            fetch(url, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                }
            }) 
                .then(res => res.json()) 
                .then(data => {
                    if(data.code==200) {
                        window.location.reload();
                    }
                 })
        })
    }) 
}
//end button change status


// check box

    // check nut tat ca
    const checkboxAll=document.querySelector("input[name='checkboxAll']");
 
    const listcheckboxItem=document.querySelectorAll("input[name='checkboxItem'");
    if (checkboxAll) {
        checkboxAll.addEventListener("click", () => {
            listcheckboxItem.forEach(checkItem => {
                checkItem.checked=checkboxAll.checked;
            })
        })
    }
    //end nut tat ca

    // tich du 4 nut thi tich nut tat ca
    listcheckboxItem.forEach(checkbox => {
        checkbox.addEventListener("click", () =>{
            const listcheck=document.querySelectorAll("input[name='checkboxItem']:checked");
            if (listcheck.length==listcheckboxItem.length) {
                checkboxAll.checked=true;
            }           
            else {
                checkboxAll.checked=false;
            }
        })
    });
    //end

//end checkbox