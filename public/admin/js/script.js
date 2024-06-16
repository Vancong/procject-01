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
                .then(res => res.json())  // chuyen json ve js
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
            const listCheckChecked=document.querySelectorAll("input[name='checkboxItem']:checked");
            if (listCheckChecked.length==listcheckboxItem.length) {
                checkboxAll.checked=true;
            }           
            else {
                checkboxAll.checked=false;
            }
        })
    });
    //end

//end checkbox

// change status nhieu san pham
const boxActions=document.querySelector("[box-actions]");
if(boxActions) {
    const button=boxActions.querySelector("button");
    const select=boxActions.querySelector("select");
   
    button.addEventListener("click", () => {
        const status=select.value;
        const listCheckChecked=document.querySelectorAll("input[name='checkboxItem']:checked");
        const idf=[];
        listCheckChecked.forEach(input => {
            idf.push(input.value);
        });
        if (idf.length>0 &&status!=""){
            const dataChangeMulti={
                status,
                idf:idf
            }
            fetch("/admin/product/change-multi", {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataChangeMulti), 
            })
             .then(res=> res.json())
             .then(data=>{
                if(data.code==200) {
                    window.location.reload();
                }
             })
        }
        
        else {  
            alert("vui long chon hanh dong va san pham");
        }
        
       
    })
}
//end change


//xoa 1 san pham
const ListbuttonDelete=document.querySelectorAll("[button-delete]");
// console.log(buttonDelete);
if(ListbuttonDelete.length>0) {
    ListbuttonDelete.forEach(button => {
        button.addEventListener("click", () =>{
            const id=button.getAttribute("button-delete");
            console.log(id);
            fetch(`/admin/product/delete/${id}`, {          
                method: "PATCH"
              })
                .then(res => res.json())
                .then(data => {
                  if(data.code == 200) {
                    window.location.reload();
                  }
                })
            });
        })
    
}

//end xoa 1 san pham


































const listButtonBack=document.querySelectorAll("[button-back");
if(listButtonBack.length>0) {
    listButtonBack.forEach(button => {
        button.addEventListener("click", () =>{
            const id=button.getAttribute("button-back");
            console.log(id);
            fetch(`/admin/product/trash/back/${id}`,{
                method:"PATCH",

            })
            .then(res=> res.json())
            .then(data => {
                if(data.code==200) {
                    window.location.reload();
                }
            })
        })
    });
}