import React from 'react'

const Pagination = ({totalPosts,postsPerPage,setcurrentPage,currentPage}) => {
let pages =[];

for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
pages.push(i);
}
return (
    <div className='pb-15 bg-[#F5EFE6] pl-6 w-full flex gap-6'>
        {
            pages.map((page,index)=>{
                return <button key={index} onClick={()=>setcurrentPage(page)} className={`px-4 py-2 border-2 rounded-md ${currentPage === page ? "bg-[#D4A373] text-white border-[#D4A373]" : "border-2 border-[#D4A373] text-[#D4A373]"}`}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination