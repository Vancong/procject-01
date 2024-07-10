const createTree=(array,parentId="") =>{
    const newarray=[];
    array.forEach(item => {
        if(item.parent_id==parentId){
            const children=createTree(array,item.id);
            if(children.length>0){
                item.children=children;
            }
            newarray.push(item);
        }
    
    });
    return newarray;
}
module.exports=(array,parentId="")=>{
    const tree=createTree(array,parentId="");
    return tree;
}
