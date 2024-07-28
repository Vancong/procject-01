
const changequantityProduct=document.querySelectorAll('[item-id]');
if(changequantityProduct){
    changequantityProduct.forEach(input => {
        input.addEventListener("change",()=>{
            const productId=input.getAttribute('item-id');
            const quantity=input.value;
            if(productId&&quantity>1){
                window.location.href=`/cart/${productId}/${quantity}`;
            }
        })
    });
}

const showAlert=document.querySelector("[show-alert]");  //be
if(showAlert) {
    let time=showAlert.getAttribute("[show-alert")||3000;
    time=parseInt(time);
    setTimeout(() => {
        showAlert.classList.add("hidden");
    }, time);
}

//them alert
const buttonAddProduct=document.querySelectorAll('[bt-cart]');
if(buttonAddProduct.length>0){
   buttonAddProduct.forEach(button => {
        button.addEventListener("click",()=>{
            const quantityAdd=document.querySelector('[quantity-addCart]'); //so luong muon them vao gio hang
            const quantityInCart=parseInt(button.getAttribute('quantity-inCart')); //so luong trong gio hang
            const productStock=parseInt(button.getAttribute('product-stock')); // so luong ton kho
            const totalQuantity=quantityInCart+quantityAdd.value;
            if(totalQuantity>productStock) {
                Swal.fire({
                    icon: "error",
                    title: `Bạn đã có ${quantityInCart} sản phẩm trong giỏ hàng. Không
                    thể thêm số lượng đã chọn vào giỏ hàng vì sẽ vượt quá giới hạn mua hàng của bạn`,
                    text:  "Vui lòng nhập lại",
                    showConfirmButton: true,
                    timer: null
                });
            }
            else {
                if(productStock<quantityAdd.value){
                    Swal.fire({
                        icon: "error",
                        title: "Số lượng hàng không đủ",
                        text:  "Vui lòng nhập lại",
                        showConfirmButton: true,
                    });
                }
                else if(quantityAdd.value>0){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'Đã thêm vào giỏ hàng',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }    
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Vui lòng thêm ít nhất 1 sản phẩm",
                        text:  "Vui lòng nhập lại",
                        timer: 1500
                    });
                }
            }
          
        })
   });
 
}

//alert delete
const btDeleteCartProduct=document.querySelectorAll('[bt-delete-cartProduct]');
if(btDeleteCartProduct.length>0){
    btDeleteCartProduct.forEach(button=> {
        button.addEventListener("click",()=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Xóa Thành Công',
                showConfirmButton: false,
                timer: 1500
             });
        })
    });
}

//oder check san pham
////check all
const checkProductAll=document.querySelector('[checkProductAll]');
const listInputCheck=document.querySelectorAll('[checkProduct]');
if(checkProductAll) {
    checkProductAll.addEventListener('change',() =>{
        if(checkProductAll.checked) {
            listInputCheck.forEach(input => {
                input.checked=true;
            });
        }
        else {
            listInputCheck.forEach(input => {
                input.checked=false ;
            });
        }
    })
}
////check tung nut
if (listInputCheck.length>0) {
   listInputCheck.forEach(input => {
        input.addEventListener('change' ,()=>{
            const listInputCheck2=document.querySelectorAll('[checkProduct]:checked');
            if(listInputCheck2.length==listInputCheck.length) {
                checkProductAll.checked=true;
            }
            else {
                checkProductAll.checked=false;
            }
        })
   });
}
const btCheckout=document.querySelector('[bt-checkout]');
if(btCheckout) {
    btCheckout.addEventListener("click",()=>{
        const listInputCheck2=document.querySelectorAll('[checkProduct]:checked');
        const data=[];
        listInputCheck2.forEach(input => {
            const product={
                 id: input.getAttribute('checkProduct'),
            }
            data.push(product);          
        });
        const url=btCheckout.getAttribute('bt-checkout');
        fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(data =>{
            if(data.code==200){
                window.location.href='/checkout';
            }
        })
    })
}
//resetotp
const buttonReset=document.querySelector('.resetOtp');
if(buttonReset) {
    buttonReset.addEventListener("click" ,()=>{
        const link=buttonReset.getAttribute('link');
        fetch(link,{
            method:'PATCH'
        })
        .then(res =>res.json())
        .then(data=>{
            
        })
    })
}

// Swal.fire({
//     position: "center",
//     icon: "success",
//     title: 'Đã thêm vào giỏ hàng',
//     showConfirmButton: false,
//     timer: 1500
// });
